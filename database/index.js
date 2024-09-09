const Sequelize =  require('sequelize');
const dbConfig = require('../config/database');

const Person = require('../models/Person');

const connection = new Sequelize(dbConfig);

Person.init(connection);

Person.associatie(connection.models);

module.exports = connection;