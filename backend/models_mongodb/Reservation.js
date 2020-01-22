const mongoose = require('mongoose');
const Company = require('./Company');
const Employee = require('./Employee');
const Country = require('./Country');

const reservationSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, index: true  },
    date_from: String,
    date_to: String,
    company: Company.schema,
    employee: Employee.schema,
    country: Country.schema
}, { _id: false, shardkey: { _id: 1 } });
module.exports = mongoose.model('Reservation', reservationSchema );

