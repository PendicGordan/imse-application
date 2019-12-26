'use strict';
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('Countries', {
        id          : { type: DataTypes.UUID,        primaryKey: true },
        name        : { type: DataTypes.STRING,          allowNull: false, unique: true },
        shortcut     : { type: DataTypes.STRING,        allowNull: false, unique: true }
    },{
        timestamps : true
    });

    Model.beforeCreate(async (country) => {
        country.id = uuid();
    });

    Model.associate = (models) => {
        Model.hasMany(models.Reservations);
    };

    return Model;
};
