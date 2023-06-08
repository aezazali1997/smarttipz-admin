const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const PermissionType = sequelize.define('PermissionType', {
    names: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
});

module.exports = PermissionType;
