import VueRouter from 'vue-router';


const App = () => import(/*webpackChunkName:'app'*/ '../App.vue');
const Index = () => import(/*webpackChunkName:'index'*/ '../components/Index.vue');

let routes = [{
    path:'/',
    component:App,
    redirect: '/index',
    children:[
        {
            path:'index',
            component:Index
        }
    ]
}];


const router = new VueRouter({
    routes: routes
});


export default router
