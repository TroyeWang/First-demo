<template>
    <el-row>
        <el-row class="station">
            <el-col>
                <el-row class="pad bb-1" type="flex" align="middle" style="height: 40px">
                    <el-col style="width: 20%">工位：<span class="col-gray">{{stationName}}工位（组装/包装工位）</span></el-col>
                    <!--<el-col :span="8">位置：<span class="col-gray">{{position}}</span></el-col>-->
                    <el-col style="width: 23%">
                        工单：
                        <input style="width: 40%;display: inline-block;border: none;outline: none;border: 1px solid #99a9bf;height: 30px;padding-left: 5px"
                               :value="curStationIofo.workorderNo"></input>
                        <!--<u class="col-gray">&nbsp;&nbsp;&nbsp;{{curStationIofo.workorderNo}}&nbsp;&nbsp;&nbsp;&nbsp;</u>-->
                        <el-button size="small" type="info" style="margin-left: 15px" @click="dialogVisible = true">
                            选择工单
                        </el-button>
                    </el-col>
                    <el-col :span="7">
                        下一工单：
                        <span class="col-gray">{{nextStationIofo.workorderNo}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {{nextStationIofo.partNo}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{nextStationIofo.qty}}</span>
                    </el-col>
                    <el-col :span="4">
                        <!--<el-checkbox class="radio" v-model="autoChange" label="1">自动切换</el-checkbox>-->
                        自动切换
                        <el-tooltip :content="'Switch value: ' + value3" placement="top">
                            <el-switch
                                    v-model="value3"
                                    on-color="#13ce66"
                                    off-color="#ff4949"
                                    on-value="100"
                                    off-value="0">
                            </el-switch>
                        </el-tooltip>
                    </el-col>
                </el-row>
                <el-row class=" bb-1" style="padding-top: 8px">
                    <el-col>
                        <el-row class="line-detail" type="flex" align="middle">
                            <el-col :span="6">
                                物料编码：<span class="col-gray">{{curStationIofo.partNo}}</span>
                            </el-col>
                            <el-col :span="6">
                                物料名称：<span class="col-gray">{{curStationIofo.partName}}</span>
                            </el-col>
                            <el-col :span="6">
                                排成数量：<span class="col-gray">{{curStationIofo.qty}}</span>
                            </el-col>
                            <el-col :span="6">
                                完成数量：<span class="col-gray">{{curStationIofo.completeNum}}</span>
                            </el-col>
                        </el-row>
                        <!--<el-row class="line-detail" type="flex" align="middle">-->
                        <!--<el-col :span="8">-->
                        <!--<l-progress :max="102398" :current="52320"></l-progress>-->
                        <!--</el-col>-->
                        <!--</el-row>-->
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-dialog title="提示" :visible.sync="dialogVisible" size="large" label-position="left"
                       style="padding: 0 10%">
                <el-row style="border-bottom: 1px solid #99a9bf">
                    <el-form :model="form">
                        <el-row type="flex" justify="space-around">
                            <el-col :span="6">
                                <el-form-item label="工单号" :label-width="formLabelWidth" style="width: 97%;">
                                    <el-input v-model="form.name" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="物料编号" :label-width="formLabelWidth" style="width: 97%">
                                    <el-input v-model="form.name" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="产线" :label-width="formLabelWidth" style="width: 97%">
                                    <el-select v-model="form.region">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="状态" :label-width="formLabelWidth" style="width: 97%">
                                    <el-select v-model="form.region">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>


                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="时间" :label-width="formLabelWidth" style="width: 97%">
                                    <el-date-picker size="small"
                                                    v-model="value7"
                                                    type="daterange"
                                                    align="right"
                                                    placeholder="选择日期范围"
                                                    :picker-options="pickerOptions2">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" style="padding-left: 5%">
                                <el-button type="danger" style="width: 40%">查询</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-row>
                <el-row>
                    <el-row style="padding-top: 15px">
                        <el-button size="small" type="info">开始工单</el-button>
                        <el-button size="small" type="warning">暂停工单</el-button>
                        <el-button size="small" type="danger">停止工单</el-button>
                        <span style="margin-left: 20px;color: red">
                           注意，工单只能单选
                       </span>
                    </el-row>
                    <el-row style="margin-top: 15px">
                        <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark"
                                  style="width: 100%" @selection-change="handleSelectionChange">
                            <el-table-column type="index" width="70" align="center" label="序号"></el-table-column>
                            <el-table-column type="selection" width="55" align="center">
                            </el-table-column>
                            <el-table-column label="工单" width="110" align="center">
                                <template scope="scope">{{ scope.row.code }}</template>
                            </el-table-column>
                            <el-table-column prop="name" label="物料编码" width="140" align="center"></el-table-column>
                            <el-table-column prop="address" label="排程时间" width="140" align="center"></el-table-column>
                            <el-table-column prop="num1" label="排程数量" align="center" width="90"></el-table-column>
                            <el-table-column prop="num2" label="完成数量" align="center" width="90"></el-table-column>
                            <el-table-column prop="line" label="产线" align="center" width="70"></el-table-column>
                            <el-table-column prop="status" label="状态" align="center" width="100"></el-table-column>
                            <el-table-column prop="goodsName" label="物料名称" align="center"></el-table-column>
                        </el-table>
                    </el-row>

                </el-row>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                 <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </el-row>
    </el-row>


</template>

<script>
    import lProgress from '../components/progress'
    export default {
        name: 'stationInfo',
        props: ['stationId'],
        data() {
            return {
                autoChange: true,
                stationName: '',
                position: '',
                curStationIofo: {},
                nextStationIofo: {},
                value3: 100,
                dialogVisible: false,
                form: {},
                formLabelWidth: '75px',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value6: '',
                value7: '',
                tableData3: [
                    {
                        code: '100000002',
                        name: '3018-2637-2382',
                        address: '2017-07-26 18:00',
                        num1: 300,
                        num2: 200,
                        line: 'A10',
                        status: '生产中',
                        goodsName: '0107U 2.4G红外R24B-M 厂商代烧码+P3205(2616)'
                    },
                    {
                        code: '100000002',
                        name: '3018-2637-2382',
                        address: '2017-07-26 18:00',
                        num1: 300,
                        num2: 200,
                        line: 'A10',
                        status: '生产中',
                        goodsName: '0107U 2.4G红外R24B-M 厂商代烧码+P3205(2616)'
                    },
                    {
                        code: '100000002',
                        name: '3018-2637-2382',
                        address: '2017-07-26 18:00',
                        num1: 300,
                        num2: 200,
                        line: 'A10',
                        status: '生产中',
                        goodsName: '0107U 2.4G红外R24B-M 厂商代烧码+P3205(2616)'
                    },
                    {
                        code: '100000002',
                        name: '3018-2637-2382',
                        address: '2017-07-26 18:00',
                        num1: 300,
                        num2: 200,
                        line: 'A10',
                        status: '生产中',
                        goodsName: '0107U 2.4G红外R24B-M 厂商代烧码+P3205(2616)'
                    }
                ]
            }
        },
        components: {
            lProgress
        },
        watch: {
            stationId: function () {
                this.getStation()
                this.getStationInfo()
            }
        },
        mounted(){
            if (this.stationId) {
                this.getStation()
                this.getStationInfo()
            }
        },
        methods: {
            getStation()
            {
                this.$http('/mes/v1/station/' + this.stationId, {}, {method: 'get'}).then(res => {
                    this.stationName = res.data.stationName
                    this.position = res.data.position
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            }
            ,
            getStationInfo()
            {
                let params = {
                    id: 1
                }
                this.$http('/mes/v1/workorder/getWorkingAdnNextWorkorder/' + this.stationId, {}, {method: 'get'}).then(res => {
                    this.curStationIofo = res.data[0]
                    this.nextStationIofo = res.data[1]
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped lang="scss">
    .station {
        font-weight: 400;
        font-size: 14px;
        background-color: #fff;
        .col-gray {
            color: #1f2d3d;
        }
        .bb-1 {
            border-bottom: 1px solid #99a9bf;
            .line-detail {
                margin-bottom: 5px;
                height: 35px;
            }
        }
        .fs13 {
            font-size: 13px;
        }
        .pad {
            padding-bottom: 8px;
        }

    }

    .el-form {
        .el-form-item {
            margin-bottom: 10px;
        }
    }

</style>

