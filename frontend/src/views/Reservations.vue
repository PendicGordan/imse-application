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
                                         @click.native="sortReservations('username')"
                                >
                                    Username
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radio"
                                         name="name"
                                         native-value="firstName"
                                         @click.native="sortReservations('first_name')"
                                >
                                    First Name
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radio"
                                         name="name"
                                         native-value="lastName"
                                         @click.native="sortReservations('last_name')"
                                >
                                    Last Name
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radio"
                                         name="name"
                                         native-value="company"
                                         @click.native="sortReservations('name')"
                                >
                                    Cathering Facility
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radio"
                                         name="name"
                                         native-value="startDate"
                                         @click.native="sortReservations('date_from')"
                                >
                                    Start Date
                                </b-radio>
                            </div>
                            <div class="field">
                                <b-radio v-model="radio"
                                         name="name"
                                         native-value="endDate" block
                                         @click.native="sortReservations('date_to')"
                                >
                                    End Date
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
                        <p class="subtitle">Filter:</p>
                        <div class="content">
                            <b-field label="Username" :label-position="labelPosition">
                                <b-input v-model="usernameFilter" value="Kevin Garvey"></b-input>
                            </b-field>
                            <b-field label="First Name" :label-position="labelPosition">
                                <b-input v-model="firstNameFilter"></b-input>
                            </b-field>
                            <b-field label="Last Name" :label-position="labelPosition">
                                <b-input v-model="lastNameFilter"></b-input>
                            </b-field>
                            <b-field label="Cathering Facility" :label-position="labelPosition">
                                <b-input v-model="companyFilter"></b-input>
                            </b-field>
                            <div class="field" @click="resetStartDate">
                                <b-checkbox v-model="startDateCheckbox">Start date</b-checkbox>
                            </div>
                            <article class="tile is-child notification">
                                <div class="content">
                                    <b-field label="Start Date" :label-position="labelPosition" v-if="startDateCheckbox">
                                        <b-datetimepicker
                                                placeholder="Type or select the start date..."
                                                icon="calendar-today"
                                                editable
                                                :timepicker="{ enableSeconds, hourFormat: formatD }"
                                                rounded
                                                v-model="startDateFilter"
                                                inline
                                        >
                                        </b-datetimepicker>
                                    </b-field>
                                </div>
                            </article>
                            <div class="field" @click="resetEndDate">
                                <b-checkbox v-model="endDateCheckbox">End date</b-checkbox>
                            </div>
                            <article class="tile is-child notification" v-if="endDateCheckbox">
                                <div class="content">
                                    <b-field label="End Date" :label-position="labelPosition">
                                        <b-datetimepicker
                                                placeholder="Type or select the end date..."
                                                icon="calendar-today"
                                                editable
                                                :timepicker="{ enableSeconds, hourFormat: formatD }"
                                                v-model="endDateFilter"
                                                inline
                                        >
                                        </b-datetimepicker>
                                    </b-field>
                                </div>
                            </article>
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
                        <br/>
                        <br/>
                        <div class="content">
                            <b-button type="is-info" rounded @click="filterActive">Filter active reservations</b-button>
                        </div>
                        <div class="content">
                            <b-button type="is-danger" rounded @click="batchDelete">Batch Delete</b-button>
                        </div>
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
                        {{ props.row.Employee.username }}
                    </b-table-column>
                    <b-table-column field="first_name" label="First Name">
                        {{ props.row.Employee.first_name }}
                    </b-table-column>

                    <b-table-column field="last_name" label="Last Name">
                        {{ props.row.Employee.last_name }}
                    </b-table-column>

                    <b-table-column field="date" label="Start Date" centered>
                        <span :class="{tag: true, 'is-success': new Date(props.row.date_from) > new Date(), 'is-danger': new Date(props.row.date_from) < new Date()}">
                            {{ new Date(props.row.date_from).toLocaleDateString() + ' ' + props.row.date_from.split(' ')[1] }}
                        </span>
                    </b-table-column>

                    <b-table-column field="date" label="End Date" centered>
                        <span :class="{tag: true, 'is-success': new Date(props.row.date_to) > new Date(), 'is-danger': new Date(props.row.date_to) < new Date()}">
                            {{ new Date(props.row.date_to).toLocaleDateString() + ' ' + props.row.date_from.split(' ')[1] }}
                        </span>
                    </b-table-column>

                    <b-table-column field="last_name" label="Cathering Facility" centered>
                        {{ props.row.Company.name }}
                    </b-table-column>
                    <b-table-column>
                        <b-button v-if="props.row.date_from > $moment(new Date()).format('YYYY/MM/DD, H:mm:ss')" type="is-danger" rounded @click.prevent="deleteReservation(props.row)">Delete</b-button>
                        <b-button v-else type="is-danger" disabled rounded>Delete</b-button>
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
    import ReservationService from '../services/Reservations';
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
                radioDirection: ''
            }
        },
        methods: {
            async filter() {
                let datesNotNull = this.endDateFilter != null && this.startDateFilter != null;
                if(datesNotNull && this.endDateFilter < this.startDateFilter) return this.$swal('Wrong data range!','',
                    'error');

                let startDateFilter;
                let endDateFilter;
                if(datesNotNull) {
                    startDateFilter = this.$moment(this.startDateFilter).format('YYYY/MM/DD, H:mm:ss');
                    endDateFilter = this.$moment(this.endDateFilter).format('YYYY/MM/DD, H:mm:ss');
                }

                let [err, response] = await to(ReservationService.filter({ username: this.usernameFilter, firstName: this.firstNameFilter, lastName: this.lastNameFilter, company: this.companyFilter, startDate: startDateFilter, endDate: endDateFilter }));
                if(err) return console.error(err);

                this.data = response.data.body;

                console.log('-----------------------------------------');
                console.log('Filtered reservations - response:');
                console.log(response);

            },
            async sortReservations(criteria) {
                if(this.radioDirection === '') {
                    this.$swal('Wrong! Direction is not chosen.','',
                        'error');
                    return;
                }

                let [err, reservations] = await to(ReservationService.sortBy({ sortBy: criteria, direction: this.radioDirection }));
                if (err) return console.error(err);

                console.log('-----------------------------------------');
                console.log('Sorted reservation - response:');
                console.log(reservations);
                this.data = reservations.data.body;

                this.radio = '';
                this.radioDirection = '';
            },
            async filterActive() {
                let [err, reservations] = await to(ReservationService.filterActive());
                if (err) return console.error(err);

                this.data = reservations.data.body;

                console.log('-----------------------------------------');
                console.log('Filtered active reservations - response:');
                console.log(reservations);
            },
            async batchDelete() {
                let [err, reservations] = await to(ReservationService.batchDelete());
                if (err) return console.error(err);

                if(reservations.data.body === 0) this.$swal('There are no reservations for deletion!','',
                    'info');
                else this.$swal(reservations.data.body + ' reservation(s) successfully deleted!','',
                    'success');

                let [errRetrieve, response] = await to(ReservationService.retrieveReservations());
                if (errRetrieve) return console.error(err);
                this.data = response.data.body;
            },
            async deleteReservation(reservation) {
                let [err, response] = await to(ReservationService.delete({ id: reservation.id }));
                if (err) return console.error(err);

                this.data = this.data.filter(reservationTraversed => reservationTraversed.id !== reservation.id);

                this.$swal(response.data.body + ' reservation successfully deleted!','',
                    'success');
                console.log('-----------------------------------------');
                console.log('Delete reservation - response:');
                console.log(response);
            },
            async exportAsCsv() {
                let [err, response] = await to(ReservationService.exportAsCsv());
                if (err) return console.error(err);

                console.log('-----------------------------------------');
                console.log("Fetching raw csv - response:");
                console.log(response);

                const encodedData = encodeURI('data:text/csv;charset=utf-8,' + response.data);
                const link = document.createElement("a");
                link.setAttribute("href", encodedData);
                link.setAttribute("download", `reservations-${new Date()}.csv`);
                link.click();
            },
            resetStartDate() {
                if(this.startDateCheckbox) this.startDateFilter = null;
            },
            resetEndDate() {
                if(this.endDateCheckbox) this.endDateFilter = null;
            }
        },
        computed: {
            formatD() {
                return this.formatAmPm ? '12' : '24'
            }
        },
        async mounted() {
            let [err, response] = await to(ReservationService.retrieveReservations());
            if (err) return console.error(err);

            this.data = response.data.body;

            console.log(response);
        }
    }
</script>
