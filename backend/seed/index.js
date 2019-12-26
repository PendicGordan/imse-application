const {
    sequelize,
    Users,
    Companies,
    Countries,
    Reservations,
    Employees
} = require('../models');

const users = require('./users.json');
const companies = require('./companies.json');
const countries = require('./countries.json');
const reservations = require('./reservations.json');
const employees = require('./employees.json');

const _ = require('lodash');

const seed = function() {
    sequelize
        .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
        .then(function (results) {
            sequelize.sync({force: false})
                .then(async function () {
                    await Promise.all(
                        users.map(user => {
                            Users.create(user)
                        }),
                        companies.map(company => {
                            Companies.create(company)
                        }),
                        countries.map(country => {
                            Countries.create(country)
                        }),
                        employees.map(employee => {
                            Employees.create(employee)
                        }),
                        reservations.map(reservation => {
                            Reservations.create(reservation)
                        })
                    )
                })
        });
};
module.exports.seed = seed;

