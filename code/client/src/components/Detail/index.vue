<template>
    <div class='detail'>
        <aside>
            <p>系列目录</p>
            <el-tree 
            :data="menusList"
            :props="defaultProps"
            node-key="_id"
            :current-node-key="articleId"
            :indent='6'
            @node-click="handleNodeClick"
            :highlight-current="true"
            :default-expand-all="true"
            ref="tree"
            ></el-tree>
        </aside>
        <div>
            <articleContent
            :articleId='articleId'></articleContent>
        </div>
    </div>
</template>
<script>
import articleContent from './articleContent'
import {axiosGet,axiosPost} from '../../utils/request'
export default {
    components: {
        articleContent
    },
    data(){
        return{
            menusList: [
                {
                    id: 1,
                    label: 'javascript',
                    children: [
                        {
                            id: 1,
                            label: 'this指向'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            articleId:'',
            serierItem: ''
        }
    },
    created(){
        this.articleId = this.$route.query._id || null
        this.serierItem = this.$route.query.serierItem
    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            this.getMenuList()
        },
        getMenuList(){
            let url = `/api/detail/menuList?serier=${this.serierItem}`
            axiosGet(url).then(res=>{
                if(res.data.code === 200){
                    console.log(res.data.data);
                    this.menusList = res.data.data
                    if(!this.articleId){
                        this.articleId = this.menusList[0].children[0]._id
                        // let _this = this
                        this.$nextTick(function(){
                            this.$refs['tree'].setCurrentKey(this.articleId)
                        })
                    }
                }else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    })
                }
            })
        },
        handleNodeClick(e){
            this.articleId = e._id
        }
    }
}
</script>
<style lang="less" scoped>
    .detail {
        aside {
            float: left;
            width: 300px;
            margin-right: 20px;
            padding: 20px 10px;
            p {
                height: 40px;
                line-height: 40px;
                padding: 0 10px;
                font-size: 16px;
                font-weight: 600;
                border-bottom: 1px solid #f56f56;
            }
            .el-tree {
                background-color: #f6f6f6;
                padding: 20px 0;
                .el-tree-node {
                    font-size: 14px;
                    line-height: 34px;
                    height: 34px;
                }
            }
            /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
                background-color: #f56f567e;
                color: #fff;
            }
            /deep/ .el-tree-node__content:hover {
                background-color: #f56e567e;
                color: #fff;
            }
            /deep/ .el-tree-node__label {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        >div {
            float: left;
            padding: 20px 10px;
            width: calc(100% - 360px);
        }
    }
</style>