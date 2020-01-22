const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, index: true  },
    name: String,
    website: String,
    type: {
        type: String,
        enum : ['HOTEL', 'RESTAURANT'],
        default: 'RESTAURANT',
    }
}, { _id: false, shardkey: { _id: 1 } });
module.exports = mongoose.model('Company', companySchema );

