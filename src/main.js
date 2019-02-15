import Vue from 'vue';
import router from './router/index.js';
// import $ from 'jquery'
import api from './api/index.js'
import VueRouter from 'vue-router';

// 将API方法绑定到全局
Vue.prototype.$api = api;
Vue.use(VueRouter);
const app = new Vue({
    router,
    //render: h => h(App)
}).$mount('#app')


