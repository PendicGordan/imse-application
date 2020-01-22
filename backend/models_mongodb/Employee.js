const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, index: true  },
    username: String,
    first_name: String,
    last_name: String,
    reservations: [ mongoose.Schema.Types.ObjectId ]
}, { _id: false, shardkey: { _id: 1 } });
module.exports = mongoose.model('Employee', employeeSchema );

