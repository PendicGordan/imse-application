const CountryController 	              = require('../../controllers/countries.controller');

module.exports = function (router, passport) {
    const authUser                 = require('../../middleware/authUser')(passport);

    router.get('/retrieveCountries',           authUser,             CountryController.retrieveCountries);        // R

    return router;
};
