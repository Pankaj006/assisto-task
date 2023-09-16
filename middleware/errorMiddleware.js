
// for handeling NOT FOUND or other custom errors

const notFoundHandler = (req, res, next) => {
    const error = new Error('URL: NOT VALID');
    error.status = 404;
    next(error);
};

const errorHandler = (err, req, res) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({ message: err.message });
};

module.exports = { notFoundHandler, errorHandler };
