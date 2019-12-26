<template >
    <div v-if="token">
        <b-navbar>
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img
                            src=""
                            alt=""
                    >
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item>
                    <router-link to="/" style="color: #000">
                        Create Reservation
                    </router-link>
                </b-navbar-item>
                <b-navbar-item>
                    <router-link to="/employees/new" style="color: #000">
                        New Employee
                    </router-link>
                </b-navbar-item>
                <b-navbar-dropdown label="Reporting" style="color: #000">
                    <b-navbar-item>
                        <router-link to="/reservations" style="color: #000">
                            Reservations
                        </router-link>
                    </b-navbar-item>
                    <b-navbar-item>
                        <router-link to="/employees" style="color: #000">
                            Employees
                        </router-link>
                    </b-navbar-item>
                </b-navbar-dropdown>
                <b-navbar-item>
                    <router-link to="/profile" style="color: #000">
                        Profile
                    </router-link>
                </b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <router-link to="/signin">
                            <button class="button is-primary" @click="logout">
                                <strong>Logout</strong>
                            </button>
                        </router-link>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: 'navbar',
        data() {
            return {};
        },
        methods: {
            logout() {
                this.setToken(null);
                localStorage.removeItem("token");
            },
            ...mapMutations(['setToken'])
        },
        mounted() {
        },
        computed: {
            ...mapState(['token'])
        }
    }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
