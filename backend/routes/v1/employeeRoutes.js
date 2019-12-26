const EmployeeController 	              = require('../../controllers/employee.controller');

module.exports = function (router, passport) {
    const authUser                 = require('../../middleware/authUser')(passport);

    router.post('/createEmployee',          authUser,             EmployeeController.create);                   // C
    router.get('/',                         authUser,             EmployeeController.retrieveEmployees);        // R
    router.get('/sort/:sortBy/:direction',  authUser,             EmployeeController.sortBy);                   // R
    router.get('/top/:direction',           authUser,             EmployeeController.fetchTop10);               // R
    router.get('/average',                  authUser,             EmployeeController.fetchAverageReservations); // R
    router.get('/count',                    authUser,             EmployeeController.fetchCount);               // R
    router.get('/export/csv',               authUser,             EmployeeController.exportAsCsv);              // R

    return router;
};
