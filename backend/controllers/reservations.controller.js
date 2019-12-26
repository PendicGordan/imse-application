const {Reservations, Employees, Companies, Countries}                       = require('../models');
const {ReE, ReS, to }       = require('../services/UtilService');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const stringify = require('csv-stringify');

const insertReservation = async function(req, res){
    let body = req.body;
    let [err, reservation] = await to(Reservations.create({ date_from: body.startDate, date_to: body.endDate, CompanyId: body.companyId, CountryId: body.countryId, EmployeeId: body.employeeId }));
    if(err) return ReE(res, err);
    return ReS(res, { body: reservation });
};
module.exports.insertReservation = insertReservation;

const retrieveReservations = async function(req, res) {
    console.log(req.query);
    console.log(req.body);

    let [err, reservations] = await to(Reservations.findAll({include: [Employees, Companies, Countries]}));
    if(err) return ReE(res, err);

    return ReS(res, { body: reservations });
};
module.exports.retrieveReservations = retrieveReservations;

const sortBy = async function(req, res){
    let sortBy = req.params.sortBy;
    let direction = req.params.direction;
    let sortArray = [];
    switch(sortBy) {
        case 'username':case 'first_name':case 'last_name':
            sortArray.push(Employees);
            break;
        case 'name':
            sortArray.push(Companies);
            break;
        case 'start_date':case 'end_date':
            sortArray.push(Reservations);
            break;
    }
    sortArray.push(req.params.sortBy);
    sortArray.push(direction === 'ascending' ? 'ASC' : 'DESC');
    let [err, reservations] = await to(Reservations.findAll({include: [Employees, Companies, Countries], order: [
            sortArray
        ]}));
    if(err) return ReE(res, err);

    return ReS(res, { body: reservations });
};
module.exports.sortBy = sortBy;

const filter = async function(req, res){
    console.log(req.body);
    let body = req.body;

    let searchObjectEmployee = {};
    if(body.username !== '') {
        console.log('username');
        searchObjectEmployee["username"] = { [Op.like]: '%' + body.username + '%'};
    }
    if(body.firstName !== '') {
        console.log('first_name');
        searchObjectEmployee["first_name"] = { [Op.like]: '%' + body.firstName + '%'};
    }
    if(body.lastName !== '') {
        console.log('last_name');
        searchObjectEmployee["last_name"] = { [Op.like]: '%' + body.lastName + '%'};
    }

    let searchObjectCompany = {};
    if(body.company !== '') {
        console.log('company');
        searchObjectCompany["name"] = { [Op.like]: '%' + body.company + '%'};
    }

    let betweenDates = {};
    if(body.startDate && body.endDate) {
        betweenDates["date_from"] = {
            [Op.gt]: body.startDate
        };
        betweenDates["date_to"] = {
            [Op.lt]: body.endDate
        }
    }

    let [err, reservations] = await to(Reservations.findAll({
        where: betweenDates,
        include: [
            { model: Employees, where: searchObjectEmployee},
            { model: Companies, where: searchObjectCompany},
            Countries]
    }));
    if(err) return ReE(res, err);

    return ReS(res, { body: reservations});
};
module.exports.filter = filter;

const filterActive = async function(req, res){
    console.log(req.params);
    console.log(req.body);

    const now = moment(new Date()).format('YYYY/MM/DD, H:mm:ss');

    let [err, reservations] = await to(Reservations.findAll({
        where: {
            'date_to': {
                [Op.gt]: now
            }
        },
        include: [
            Employees,
            Companies,
            Countries
        ]
    }));
    if(err) return ReE(res, err);

    return ReS(res, { body: reservations });
};
module.exports.filterActive = filterActive;

const batchDelete = async function(req, res){
    console.log(req.params);
    console.log(req.body);

    const now = moment(new Date()).format('YYYY/MM/DD, H:mm:ss');
    let [err, response] = await to(Reservations.destroy({
        where: {
            'date_from': {
                [Op.gt]: now
            }
        }
    }));
    if(err) return ReE(res, err);

    return ReS(res, { body: response });
};
module.exports.batchDelete = batchDelete;

const deleteReservation = async function(req, res){
    console.log(req.params);
    console.log(req.body);

    let [err, response] = await to(Reservations.destroy({
        where: {
            id: req.params.id
        }
    }));
    if(err) return ReE(res, err);

    return ReS(res, { body: response });
};
module.exports.deleteReservation = deleteReservation;

const exportAsCsv = async function(req, res){
    console.log(req.params);
    console.log(req.body);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');

    let [err, reservations] = await to(Reservations.findAll({include: [Employees, Companies, Countries]}));
    if(err) return ReE(res, err);

    reservations = reservations.map(reservation => reservation.dataValues);

    stringify(reservations, { header: true })
        .pipe(res);
};
module.exports.exportAsCsv = exportAsCsv;
