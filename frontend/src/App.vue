<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <b-button id="migration-button" type="is-warning" @click="migrate">Migrate</b-button>
  </div>
</template>
<script>
  import Navbar from './views/Navbar'
  //import Footer from "./views/Footer";
  import {mapMutations} from 'vuex';
  import MigrationService from './services/Migration';
  import to from 'await-to-js';

  export default {
    name: 'home',
    components: {/*Footer*/ Navbar},
    data() {
      return {
        isActive: true,
        isLoggedIn: false
      };
    },
    async mounted() {
      this.setToken(localStorage["token"]);
    },
    methods: {
      ...mapMutations(['setToken']),
      async migrate() {
        console.log('ssss');
        let [err, response] = await to(MigrationService.migrate());
        if(err) return this.$swal('Migration failed: ' + err,'', 'error');

        console.log(response);
        await this.$swal('Migration succeed!','',
                'info');
        location.reload();
      }
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
  position: relative;
  min-height: 100vh;
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

  #migration-button {
      position:fixed;
      bottom:10%;
      right:1%;
      border-radius: 50%;
      width: 75px;
      height: 75px;
  }
</style>
