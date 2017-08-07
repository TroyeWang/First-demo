import {
    logout,
    login,
    getAuthInfo
} from 'api/login';
import {errors} from '../errors'

const user = {
        state: {
            token: '',
            name: '',
            remarks: [],
            remarksChildren: [],
            authenticated: false,
            accountInfo: {},
            errors: errors
        },

        mutations: {
            SET_TOKEN: (state, token) => {
                state.token = token;
                sessionStorage.setItem('token', token);
            },
            SET_REMARKS: (state, remarks) => {
                state.remarks = remarks;
                sessionStorage.setItem('remarks', remarks);
            },
            SET_AUTH: state => {
                state.authenticated = true
            },
            LOGOUT_USER: state => {
                state.name = ''
                state.token = ''
                state.authenticated = false
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('remarks')
            }
        },

        actions: {
            // 登录
            login({commit}, userInfo) {
                const login_name = userInfo.account.trim();
                return new Promise((resolve, reject) => {
                    login(login_name, userInfo.password).then(res => {
                        console.log(res.code)
                        if (res.code !== 0) {
                            reject({msg: res.msg});
                        } else {
                            if (res.headers.authorization) {
                                commit('SET_TOKEN', res.headers.authorization)
                            }
                            if (res.data.data) {
                                commit('SET_REMARKS', JSON.stringify(res.data.data))
                                commit('SET_AUTH')
                            }
                            resolve();
                        }
                    }).catch(error => {
                        reject(error);
                    })
                })
            },
            // 前端 登出
            logout({commit}){
                return new Promise((resolve, reject) => {
                    logout().then(data => {
                        commit('LOGOUT_USER');
                        resolve();
                    }).catch(error => {
                        reject(error);
                    })
                });
            }
        }
    }
;

export default user;
