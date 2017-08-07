<template>
    <el-row class="stationBg">
        <el-col>
            <station-info :stationId="id"></station-info>
            <el-row type="flex" align="middle" style="height:40px;">
                <el-col :span="8">
                    扫描/请求：
                    <input style="width: 60%;display: inline-block;border: none;outline: none;border-bottom: 1px solid #ddd"></input>
                </el-col>
                <el-col :span="10">
                    <span style="margin-right: 20px">类型：料框</span>
                    <b>料框：B00100000666 上料 2011-07u02-005 成功 时间2017-07-26 09:30</b>
                </el-col>
                <el-col :span="4">
                    <el-button size="small" style="margin-left: 20px" type="info">下料</el-button>
                    <el-button size="small" style="margin-left: 20px" type="warning">更新工位库存</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column label="序号" type="index" width="90" align="center"></el-table-column>
                    <el-table-column type="selection" width="55" label="序号" align="center"></el-table-column>
                    <el-table-column label="物料编码" width="200" prop="code" align="center">
                    </el-table-column>
                    <el-table-column prop="num" label="工位库存" width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="上料点" width="100" align="center"></el-table-column>
                    <el-table-column prop="perNum" label="每次用量" width="100" align="center"></el-table-column>
                    <el-table-column prop="time" label="消耗（分）" width="120" align="center"></el-table-column>
                    <el-table-column prop="timeA" label="可用时间（分）" width="130" align="center"></el-table-column>
                    <el-table-column prop="aaa" label="料框-料盘" width="200" align="center"></el-table-column>
                    <el-table-column prop="lastTime" label="最近上料时间" width="200" align="center"></el-table-column>
                    <el-table-column prop="name" label="物料名称" min-width="300" align="center"></el-table-column>
                </el-table>
            </el-row>
            <el-row style="margin-top: 10px">
                <el-col :span="24">
                    <p style="font-size: 14px;font-weight: bold;margin-bottom: 10px">
                        出库请求
                    </p>
                    <el-row>
                        <el-table :data="tableData7" border style="width: 100%" max-height="300">
                            <el-table-column prop="date" label="序号" width="90" type="index" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="需求单号" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="city" label="物料编号" width="200" align="center">
                            </el-table-column>
                            <el-table-column prop="address" label="需求数量" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="zip" label="上料点" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="time" label="需求时间" width="200" align="center">
                            </el-table-column>
                            <el-table-column prop="goodsName" label="物料名称" width="500" align="center">
                            </el-table-column>
                            <el-table-column prop="status" label="状态" min-width="180" align="center">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="10">
                    <p><b>载具清料</b></p>
                    <el-row>
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="date" label="序号" type="index" width="180">
                            </el-table-column>
                            <el-table-column prop="name" label="料框/料盘" width="180">
                            </el-table-column>
                            <el-table-column prop="address" label="类型">
                            </el-table-column>
                            <el-table-column prop="status" label="状态">
                            </el-table-column>
                            <el-table-column prop="date" label="清料时间">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-col>
                <el-col :span="5" :offset="2">
                    <p><b>过站SN</b></p>
                    <el-row>
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="date" label="SN" width="180">
                            </el-table-column>
                            <el-table-column prop="name" label="时间" min-width="180">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-col>
            </el-row>

        </el-col>
    </el-row>
</template>
<script>
    import stationInfo from '../components/stationInfo'

    export default {
        data() {
            return {
                id: '1',
                tableData3: [
                    {
                        code: '3011-06Z04-000',
                        num: '200',
                        address: '160',
                        perNum: '1',
                        time: '20',
                        timeA: '10',
                        aaa: 'LK00006-LP000050',
                        lastTime: '2017-07-26 09:10',
                        name: '正极电池片：厚0.3MM 黄铜表面，，，',
                    },
                    {
                        code: '3011-06Z04-000',
                        num: '200',
                        address: '160',
                        perNum: '1',
                        time: '20',
                        timeA: '10',
                        aaa: 'LK00006-LP000050',
                        lastTime: '2017-07-26 09:10',
                        name: '正极电池片：厚0.3MM 黄铜表面，，，',
                    },
                    {
                        code: '3011-06Z04-000',
                        num: '200',
                        address: '160',
                        perNum: '1',
                        time: '20',
                        timeA: '10',
                        aaa: 'LK00006-LP000050',
                        lastTime: '2017-07-26 09:10',
                        name: '正极电池片：厚0.3MM 黄铜表面，，，',
                    },
                    {
                        code: '3011-06Z04-000',
                        num: '200',
                        address: '160',
                        perNum: '1',
                        time: '20',
                        timeA: '10',
                        aaa: 'LK00006-LP000050',
                        lastTime: '2017-07-26 09:10',
                        name: '正极电池片：厚0.3MM 黄铜表面，，，',
                    },
                    {
                        code: '3011-06Z04-000',
                        num: '200',
                        address: '160',
                        perNum: '1',
                        time: '20',
                        timeA: '10',
                        aaa: 'LK00006-LP000050',
                        lastTime: '2017-07-26 09:10',
                        name: '正极电池片：厚0.3MM 黄铜表面，，，',
                    }
                ],
                tableData7: [
                    {
                        date: '1',
                        name: '10000005',
                        province: 'LK000005',
                        city: '3018-0107u-006',
                        address: ' 500',
                        zip: 100,
                        time: '2017-07-26 10:20',
                        goodsName: '0107U 2.4G红外R24B-M 厂商代烧码+P3205(2616)改善',
                        status: '完成： 2017-07-26 09:50'
                    },
                    {
                        date: '1',
                        name: '10000005',
                        province: 'LK000005',
                        city: '3018-0107u-006',
                        address: ' 500',
                        zip: 100,
                        time: '2017-07-26 10:20',
                        goodsName: '0107U 2.4G红外R24B-M 厂商代烧码+P3205(2616)改善',
                        status: '完成： 2017-07-26 09:50'
                    },
                    {
                        date: '1',
                        name: '10000005',
                        province: 'LK000005',
                        city: '3018-0107u-006',
                        address: ' 500',
                        zip: 100,
                        time: '2017-07-26 10:20',
                        goodsName: '0107U 2.4G红外R24B-M 厂商代烧码+P3205(2616)改善',
                        status: '完成： 2017-07-26 09:50'
                    },
                    {
                        date: '1',
                        name: '10000005',
                        province: 'LK000005',
                        city: '3018-0107u-006',
                        address: ' 500',
                        zip: 100,
                        time: '2017-07-26 10:20',
                        goodsName: '0107U 2.4G红外R24B-M 厂商代烧码+P3205(2616)改善',
                        status: '完成： 2017-07-26 09:50'
                    }
                ],
                tableData: [
                    {
                        date: '2016-05-02',
                        name: 'LK00006',
                        address: '料框',
                        status:'空'
                    },
                    {
                        date: '2016-05-02',
                        name: 'LK00006',
                        address: '料框',
                        status:'空'
                    },
                    {
                        date: '2016-05-02',
                        name: 'LK00006',
                        address: '料框',
                        status:'空'
                    },
                    {
                        date: '2016-05-02',
                        name: 'LK00006',
                        address: '料框',
                        status:'空'
                    },
                ]
            }
        },
        mounted(){
        },
        components: {
            stationInfo
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped lang="scss">
    .stationBg {
        font-size: 14px;
        background-color: #fff;
        padding: 15px;
        .bb-1 {
            border-bottom: 1px solid #ddd;
            .line-detail {
                margin-bottom: 5px;
            }
        }
        .fs13 {
            font-size: 13px;
        }
        .pad {
            padding: 8px 0;
        }
    }

</style>