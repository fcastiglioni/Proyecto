'use strict'

const Vue = require('vue')
const App = require('./app.vue')
const Fridge = require('./fridge.vue')
const Metric = require('./metric.vue')

Vue.component('fridge', Fridge)
Vue.component('metric', Metric)

// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  el: '#app',
  render (createElement) {
    return createElement(App)
  }
})