<template>
    <el-row>
        <span class="currentspan" :style="{ left : (percentage - 1.5) + '%'}"
              v-show="status != 'success'">{{current}} ( {{percentage + '%'}} )</span>
        <span class="maxspan" v-show="status!= 'success'">{{max}}</span>
        <span class="maxspan" v-show="status == 'success'" style="color: #00CC33">完成</span>
        <el-progress :percentage="percentage" :status="status"
                     style="position: relative" :show-text="false" ></el-progress>
    </el-row>
</template>

<script>
    export default {
        name: 'lProgress',
        props: ['max', 'current'],
        data() {
            return {}
        },
        computed: {
            percentage() {
                let p = parseInt(this.current / this.max * 100)
                return p
            },
            status() {
                if (this.current === this.max) {
                    return 'success'
                }
            }

        }
    }
</script>

<style scoped lang="scss">
    .currentspan {
        color: #1d90e6;
        position: absolute;
        left: 0;
        bottom:10px;
        font-weight: bold;
    }

    .maxspan {
        color: #1d90e6;
        position: absolute;
        bottom: 10px;
        right: 0;
        font-weight: bold;
    }

</style>

