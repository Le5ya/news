import Vue from 'vue'
import App from './App.vue' 

// import './assets/scss/style.scss'
// import FirstComponent from './components/FirstComponent'

import router from './router'

Vue.config.productionTip = false
// Vue.component('first-component', FirstComponent)





new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
