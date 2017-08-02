import Vue from 'vue';
import VueRouter from 'vue-router';
import RouteConfig from './route-config';

Vue.use(VueRouter);
Vue.config.debug = true;
Vue.config.devtools = true;

const router = new VueRouter({
	routes: RouteConfig
});

const application = new Vue({
	el: '#app',
	router
});
