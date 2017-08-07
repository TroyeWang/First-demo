<template>
    <div class="content">
        <div class="title">
            {{title}}
            <slot name="titleContent"></slot>
        </div>

        <el-form label-width="100px" style="margin-top:24px;">
            <el-form-item label="展示类型:">
                <span v-for="item in pieTypes" @click="handlePieTypeClick(item.id)" :class="{active: item.id === pieType, 'time': true}">{{item.name}}</span>
            </el-form-item>
        </el-form>

        <div class="pie" id='pie'>
            <!-- echart -->
        </div>
    </div>
</template>

<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入饼图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

var option = {
    title : {
        text: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: []
    },
    series : [
        {
            name: '',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export default {
    data() {
        return {}
    },
    props: {
        pieTypes: Array,
        pieType: Number,
        title: String,
        'titleContent': String,
        data: Array
    },
    watch: {
        data: function () {
            let match = this.pieTypes.filter(t=>{return t.id === this.pieType});
            option.title.text = match.length && match[0].name;
            option.series[0].name = match.length && match[0].name;
            option.legend.data = this.data.map(t=>{return t.name});
            option.series[0].data = this.data;

            var chart = echarts.init(document.getElementById('pie'));
            chart.setOption(option);
        }
    },
    methods: {
        handlePieTypeClick(id) {
            this.$emit('pieTypeClick', id);
        }
    }
}
</script>
<style scoped lang="scss">
.time{
    display: inline-block;
    height: 26px;
    line-height: 26px;
    padding: 0 16px;
    border: 1px solid #eee;
    margin-right: 8px;
}
.pie{
    width:450px;
    height:500px;
    margin-left: 600px;
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
.title {
    font-size: 16px;
    padding-left: 20px;
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid #eee;
}
</style>
