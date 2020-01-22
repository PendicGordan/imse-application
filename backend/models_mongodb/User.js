const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, index: true  },
    email: String,
    password: String,
    verified: Boolean,
    hash: String
}, { _id: false, shardkey: { _id: 1 } });
module.exports = mongoose.model('User', userSchema );

