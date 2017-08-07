import router from './index.js'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
import store from '../store';

// register global progress.
const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd']; // 不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress

    // 白名单
    if (whiteList.indexOf(to.path) !== -1) {
        next();
        return;
    }

    if (to.path === '/login') {
        next('/');
        return;
    }

    next()

    // if (sessionStorage.getItem('token')) {
    //     next()
    // } else {
    //     next('/login');
    //     return;
    // }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
