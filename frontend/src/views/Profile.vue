<template>
    <div class="container" style="margin-top: 5%; margin-bottom: 10%">
        <h1 style="font-weight: 400; font-size: 40px; margin-bottom: 1%">Profile data:</h1>
            <section style="margin-top: 2%; margin-bottom: 2%">
                Your email: <b>{{ email }}</b>
            </section>
            <section style="margin-top: 2%; margin-bottom: 2%">
                <b-field label="Password">
                    <b-input minlength="6" type="password" maxlength="30" v-model="password"></b-input>
                </b-field>
            </section>
            <section style="margin-top: 2%; margin-bottom: 2%">
                <b-field label="Confirm Password">
                    <b-input minlength="6" type="password" maxlength="30" v-model="repeatedPassword"></b-input>
                </b-field>
            </section>
            <section>
                <button @click="updatePassword" class="button">Update Password</button>
            </section>
    </div>
</template>
<script>
    import AuthService from '../services/Auth';
    import to from 'await-to-js';

    export default {
        name: 'employee-new',
        data() {
            return {
                email: '',
                password: '',
                repeatedPassword: ''
            };
        },
        methods: {
            async updatePassword() {
                if(this.password !== this.repeatedPassword)
                    return this.$swal(`Passwords don't match!`,'', 'error');

                let [err, response] = await to(AuthService.changePassword({ password: this.password, confirmPassword: this.repeatedPassword }));
                if (err) return console.error(err);

                console.log('-----------------------------------------');
                console.log("Change password - response:");
                console.log(response);

                this.password = '';
                this.repeatedPassword = '';
                this.$swal(`You successfully changed the password!`,'', 'success');
            }
        },
        async mounted() {
            let [err, response] = await to(AuthService.retrieveUser());
            if (err) return console.error(err);

            console.log('-----------------------------------------');
            console.log("Retrieve user - response:");
            console.log(response);
            this.email = response.data.body.email;
        }
    }
</script>
<style>

</style>
