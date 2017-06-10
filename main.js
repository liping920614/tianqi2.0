import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './components/App.vue';
import routerConfig from './router.config.js';

Vue.use(VueRouter);
Vue.use(VueResource);//使用ajax


var router=new VueRouter();
router.map(routerConfig);

router.start(App,'#app');

router.redirect({
    '/':'/home',
    '/home':'/home/content'
});