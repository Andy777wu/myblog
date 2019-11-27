<template>
    <div class="readStatic">
        <div class="filter">
            <el-input v-model="queryContent" placeholder="请输入文章标题/所属系列"></el-input>
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
    {value: 'serier',label: '系列',width: '100'},
    {value: 'title',label: '标题',width: '300'},
    {value: 'readNumber',label: '阅读量',width: '100'},
    {value: 'date',label: '日期',width: '100'}
]
export default {
    data() {
        return {
            columns:column,
            tableData:[
                {
                    title: '问题：重复跳转相同路由报错',
                    serier: 'vue',
                    readNumber: 10,
                    date: '2019-09-27'
                },
                {
                    title: '问题：重复跳转相同路由报错',
                    serier: 'vue',
                    readNumber: 10,
                    date: '2019-09-27'
                },
            ],
            queryContent:'',
            queryDate:'',
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
.readStatic {}
</style>