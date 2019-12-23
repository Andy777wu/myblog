<template>
    <div class="articleContent">
        <div class="title">
            <span>{{articleTitle}}</span>
            <span><i class="blog-iconicon-time"></i>{{createdAt | stampToDate}}</span>
            <span><i class="blog-iconeye"></i>{{readNum}}</span>
            <span><i class="blog-iconeye"></i>{{commentNum}}</span>
        </div>
        <div class="summarize" v-show="articleSummarize">
            <p>概述:&nbsp;<span>{{articleSummarize}}</span></p>
        </div>
        <section>
            <div v-html="articleContent"></div>
        </section>
        <div class="clearfix">
            <div class="reward">
                <div v-show="showWxImg" class="weixin_img">
                </div>
                <span @click="giveReward">喜欢，就打赏一下</span>
            </div>
            <p>分享文章到：</p>
            <div class="bdsharebuttonbox bdshare-button-style0-16">
                <a href="#" class="bds_qzone" data-cmd="qzone"></a>
                <a href="#" class="bds_tsina" data-cmd="tsina"></a>
                <a href="#" class="bds_weixin" data-cmd="weixin"></a>
                <a href="#" class="bds_more" data-cmd="more"></a>
            </div>
        </div>
        <hr>
        <div style="margin-top: 20px;padding: 20px;background-color: #fff">
            <div class="comment" v-show="role!=='admin'">
                <textarea v-if="isLogin" placeholder="发表评论" v-model="comment" @keyup.enter="submitComment"></textarea>
                <div v-else>
                    <span @click="toLogin">登录</span>后发表评论
                </div>
            </div>
            <div v-for="(item,i) in commentList" :key="i" class="commentItem">
                <p>
                    <span>{{item.current_user[0]}}</span>
                    <span>{{item.current_user}}</span>
                    <span>{{item.createdAt | stampToDate}}</span>
                </p>
                <P>
                    {{item.content}}
                </P>
            </div>
        </div>
    </div>
</template>
<script>
import {axiosGet,axiosPost} from '../../utils/request'
import moment from 'moment'
export default {
    props: ['articleId'],
    data() {
        return {
            createdAt: '2019-09-26',
            readNum: 0,
            commentNum: 0,
            comment: '',
            isLogin: false,
            articleContent: '',
            articleTitle: '',
            serier: '',
            articleSummarize: '',
            role: '',
            commentList: [],
            showWxImg: false
        }
    },
    beforeCreate(){
        window._bd_share_config = "";
    },
    watch: {
        articleId: function(){
            this.articleId&&this.getArticleDetail()
            this.getComment()
        }
    },
    created(){
        this.isLogin = sessionStorage.getItem('isLogin')
        this.role = this.$store.state.role
        this.articleId&&this.getArticleDetail()
        this.getComment()
    },
    mounted(){
        this.$nextTick(()=>{
            this.baiduShare()
        })
    },
    methods: {
         getArticleDetail(){
            let url = `/api/article/detail?_id=${this.articleId}`
            axiosGet(url).then((res)=>{
                // console.log(res);
                if(res.data.code === 200){
                    let data = res.data.data
                    this.articleTitle = data.title
                    this.readNum = data.readNum
                    this.commentNum = data.commentNum
                    this.articleSummarize = data.summarize
                    this.articleContent = data.articleContent
                    this.serier = data.serier
                    this.createdAt = data.createdAt
                    this.role!=='admin'&&this.updateReadNum()
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        getComment(){
            let url = `/api/comment?article_id=${this.articleId}`
            axiosGet(url).then((res)=>{
                // console.log(res);
                if(res.data.code === 200){
                    this.commentList = res.data.data
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        updateReadNum(){
            let params = {
                _id: this.articleId,
                readNum: this.readNum+1
            }
            let url = '/api/article/updateReadNum'
            axiosPost(url, params).then((res)=>{
                if(res.data.code === 200){
                    this.readNum+=1
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        updateCommentNum(){
            let params = {
                _id: this.articleId,
                commentNum: this.commentNum+1
            }
            let url = '/api/article/updateCommentNum'
            axiosPost(url, params).then((res)=>{
                if(res.data.code === 200){
                    this.commentNum+=1
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        baiduShare(){
            let url = window.location.href
            // 百度分享
            window._bd_share_config={
                "common":{
                    "bdSnsKey":{},
                    "bdText":this.articleTitle,
                    "bdMini":"2",
                    "bdPic":"",
                    "bdStyle":"0",
                    "bdSize":"16",
                    "bdUrl":url
                },
                "share":{},
                "image":{
                    "viewList":["qzone","tsina","tqq","renren","weixin"],
                    "viewText":"分享到：","viewSize":"16"
                },
                // "selectShare":{ // 划词分享
                //     "bdContainerClass":null,
                //     "bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]
                // }
            };
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
            document.body.appendChild(s);
        },
        giveReward(){
            this.showWxImg = !this.showWxImg
        },
        toLogin(){
            this.$router.push('/login')
        },
        submitComment(){
            let url = `/api/comment/add`
            let params = {
                article_id: this.articleId,
                content: this.comment,
                current_user: this.$store.state.username,
                article_title: this.articleTitle,
                serier: this.serier
            }
            axiosPost(url,params).then((res)=>{
                // console.log(res);
                if(res.data.code === 200){
                    this.$message({
                        type: 'success',
                        message: res.data.message
                    })
                    this.comment = ''
                    this.getComment()
                    this.role!=='admin'&&this.updateCommentNum()
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .articleContent {
        // min-width: 400px;
        font-size: 14px;
        .title {
            width: calc(100% - 40px);
            // height: 40px;
            line-height: 24px;
            position: relative;
            background: #fff;
            margin-bottom: 20px;
            padding: 4px 20px;
            span:first-child {
                font-size: 16px;
                font-weight: 600px;
            }
            span {
                margin-right: 5px;
                font-size: 12px;
                i {
                    font-size: 10px;
                    margin-right: 5px;
                    color: #f56f56;
                }
            }
            &::after {
                content: '';
                display: block;
                width: 10px;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background: linear-gradient(to right,#f56f56,#fff);
            }
        }
        .summarize {
            margin-bottom: 20px;
            p {
                font-weight: 600;
                line-height: 24px;
                span {
                    font-weight: 100;
                    letter-spacing: 1px;
                }
            }
        }
        section {
            padding: 20px;
            background-color: #fff;
            min-height: 400px;
            margin-bottom: 20px;
            line-height: 24px;
            letter-spacing: 1px;
        }
        .reward {
            float: right;
            position: relative;
            span {
                display: inline-block;
                width: 160px;
                height: 34px;
                line-height: 34px;
                text-align: center;
                position: relative;
                background-color: #f6f6f6;
                color: #f56f56;
                cursor: pointer;
            }
            span::before,span::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                background-color: #f56f56;
                animation: clip 8s infinite linear;
                z-index: -1;
                margin: -2px;
            }
            span::after {
                animation-delay: 4s;
            }
            /* clip: rect (top, right, bottom, left) */
            @keyframes clip {
                0%,100% {
                    clip: rect(0 ,2px , 38px, 0px)
                }
                25% {
                    clip: rect(0 ,164px , 4px, 0px)
                }
                50% {
                    clip: rect(0px ,164px , 38px, 160px)
                }
                75% {
                    clip: rect(34px ,164px , 38px, 0px)
                }
            }
            .weixin_img {
                width: 200px;
                height: 200px;
                position: absolute;
                top: -210px;
                left: -40px;
                background: url('../../assets/images/wx_img.png') no-repeat center / 100% 100%;
                &:after {
                    content: '.';
                    display: block;
                    width: 0;
                    height: 0;
                    border-width: 5px;
                    border-style: solid;
                    border-color: #fff transparent transparent transparent;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: -10px;
                }

            }
        }
        hr {
            border: 1px dashed #ccc;
        }
        .comment {
            background-color: #fff;
            textarea {
                margin-left: 30px;
                margin-right: 50px;
                width: calc(100% - 80px);
                min-height: 60px;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 10px;
                outline: none;
                margin-bottom: 10px;
                &:focus {
                    border-color: #f56f56;
                }
            }
            .el-button {
                display: inline-block;
                vertical-align: bottom;
                width: 16%;
                max-width: 70px;
                font-size: 12px;
                font-weight: 600;
                padding: 0;
                height: 40px;
                line-height: 40px;
                background: #fff;
                border-color: #f56f56;
                color: #f56f56;
            }
            >div {
                width: 100%;
                height: 80px;
                line-height: 80px;
                text-align: center;
                border: 1px solid #ccc;
                border-radius: 4px;
                span {
                    color: #f56f56;
                    cursor: pointer;
                    font-size: 14px;
                    &:hover {
                        text-decoration: underline;
                        text-decoration-color: #f56f56;
                    }
                }
            }
        }
        .commentItem {
            margin-top: 10px;
            background-color: #fff;
            >p:first-child {
                display: flex;
                align-items: center;
                span {
                    color: #666;
                    margin-right: 10px;
                }
                span:first-child {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 30px;
                    color: #fff;
                    border-radius: 50%;
                    background-color: #f56f56;
                }
            }
            >p:nth-child(2) {
                padding: 20px 10px;
                margin-left: 50px;
                margin-right: 50px;
                width: calc(100% - 100px);
                background-color: #f6f6f6;
                line-height: 24px;
                border-radius: 4px;
            }
        }
    }
</style>
