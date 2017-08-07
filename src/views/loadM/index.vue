<template>
    <el-row class="stationBg">
        <el-col>
            <station-info :stationId="id"></station-info>
            <el-row type="flex" align="middle" style="height:40px;">
                <el-col :span="8">
                    扫描/请求：
                    <input style="width: 60%;display: inline-block;border: none;outline: none;border-bottom: 1px solid #ddd"></input>
                </el-col>
            </el-row>

            <el-row>
                <el-col style="width: 90%">
                    <el-table :data="tableData4" border style="width: 100%;text-align: center" max-height="400">
                        <el-table-column prop="num" label="序号" width="90" type="index"
                                         align='center'></el-table-column>
                        <el-table-column prop="SN" label="SN" min-width="120" align='center'></el-table-column>
                        <el-table-column prop="capacity" label="容量" min-width="110" align='center'></el-table-column>
                        <el-table-column prop="loadNum" label="装载数量" min-width="110" align='center'></el-table-column>
                        <el-table-column prop="address" label="装载单位" min-width="110" align='center'></el-table-column>
                        <el-table-column prop="goodsCode" label="物料编码" min-width="180" align='center'></el-table-column>
                        <el-table-column prop="address" label="仓位" min-width="120" align='center'></el-table-column>
                        <el-table-column prop="type" label="类型" min-width="120" align='center'></el-table-column>
                        <el-table-column prop="status" label="状态" min-width="120" align='center'></el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="140" align='center'>
                            <template scope="scope">
                                <el-button
                                        @click.native.prevent="deleteRow(scope.$index, tableData4)"
                                        type="danger"
                                        size="small">
                                    移除
                                </el-button>
                                <el-button
                                        @click.native.prevent="deleteRow(scope.$index, tableData4)"
                                        type="info"
                                        size="small">
                                    修改
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <el-row style="margin-top: 10px">
                <el-col :span="24">
                    <p style="font-size: 14px;font-weight: bold;margin-bottom: 10px">
                        入库请求
                    <el-button style="float: right;position: relative;bottom: 5px" size="small">入库前修改</el-button>
                    </p>
                    <el-row>
                        <el-table :data="tableData3" border style="width: 100%" height="300">
                            <el-table-column prop="date" label="序号" width="90" type="index" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="入库单号" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="province" label="装料SN" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="city" label="物料编号" width="200" align="center">
                            </el-table-column>
                            <el-table-column prop="address" label="入库数量" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="zip" label="装料点" width="120" align="center">
                            </el-table-column>
                            <el-table-column prop="time" label="请求时间" width="200" align="center">
                            </el-table-column>
                            <el-table-column prop="goodsName" label="物料名称" width="500" align="center">
                            </el-table-column>
                            <el-table-column prop="status" label="状态" min-width="180" align="center">
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
                id:1,
                tableData4: [
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                    {
                        num: '1',
                        SN: 'LK0000006',
                        capacity: '10',
                        loadNum: '9',
                        goodsCode: '3018-0107U-006',
                        address: '1016',
                        type: '料框',
                        status: '装料'
                    },
                ],
                tableData3: [
                    {
                        date: '1',
                        name: '10000005',
                        province: 'LK000005',
                        city: '3018-0107u-006',
                        address: ' 500',
                        zip: 100,
                        time: '2017-07-26 10:20',
                        goodsName: '0107U 2.4G红外R24B-M 厂商代烧码+P3205(2616)改善',
                        status:'完成： 2017-07-26 09:50'
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
                        status:'完成： 2017-07-26 09:50'
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
                        status:'完成： 2017-07-26 09:50'
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
                        status:'完成： 2017-07-26 09:50'
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
                        status:'完成： 2017-07-26 09:50'
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
                        status:'完成： 2017-07-26 09:50'
                    }
                    ]
            }
        },
        mounted(){
        },
        components: {
            stationInfo
        },
        methods: {}
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