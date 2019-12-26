const CompanyController 	              = require('../../controllers/companies.controller');

module.exports = function (router, passport) {
    const authUser                 = require('../../middleware/authUser')(passport);

    router.get('/getAll',                authUser,                       CompanyController.retrieveCompanies);        // R

    return router;
};
