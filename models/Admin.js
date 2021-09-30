const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Admin = sequelize.define('Admin', {
    name: {
        type: DataTypes.STRING
    },
    // username: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true
    // },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Admin;
