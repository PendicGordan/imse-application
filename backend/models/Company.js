'use strict';
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('Companies', {
        id          : { type: DataTypes.UUID,        primaryKey: true },
        name        : { type: DataTypes.STRING,          allowNull: false },
        website     : { type: DataTypes.STRING,        allowNull: false },
        type        : { type: DataTypes.ENUM,        allowNull: false, values: ['HOTEL', 'RESTAURANT'] }
    },{
        timestamps : true
    });

    Model.beforeCreate(async (company) => {
        company.id = uuid();
    });

    Model.associate = (models) => {
        Model.hasMany(models.Reservations);
    };

    return Model;
};
