<template>
    <el-row>
        <el-row>
            <template v-for="a in 1">
                <el-col class="lineArea">
                    <el-row type="flex" align="bottom" style="height: 30px;">
                        <el-col :span="1" class="lineName">
                            A10
                        </el-col>
                        <el-col>
                            <l-progress :max="102398" :current="52320"></l-progress>
                        </el-col>
                    </el-row>
                    <el-row class="workStatusList">
                        <template v-for="i in 8">
                            <el-col class="statusItem">
                                <p><span>A1010</span> PCB上料工位</p>
                                <p><span>工单：</span><span>1000000012292</span></p>
                                <p><span>数量：</span><span>1000000012292</span></p>
                                <p><span>当前：</span><span>1000000012292</span></p>
                            </el-col>
                        </template>
                    </el-row>
                </el-col>
            </template>
            <el-col class="lineArea">
                <el-row type="flex" align="bottom" style="height: 30px">
                    <el-col :span="1" class="lineName">
                        A20
                    </el-col>
                    <el-col :span="23">
                        <l-progress :max="102398" :current="102398"></l-progress>
                    </el-col>
                </el-row>
                <el-row class="workStatusList">
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem danger">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem Warning">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem disable">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem disable">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="lineArea">
                <el-row type="flex" align="bottom">
                    <el-col :span="1" class="lineName">
                        A30
                    </el-col>
                    <el-col :span="23">
                        <l-progress :max="102398" :current="24421"></l-progress>
                    </el-col>
                </el-row>
                <el-row class="workStatusList">
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>

                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>

                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem disable">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem Warning">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem danger">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col class="lineArea">
                <el-row type="flex" align="bottom" style="height: 30px">
                    <el-col :span="1" class="lineName">
                        A20
                    </el-col>
                    <el-col :span="23">
                        <l-progress :max="102398" :current="87421"></l-progress>
                    </el-col>
                </el-row>
                <el-row class="workStatusList">
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>

                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>

                    <el-col class="statusItem disable">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem disable">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem Warning">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem danger">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                    <el-col class="statusItem ">
                        <p><span>A1010</span> PCB上料工位</p>
                        <p><span>工单：</span><span>1000000012292</span></p>
                        <p><span>数量：</span><span>1000000012292</span></p>
                        <p><span>当前：</span><span>1000000012292</span></p>
                    </el-col>
                </el-row>
            </el-col>
            <template v-for="a in 1">
                <el-col class="lineArea">
                    <el-row type="flex" align="bottom" style="height: 30px;">
                        <el-col :span="1" class="lineName">
                            A10
                        </el-col>
                        <el-col>
                            <l-progress :max="102398" :current="52320"></l-progress>
                        </el-col>
                    </el-row>
                    <el-row class="workStatusList">
                        <template v-for="i in 10">
                            <el-col class="statusItem">
                                <p><span>A1010</span> PCB上料工位</p>
                                <p><span>工单：</span><span>1000000012292</span></p>
                                <p><span>数量：</span><span>1000000012292</span></p>
                                <p><span>当前：</span><span>1000000012292</span></p>
                            </el-col>
                        </template>
                    </el-row>
                </el-col>
            </template>
        </el-row>
    </el-row>
</template>
<script>
    import lProgress from '../components/progress'
    export default {
        data() {
            return {}
        },
        components: {
            lProgress
        },
        created() {
        },
        methods: {}
    }
</script>
<style scoped lang="scss">

    $black: #A6A6A6;
    * {
        box-sizing: border-box;
        font-size: 14px;
    }

    .lineArea {
        background-color: #fff;
        padding: 0 15px;
        margin-bottom: 10px;
    }

    .lineName {
        font-weight: bold;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        position: relative;
        top: 10px;
    }

    .workStatusList {
        padding: 15px 0;
        padding-bottom: 0;
        .statusItem {
            color: #242424;
            width: 155px;
            border: 1px solid #ddd;
            margin-right: 1.5%;
            margin-bottom: 10px;
            padding: 0;
            border-radius: 5px;
            background-color: #fff;
            -webkit-box-shadow:3px 5px 12px #969696;
            box-shadow: 3px 5px 12px #969696;

            &.danger {
                background: #ff4949;
                color: #fff;
                border-color: #ff4949;
            }
            &.Warning {
                background: #EE9A00;
                color: #fff;
                border-color: #EE9A00;
            }
            &.disable {
                background: #9E9E9E;
                color: #fff;
                border-color: #9E9E9E;
            }
            p {
                margin: 3px;
                font-size: 14px;
                -webkit-transform: scale(0.85);
                &:first-child {
                    font-weight: bold;
                    span:first-child {
                        margin-right: 10px;
                    }
                }
            }
        }

    }

</style>
