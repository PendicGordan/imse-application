<template>
    <div class="container" style="margin-top: 5%; margin-bottom: 10%">
        <h1 style="font-weight: 400; font-size: 40px; margin-bottom: 1%">Insert new Employee:</h1>
        <form @submit.prevent="insertEmployee">
            <section style="margin-top: 2%; margin-bottom: 2%">
                <b-field label="First name">
                    <b-input v-model="firstName"></b-input>
                </b-field>
            </section>
            <section style="margin-top: 2%; margin-bottom: 2%">
                <b-field label="Last name">
                    <b-input v-model="lastName"></b-input>
                </b-field>
            </section>
            <section style="margin-top: 2%; margin-bottom: 2%">
                <b-field label="Username">
                    <b-input v-model="username"></b-input>
                </b-field>
            </section>
            <section>
                <button type="submit" class="button">Insert</button>
            </section>
        </form>
    </div>
</template>
<script>
    import EmployeeService from '../services/Employees';
    import to from 'await-to-js';

    export default {
        name: 'employee-new',
        data() {
            return {
                firstName: '',
                lastName: '',
                username: ''
            };
        },
        methods: {
            async insertEmployee() {
                if(this.firstName === '' || this.lastName === '' || this.username === '') {
                    this.$swal('Wrong! Some of the fields are empty.','',
                        'error');
                    return;
                }

                let [err, employee] = await to(EmployeeService.insertEmployee({ firstName: this.firstName, lastName: this.lastName, username: this.username }));
                if (err) return console.error(err);

                if(employee.data.error) {
                    return this.$swal('An employee with that username already exists!','',
                        'error');
                }

                console.log('-----------------------------------------');
                console.log("Insert employee - response:");
                console.log(employee);

                this.firstName = '';
                this.lastName = '';
                this.username = '';
                this.$swal('Employee successfully inserted!','',
                    'success');
            }
        }
    }
</script>
<style>

</style>
