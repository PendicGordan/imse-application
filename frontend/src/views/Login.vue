<template>
    <div class="signin container">
        <h1 style="font-size: 25px; font-weight: 300; margin-top: 4%">Welcome to the Reservation Management System</h1>
        <h1 style="font-size: 25px; font-weight: 300; margin-top: 2%">Please log in</h1>
        <h1 style="font-size: 15px; font-weight: 300; margin-top: 2%">Possible credentials: <br> email: <b>person1@example.com</b> <br> password: <b>1234567890</b> <br><br> email: <b>person2@example.com</b> <br> password: <b>1234567890</b> <br><br> email: <b>person3@example.com</b> <br> password: <b>1234567890</b> </h1>
        <form action="login">
            <div class="field" style="margin-top: 5%">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Email" v-model="email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field" style="margin-top: 2%">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
                </div>
                <div class="field" style="margin-top: 1%; margin-bottom: 10%">
                    <button type="submit" class="button is-success" @click.prevent="login">
                        Login
                    </button>
                </div>
        </form>
    </div>
</template>
<script>
    import AuthService from '../services/Auth';
    import to from 'await-to-js';
    import { mapState, mapMutations } from 'vuex';

    export default {
        name: 'signin',
        data() {
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            async login() {
                let [err, response] = await to(AuthService.login({ email: this.email, password: this.password }));
                if(err || !response.data.success) {
                    this.$swal(response.data.error,'',
                        'error');
                    return console.error(response);
                }

                localStorage["token"] = response.data.token;
                this.setToken(response.data.token);

                this.$router.push("/");
            },
            ...mapMutations(['setToken'])
        },
        computed: {
            ...mapState(['token'])
        }
    }
</script>
<style scoped>

</style>
