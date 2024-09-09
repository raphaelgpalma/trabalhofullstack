const { define } = require("mime");

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'trabalhofullstack',
    define: {
        timestamps: false,
        underscore: false
    }
};