import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(Buefy);

Vue.config.productionTip = false;

import { store } from './store';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
import VueMoment  from 'vue-moment';
Vue.use(VueMoment );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
