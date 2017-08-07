<template>
<div class="app-container calendar-list-container">
    <div class="filter-container">
        <el-input @keyup.enter.native="handleSearch" style="width:200px;" class="filter-item" placeholder="管理员姓名" v-model="listQuery.name"></el-input>
        <el-input @keyup.enter.native="handleSearch" style="width:200px;" class="filter-item" placeholder="手机号码" v-model="listQuery.mobile"></el-input>
        <el-input @keyup.enter.native="handleSearch" style="width:200px;" class="filter-item" placeholder="管理员登录名" v-model="listQuery.login_name"></el-input>
        <el-button class="filter-item" type="primary" icon="search" @click="handleFilter">查询</el-button>
        <el-button class="filter-item" type="primary" style="float: right;" @click="handleCreateUser">添加用户</el-button>
    </div>

    <el-table :data='list' v-loading.body='listLoading' border fit highlight-current-row style="width: 100%">
        <el-table-column align='center' label='姓名'>
            <template scope='scope'>
                    <span>{{scope.row.true_name}}</span>
            </template>
        </el-table-column>

        <el-table-column align='center' label='手机号'>
            <template scope='scope'>
                <span>{{scope.row.mobile}}</span>
            </template>
        </el-table-column>

        <el-table-column align='center' label='登录名'>
            <template scope='scope'>
                <span>{{scope.row.login_name}}</span>
            </template>
        </el-table-column>

        <el-table-column width="120" align='center' label='性别'>
            <template scope='scope'>
                <span>{{scope.row.gender == 1 ? '男' : '女'}}</span>
            </template>
        </el-table-column>

        <el-table-column align='center' label='操作'>
            <template scope='scope'>
                <el-button size="small" @click="handleEditUser(scope.row.id)">编辑</el-button>
                <el-button size="small" @click="handleDeleteUser(scope.row.id)">删除</el-button>
                <el-button size="small" @click="handleResetPassword(scope.row.id)">密码重置</el-button>
            </template>
        </el-table-column>
    </el-table>

        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.current_page" :page-sizes="[10,20,30, 50]"
            :page-size="listQuery.per_page" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <el-dialog
            :visible.sync="dialogFormVisible"
            :title="operateType=='edit' ? '编辑用户' : '添加用户'"
            style="padding:0 12%;"
            :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <el-form :model="form" ref="editForm" :rules="rules">
                <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
                        <el-input v-model="form.mobile"></el-input>
                </el-form-item>

                <el-form-item label="登录名" prop="login_name" :label-width="formLabelWidth">
                        <el-input :disabled="operateType==='edit'" v-model="form.login_name"></el-input>
                </el-form-item>

                <el-form-item label="真实姓名" prop="true_name" :label-width="formLabelWidth">
                        <el-input v-model="form.true_name"></el-input>
                </el-form-item>

                <div v-show="operateType==='add'">
                    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                            <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="password_confirmation" :label-width="formLabelWidth">
                            <el-input type="password" v-model="form.password_confirmation"></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio class="radio" v-model="form.gender" :label="1">男</el-radio>
                    <el-radio class="radio" v-model="form.gender" :label="2">女</el-radio>
                </el-form-item>

                <el-form-item label="用户角色" :label-width="formLabelWidth">
                    <el-checkbox-group @change="handleCheckboxChange" v-model="form.roles">
                        <el-checkbox v-for="role in roles" :label="role.id">{{role.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="所在部门" prop="department" :label-width="formLabelWidth">
                        <el-input style="width:240px;" v-model="department" disabled></el-input>
                        <el-button type="info" @click="handleSelectDepartment">选择</el-button>
                </el-form-item>

                <div v-show="userType===2">
                    <el-form-item label="是否支持推广" :label-width="formLabelWidth">
                        <el-radio-group v-model='form.is_promoter'>
                            <el-radio class="radio" :label="1">支持</el-radio>
                            <el-radio class="radio" :label="0">不支持</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <div v-show='form.is_promoter===1'>
                        <el-form-item label="收款银行" prop="bc_id" :label-width="formLabelWidth">
                                <el-select @change="handleBankChange" v-model='form.bc_id' placeholder='请选择银行'>
                                    <el-option
                                        v-for="item in banks"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                        </el-form-item>

                        <el-form-item prop="bc_cardno" label="收款账号" :label-width="formLabelWidth">
                                <el-input v-model="form.bc_cardno"></el-input>
                        </el-form-item>

                        <el-form-item prop="bc_account_name" label="收款姓名" :label-width="formLabelWidth">
                                <el-input v-model="form.bc_account_name"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false">取消</el-button>
                    <el-button type="info" @click="submitForm">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogDepartmentVisible" title="选择部门" :close-on-click-modal='false' :close-on-press-escape='false'>
            <el-row style="height: 500px;overflow: scroll;">
                <el-tree
                        :data='departments'
                        :props="props"
                        show-checkbox
                        :check-strictly="true"
                        node-key="id"
                        ref="tree"
                        :default-checked-keys="defCheckedKey"
                        :default-expanded-keys="defCheckedKey"
                        @check-change="handleTreeChange">
                </el-tree>
            </el-row>
            <div class="tree-button">
                <el-button @click='dialogDepartmentVisible=false'>取消</el-button>
                <el-button type="info"  @click="chooseDepartment">确定</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
import {validateBankCard, validateName, validateMobile} from 'utils/validate'

export default {
    data() {
        /* validate */
        var validMobile = (rule, value, callback) => {
            if (!validateMobile(value)) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        var validBankCard = (rule, value, callback) => {
            if (this.form.is_promoter === 1 && !validateBankCard(value)) {
                callback(new Error('请输入正确的收款账号'));
            } else {
                callback();
            }
        };
        var validAccountName = (rule, value, callback) => {
            if (this.form.is_promoter === 1 && value.trim() === '') {
                callback(new Error('请输入正确的收款姓名'));
            } else {
                callback();
            }
        };
        var validBankId = (rule, value, callback) => {
            if (this.form.is_promoter === 1 && this.form.bc_id === null) {
                callback(new Error('请选择银行卡'))
            } else {
                callback()
            }
        }
        var validName = (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error('请输入正确的真实姓名'));
            } else {
                callback();
            }
        };
        var validLoginName = (rule, value, callback) => {
            if (!value || value.trim() === '') {
                callback(new Error('请输入登录名'))
            } else {
                callback()
            }
        }
        var validPassword = (rule, value, callback) => {
            // 编辑模式下不校验密码
            if (this.operateType === 'edit') {
                callback();
            } else if (!value || value.trim() === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form.password_confirmation !== '') {
                    this.$refs.editForm.validateField('password_confirmation');
                }
                callback();
            }
        }
        var validRepPassword = (rule, value, callback) => {
            // 编辑模式下不校验密码
            if (this.operateType === 'edit') {
                callback();
            } else if (!value || value.trim() === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback()
            }
        }
        var validDept = (rule, value, callback) => {
            if (this.department === '') {
                callback(new Error('请选择部门'))
            } else {
                callback()
            }
        }

        return {
            list: null,
            total: null,
            listLoading: true,
            listQuery: {
                current_page: 1,
                per_page: 20,
                name: '',
                mobile: '',
                login_name: ''
            },
            dialogFormVisible: false,
            dialogDepartmentVisible: false,
            dialogPasswordVisible: false,
            form: {
                mobile: '',
                login_name: '',
                true_name: '',
                password: '',
                password_confirmation: '',
                gender: 1,
                roles: [],
                dept_id: null, // 部门id
                city_id: null, //城市id
                is_promoter: 1, //不支持推广
                bc_id: null, // 银行id
                bc_account_name: null, // 银行卡账号名
                bc_bank: null, // 银行名称
                bc_cardno: null // 银行卡号
            },
            department: '',
            userType: 1, // 1:默认百灵鸟内部角色, 不支持推广; 2:场馆工作人员角色,支持推广
            roles: [],
            departments: [],
            props: {
                label: 'dept_name',
                children: 'sub_data'
            },
            formLabelWidth: '120px',
            banks: [],
            operateType: 'edit',
            defCheckedKey: [],
            triggerCheckChange: false, // 树型菜单最后一次通过设置check-change事件的选中状态
            rules: {
                mobile: [{ validator: validMobile, trigger: 'blur' }],
                bc_cardno: [{ validator: validBankCard, trigger: 'blur' }],
                bc_account_name: [{ validator: validAccountName, trigger: 'blur' }],
                true_name: [{ validator: validName, trigger: 'blur' }],
                login_name: [{ validator: validLoginName, trigger: 'blur' }],
                password: [{ validator: validPassword, trigger: 'blur' }],
                password_confirmation: [{ validator: validRepPassword, trigger: 'blur' }],
                department: [{ validator: validDept }],
                bc_id: [{ validator: validBankId }]
            }
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            this.$http('/bsi/admin/list', this.listQuery).then(data => {
                this.list = data.data;
                this.total = data.total;
                this.listLoading = false;
            }).catch(err => {
                this.listLoading = false;
                this.$message.error(err.err_msg);
            })
        },
        handleFilter() {
            this.getList();
        },
        handleCreateUser() {
            this.dialogFormVisible = true;
            this.initEditForm();
            Promise.all([this.fetchRole(), this.fetchDepartment(), this.fetchBanks()])
                .then(([roles, departments, banks]) => {
                    this.roles = roles;
                    this.departments = departments;
                    this.banks = banks;
                })
                .catch(err => {
                    this.$message.error(err.err_msg);
                })
        },
        initEditForm() {
            this.form =  {
                mobile: '',
                login_name: '',
                true_name: '',
                password: '',
                password_confirmation: '',
                gender: 1,
                roles: [],
                dept_id: null, // 部门id
                city_id: null, //城市id
                is_promoter: 0, //不支持推广
                bc_id: null, // 银行id
                bc_account_name: null, // 银行卡账号名
                bc_bank: null, // 银行名称
                bc_cardno: null // 银行卡号
            };
            this.department = '';
            this.operateType = 'add';
            this.userType = 1;
            this.$refs && this.$refs.tree && this.$refs.tree.setCheckedKeys([]);
            this.$refs && this.$refs.editForm && this.$refs.editForm.resetFields();
        },
        handleSizeChange(val) {
            this.listQuery.per_page = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.current_page = val;
            this.getList();
        },
        handleSearch(val) {
            this.getList();
        },
        handleTreeChange(data, sel) {
            // setCheckedKeys会触发check-change事件
            if (!sel && this.triggerCheckChange) {
                this.triggerCheckChange = false;
                return false;
            }

            if (sel) {
                let selKeys = this.$refs.tree.getCheckedKeys();
                this.triggerCheckChange = selKeys.length > 1;
                this.$refs.tree.setCheckedKeys([data.id]);
                this.temp_department = data.dept_name;
                this.temp_dept_id = data.id;
                this.temp_city_id = data.city_id;

            } else {
                this.temp_department = '';
                this.temp_dept_id = '';
                this.temp_city_id = '';
                this.triggerCheckChange = false;
            }
        },
        handleCheckboxChange(e) {
            let result = e.some(id => {
                return this.roles.some(role => {
                    return  role.id === id && role.type === 2;
                })
            })

            if (result) {
                this.userType = 2;
            } else {
                this.userType = 1;
                this.form.is_promoter = 0;
            }
        },
        handleResetPassword(id) {
            this.$confirm('确认重置密码?(新密码为123456)', '重置密码确认').then(() => {
                this.$http('/bsi/admin/reset', {id: id}).then(data => {
                    this.$message.success('密码重置成功!');
                }).catch(err => {
                    this.$message.error(err.err_msg);
                })
            }).catch(() => {

            })
        },
        handleDeleteUser(id) {
            this.$http('/bsi/admin/delete', {id: id}).then(data => {
                this.$message.success('删除成功!');
                // 刷新页面
                this.getList();
            }).catch(err => {
                this.$message.error(err.err_msg);
            })
        },
        chooseDepartment() {
            this.department = this.temp_department;
            this.form.dept_id = this.temp_dept_id;
            this.form.city_id = this.temp_city_id;
            this.dialogDepartmentVisible = false;
        },
        submitForm() {
            // 校验
            this.$refs.editForm.validate((valid) => {
                if (!valid) {
                    return false;
                }

                switch (this.operateType) {
                    case 'edit':
                        this.editUser();
                        break;
                    case 'add':
                        this.createUser();
                        break;
                }
            })
        },
        createUser() {
            this.$http('/bsi/admin/create', this.form).then(data => {
                this.$message.success('添加用户成功!');
                this.getList();
                this.dialogFormVisible = false;
            }).catch(err => {
                this.$message.error(err.err_msg);
            })
        },
        editUser() {
            this.$http('/bsi/admin/update', this.form).then(data => {
                this.$message.success('更新用户成功!');
                this.getList();
                this.dialogFormVisible = false;
            }).catch(err => {
                this.$message.error(err.err_msg);
            })
        },
        setDepartment(depts, dept_id) {
            depts.some(item => {
                if (item.id === dept_id) {
                    this.department = item.dept_name;
                    if (this.$refs && this.$refs.tree) {
                        this.$refs.tree.setCheckedKeys([dept_id]);
                    } else {
                        // 树未渲染
                        this.defCheckedKey.splice(0, 1, dept_id)
                    }
                    return true;
                } else if (item.sub_data && item.sub_data.length > 0) {
                    this.setDepartment(item.sub_data, dept_id);
                }
                return false;
            })
        },
        handleEditUser(id) {
            this.$refs && this.$refs.editForm && this.$refs.editForm.resetFields();
            this.operateType = 'edit';
            Promise.all([this.fetchRole(), this.fetchDepartment(), this.fetchBanks(), this.fetchUserInfo(id)])
                .then(([roles, departments, banks, info]) => {
                    this.roles = roles;
                    this.departments = departments;
                    this.banks = banks;
                    this.form = info;
                    this.setDepartment(departments, info.dept_id);
                    this.setUserType(roles, info);
                })
                .catch(err => {
                    this.$message.error(err.err_msg);
                })
            this.dialogFormVisible = true;
        },
        setUserType(roles, info) {
            let result = info.roles.some(item => {
                return roles.some(role => {
                    return role.id === item && role.type === 2
                })
            })
            result ? (this.userType = 2) : (this.userType  = 1)
        },
        fetchUserInfo(id) {
            return this.$http('/bsi/admin/info', { id: id }).then(data => {
                data.bc_id = data.bc_id || null;
                return Promise.resolve(data);
            });
        },
        fetchBanks() {
            if (this.banks.length > 0) {
                return Promise.resolve(this.banks);
            }

            return this.$http('/bsi/bank/options').then(data => {
                return data.banks || [];
            });
        },
        fetchRole() {
            if (this.roles.length > 0) {
                return Promise.resolve(this.roles);
            }

            return this.$http('/bsi/role/options');
        },
        fetchDepartment() {
            if (this.departments.length > 0) {
                return Promise.resolve(this.departments);
            }

            return this.$http('/bsi/department/options').then(data => {
                return data.dept
            });
        },
        handleBankChange(val) {
            this.banks.some(item => {
                return item.id === val && (this.form.bc_bank = item.name);
            })

            this.$refs.editForm.validateField('bc_id');
        },
        handleSelectDepartment() {
            let keys = this.form.dept_id ? [this.form.dept_id] : [];
            this.$refs.tree && this.$refs.tree.setCheckedKeys(keys);
            this.dialogDepartmentVisible = true;
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-input {
    width: 300px;
}
.tree-button {
    margin-top: 20px;
    height: 40px;
}
</style>
