const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    shortcut: String
});
module.exports = mongoose.model('Country', countrySchema );

