'use strict';
const uuid = require('uuid');
const { TE }          = require('../services/UtilService');

module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('Reservations', {
        id          : { type: DataTypes.UUID,        primaryKey: true },
        date_from   : { type: DataTypes.STRING,          allowNull: false },
        date_to     : { type: DataTypes.STRING,        allowNull: false }
    });

    Model.beforeCreate(async (reservation) => {
        reservation.id = uuid();
    });

    Model.getReservationsCountriesCompaniesEmployees = function () {
        return sequelize.query(`SELECT Reservations.id as id, Reservations.date_from, Reservations.date_to, Companies.id as companyId, Companies.name as company_name, Countries.id as countryId, Countries.name as country_name, Employees.id as employeeId, Employees.username, Employees.first_name, Employees.last_name FROM Reservations AS Reservations INNER JOIN Companies ON Reservations.CompanyId = Companies.id INNER JOIN Countries ON Reservations.CountryId = Countries.id INNER JOIN Employees ON Reservations.EmployeeId = Employees.id`, { model: this, type: sequelize.QueryTypes.SELECT})
            .then(reservations => {
                return reservations;
            })
            .catch(err => {
                console.log(err);
                TE(err)
            })
    };

    Model.associate = (models) => {
        Model.belongsTo(models.Companies);
        Model.belongsTo(models.Countries);
        Model.belongsTo(models.Employees);
    };

    return Model;
};
