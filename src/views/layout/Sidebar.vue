<template>
    <el-menu :unique-opened='true' mode="vertical" theme="dark" :default-active="$route.path">
        <el-row class="logo">
        </el-row>
        <template v-for="item in permissionRoutes" v-if="!item.hidden">
            <el-submenu :index="item.meta.menuname" v-if="!item.noDropdown">
                <template slot="title">
                    <wscn-icon-svg :icon-class="item.icon||'wenzhang1'"/>
                    {{item.meta.menuname}}
                </template>
                <router-link v-for="child in item.children" :key="child.path" v-if="!child.hidden" class="title-link"
                             :to="item.path+'/'+child.path">
                    <el-menu-item :index="item.path+'/'+child.path">
                        {{child.meta.menuname}}
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <router-link v-if="item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
                <el-menu-item :index="item.path+'/'+item.children[0].path">
                    <wscn-icon-svg :icon-class="item.icon||'geren1'"/>
                    {{item.children[0].meta.menuname}}


                </el-menu-item>
            </router-link>
        </template>
    </el-menu>
</template>

<script>
    import permissionRoutes from 'store/permission';
    export default {
        name: 'Sidebar',
        data() {
            return {
                permissionRoutes: permissionRoutes.get()
            }
        },
        mounted(){
//            console.log(this.permissionRoutes)
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-menu {
        min-height: 100%;
    }

    .wscn-icon {
        margin-right: 10px;
        color: #fff;
    }

    .hideSidebar .title-link {
        display: inline-block;
        padding-left: 10px;
    }

    .logo {
        width: 100%;
        height: 80px;
        background: url("../../assets/header_rapoo_logo.png") no-repeat center;
        background-size: 115px;
    }

    .el-menu--dark {
        /*background-color: #fff;*/
        background: linear-gradient(180deg, #0d1a44 10%, #3c4f91 46%, #5fc1e4);
    }


</style>
