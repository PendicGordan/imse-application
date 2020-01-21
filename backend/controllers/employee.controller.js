const {Employees, Reservations}                       = require('../models');
const {ReE, ReS, to }       = require('../services/UtilService');
const Sequelize = require('sequelize');
const stringify = require('csv-stringify');
const mongoose = require('mongoose');
const Employee = require('../models_mongodb/Employee');

const create = async function(req, res){
    let body = req.body;
    const [err, employee] = await to(new Employee({ _id: new mongoose.Types.ObjectId(), username: body.username, first_name: body.firstName, last_name: body.lastName }).save());
    if(err) return ReE(res, err);

    return ReS(res, { body: employee });
};
module.exports.create = create;

const retrieveEmployees = async function(req, res) {
    const [err, employees] = await to(mongoose.models.Employee.find());
    if(err) return ReE(res, err);

    return ReS(res, { body: employees });
};
module.exports.retrieveEmployees = retrieveEmployees;

const sortBy = async function(req, res){
    let sortObject = {};
    sortObject[req.params.sortBy] = req.params.direction === 'ascending' ? 1 : -1;
    let [err, employees] = await to(mongoose.models.Employee.find().sort(sortObject));
    if(err) return ReE(res, err);

    console.log(employees);

    return ReS(res, { body: employees });
};
module.exports.sortBy = sortBy;

const fetchTop10 = async function(req, res){
    let [err, result] = await to(mongoose.models.Employee.find());
    if(err) return ReE(res, err);

    if(req.params.direction === 'most')
        result.sort((a, b) => {
            return b.reservations.length - a.reservations.length;
        });
    else
        result.sort((a, b) => {
            return a.reservations.length - b.reservations.length;
        });

    if(result.length > 10) {
        result = result.slice(0, 10);
    }

    return ReS(res, { body: result });
};
module.exports.fetchTop10 = fetchTop10;

const fetchAverageReservations = async function(req, res){
    let [err, countingResult] = await to(mongoose.models.Employee.find());
    if(err) return ReE(res, err);

    console.log(countingResult);
    let sum = 0;
    countingResult.forEach(eachReservation => {
        sum += eachReservation.reservations.length;
    });

    return ReS(res, { body: sum / countingResult.length });
};
module.exports.fetchAverageReservations = fetchAverageReservations;

const fetchCount = async function(req, res){
    const [err, count] = await to(mongoose.models.Employee.count());
    if(err) return ReE(res, err);

    return ReS(res, { body: count });
};
module.exports.fetchCount = fetchCount;

const exportAsCsv = async function(req, res){
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');

    let [err, employees] = await to(mongoose.models.Employee.find());
    if(err) return ReE(res, err);
    employees = employees.map(employee => employee._doc);

    stringify(employees, { header: true })
        .pipe(res);
};
module.exports.exportAsCsv = exportAsCsv;
