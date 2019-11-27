<template>
    <div class="CommentManage">
        <div class="filter">
            <el-input style="width: 300px" v-model="queryContent" placeholder="请输入文章标题/所属系列/评论人"></el-input>
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
                :min-width="item.width"
                >
                <template slot-scope="scope">
                    <span :title="scope.row[item.value]">{{ scope.row[item.value] }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="操作"
                min-width="100">
                <el-button type="danger" size="mini">删除</el-button>
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
    {value: 'commentMen',label: '评论人',width: '100'},
    {value: 'commentContent',label: '评论内容',width: '300'},
    {value: 'title',label: '标题',width: '300'},
    {value: 'serier',label: '系列',width: '80'},
    {value: 'commentTime',label: '评论时间',width: '100'}
]
export default {
    data() {
        return {
            queryContent: '',
            columns:column,
            tableData:[
                {
                    title: '问题：重复跳转相同路由报错',
                    serier: 'vue',
                    commentContent: '精辟',
                    commentMen: 'jack',
                    commentTime: '2019-09-27'
                },
                {
                    title: '问题：重复跳转相同路由报错',
                    serier: 'vue',
                    commentContent: '精辟a,大佬就是牛叉精辟a,大佬就是牛叉精辟a,大佬就是牛叉精辟a,大佬就是牛叉精辟a,大佬就是牛叉精辟a,大佬就是牛叉精辟a,大佬就是牛叉',
                    commentMen: 'jack',
                    commentTime: '2019-09-27'
                },
            ] 
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
    .CommentManage {
    }
</style>