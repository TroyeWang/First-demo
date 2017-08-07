<template>
    <div class="content">
        <div class="title">
            {{title}}
        </div>
        <el-form label-width="100px" style="margin-top:24px;">
            <el-form-item label="时间跨度:">
                <span @click="handleTimeClick(item.id)" v-for="item in timeTypes" :class="{active: item.id === timeType, 'time': true}">{{item.name}}</span>
            </el-form-item>

            <el-form-item label="时间筛选:" v-show="timeType===1">
                <div class="time-sel">
                    <el-date-picker
                      v-model="timerange"
                      @change="handleTimeChange"
                      type="daterange"
                      align="right"
                      :picker-options="pickerOptions"
                      placeholder="选择日期范围">
                    </el-date-picker>
                </div>
            </el-form-item>

            <el-form-item label="展示类型:" v-if="tabs && tabs.length > 0">
                <span @click="handleTabClick(item.id)" v-for="item in tabs" :class="{active: item.id === tab, 'time': true}">
                    {{item.name}}
                </span>
            </el-form-item>
        </el-form>

        <div id="bar" style="height:500px;">
            <!-- echart -->
        </div>
    </div>
</template>
<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

import {formatTime} from 'filters/index'

var option = {
    tooltip : {
        trigger: '',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:[]
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : []
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : []
};

export default {
    data(){
        return {}
    },
    props: {
        timeTypes: Array,
        title: String,
        timeType: Number,
        legendData: {
            type: Array,
            default: function() {
                return []
            }
        },
        tabs: {
            type: Array,
            default: function() {
                return []
            }
        },
        tab: {
            type: Number,
            default: 0
        },
        categorys: {
            type: Object
        },
        data: Array,
        triggerType: {
            type: String,
            default: 'axis'
        },
        pickerOptions: {
            type: Object,
            default: function() {
                return {}
            }
        },
        timerange: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    watch: {
        data: function () {
            option.series = [];

            Object.keys(this.categorys).forEach(t => {
                let obj = {
                    name: this.categorys[t],
                    type: 'bar',
                    stack: 'lark',
                    data: this.data.map(item => {
                        return item[t]
                    })
                };

                if (this.data.length < 10) {
                    obj.barWidth = '10%';
                }

                option.series.push(obj)
            })

            option.tooltip.trigger = this.triggerType;
            option.legend.data = this.legendData.length && this.legendData || Object.keys(this.categorys).map(t=>{return this.categorys[t]});
            option.xAxis[0].data = this.data.map(t=>{return t.showDate});

            var chart = echarts.init(document.getElementById('bar'));
            chart.setOption(option);
        }
    },
    methods: {
        handleTimeChange(val) {
            let match = val.split(' - ');
            if (match.length > 1) {
                let beginDate = match[0];
                let endDate = match[1];
                this.$emit('timeChange', beginDate, endDate);
            }
        },
        handleTimeClick(id) {
            this.$emit('typeClick', id);
        },
        handleTabClick(id) {
            this.$emit('tabClick', id)
        }
    }
}
</script>
<style scoped lang="scss">
.title {
    font-size: 16px;
    padding-left: 20px;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #eee;
}
.time{
    display: inline-block;
    height: 26px;
    line-height: 26px;
    padding: 0 16px;
    border: 1px solid #eee;
    margin-right: 8px;
}
.active {
    background-color: #f44336;
    color: #fff;
}

.content {
    background-color: #fff;
    overflow: hidden;
    margin-bottom: 16px;
    font-size: 14px;
}

</style>
