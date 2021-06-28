/*
<<<<<<< HEAD
 * @Description:
 * @Author: wfz
 * @Date: 2021-06-25 08:48:39
 * @LastEditors: wfz
 * @LastEditTime: 2021-06-25 09:10:20
=======
 * @Description:
 * @Author: Mogy
 * @Date: 2021-06-24 19:23:45
 * @LastEditors: ljy
 * @LastEditTime: 2021-06-28 18:31:19
>>>>>>> 3f530b4d36d1027dc12e5ed9fcc326c49255b058
 */
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import Briupdrawer from '@/components/Briupdrawer'
import BriupMap from '@/components/BriupMap'
import PhoneChart from '@/components/PhoneChart'

// 自定义组件
Vue.component('Briupdrawer', Briupdrawer)
Vue.component('BriupMap', BriupMap)
Vue.component('PhoneChart', PhoneChart)

import Vant from 'vant'
import 'vant/lib/index.css'

import '@/styles/university.css'

Vue.use(Vant)

Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
