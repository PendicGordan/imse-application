const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    website: String,
    type: {
        type: String,
        enum : ['HOTEL', 'RESTAURANT'],
        default: 'RESTAURANT',
    }
});
module.exports = mongoose.model('Company', companySchema );

