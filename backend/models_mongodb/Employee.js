const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    first_name: String,
    last_name: String,
    reservations: [ mongoose.Schema.Types.ObjectId ]
});
module.exports = mongoose.model('Employee', employeeSchema );

