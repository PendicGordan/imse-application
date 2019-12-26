'use strict';
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('Employees', {
        id          : { type: DataTypes.UUID,          primaryKey: true },
        username    : { type: DataTypes.STRING,        allowNull: false,  unique: true  },
        first_name  : { type: DataTypes.STRING,        allowNull: false   },
        last_name   : { type: DataTypes.STRING,        allowNull: false   },
    }, {
        timestamps : false
    });

    Model.beforeCreate(async (Employees) => {
        Employees.id = uuid();
    });

    Model.associate = (models) => {
        Model.hasMany(models.Reservations);
    };

    return Model;
};
