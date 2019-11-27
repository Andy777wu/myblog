<template>
    <div class="articleContent">
        <div class="title">
            <span>{{articleTitle}}</span>
            <span><i class="blog-iconicon-time"></i>{{createdAt}}</span>
            <span><i class="blog-iconeye"></i>{{readNum}}</span>
        </div>
        <div class="summarize" v-show="articleSummarize">
            <p>概述:&nbsp;<span>{{articleSummarize}}</span></p>
        </div>
        <section>
            <div v-html="articleContent"></div>
        </section>
        <div class="clearfix">
            <div class="reward">
                <span @click="giveReward">喜欢的话，就打赏一下吧</span>
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
        <div class="comment">
            <textarea v-if="isLogin" placeholder="发表评论" v-model="comment"></textarea>
            <div v-else>
                <span @click="toLogin">登录</span>后发表评论
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
            readNum: '121',
            comment: '',
            isLogin: false,
            articleContent: '',
            articleTitle: '',
            articleSummarize: ''
        }
    },
    beforeCreate(){
        const _this=this;
        setTimeout(()=>{
            _this.baiduShare()
        },20)
    },
    watch: {
        articleId: function(){
            this.articleId&&this.getArticleDetail()
        }
    },
    created(){
        this.isLogin = sessionStorage.getItem('isLogin')
        this.articleId&&this.getArticleDetail()
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
                    this.articleSummarize = data.summarize
                    this.articleContent = data.articleContent
                    this.createdAt = moment(data.createdAt).format("YYYY-MM-DD hh:mm:ss")
                }else if(res.data.code === 500){
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        baiduShare(){
            // 百度分享
            window._bd_share_config={
                "common":{
                    "bdSnsKey":{},
                    "bdText":"",
                    "bdMini":"2",
                    "bdPic":"",
                    "bdStyle":"0",
                    "bdSize":"16"
                },
                "share":{},
                "image":{
                    "viewList":["qzone","tsina","tqq","renren","weixin"],
                    "viewText":"分享到：","viewSize":"16"
                },
                "selectShare":{
                    "bdContainerClass":null,
                    "bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]
                }
            };
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
            document.body.appendChild(s);
        },
        giveReward(){},
        toLogin(){
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="less" scoped>
    .articleContent {
        min-width: 400px;
        font-size: 14px;
        .title {
            width: 100%;
            height: 40px;
            line-height: 40px;
            position: relative;
            background: #fff;
            margin-bottom: 20px;
            span:first-child {
                font-size: 16px;
                font-weight: 600px;
                padding-left: 20px;
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
                height: 40px;
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
        }
        hr {
            border: 1px dashed #ccc;
        }
        .comment {
            textarea {
                width: calc(100% - 20px);
                min-height: 80px;
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 10px;
                outline: none;
                &:focus {
                    border-color: #f56f56;
                }
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
    }
</style>
