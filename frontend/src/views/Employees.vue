<template>
    <div class="about container">
        <div class="tile is-ancestor">
            <div class="tile is-vertical is-16">
                <div class="tile is-parent">
                    <article class="tile is-child notification">
                        <p class="subtitle">Sort by:</p>
                        <div class="content has-text-left">
                            <div class="field">
                                <b-radio v-model="radio"
                                         name="name"
                                         native-value="username"
                                        @click.native="sortEmployee('username')"
                                >
                                    Username
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radio"
                                         name="name"
                                         native-value="firstName"
                                         @click.native="sortEmployee('first_name')"
                                >
                                    First Name
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radio"
                                         name="name"
                                         native-value="lastName"
                                         @click.native="sortEmployee('last_name')"
                                >
                                    Last Name
                                </b-radio>
                            </div>
                            <p><b>Direction:</b></p>
                            <div class="field">
                                <b-radio v-model="radioDirection"
                                         name="name1"
                                         native-value="ascending"
                                >
                                    Ascending
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radioDirection"
                                         name="name1"
                                         native-value="descending" block
                                >
                                    Descending
                                </b-radio>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child notification">
                    <div class="content">
                        <p class="subtitle">Filter/Query:</p>
                        <div class="content has-text-left">
                            <div class="field">
                                <b-radio v-model="radioFilter"
                                         name="top10Most"
                                         native-value="top10Most">
                                    Top 10 Employees with most reservations
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radioFilter"
                                         name="top10Least"
                                         native-value="top10Least">
                                    Top 10 Employees with least reservations
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radioFilter"
                                         name="name"
                                         native-value="averageAmount">
                                    Average amount of reservations per Employee
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radioFilter"
                                         name="name"
                                         native-value="totalAmount">
                                    Total amount of Employees
                                </b-radio>
                            </div>
                            <b-button @click="filter" rounded>Filter</b-button>
                        </div>
                    </div>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child notification">
                    <div class="content">
                        <p class="subtitle">Other:</p>
                        <br/>
                        <div class="content">
                            <b-button type="is-info" rounded @click="exportAsCsv">Export as CSV</b-button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
        <section>
            <b-table
                    :data="isEmpty ? [] : data"
                    :bordered="isBordered"
                    :striped="isStriped"
                    :narrowed="isNarrowed"
                    :hoverable="isHoverable"
                    :loading="isLoading"
                    :focusable="isFocusable"
                    :mobile-cards="hasMobileCards">

                <template slot-scope="props">
                    <b-table-column field="username" label="Username">
                        {{ props.row.username }}
                    </b-table-column>
                    <b-table-column field="first_name" label="First Name">
                        {{ props.row.first_name }}
                    </b-table-column>

                    <b-table-column field="last_name" label="Last Name">
                        {{ props.row.last_name }}
                    </b-table-column>
                </template>

                <template slot="empty">
                    <section class="section">
                        <div class="content has-text-grey has-text-centered">
                            <p>
                                <b-icon
                                        icon="emoticon-sad"
                                        size="is-large">
                                </b-icon>
                            </p>
                            <p>Nothing here.</p>
                        </div>
                    </section>
                </template>
            </b-table>
        </section>
    </div>
</template>
<script>
    import EmployeeService from '../services/Employees';
    import to from 'await-to-js';

    export default {
        name: 'reservations',
        data() {
            return {
                data: [],
                isEmpty: false,
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isHoverable: true,
                isFocusable: false,
                isLoading: false,
                hasMobileCards: true,
                labelPosition: 'on-border',
                radio: '',
                firstNameFilter: '',
                lastNameFilter: '',
                usernameFilter: '',
                startDateFilter: null,
                endDateFilter: null,
                companyFilter: '',
                formatAmPm: false,
                enableSeconds: false,
                startDateCheckbox: false,
                endDateCheckbox: false,
                radioFilter: '',
                radioDirection: ''
            }
        },
        methods: {
            async filter() {
                if(!['totalAmount', 'averageAmount', 'top10Least', 'top10Most'].includes(this.radioFilter)) {
                    this.$swal(`You didn't choose an option!`,'',
                        'error');
                    return console.log('Option not chosen!');
                }

                let err, response;
                switch(this.radioFilter) {
                    case 'totalAmount':
                        [err, response] = await to(EmployeeService.fetchCount());
                        if (err) return console.error(err);
                        this.$swal(`There are ${response.data.body} employees!`,'',
                            'info');
                        break;
                    case 'averageAmount':
                        [err, response] = await to(EmployeeService.fetchAverageReservations());
                        if (err) return console.error(err);
                        this.$swal(`There are ${response.data.body.toFixed(2)} reservations in average per Employee!`,'',
                            'info');
                        break;
                    case 'top10Least':
                        [err, response] = await to(EmployeeService.fetchTop10({ direction: 'least'}));
                        if (err) return console.error(err);
                        this.data = response.data.body;
                        break;
                    case 'top10Most':
                        [err, response] = await to(EmployeeService.fetchTop10({ direction: 'most'}));
                        if (err) return console.error(err);
                        this.data = response.data.body;
                        break;
                }

                console.log('-----------------------------------------');
                console.log("Fetching top10 with most reservations response:");
                console.log(response);
            },
            async sortEmployee(sortByField) {
                if(this.radioDirection === '') {
                    this.$swal('Wrong! Direction is not chosen.','',
                        'error');
                    return;
                }

                let [err, response] = await to(EmployeeService.sortBy({ sortBy: sortByField, direction: this.radioDirection }));
                if (err) return console.error(err);

                console.log('-----------------------------------------');
                console.log("Fetching sorted records:");
                console.log(response);
                this.data = response.data.body;
                this.radio = '';
                this.radioDirection = '';
            },
            async exportAsCsv() {
                let [err, response] = await to(EmployeeService.exportAsCsv());
                if (err) return console.error(err);

                console.log('-----------------------------------------');
                console.log("Fetching csv raw data:");
                console.log(response);

                const encodedData = encodeURI('data:text/csv;charset=utf-8,' + response.data);
                const link = document.createElement("a");
                link.setAttribute("href", encodedData);
                link.setAttribute("download", `employees-${new Date()}.csv`);
                link.click();
            }
        },
        computed: {
            formatD() {
                return this.formatAmPm ? '12' : '24'
            }
        },
        async mounted() {
            let [err, response] = await to(EmployeeService.retrieveEmployees());
            if (err) return console.error(err);

            this.data = response.data.body;

            console.log(response);
        }
    }
</script>
