const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/sequelize");
const cors = require("cors");

const usersRouter = require("./routes/userRoute");
const { notFoundHandler, errorHandler } = require("./middleware/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const logger = require("./logger/logger");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Setup Swagger
const swaggerDocument = YAML.load("./swagger/swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Setup Cors
app.use(cors());

sequelize
    .sync({ force: true })
    .then(() => {
        logger.info("Database synced successfully!");
        const server = app.listen(port, () => {
            const { address, port } = server.address();
            logger.info(`Server is running on http://${address}:${port}`);
        });
    })
    .catch((error) => {
        logger.error("Error syncing database:", error);
    });

// Routes
app.use("/api/user", usersRouter);

// Custom middleware for handling 404 (Not Found) errors
app.use(notFoundHandler);

// Custom global error handler
app.use(errorHandler);

module.exports = app;
