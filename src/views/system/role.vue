<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-input @keyup.enter.native="handleSearch" style="width:300px;" class="filter-item" placeholder="角色名称" v-model="listQuery.name"></el-input>
            <el-button class="filter-item" type="primary" icon="search" @click="handleSearch">查询</el-button>
            <el-button class="filter-item" type="primary" style="float: right;" icon="document" @click="showCreateRoleForm">新增角色</el-button>
        </div>

        <el-table :data='list' v-loading.body='listLoading' border fit highlight-current-row style="width: 100%">
            <el-table-column width="120" align='center' label='角色ID'>
                <template scope='scope'>
                        <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align='center' label='角色名称'>
                <template scope='scope'>
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column align='center' label='角色描述'>
                <template scope='scope'>
                    <span>{{scope.row.desc}}</span>
                </template>
            </el-table-column>

            <el-table-column align='center' label='创建时间'>
                <template scope='scope'>
                    <span>{{scope.row.create_time}}</span>
                </template>
            </el-table-column>

            <el-table-column width="120" align='center' label='启用'>
                <template scope='scope'>
                    <span>{{scope.row.status === 1 ? '是' : '否'}}</span>
                </template>
            </el-table-column>

            <el-table-column align='center' label='操作'>
                <template scope='scope'>
                    <el-button size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                    <el-button size="small" @click="handleAuth(scope.row.id)">授权</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.current_page" :page-sizes="[10,20,30, 50]"
            :page-size="listQuery.per_page" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog
            :visible.sync="dialogRoleVisible"
            :title="operateType=='edit' ? '编辑角色' : '新增角色'"
            style="padding:0 15%;"
            @open="dialogOpen"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="是否启用" :label-width="formLabelWidth">
                    <el-checkbox :true-label="1" :false-label="0" v-model="form.status">启用</el-checkbox>
                </el-form-item>

                <el-form-item label="角色类型" prop="type" :label-width="formLabelWidth">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option
                                v-for="item in roleTypes"
                                :key="item.type"
                                :label="item.label"
                                :value="item.type">
                            </el-option>
                        </el-select>
                </el-form-item>

                <el-form-item label="角色说明" prop="desc" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRoleVisible=false">取消</el-button>
                <el-button  type="info" @click="submitForm">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog
            :visible.sync="dialogAuthVisible"
            title="角色授权"
            size="tiny"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <el-row style="height: 500px;overflow: scroll;">
                <el-tree
                    :data='auths'
                    :props="props"
                    default-expand-all
                    node-key="action_id"
                    show-checkbox
                    :check-strictly="true"
                    @check-change="handleCheckChange"
                    ref="tree">
                </el-tree>
            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button @click='dialogAuthVisible=false'>取消</el-button>
                <el-button type="info"  @click="handleSetAuth">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {deepCopy} from 'utils/index'

export default {
    data() {
        var validName = (rule, value, callback) => {
            if (!value || value.trim() === '') {
                callback(new Error('请输入姓名'))
            } else {
                callback();
            }
        }
        var validType = (rule, value, callback) => {
            if (this.form.type === '') {
                callback(new Error('请选择用户角色'))
            } else {
                callback()
            }
        }
        var validDesc = (rule, value, callback) => {
            callback();
        }
        return {
            list: [],
            total: 0,
            listLoading: false,
            dialogRoleVisible: false,
            dialogAuthVisible: false,
            listQuery: {
                type: '', // 1: 百灵鸟内部角色; 2: 场馆工作人员角色
                status: '', // 1: 启用; 0: 停用
                name: '', // 角色名称
                current_page: 1,
                per_page: 20
            },
            operateType: 'edit',
            formLabelWidth: '120px',
            roleTypes: [
                { type: 1, label: '百灵鸟内部角色' },
                { type: 2, label: '场馆工作人员角色' }
            ],
            props: {
                label: 'menu_name',
                children: 'sub_menu'
            },
            form: {
                name: '',
                desc: '',
                type: '',
                status: 1
            },
            auths: [],
            rules: {
                name: [{ validator: validName, trigger: 'blur' }],
                type: [{ validator: validType }],
                desc: [{ validator: validDesc }]
            }
        }
    },
    created() {
        this.fetchList();
    },
    methods: {
        fetchList() {
            this.listLoading = true;
            this.$http('/bsi/role/list', this.listQuery).then(data => {
                this.list = data.data;
                this.total = data.total;
                this.listLoading = false;
            }).catch(err => {
                this.listLoading = false;
                this.$message.error(err.err_msg);
            })
        },
        handleSearch() {
            this.fetchList();
        },
        handleEdit(id) {
            let roleInfo = this.fetchRoleInfo(id);
            this.form = roleInfo;
            this.operateType = 'edit';
            this.dialogRoleVisible = true;
        },
        handleDelete(id) {
            this.$confirm('确定删除此角色吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.$http('/bsi/role/delete', {id: id}).then(data => {
                    this.$message.success('删除角色成功!');
                    this.fetchList();
                }).catch(err => {
                    this.$message.error(err.err_msg);
                })
            }).catch(() => {

            })
        },
        handleCheckChange(data, sel, selChild) {
            this.$refs.tree.setChecked(data.action_id, sel, true);
        },
        fetchRoleInfo(id) {
            return deepCopy(this.list.filter(item => {
                return id === item.id
            })[0])
        },
        fetchAllAuth() {
            if (this.auths.length > 0) {
                return this.auths;
            }

            return this.$http('/bsi/role/getauthoption');
        },
        fetchRoleAuth(id) {
            return this.$http('/bsi/role/getauth', {role_id: id})
                .then(data => {
                    return data.auths;
                })
        },
        handleAuth(id) {
            this.dialogAuthVisible = true;
            this.role_id = id;
            this.$refs && this.$refs.tree && this.$refs.tree.setCheckedKeys([]);

            Promise.all([this.fetchAllAuth(), this.fetchRoleAuth(id)])
                .then(([auths, roleAuth]) => {
                    this.auths = auths;
                    this.$refs.tree.setCheckedKeys(roleAuth);
                })
                .catch(err => {
                    this.$message.error(err.err_msg);
                })

        },
        handleSetAuth() {
            this.$http('/bsi/role/setauth', {
                auths: this.$refs.tree.getCheckedKeys(),
                role_id: this.role_id
            }).then(data => {
                this.dialogAuthVisible = false;
                this.$message.success('授权成功!');
            }).catch(err => {
                this.$message.error(err.err_msg);
            })
        },
        handleSizeChange(val) {
            this.listQuery.per_page = val;
            this.fetchList();
        },
        handleCurrentChange(val) {
            this.listQuery.current_page = val;
            this.fetchList();
        },
        showCreateRoleForm() {
            // 初始化表单
            this.form = {
                name: '',
                desc: '',
                type: '',
                status: 1
            };
            this.operateType = 'add';
            this.dialogRoleVisible = true;
        },
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    return false;
                }

                switch (this.operateType) {
                    case 'edit':
                        this.updateRole();
                        break;
                    case 'add':
                        this.createRole();
                        break;
                }
            })
        },
        updateRole() {
            this.$http('/bsi/role/update', this.form).then(data => {
                this.$message.success('更新角色成功!');
                this.dialogRoleVisible = false;
                this.fetchList();
            }).catch(err => {
                this.$message.error(err.err_msg);
            })
        },
        createRole() {
            this.$http('/bsi/role/create', this.form).then(data => {
                this.$message.success('创建角色成功!');
                this.fetchList();
                this.dialogRoleVisible = false;
            }).catch(err => {
                this.$message.error(err.err_msg);
            })
        },
        dialogOpen() {
            this.$refs && this.$refs.form && this.$refs.form.resetFields();
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-input,.el-textarea {
    width: 300px;
}
</style>
