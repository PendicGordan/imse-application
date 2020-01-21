const {Countries}                       = require('../models');
const {ReE, ReS, to }       = require('../services/UtilService');
const mongoose = require('mongoose');

const retrieveCountries = async function(req, res){
    const [err, countries] = await to(mongoose.models.Country.find());
    if(err) return ReE(res, err);

    return ReS(res, { body: countries });
};
module.exports.retrieveCountries = retrieveCountries;
