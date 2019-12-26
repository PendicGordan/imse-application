const path         = require('path');

module.exports = (express, passport) => {
    const router = express.Router();

    // ----------- User Routes  -----------
    const users = require('./userRoutes')(router, passport);
    router.use('/users', users);

    // ----------- Employee Routes  -----------
    const employees = require('./employeeRoutes')(router, passport);
    router.use('/employees', employees);

    // ----------- Reservations Routes  -----------
    const reservations = require('./reservationRoutes')(router, passport);
    router.use('/reservations', reservations);

    // ----------- Reservations Routes  -----------
    const countries = require('./countryRoutes')(router, passport);
    router.use('/countries', countries);

    // ----------- Reservations Routes  -----------
    const companies = require('./companyRoutes')(router, passport);
    router.use('/companies', companies);

    return router;
};
