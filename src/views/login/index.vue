<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
                 label-width="0px"
                 class="card-box login-form">
            <h1 class="title">MES</h1>
            <el-form-item prop="account">
                <span class="svg-container">
                    <!-- <wscn-icon-svg icon-class="jiedianyoujian"/> -->
                </span>
                <el-input name="account" type="text" v-model="loginForm.account" autoComplete="on"
                          placeholder="账号"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <!-- <wscn-icon-svg icon-class="mima"/> -->
                </span>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                          autoComplete="on" placeholder="密码"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button style="width:100%;background-color: #00acc8;border-color: #00acc8;color: #fff" :loading="loading" @click.native.prevent="handleLogin">
                    登录
                </el-button>
            </el-form-item>
            <p style="text-align: center;"> <small>MES © 2017</small> </p>
            <!--<router-link to="/sendpwd" class="forget-pwd">-->
            <!--忘记密码?-->
            <!--</router-link>-->
        </el-form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {isWscnEmail} from 'utils/validate';
    // import { getQueryObject } from 'utils';

    export default {
        name: 'login',
        data() {
            const validateAccount = (rule, value, callback) => {
                //   if (!isWscnEmail(value)) {
                //     callback(new Error('请输入正确的合法邮箱'));
                //   } else {
                callback();
                // }
            };
            const validatePass = (rule, value, callback) => {
                //   if (value.length < 6) {
                //     callback(new Error('密码不能小于6位'));
                //   } else {
                callback();
                // }
            };
            return {
                loginForm: {
                    account: '',
                    password: ''
                },
                loginRules: {
                    account: [
                        {required: true, trigger: 'blur', validator: validateAccount}
                    ],
                    password: [
                        {required: true, trigger: 'blur', validator: validatePass}
                    ]
                },
                loading: false
            }
        },
        computed: {
            // ...mapGetters([
            //   'auth_type'
            // ])
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('login', this.loginForm).then(() => {
                            console.log('success')
                            this.loading = false;
                            this.$router.push({ path: '/' });
                        }).catch(err => {
                            this.$message.error(err.msg);
                            this.loading = false;
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
    }

    .login-container {
        @include relative;
        height: 100vh;
        min-height: 600px;
        background-color: #fff;

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #ddd inset !important;
            -webkit-text-fill-color: #00acc8 !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #00acc8;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }

        .title {
            font-size: 70px;
            font-weight: 600;
            color: #00acc8;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .login-form {
            position: absolute;
            /*left: 0;*/
            /*right: 0;*/
            /*width: 400px;*/
            /*padding: 35px 35px 15px 35px;*/
            /*margin: 120px auto 0;*/
            top: 120px;

            left: 50%;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin-left: -200px;
        }

        .el-form-item {
            border: 1px solid #ddd;
            background: #ddd;
            border-radius: 5px;
        }

        .forget-pwd {
            color: #fff;
        }
    }

</style>
