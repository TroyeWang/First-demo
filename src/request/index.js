import axios from 'axios'
import store from '../store';
import router from '../router';


axios.defaults.timeout = 60000;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做某事
    if (store.getters.token) {
        config.headers[' Authorization '] = store.getters.token;
    }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return config;
}, function (error) {
    // 请求错误时做些事
    return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 10006为用户登录超时  10002为用户状态无效
    if (response.data.code === 10006 || response.data.code === 10002) { // code:10006 => 超时
        // 登出
        store.commit('LOGOUT_USER')
        router.push({ path: '/login' })
    } else {
        return response.data;
    }
}, function (error) {
    // 请求错误时做些事
    // if (error.response) {
    //     switch (error.response.status) {
    //         case 401:
    //             // 401 清除token信息并跳转到登录页面
    //             this.$store.dispatch('logout').then(() => {
    //                 this.$routerreplace({
    //                     path: 'login',
    //                     query: { redirect: router.currentRoute.fullPath }
    //                 })
    //             });
    //             break
    //     }
    // }
    return Promise.reject({msg: '系统繁忙,请稍后再试.'});
});

export default function (url, data = {}, options = {}) {
    options.method = options.method || 'post';
    options.url = url;

    if (options.method === 'get') {
        options.params = data;
    } else {
        options.data = data;
    }

    return axios(options);
}
