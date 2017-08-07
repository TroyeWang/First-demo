<template>
    <el-row class="stationBg">
        <el-col>
            <station-info :stationId="id"></station-info>
            <el-row style="margin-top: 20px">
                <el-col style="width: 65%">
                    <el-row style="border: 2px solid #99a9bf;height: 350px;padding-bottom: 10px;overflow: auto">
                        <el-col>
                            <ul class="snList">
                                <template v-for="(s,index) in scanSnData">
                                    <li @dblclick.prevent="deleteSn(s)"><span class="indexN">{{index | snIndex}}</span> <span>{{s}}</span></li>
                                </template>
                            </ul>
                        </el-col>
                    </el-row>
                </el-col>

                <el-col style="width:32%;margin-left: 25px">
                    <el-row>
                        <el-table :data="stationReference" style="width:100% ;border-color: #99a9bf" border
                                  height="350">
                            <el-table-column label="类型" width="70"  align="center" prop="stationName">
                            </el-table-column>
                            <el-table-column label="内容" min-width="110" prop="stationNo" align="center">
                            </el-table-column>
                            <el-table-column label="状态" width="100" prop="status" align="center">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-col>
            </el-row>

            <el-row style="margin-top: 15px;">
                <el-col style="width: 65%">
                    <el-row>
                        <el-col style="width: 50%">
                            <div id="chart1" style="width: 100%;height: 300px;left: -60px"></div>
                        </el-col>
                        <el-col style="width: 50%">
                            <div id="chart2" style="width: 100%;height: 300px;left: -27%"></div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col  style="border: 1px solid #99a9bf;height:280px;overflow: auto;width: 32%;margin-left: 25px">
                    <ul class="logList">
                        <li>APP:请求SN，20PCS,2017-08-07 11:50:10</li>
                        <li>MES:回复SN，20PCS,2017-08-07 11:50:10</li>
                        <li>APP:结果SN，AAAA00001212,2017-08-07 11:50:10</li>
                        <li>APP:请求SN，20PCS,2017-08-07 11:50:10</li>
                        <li>MES:回复SN，20PCS,2017-08-07 11:50:10</li>
                        <li>APP:结果SN，AAAA00001212,2017-08-07 11:50:10</li>
                    </ul>
                </el-col>
            </el-row>
        </el-col>

    </el-row>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/gauge');
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/pie');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    import stationInfo from '../components/stationInfo'
    import {mapGetters} from 'vuex'

    var option = {
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '业务指标',
                type: 'gauge',
                detail: {formatter: '{value}%'},
                data: [{value: 50, name: ''}]
            }
        ]
    };
    var optionTwo = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            data: ['工单完成数', '工单剩余数']
        },
        series: [
            {
                name: '工单进度',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 700, name: '工单完成数'},
                    {value: 500, name: '工单剩余数'}
                ]
            }

        ]
    };

    //    var optionsTwo = {
    //        title: {
    //            text: '工单数据',
    //            subtext: '纯属虚构'
    //        },
    //        tooltip: {
    //            trigger: 'axis'
    //        },
    //        legend: {
    //            data: ['工单计划数量', '当前工单数量']
    //        },
    //        toolbox: {
    //            show: true,
    //            feature: {
    //                dataView: {show: true, readOnly: false},
    //                magicType: {show: true, type: ['line', 'bar']},
    //                restore: {show: true},
    //                saveAsImage: {show: true}
    //            }
    //        },
    //        calculable: true,
    //        xAxis: [
    //            {
    //                type: 'category',
    //                data: ['工单计划数量', '当前工单数量']
    //            }
    //        ],
    //        yAxis: [
    //            {
    //                type: 'value'
    //            }
    //        ],
    //        series: [
    //            {
    //                name: '工单计划数量',
    //                type: 'bar',
    //                data: [15, 159],
    //                markPoint: {
    //                    data: [
    //                        {type: 'max', name: '最大值'},
    //                        {type: 'min', name: '最小值'}
    //                    ]
    //                }
    //            },
    //            {
    //                name: '当前工单数量',
    //                type: 'bar',
    //                data: [21.6, 50.9],
    //                markPoint: {
    //                    data: [
    //                        {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
    //                        {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
    //                    ]
    //                }
    //            }
    //        ]
    //    };

    const serverUrl = 'ws://192.168.123.69:18888';

    var ws = null

    export default {
        data() {
            return {
                id: '01',
                eventMap: ['scanSn', 'upload_laser_result'],
                scanSnData: [
                    'A1000272762',
                    'A1000272761',
                    'A1000272734',
                    'A1000272745',
                    'A1000272766',
                    'A1000272777',
                    'A1000273444',
                    'A1000272732',
                    'A1000272734',
                    'A1000272723',
                    'A1000272764',
                    'A1000272752',
                    'A1000252762',
                    'A1000262762',
                    'A1000276762',
                    'A1000274762',
                    'A1000272762',
                    'A1000272732',
                    'A1000222762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762',
                    'A1000272762'
                ],
                stationReference: [
                    {
                        stationName:'工位',
                        stationNo:'A1010 PCB 上料工位',
                        status:'进入'
                    },
                    {
                        stationName:'设备',
                        stationNo:'SMT01',
                        status:'正常'
                    },
                    {
                        stationName:'人员',
                        stationNo:'023888',
                        status:'1小时30分'
                    }
                ],
                Data: [
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                    {
                        num: '1',
                        codeNum: 'A1001209209222000'
                    },
                ]
            }
        },
        components: {
            stationInfo
        },
        filters: {
            snIndex: function (value) {
                value = Number(value) + 1
                if (!value) return ''
                return value < 10 ? '0' + value : value
            }
        },
        mounted(){
//            this.getStationreference()
            var Chart1 = echarts.init(document.getElementById('chart1'));
            var Chart2 = echarts.init(document.getElementById('chart2'));
            Chart2.setOption(optionTwo);
            Chart1.setOption(option);

            this.creatSocket()
        },

        methods: {
            creatSocket(){
                const config = {
                    reconnect: true,
                    reconnectTimeout: 6000
                }
                const serverUrl = `ws://192.168.123.69:18888/websocket?station_no=${this.id}&client=webpage`;
                ws = new WebSocket(serverUrl);

                var self = this
                ws.onopen = function (data) {
                    console.log('日志: 连接已建立.')
                }
                ws.onmessage = function (res) {
                    try {
                        var onData = JSON.parse(res.data);
                        console.log(onData)
                        if (res.data.stationNo == this.id) {
                            self.fireEvent(onData.cmd, onData.res);
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }

                ws.onerror = function (evt) {
                    console.log('webocket error!' + evt)
                }
                ws.onclose = function (event) {
                    if (config.reconnect) {
                        setTimeout(function () {
                            self.creatSocket();
                        }, config.reconnectTimeout)
                    } else {
                        console.log('日志: 连接已关闭');
                    }
                };

            },
            fireEvent(cmd, data){
                if (this.eventMap.indexOf(cmd) != -1) {
                    this[cmd](data)
                }
            },
            scanSn(data){
                this.scanSnData = data.sn
            },
            upload_laser_result(data){
                console.log(data)
//                this.scanSnData = data.sn
            },
            deleteSn(s){
                this.$msgbox({
                    title: '消息',
                    message: `确认删除 ${s}？`,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 1000);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$message({
                        type: 'info',
                        message: 'action: ' + action
                    });
                })
            },

            getStationreference(){
                let params = {
                    id: 1
                }
                this.$http('/mes/v1/station/reference/' + params.id, {}, {method: 'get'}).then(res => {
                    this.stationReference = res.data
                }).catch(err => {
                    this.$message.error(err.msg);
                })
            },
            handleEdit(index, row){
                console.log(index, row);
            },
            handleDelete(index, row){
                console.log(index, row);
            }
        }
    }
</script>

<style scoped lang="scss">
    .stationBg {
        font-size: 14px;
        background-color: #fff;
        padding: 10px 15px;
        .snList {
            list-style: none;
            padding: 0;
            padding-left: 20px;
            li {
                float: left;
                line-height: 30px;
                margin-right: 25px;
                padding: 0 5px;
                width: 140px;
                .indexN {
                    display: inline-block;
                    width: 30px;
                }
            }
        }
    }

    .logList{

        list-style: none;
        padding: 0 15px;
        li{
            line-height: 23px;
        }
    }

</style>