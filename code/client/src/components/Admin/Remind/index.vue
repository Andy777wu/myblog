<template>
    <div class="remindStatic">
        <div class="filter">
            <el-date-picker
                v-model="queryDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            <el-button type="primary" size="medium">查询</el-button>
        </div>
        <el-table
        stripe
        :data="tableData"
        style="width: 100%">
            <el-table-column
            type="index"
            width="50">
            </el-table-column>
            <el-table-column v-for="(item,i) in columns" :key="i"
                :prop="item.value"
                :label="item.label"
                :min-width="item.width">
                <template slot-scope="scope">
                    <span :title="scope.row[item.value]">{{ scope.row[item.value] }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
    </div>
</template>
<script>
let column = [
    {value: 'date',label: '日期',width: '100'},
    {value: 'type',label: '消息类型',width: '100'},
    {value: 'detail',label: '消息推送详情',width: '300'}
]
export default {
    data() {
        return {
            columns:column,
            tableData:[
                {
                    date: '2019-09-27 10:20:55',
                    type: '评论',
                    detail: 'vue'
                },
                {
                    date: '2019-09-27 10:20:55',
                    type: '阅读',
                    detail: 'vue'
                },
            ],
            queryDate:''
        }
    },
    created() {
        
    },
    methods: {
        serierChange(e){
            console.log(e);
        },
        handleSizeChange(e){},
        handleCurrentChange(e){}
    }
}
</script>
<style lang="less" scoped>
.remindStatic {}
</style>