<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>
<script>
  import Navbar from './views/Navbar'
  //import Footer from "./views/Footer";
  import {mapMutations} from 'vuex';

  export default {
    name: 'home',
    components: {/*Footer*/ Navbar},
    data() {
      return {
        isActive: true,
        isLoggedIn: false
      };
    },
    mounted() {
      this.setToken(localStorage["token"]);
    },
    methods: {
      ...mapMutations(['setToken'])
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

</style>
