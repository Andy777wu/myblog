<template>
    <div class="admin">
        <header>后台管理页面</header>
        <nav>
            <ul>
                <li v-for="(item,i) in menuList" 
                :key="i" 
                :class="currentComponent == item.component?'active': null" 
                @click="change(item.component)"
                >
                    {{item.label}}
                    <!-- <router-link :to='item.router'>{{item.label}}</router-link> -->
                </li>
            </ul>
        </nav>
        <div class="content">
            <!-- 路由匹配到的组件将渲染在这里 -->
            <!-- <router-view></router-view> -->
            <!-- 除了使用路由，还可以用动态组件 -->
            <component v-bind:is='currentComponent'></component>
        </div>
    </div>
</template>
<script>
import MyArticle from './MyArticle'
import CommentManage from './CommentManage'
import ReadStatic from './ReadStatic'
import MenuBar from './MenuBar'
import Remind from './Remind'
export default {
    components:{
        MyArticle,
        CommentManage,
        ReadStatic,
        MenuBar,
        Remind
    },
    beforeRouteEnter (to, from, next) {
        // ...
        next(vm=>{
            if(vm.$store.state.role!=='admin'){
                vm.$router.push('/home')
            }
        })
    },
    data() {
        return {
            menuList:[
                {label:'我的文章',component: 'MyArticle'},
                {label:'评论管理',component: 'CommentManage'},
                {label:'阅读统计',component: 'ReadStatic'},
                {label:'菜单栏管理',component: 'MenuBar'},
                {label:'消息推送管理',component: 'Remind'}
            ],
            tabIndex: 1,
            currentComponent: 'MyArticle'
        }
    },
    created() {
    },
    methods: {
        change(e) {
            this.currentComponent = e
        }
    },
    beforeDestroy() {
    }
}
</script>
<style lang="less" scoped>
   .admin {
        header {
            font-size: 18px;
            font-weight: 600;
            height: 40px;
            line-height: 40px;
            margin-bottom: 10px;
            position: relative;
            padding-left: 20px;
            &::after {
                position: absolute;
                left: 0;
                top: 0;
                width: 10px;
                height: 40px;
                content: '';
                display: block;
                background: linear-gradient(to right,#f56f56,#fff);
            }
        }
        
        nav {
            ul {
                li {
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    font-size: 16px;
                    padding: 0 20px;
                    position: relative;
                    cursor: pointer;
                    a {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    &.active {
                        color: #f56f56;
                        a {
                                color: #fff;
                        }
                    }
                    &::after {
                        content: '';
                        display: block;
                        width: 2px;
                        height: 14px;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        background-color: #f56f5645;
                    }
                    &:last-child::after {
                        content: unset;
                    }
                }
            }
        }
        .content {
            width: 100%;
            padding: 20px;
        }
   } 
</style>