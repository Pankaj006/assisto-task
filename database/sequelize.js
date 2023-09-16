const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');

const environment = process.env.NODE_ENV || 'dev_env';
console.log("Current Enviroment:: " + environment)
const configPath = path.join(__dirname, '..', 'config', `${environment}.json`);
const rawdata = fs.readFileSync(configPath);
const config = JSON.parse(rawdata);

const sequelize = new Sequelize(config);

module.exports = sequelize;
