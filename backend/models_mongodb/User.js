const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    verified: Boolean,
    hash: String
});
module.exports = mongoose.model('User', userSchema );

