// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import storeConfig from './vuex/store.js'
import messages from './shared/messages.js'
import VueI18n from 'vue-i18n'

import Quasar from 'quasar-framework/dist/quasar.mat.esm'
import 'quasar-framework/dist/umd/quasar.mat.css'

Vue.config.productionTip = false
Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)

Vue.use(Quasar)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: navigator.languages && navigator.languages[0],
  fallbackLocale: 'en-US',
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  i18n,
  template: '<App/>'
})
