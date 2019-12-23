<template>
    <div class="articleItem" @click="toDetail">
        <div>
            <span class="title">{{title}}</span>
            <span><i class="blog-iconicon-time"></i>{{createdAt | stampToDate}}</span>
        </div>
        <p>{{summarize}}</p>
        <div>
            <span>{{serierLabel}}</span>
            <span><i class="blog-iconeye"></i>{{readNums}}</span>
            <span><i class="blog-iconpinglun"></i>{{commentNums}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title','createdAt','summarize','serierLabel','readNums','commentNums','id'],
    data() {
        return {}
    },
    methods:{
        toDetail() {
            this.$router.push({
                path:'/detail',
                query:{
                    _id: this.id,
                    serierItem: this.serierLabel
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .articleItem {
        padding: 20px 10px;
        cursor: pointer;
        background-color: #f6f6f6;
        transition: all .5s;
        margin-bottom: 20px;
        >div:first-child {
            span.title {
                font-size: 16px;
                font-weight: 600;
                line-height: 24px;
            }
            span {
                font-size: 12px;
            }
        }
        >p {
            padding: 10px;
            line-height: 18px;
            background: #1d5da111;
            margin: 20px 0;
            border-radius: 4px;
        }
        >div:last-child {
            margin-top: 10px;
            span:first-child {
                border: 1px dashed #f56f56;
                padding: 3px 10px;
                color: #f56f56;
                border-radius: 4px;
            }
            span {
                font-size: 12px;
            }
        }
        
        i {
            font-size: 10px;
            color: #f56f56;
            margin-left: 20px;
            margin-right: 5px;
        }
    }
    .articleItem:hover {
        // transform: scale(1,1.1);
        border-radius: 10px;
        box-shadow: 0 0 10px 2px #1d5da1;
        z-index: 999;
    }
    @media (max-width: 700px) {
        .articleItem {
            >div:first-child {
                span.title {
                    font-size: 14px;
                }
            }
        }
    }
</style>