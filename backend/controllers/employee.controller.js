const {Employees, Reservations}                       = require('../models');
const {ReE, ReS, to }       = require('../services/UtilService');
const Sequelize = require('sequelize');
const stringify = require('csv-stringify');

const create = async function(req, res){
    let body = req.body;
    const [err, employee] = await to(Employees.create({ username: body.username, first_name: body.firstName, last_name: body.lastName }));
    if(err) return ReE(res, err);

    return ReS(res, { body: employee });
};
module.exports.create = create;

const retrieveEmployees = async function(req, res) {
    const [err, employees] = await to(Employees.findAll());
    if(err) return ReE(res, err);

    return ReS(res, { body: employees });
};
module.exports.retrieveEmployees = retrieveEmployees;

const sortBy = async function(req, res){
    let [err, employees] = await to(Employees.findAll({ order: [
            [req.params.sortBy, req.params.direction === 'descending' ? 'DESC' : 'ASC']
        ]}));
    if(err) return ReE(res, err);

    console.log(employees);

    return ReS(res, { body: employees });
};
module.exports.sortBy = sortBy;

const fetchTop10 = async function(req, res){
    let [err, countingResult] = await to(Reservations.findAll({
        attributes:
            ['EmployeeId', [Sequelize.fn('count', Sequelize.col('EmployeeId')), 'cnt' ]],
        group: ['EmployeeId'],
        include: [Employees]
    }));
    if(err) return ReE(res, err);

    if(req.params.direction === 'most')
        countingResult.sort((a, b) => {
            return b.dataValues.cnt - a.dataValues.cnt;
        });
    else
        countingResult.sort((a, b) => {
            return a.dataValues.cnt - b.dataValues.cnt;
        });

    if(countingResult.length > 10) {
        countingResult = countingResult.slice(0, 10);
    }
    let employees = countingResult.map(record => record.dataValues.Employee);

    return ReS(res, { body: employees });
};
module.exports.fetchTop10 = fetchTop10;

const fetchAverageReservations = async function(req, res){
    let [err, countingResult] = await to(Reservations.findAll({
        attributes: ['EmployeeId', [Sequelize.fn('count', Sequelize.col('EmployeeId')), 'cnt' ]],
        group: ['EmployeeId']
    }));
    if(err) return ReE(res, err);

    console.log(countingResult[0].dataValues.cnt);

    let sum = 0;
    countingResult.forEach(record => {
        sum += record.dataValues.cnt;
    });

    return ReS(res, { body: sum / countingResult.length });
};
module.exports.fetchAverageReservations = fetchAverageReservations;

const fetchCount = async function(req, res){
    const [err, count] = await to(Employees.count({
        distinct: true,
        col: 'Employees.id'
    }));
    if(err) return ReE(res, err);

    return ReS(res, { body: count });
};
module.exports.fetchCount = fetchCount;

const exportAsCsv = async function(req, res){
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');

    let [err, employees] = await to(Employees.findAll());
    if(err) return ReE(res, err);
    employees = employees.map(employee => employee.dataValues);

    stringify(employees, { header: true })
        .pipe(res);
};
module.exports.exportAsCsv = exportAsCsv;
