const ReservationController 	              = require('../../controllers/reservations.controller');

module.exports = function (router, passport) {
    const authUser                 = require('../../middleware/authUser')(passport);

    router.post('/create',                                     authUser,                   ReservationController.insertReservation);     // C
    router.get('/fetch',                                       authUser,                   ReservationController.retrieveReservations);  // R
    router.get('/sortReservations/:sortBy/:direction',         authUser,                   ReservationController.sortBy);                // R
    router.post('/filter',                                     authUser,                   ReservationController.filter);                // R
    router.get('/active',                                      authUser,                   ReservationController.filterActive);          // R
    router.delete('/delete',                                   authUser,                   ReservationController.batchDelete);           // D
    router.delete('/delete/:id',                               authUser,                   ReservationController.deleteReservation);     // D
    router.get('/export/csvReservations',                                  authUser,                   ReservationController.exportAsCsv);           // R

    return router;
};
