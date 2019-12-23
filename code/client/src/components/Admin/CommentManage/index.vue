<template>
    <div class="CommentManage">
        <div class="filter">
            <el-input style="width: 300px" v-model="queryContent" placeholder="请输入文章标题/所属系列/评论人"></el-input>
            <el-button type="primary" size="medium" @click="query">查询</el-button>
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
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>
<script>
import {axiosGet} from '../../../utils/request'
let column = [
    {value: 'current_user',label: '评论人',width: '100'},
    {value: 'content',label: '评论内容',width: '300'},
    {value: 'article_title',label: '标题',width: '300'},
    {value: 'serier',label: '系列',width: '80'},
    {value: 'createdAt',label: '评论时间',width: '130'}
]
export default {
    data() {
        return {
            queryContent: '',
            columns:column,
            tableData:[],
            pageNo: 1,
            pageSize: 10,
            total: 0, 
        }
    },
    created() {
        this.getTableData()
    },
    methods: {
        getTableData(){
            let url = `/api/comment/tableList?queryContent=${this.queryContent}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`
            axiosGet(url).then((res)=>{
                if(res.data.code === 200){
                    this.tableData = res.data.data
                    this.total = res.data.total
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        // 点击查询
        query(){
            this.pageNo = 1
            this.getTableData()
        },
        // 点击删除
        del(e){
             this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = `/api/comment/delete?_id=${e._id}`
                axiosGet(url).then(res=>{
                    if(res.data.code === 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getTableData()
                    }else if(res.data.code === 500){
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                })
            })
        },
        // 点击分页
        handleSizeChange(e){
            this.pageSize = e
            this.pageNo = 1
            this.getTableData()
            
        },
        handleCurrentChange(e){
            this.pageNo = e
            this.pageSize = 10
            this.getTableData()
        }
    }
}
</script>
<style lang="less" scoped>
    .CommentManage {
    }
</style>