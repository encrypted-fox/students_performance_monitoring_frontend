import Authorization from '../views/Authorization/Authorization.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import store from '../store/'
import moment from 'moment';
import MainWrapper from '@/components/MainWrapper/MainWrapper.vue'
import Reports from '@/components/Reports/Reports.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Authorization',
    component: Authorization,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: {
      name: 'Reports'
    },
    component: MainWrapper,
    children: [
      {
        path: '/dashboard/reports/',
        name: 'Reports',
        meta: {
          requiresAuth: true
        },
        component: Dashboard
      },
      {
        path: '/dashboard/reports/:type/',
        name: 'Current report',
        meta: {
          requiresAuth: true
        },
        component: Reports
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const { access_token, expires_date, refresh_token } = store.getters['user/token_data'];
    if (!access_token) {
      next({ path: '/' })
    } else {
      const checkExpires = moment().isBefore(moment(expires_date - 1000))
      if (checkExpires) {
        next()
      } else {
        store.dispatch('user/refreshToken', { refresh_token });
        next()
      }
      next()
    }
  } else {
    next()
  }
})

export default router
