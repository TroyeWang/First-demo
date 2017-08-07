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
                      :timerange="timerange"
                      :pickerOptions="pickerOptions"
                      type="daterange"
                      align="right"
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


        <!-- <div class="head-wrap">
            <div v-show="timeType===1" class="time-sel">
                时间筛选
                <el-date-picker
                  v-model="timerange"
                  @change="handleTimeChange"
                  :timerange="timerange"
                  :pickerOptions="pickerOptions"
                  type="daterange"
                  align="right"
                  placeholder="选择日期范围">
                </el-date-picker>
            </div>
        </div>
        <ul>
            <li @click="handleTimeClick(item.id)" v-for="item in timeTypes" :class="{active: item.id === timeType}">{{item.name}}</li>
        </ul>
        <ul>
            <li @click="handleTabClick(item.id)" v-for="item in tabs" :class="{active: item.id === tab}">
                {{item.name}}
            </li>
        </ul> -->
        <div id="line" style="height:500px;">
            <!-- echart -->
        </div>
    </div>
</template>
<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

import {formatTime} from 'filters/index'

const option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
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
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: []
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
        data: Array,
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
            let match = this.tabs.filter(t=>{return t.id === this.tab});

            if (!match.length) {return}

            option.series = [];
            option.legend.data = match.map(t=>{return t.name}) || [];
            option.xAxis.data = this.data.map(t=>{return t.showDate});

            option.series.push({
                name: match[0].name,
                type: 'line',
                data: this.data.map(t =>{
                    return t[match[0].key];
                })
            })

            var chart = echarts.init(document.getElementById('line'));
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
