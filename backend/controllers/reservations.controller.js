const {Reservations, Employees, Companies, Countries}                       = require('../models');
const {ReE, ReS, to }       = require('../services/UtilService');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const stringify = require('csv-stringify');
const mongoose = require('mongoose');
const Reservation = require('../models_mongodb/Reservation');
const jwt           	= require('jsonwebtoken');

const insertReservation = async function(req, res){
    let body = req.body;
    let reservationId = new mongoose.Types.ObjectId();
    let [err, reservation] = await to(new Reservation({ _id: reservationId, date_from: body.startDate, date_to: body.endDate, company: body.company, country: body.country, employee: body.employee }).save());
    //let [err, reservation] = await to(Reservations.create({ date_from: body.startDate, date_to: body.endDate, CompanyId: body.companyId, CountryId: body.countryId, EmployeeId: body.employeeId }));
    if(err) return ReE(res, err);

    [err, reservation] = await to(mongoose.models.Employee.update({ _id: body.employee._id },{ $push: { reservations: { $each: [reservationId] } } }));
    if(err) return ReE(res, err);


    console.log(reservation);
    return ReS(res, { body: reservation });
};
module.exports.insertReservation = insertReservation;

const retrieveReservations = async function(req, res) {
    console.log(req.query);
    console.log(req.body);

    let [err, reservations] = await to(mongoose.models.Reservation.find());
    if(err) return ReE(res, err);

    return ReS(res, { body: reservations });
};
module.exports.retrieveReservations = retrieveReservations;

const sortBy = async function(req, res){
    let sortBy = req.params.sortBy;
    let direction = req.params.direction;
    let sortObject = {};
    let sortingKey;
    switch(sortBy) {
        case 'username':case 'first_name':case 'last_name':
            sortingKey = 'employee.' + sortBy;
            break;
        case 'name':
            sortingKey = 'company.' + sortBy;
            break;
        case 'date_from':case 'date_to':
            sortingKey = sortBy;
            break;
    }
    sortObject[sortingKey] = direction === 'ascending' ? 1 : -1;
    let [err, reservations] = await to(mongoose.models.Reservation.find().sort(sortObject));
    if(err) return ReE(res, err);

    return ReS(res, { body: reservations });
};
module.exports.sortBy = sortBy;

const filter = async function(req, res){
    console.log(req.body);
    let body = req.body;

    let searchObject = {};
    if(body.username !== '') {
        console.log('username');
        searchObject["employee.username"] = { $regex: '.*' + body.username + '.*' };
    }
    if(body.firstName !== '') {
        console.log('first_name');
        searchObject["employee.first_name"] = { $regex: '.*' + body.firstName + '.*' };
    }
    if(body.lastName !== '') {
        console.log('last_name');
        searchObject["employee.last_name"] = { $regex: '.*' + body.lastName + '.*' };
    }

    if(body.company !== '') {
        console.log('company');
        searchObject["company.name"] = { $regex: '.*' + body.company + '.*' };
    }

    if(body.startDate && body.endDate) {
        /*let startDate = moment(body.startDate, "MM/DD/YYYY H:mm:ss").format("YYYY/MM/DD H:mm:ss");
        let endDate = moment(body.endDate, "MM/DD/YYYY H:mm:ss").format("YYYY/MM/DD H:mm:ss");*/
        console.log(body.startDate);
        const a = moment(body.startDate, 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD, HH:mm:ss');
        searchObject["$and"] = [];
        searchObject["$and"].push({
            date_from: {
                $gt: a
            }
        });
        const b = moment(body.endDate, 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD, HH:mm:ss');
        searchObject["$and"].push({
            date_to: {
                $lt: b
            }
        });
    }

    console.log(JSON.stringify(searchObject));

    let [err, reservations] = await to(mongoose.models.Reservation.find(searchObject));
    if(err) return ReE(res, err);

    return ReS(res, { body: reservations});
};
module.exports.filter = filter;

const filterActive = async function(req, res){
    console.log(req.params);
    console.log(req.body);

    const now = moment(new Date()).format('YYYY/MM/DD, H:mm:ss');

    let [err, reservations] = await to(mongoose.models.Reservation.find({
            date_to: {
                $gt: now
            }
    }));
    if(err) return ReE(res, err);

    return ReS(res, { body: reservations });
};
module.exports.filterActive = filterActive;

const batchDelete = async function(req, res){
    console.log(req.params);
    console.log(req.body);

    const now = moment(new Date()).format('YYYY/MM/DD, H:mm:ss');
    let [err, response] = await to(mongoose.models.Reservation.remove({
            'date_from': {
                $gt: now
            }
    }));
    if(err) return ReE(res, err);

    return ReS(res, { body: response });
};
module.exports.batchDelete = batchDelete;

const deleteReservation = async function(req, res){
    console.log(req.params);
    console.log(req.body);

    let [err, response] = await to(mongoose.models.Reservation.remove({
            _id: req.params.id
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

    let [err, reservations] = await to(mongoose.models.Reservation.find());
    if(err) return ReE(res, err);

    reservations = reservations.map(reservation => reservation._doc);

    stringify(reservations, { header: true })
        .pipe(res);
};
module.exports.exportAsCsv = exportAsCsv;
