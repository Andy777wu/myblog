<template>
    <div class="edit">
        <el-row>
            <el-col :span="24">
                <p class="title">标题</p>
                <el-input v-model="articleTitle" placeholder="请输入文章标题"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <p class="title">概述</p>
                <el-input type="textarea" v-model="articleSummarize" placeholder="请输入文章概述"></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <p class="title">阅读量</p>
                <el-input v-model="articleReadNumber" placeholder="请输入阅读量"></el-input>
            </el-col>
            <el-col :span="8">
                <p class="title">评论数</p>
                <el-input v-model="articleComments" placeholder="请输入评论数"></el-input>
            </el-col>
            <el-col :span="8">
                <p class="title">所属系列</p>
                <el-select
                    clearable
                    v-model="currentSerier"
                    placeholder="请选择系列"
                    @change="serierChange">
                        <el-option
                        v-for="item in seriers"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </el-col>
        </el-row>
        <p class="title">内容编辑</p>
        <div id="wangeditor">
            <div ref="editorElem" style="text-align:left;"></div>
        </div>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button style="margin-right: 10px" type="primary" @click="goBack">返回</el-button>
    </div>
</template>
<script>
import E from "wangeditor";
import {axiosGet,axiosPost} from '../../../utils/request'
import moment from 'moment'
export default {
    props: ['articleId'],
    data() {
        return {
            seriers: [
                {
                    value: 'vue',
                    label: 'VUE'
                }
            ],
            articleComments: '',
            articleReadNumber: '',
            articleTitle: '',
            articleSummarize: '',
            currentSerier: '',
            editor: null
        }
    },
    created() {

    },
    mounted() {
        this.init()
    },
    methods: {
        async init(){
            await this.getSerierOptions()
            if(this.articleId!==''){
                this.getArticleDetail(this.articleId)
            }
            this.createEditor()
        },
        getArticleDetail(id){
            let url = `/api/article/detail?_id=${id}`
            axiosGet(url).then((res)=>{
                // console.log(res);
                if(res.data.code === 200){
                    let data = res.data.data
                    this.articleComments = data.commentNum
                    this.articleReadNumber = data.readNum
                    this.articleTitle = data.title
                    this.articleSummarize = data.summarize
                    this.currentSerier = data.serier
                    this.editor.txt.html(data.articleContent) // 赋值
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
        serierChange(e){
            console.log(e);
        },
        createEditor() {
            this.editor = new E(this.$refs.editorElem);
            this.editor.customConfig.zIndex = 100  
            this.editor.create(); // 创建富文本实例
            this.editor.txt.html('<p>开始富含激情的创作吧~</p>') // 赋值
        },
        submit() {
            // console.log(this.editor.txt.html());
            // console.log(this.editor.txt.text());
            let params = {
                title: this.articleTitle,
                summarize: this.articleSummarize,
                serier: this.currentSerier,
                readNum: this.articleReadNumber,
                commentNum: this.articleComments,
                articleContent: this.editor.txt.html()
            }
            // let date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            
            if(this.articleId!==''){
                Object.assign(params,{
                    _id: this.articleId
                })
            }
           
            let url = '/api/article/addOrUpdate'
            axiosPost(url,params).then((res)=>{
                if(res.data.code === 200){
                    this.$message({
                        type: 'success',
                        message: '提交成功!'
                    });
                    this.$emit('goBack',true)
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        goBack(){
            this.$emit('goBack',false)
        }   
    }
}
</script>
<style lang="less" scoped>
    .edit {
        .el-row {
            margin-bottom: 20px;
            .el-col {
                .el-select,.el-input {
                    width: 100%;
                }
            }
        }
        .title {
            font-size: 14px;
            font-weight: 600;
            margin: 20px 0 10px;
            &:first-child {
                margin-top: 0;
            }
        }
        #wangeditor {
            
        }
        button {
            margin-top: 10px;
            float: right;
        }
    }
</style>