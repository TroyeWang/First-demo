import Vue from 'vue';
import Router from 'vue-router';


import Layout from '../views/layout/Layout'; // layout


const dashboard = resolve => require(['../views/dashboard/index'], resolve); // dashboard
const laser = resolve => require(['../views/laserStation/index'], resolve); // dashboard
const charging = resolve => require(['../views/loadM/index'], resolve); // dashboard
const addM = resolve => require(['../views/addM/index'], resolve); // dashboard


/* error page*/
const Err404 = resolve => require(['../views/error/404'], resolve);
const Err401 = resolve => require(['../views/error/401'], resolve);

/* login*/
import Login from '../views/login/';
import authRedirect from '../views/login/authredirect';
import sendPWD from '../views/login/sendpwd';
import reset from '../views/login/reset';

Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 */
export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '/login', component: Login, hidden: true},
        {path: '/authredirect', component: authRedirect, hidden: true},
        {path: '/sendpwd', component: sendPWD, hidden: true},
        {path: '/reset', component: reset, hidden: true},
        {path: '/404', component: Err404, hidden: true},
        {path: '/401', component: Err401, hidden: true},
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            name: 'dashboard',
            hidden: false,
            meta: {
                requireAuth: true,
                menuname: '首页'
            },
            children: [
                {
                    path: 'dashboard',
                    component: dashboard,
                    meta: {
                        menuname: '用户管理'
                    }
                }
            ]
        },
        {
            path: '/station',
            component: Layout,
            redirect: 'laser',
            meta: {
                requireAuth: true,
                menuname: '工位'
            },
            children: [
                {
                    path: 'laser',
                    component: laser,
                    meta: {
                        menuname: '镭射工位'
                    }
                },
                {
                    path: 'charging',
                    component: charging,
                    meta: {
                        menuname: '装料工位'
                    }
                },
                {
                    path: 'addM',
                    component: addM,
                    meta: {
                        menuname: '上料工位'
                    }
                }
            ]
        },
        {
            path: '/errorpage',
            component: Layout,
            redirect: 'noredirect',
            name: '错误页面',
            hidden: true,
            icon: 'activity',
            children: [
                {path: '401', component: Err401, name: '401'},
                {path: '404', component: Err404, name: '404'}
            ]
        },
        {path: '*', redirect: '/404', hidden: true}
    ]
});
