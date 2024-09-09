const {Model, DataTypes} = require('sequelize');

class Person extends Model {}

module.exports = (sequelize) =>{
    Person.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Person',
        tableName: 'persons',
        timestamps: false
    });

    return Person;
}