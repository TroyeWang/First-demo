// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './router/intercept.js';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'assets/custom-theme/index.css'; // 换肤版本element-ui css https://github.com/PanJiaChen/custom-element-theme
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
import 'normalize.css/normalize.css'; // normalize.css 样式格式化
import 'styles/index.scss'; // 全局自定义的css样式
import 'components/Icon-svg/index'; // 封装的svg组件
import 'assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import * as filters from './filters'; // 全局vue filter
import Multiselect from 'vue-multiselect'; // 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'; // 多选框组件css
import errLog from 'store/errLog'; // error log组件
//import './mock/index.js'; // 该项目所有请求使用mockjs模拟
//import permission from 'store/permission'; // 权限控制
import request from 'request';
import {socketOn, socketOff} from 'request/webSocketOne';

// register globally
Vue.component('multiselect', Multiselect);
Vue.use(ElementUI);
Vue.use(NProgress);

Vue.prototype.$http = request;
// Vue.prototype.$$start = socketStart;
Vue.prototype.$$on = socketOn;
Vue.prototype.$$off = socketOff;


// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});


// 生产环境错误日志
if (process.env === 'production') {
    Vue.config.errorHandler = function (err, vm) {
        console.log(err, window.location.href);
        errLog.pushLog({
            err,
            url: window.location.href,
            vm
        })
    };
}

// window.onerror = function (msg, url, lineNo, columnNo, error) {
//     console.log('window')
// };
//
// console.error = (function (origin) {
//     return function (errorlog) {
//         // handler();//基于业务的日志记录及数据报错
//         console.log('console'+errorlog)
//         origin.call(console, errorlog);
//     }
// })(console.error);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
