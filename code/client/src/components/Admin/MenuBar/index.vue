<template>
    <div class="myArticle">
        <div class="filter">
            <el-input v-model="queryContent" placeholder="请输入"></el-input>
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
                :min-width="item.width"
                >
                <template slot-scope="scope">
                    <img v-if="item.value=='imgSrc'" :src="scope.row[item.value]"/>
                    <span v-else :title="scope.row[item.value]">{{ scope.row[item.value] }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="操作"
                min-width="100">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
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
        <AddOrEdit 
        :showAddOrEdit='showAddOrEdit'
        :currentId='currentId'
        v-on:back="goBack"
        />
    </div>
</template>
<script>
import AddOrEdit from './addOrEdit'
import {axiosGet} from '../../../utils/request.js'
import arrayBufferToBase64 from '../../../utils/getImageUrl'
let column = [
    {value: 'serier',label: '菜单名',width: '100'},
    {value: 'serierItem',label: '子菜单名',width: '100'},
    {value: 'imgSrc',label: '图片',width: '100'},
    {value: 'intro',label: '简介',width: '300'},
]
export default {
    components: {
        AddOrEdit
    },
    data() {
        return {
            queryContent: '',
            columns:column,
            tableData:[
                {
                    serier: '系列',
                    serierItem: 'JAVASCRIPT',
                    intro: '前端语言',
                    imgSrc: 'https://cdn.timsrc.com/JavaScript%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B-1557797820558'
                }
            ],
            showAddOrEdit: false,
            currentId: '',
            pageNo: 1,
            pageSize: 10,
            total: 0,
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(){
            this.getTableData()
        },
        getTableData(){
            let url = `/api/serier?queryContent=${this.queryContent}&pageNo=${this.pageNo}&pageSize=${this.pageSize}`
            axiosGet(url).then(res=>{
                if(res.data.code === 200){
                    let tableData = res.data.data
                    tableData.forEach(item=>{
                        item.imgSrc = arrayBufferToBase64(item.imgSrc.data.data);
                    })
                    this.tableData = tableData
                    this.total = res.data.total
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        query(){
            this.getTableData()
        },
        addNew(){
            this.currentId = ''
            this.showAddOrEdit = true
        },
        edit(e){
            this.currentId = e._id
            this.showAddOrEdit = true
        },
        del(e){
            this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = `/api/serier/delete?_id=${e._id}`
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
        goBack(e){
            this.showAddOrEdit = false
            if(e){
                this.queryContent = ''
                this.getTableData()
            }
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
        img {
            width: 200px;
            height: 80px;
        }
    }
</style>