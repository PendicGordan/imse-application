const {Companies}                       = require('../models');
const {ReE, ReS, to }       = require('../services/UtilService');

const retrieveCompanies = async function(req, res){
    const [err, companies] = await to(Companies.findAll());
    if(err) return ReE(res, err);

    return ReS(res, { body: companies });
};
module.exports.retrieveCompanies = retrieveCompanies;
