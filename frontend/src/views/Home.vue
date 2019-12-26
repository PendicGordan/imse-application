<template>
  <div class="home container">
    <h1 style="font-weight: 400; font-size: 40px; margin-bottom: 1%">Insert new Reservation:</h1>
    <form @submit.prevent="submitReservation">
    <section>
      <b-field
              label="Select an employee">
        <b-select placeholder="Select Employee..." v-model="chosenEmployee" expanded>
          <option :value="employee" v-for="employee in employees" :key="employee.id">{{ employee.username + ': ' + employee.first_name + ' ' + employee.last_name }}</option>
        </b-select>
      </b-field>
      <b-field label="Cathering Facility">
        <b-select placeholder="Select Cathering Facility..." v-model="chosenCompany" expanded>
          <option :value="company" v-for="company in companies" :key="company.id">{{ company.name + " - " + company.type }}</option>
        </b-select>
      </b-field>
      <b-field label="Country">
        <b-select placeholder="Select Country..." v-model="chosenCountry" expanded>
          <option :value="country" v-for="country in countries" :key="country.id">{{ country.name + ' - ' + country.shortcut }}</option>
        </b-select>
      </b-field>
    </section>
    <section>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-16">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child ">
                <p class="subtitle" style="margin-top: 2%">Choose the start date and time</p>
                <div class="content is-" style="padding-left: 25%">
                  <b-datetimepicker v-model="fromDateTime" :min-datetime="minDatetime" inline></b-datetimepicker>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child">
            <div class="content has-addons-centered">
              <p class="subtitle" style="margin-top: 2%">Choose the end date and time</p>
              <div class="content is-" style="padding-left: 25%">
                <b-datetimepicker v-model="toDateTime" :min-datetime="minDatetime" inline></b-datetimepicker>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section style="margin-bottom: 2%; margin-top: 2%">
      <button type="submit" class="button">Submit</button>
    </section>
    </form>
  </div>
</template>

<script>
  const { required, minLength, email } = require('vuelidate/lib/validators');
  import EmployeeService from '../services/Employees';
  import CompanyService from '../services/Companies';
  import CountryService from '../services/Countries';
  import ReservationService from '../services/Reservations';
  import to from 'await-to-js';

export default {
  name: 'home',
  data() {
    return {
      showWeekNumber: false,
      formatAmPm: false,
      enableSeconds: false,
      toDateTime: new Date(),
      fromDateTime: new Date(),
      minDatetime: new Date(),
      countries: [],
      companies: [],
      employees: [],
      chosenEmployee: null,
      chosenCompany: null,
      chosenCountry: null
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      email
    }
  },
  methods: {
    async submitReservation() {
      if(this.chosenCountry === null || this.chosenCompany === null || this.chosenEmployee === null) {
        this.$swal('Username, cathering facility or country not chosen!','',
                'error');
        return console.error('leer');
      }

      if(this.toDateTime <= this.fromDateTime) {
        this.$swal('Wrong! Start date is after the end date.','',
                'error');
        return;
      }

     let [err, reservation] = await to(ReservationService.insertReservation({ countryId: this.chosenCountry.id, companyId: this.chosenCompany.id, employeeId: this.chosenEmployee.id, startDate: this.$moment(this.fromDateTime).format('YYYY/MM/DD, H:mm:ss'), endDate: this.$moment(this.toDateTime).format('YYYY/MM/DD, H:mm:ss') }));
      if (err) return console.error(err);

      console.log('-----------------------------------------');
      console.log("Insert reservation - response:");
      console.log(reservation);

      this.chosenEmployee = null;
      this.chosenCompany = null;
      this.chosenCountry = null;
      this.toDateTime = new Date();
      this.fromDateTime = new Date();

      this.$swal('Reservation successfully inserted!','',
              'success');
    }
  },
  computed: {
    format() {
      return this.formatAmPm ? '12' : '24'
    }
  },
  async mounted() {
    let err, reservations, countries, companies;
    [err, reservations] = await to(EmployeeService.retrieveEmployees());
    if (err) return console.error(err);

    console.log('-----------------------------------------');
    console.log("Fetching reservations:");
    console.log(reservations);
    this.employees = reservations.data.body;

    [err, countries] = await to(CountryService.retrieveCountries());
    if (err) return console.error(err);
    console.log('-----------------------------------------');
    console.log("Fetching countries:");
    console.log(countries);
    this.countries = countries.data.body;

    [err, companies] = await to(CompanyService.retrieveCompanies());
    if (err) return console.error(err);
    console.log('-----------------------------------------');
    console.log("Fetching companies:");
    console.log(companies);
    this.companies = companies.data.body;
  }
}
</script>
