import Home from './components/Home.vue';
import Content from './components/Content.vue';
import City from './components/City.vue';

export default {
    '/home':{
        component:Home,
        subRoutes:{
            '/content':{
                component:Content
            },
            '/province/:id':{
                component:City
            },
            '/content/:id':{
                component:Content
            }
        }
    }
}