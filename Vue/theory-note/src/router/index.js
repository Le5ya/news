import Vue from 'vue'
import VueRouter from 'vue-router'

import FirstPage from '../views/FirstPage'
import SecondPage from '../views/SecondePage'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: FirstPage
    },
    {
      path: '/second',
      component: SecondPage
    }
  ]
})

export default router