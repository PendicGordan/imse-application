const mongoose = require('mongoose');
const Company = require('./Company');
const Employee = require('./Employee');
const Country = require('./Country');

const reservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date_from: String,
    date_to: String,
    company: Company.schema,
    employee: Employee.schema,
    country: Country.schema
});
module.exports = mongoose.model('Reservation', reservationSchema );

