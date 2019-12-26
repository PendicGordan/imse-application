import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Reservations from '../views/Reservations.vue'
import NewEmployee from '../views/NewEmployee.vue'
import Profile from '../views/Profile.vue'
import Employees from '../views/Employees.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: Reservations
  },
  {
    path: '/employees/new',
    name: 'employee-new',
    component: NewEmployee
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/employees',
    name: 'employees',
    component: Employees
  },
  {
    path: '/signin',
    name: 'signin',
    component: Login
  },
  {
    path: "*",
    name: 'notfound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

import { store } from '../store';

router.beforeEach((to, from, next) => {
  const publicPages = ['/signin'];

  const authRequired = !publicPages.includes(to.path);
  let token = localStorage["token"];
  if (authRequired && !token) {
    store.commit('setToken', null);
    next('/signin');
  }
  else next();
});

export default router
