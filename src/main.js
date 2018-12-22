// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import FastClick from 'fastclick'
import {ConfirmPlugin} from 'vux'
import {Lazyload, Toast} from 'vant'
import store from './store/index'
import './routeGuard'

// FastClick.attach(document.body)
Vue.use(ConfirmPlugin)
Vue.use(Lazyload, {
    loading: require('common/img/img_load.png')
})
Vue.use(Toast)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
