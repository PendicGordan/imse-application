const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, index: true  },
    name: String,
    shortcut: String
}, { _id: false, shardkey: { _id: 1 } });
module.exports = mongoose.model('Country', countrySchema );

