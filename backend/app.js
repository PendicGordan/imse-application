const CONFIG       = require('./config/config');  // instantiate configuration variables
const express 		= require('express');
const logger 	    = require('morgan');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const pe            = require('parse-error');
const cors          = require('cors');

const mongoose = require('mongoose');

const app = express();

const v1 = require('./routes/v1')(express, passport);

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }));

// Passport
app.use(passport.initialize());

// DATABASE
const models = require("./models");
models.sequelize.authenticate()
    .then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
    })
    .catch(err => {
        console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
    });

if(CONFIG.app === 'dev'){
    /*models.sequelize.sync({ force: true }).then(async () => {
        await require('./seed').seed();
        console.log("Seed done!");
    });*/
}

mongoose.connect('mongodb://localhost:27017/reservation_management_system', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((db) => {
    console.log('Connected to the MongoDB!');
    let Company = require('./models_mongodb/Company');
    let company = new Company({
        _id: new mongoose.Types.ObjectId(),
        name: 'gordan',
        website: 'gp',
        type: 'HOTEL'
    });
    company.save();

    let Country = require('./models_mongodb/Country');
    let country = new Country({
        _id: new mongoose.Types.ObjectId(),
        name: 'Serbia',
        shortcut: 'SE',

    });
    country.save();

    let Employee = require('./models_mongodb/Employee');
    let employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        username: 'gordan123',
        first_name: 'Gordan',
        last_name: 'Pendic',
        reservations: []
    });
    employee.save();

    let Reservation = require('./models_mongodb/Reservation');
    let reservation = new Reservation({
        _id: new mongoose.Types.ObjectId(),
        date_from: '2020/06/27, 20:04:36',
        date_to: '2020/06/28, 23:04:36',
        company: company,
        employee: employee,
        country: country
    });
    reservation.save();

    let User = require('./models_mongodb/User');
    let user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: 'gordan@example.com',
        password: '$2a$12$sRfWraTPh6ic4sPGdgpaC.GkMNBbwzEZTwl58O1vm8I7x7MHsC7UW',
        verified: true,
        hash: 'JdKXx9zbPEgAGIIeIwvh'
    });
    user.save();
});

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});
app.use('/v1', v1);

app.use('/', (req, res) => {
	res.statusCode = 200;
	res.json({ status: "Success" });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

const port = CONFIG.port || '3000';

app.listen(port, () => {
    console.log('Server running on port: ', port);
});

module.exports = app;
