const {ReE, ReS, to }       = require('../services/UtilService');
const mongoose = require('mongoose');
let Company = require('../models_mongodb/Company');
let Country = require('../models_mongodb/Country');
let Employee = require('../models_mongodb/Employee');
let Reservation = require('../models_mongodb/Reservation');
let User = require('../models_mongodb/User');

const {Reservations, Employees, Companies, Countries, Users} = require('../models');

module.exports = async () => {
   let [err, result] = await to(Users.findAll({ raw: true }));
   if(err) return false;

   result.forEach(async (eachUser) => {
      await new User({
         _id: new mongoose.Types.ObjectId(),
         email: eachUser.email,
         password: eachUser.password,
         verified: eachUser.verified,
         hash: eachUser.hash
      }).save();
   });

   [err, result] = await to(Countries.findAll({ raw: true }));
   if(err) return false;

   let countryTemp = {};
   result.forEach(async (eachCountry) => {
      let countryId = new mongoose.Types.ObjectId();
      countryTemp[eachCountry.id] = { ...eachCountry, _id:  countryId};
      await new Country({
         _id: countryId,
         name: eachCountry.name,
         shortcut: eachCountry.shortcut
      }).save();
   });
   //console.log(result);

   [err, result] = await to(Companies.findAll({ raw: true }));
   if(err) return false;

   let companyTemp = {};
   result.forEach(async (eachCompany) => {
      let companyId = new mongoose.Types.ObjectId();
      companyTemp[eachCompany.id] = { ...eachCompany, _id:  companyId};
      await new Company({
         _id: companyId,
         name: eachCompany.name,
         type: eachCompany.type,
         website: eachCompany.website
      }).save();
   });

   [err, result] = await to(Employees.findAll({ raw: true }));
   if(err) return false;

   let employeesTemp = {};
   result.forEach(async (eachEmployee) => {
      let employeeId = new mongoose.Types.ObjectId();
      employeesTemp[eachEmployee.id] = { ...eachEmployee, _id:  employeeId};
      await new Employee({
         _id: employeeId,
         username: eachEmployee.username,
         first_name: eachEmployee.first_name,
         last_name: eachEmployee.last_name,
         reservations: []
      }).save();
   });

   [err, result] = await to(Reservations.findAll({ raw: true }));
   if(err) return false;

   result.forEach(async (eachReservation) => {
      let employeeToInsert = employeesTemp[eachReservation.EmployeeId];

      let companyToInsert = companyTemp[eachReservation.CompanyId];
      let countryToInsert = countryTemp[eachReservation.CountryId];
      let reservationId = new mongoose.Types.ObjectId();
      await new Reservation({
         _id: reservationId,
         date_from: eachReservation.date_from,
         date_to: eachReservation.date_to,
         company: companyToInsert,
         employee: employeeToInsert,
         country: countryToInsert
      }).save();

      console.log(await mongoose.models.Employee.find({ _id: employeeToInsert._id }));
      await mongoose.models.Employee.update({ _id: employeeToInsert._id },{ $push: { reservations: { $each: [reservationId] } } });
   });

   return true;
} ;
