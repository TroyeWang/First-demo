<template>
<div>
    <el-menu class="navbar" mode="horizontal">
        <Hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></Hamburger>
        <levelbar></levelbar>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <span>{{name}}</span>
                <i style="top:20px;" class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <el-dropdown-item divided><span @click="logout" style="display:block;">注销</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>


</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import Levelbar from './Levelbar';
import Hamburger from 'components/Hamburger';
import errLogStore from 'store/errLog';
import {validateMobile} from 'utils/validate';

export default {
    components: {
        Levelbar,
        Hamburger
    },
    data() {
        var validOldPassword = (rule, value, callback) => {
            if (!value || value.trim() === '') {
                callback(new Error('请输入旧密码'));
            } else {
                callback();
            }
        }
        var validPassword = (rule, value, callback) => {
            if (!value || value.trim() === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form.password_confirmation !== '') {
                    this.$refs.form.validateField('password_confirmation');
                }
                callback();
            }
        }
        var validRepPassword = (rule, value, callback) => {
            if (!value || value.trim() === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback()
            }
        }
        return {
            log: errLogStore.state.errLog,
            dialogPasswordVisible: false,
            dialogOrderVisible: false,
            phone: '',
            placeName: this.$store.getters.place && this.$store.getters.place.name,
            isMch: this.$store.getters.isMch,
            form: {
                old_password: '',
                password: '',
                password_confirmation: ''
            },
            formLabelWidth: '120px',
            rules: {
                old_password: [{ validator: validOldPassword, trigger: 'blur' }],
                password: [{ validator: validPassword, trigger: 'blur' }],
                password_confirmation: [{ validator: validRepPassword, trigger: 'blur' }]
            }
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'name'
        ])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push({
                    path: '/login'
                })
            });
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 45px;
    line-height: 45px;
    border-radius: 0 !important;
    background-color: #fff;
    color: #333;
    border-bottom: 1px solid #ddd;
    .hamburger-container {
        line-height: 55px;
        height: 45px;
        float: left;
        padding: 0 10px;
    }
    .errLog-container {
        display: inline-block;
        position: absolute;
        right: 150px;
    }
    .avatar-container {
        height: 50px;
        line-height: 50px;
        display: inline-block;
        vertical-align: middle;
        float: right;
        margin-right: 35px;
        .avatar-wrapper {
            cursor: pointer;
            position: relative;
            color: #333;
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }
            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
.el-input {
    width: 300px;
}
.info {
    display: inline-block;
    float: right;
    margin-right: 10px;
    span {
        display: inline-block;
        margin-right: 10px;
    }
    .order-notice {
        cursor: pointer;
    }
}
.warn {
    color: red;
}
.phone {
    margin: 10px 0;
}
</style>
