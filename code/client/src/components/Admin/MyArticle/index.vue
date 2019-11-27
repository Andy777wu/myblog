<template>
    <div>
        <div class="myArticle" v-if="!showEdit">
            <div class="filter">
                <el-select
                clearable
                v-model="currentSerier"
                placeholder="请选择系列">
                    <el-option
                    v-for="item in seriers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="articleTitle" placeholder="请输入标题"></el-input>
                <el-button type="primary" size="medium" @click="query">查询</el-button>
                <el-button type="primary" size="medium" @click="addNew">新增</el-button>
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
                <el-table-column
                    prop=""
                    label="操作"
                    min-width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editArticle(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <EditArticle v-else :articleId="articleId" v-on:goBack="showMyArticle"/>
    </div>
</template>
<script>
import EditArticle from './editArticle'
import {axiosGet} from '../../../utils/request'
import moment from 'moment'
const column = [
    {value: 'title',label: '标题',width: '200'},
    {value: 'summarize',label: '概述',width: '200'},
    {value: 'serier',label: '系列',width: '80'},
    {value: 'readNum',label: '阅读量',width: '80'},
    {value: 'commentNum',label: '评论数',width: '80'},
    {value: 'createdAt',label: '创建时间',width: '100'},
    {value: 'updatedAt',label: '编辑时间',width: '100'}
]
export default {
    components:{
        EditArticle
    },
    data() {
        return {
            seriers: [
                {
                    value: 'vue',
                    label: 'VUE'
                }
            ],
            currentSerier: '',
            articleTitle: '',
            columns:column,
            tableData:[
                {
                    title: '问题：重复跳转相同路由报错',
                    summarize: '这是一个关于vue的问题',
                    serier: 'vue',
                    readNum: 0,
                    commentNum: 0,
                    createdAt: '2019-09-27',
                    updatedAt: '2019-09-27'
                }
            ],
            pageNo: 1,
            pageSize: 10,
            total: 0,
            showEdit: false,
            articleId: ''
        }
    },
    created() {
        
    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            this.getSerierOptions()
            this.getTableData()
        },
        // 获取数据列表
        getTableData(){
            let url = `/api/article?serier=${this.currentSerier}&title=${this.articleTitle}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`
            axiosGet(url).then(res=>{
                if(res.data.code === 200){
                    let datalist = res.data.data
                    datalist.forEach(item=>{
                        item.createdAt = moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')
                        item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD hh:mm:ss')
                    })
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
        getSerierOptions(){
            let url = '/api/serier/options'
            axiosGet(url).then(res=>{
                if(res.data.code === 200){
                    this.seriers = res.data.data
                }else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        // 点击新增
        addNew(){
            this.articleId = ''
            this.showEdit = true
        },
        // 点击查询
        query(){
            this.pageNo = 1
            this.getTableData()
        },
        // 点击编辑
        editArticle(e){
            this.showEdit = true
            this.articleId = e._id
        },
        showMyArticle(e){
            this.showEdit = false
            if(e){
                this.getTableData()
            }
        },
        // 点击删除
        del(e){
             this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = `/api/article/delete?_id=${e._id}`
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
    .myArticle {
        
    }
</style>