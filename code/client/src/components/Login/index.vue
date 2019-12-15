<template>
    <div class="login">
        <div class="loginbox">
            <div class="left">
                <p>WELCOME</p>
                <p>TO MY</p>
                <p>BLOG</p>
                <p @click="toHome">GO&nbsp;<i class="el-icon-right"/></p>
            </div>
            <div class="right">
                <div class="form">
                    <el-input v-model="username" placeholder="输入用户名"/>
                    <el-input type='password' v-model="password" @blur="passwordBlur" placeholder="输入密码"/>
                    <el-input type='password' v-show="isRegister" @blur="repasswordBlur" v-model="repassword" placeholder="再次输入密码"/>
                    <el-button type='primary' @click="doSomeThing">{{!isRegister?'登录': '注册'}}</el-button>
                    <p>
                        <span @click="doRegister">{{isRegister?'点击登录': '点击注册'}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {axiosPost} from '../../utils/request.js'
export default {
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.fromComp = from
        })
    },
    data(){
        return{
            isRegister: false,
            username: '',
            password: '',
            repassword: '',
            fromComp: ''
        }
    },
    methods: {
        toHome(role){
            this.$store.commit('setRole',role)
            console.log(this.fromComp);
            if(this.fromComp.name){
                this.$router.push({
                    path: this.fromComp.fullPath,
                    query: this.fromComp.query
                })
            }else {
                this.$router.push('/home')
            }
        },
        doRegister(){
            this.isRegister = !this.isRegister
        },
        doSomeThing(){
            if(this.isRegister){
                this.register()
            }else {
                this.login()
            }
        },
        login(){
            console.log('登录');
            let url = '/api/user/login'
            let params = {
                username: this.username,
                password: this.password
            }
            axiosPost(url,params).then(res=>{
                if(res.data.code === 200){
                    this.$message({
                        type: 'success',
                        message: res.data.message
                    })
                    this.toHome(res.data.data.role)
                    sessionStorage.setItem('isLogin',true)
                }else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    })
                }
            })
        },
        register(){
            console.log('注册');
            let url = '/api/user/register'
            let params = {
                username: this.username,
                password: this.password
            }

            axiosPost(url,params).then(res=>{
                if(res.data.code === 200){
                    this.$message({
                        type: 'success',
                        message: res.data.message
                    })
                    this.isRegister = false
                    this.repassword = null
                }else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    })
                }
            })
        },
        passwordBlur(){
            if(this.repassword&&this.repassword !== this.password){
                this.$message({
                    type: 'error',
                    message: '两次密码不一致'
                })
            }
        },
        repasswordBlur(){
            if(this.repassword !== this.password){
                this.$message({
                    type: 'error',
                    message: '两次密码不一致'
                })
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .login {
        width: 100%;
        min-width: 1200px;
        height: 100vh;
        background: url('../../assets/images/login6.jpg') no-repeat center center / 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .loginbox {
            width: 1000px;
            height: 600px;
            background-color: #f56f56;
            background: linear-gradient(to left,#f56f56,#1d5da1);
            border-radius: 6px;
            position: relative;
            z-index: 2;
            // box-shadow: 0px 0px 10px 1px #1d5da1;
             &::after {
                content: "";
                position: absolute;
                top: -1%;
                left: -1%;
                width: 102%;
                height: 102%;
                background: linear-gradient(to left,#f56f56,#1d5da1);
                filter: blur(20px) brightness(80%) opacity(.8);
                z-index: -1;
            }
            .left,.right {
                float: left;
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .left {
                flex-direction: column;
                p {
                    width: 100%;
                    text-align: center;
                    font-size: 50px;
                    font-weight: 600;
                    line-height: 55px;
                    color: #fff;
                    opacity: .5;
                    &:last-child {
                        padding-right: 200px;
                        text-align: end;
                        font-size: 20px;
                        margin-top: 50px;
                        cursor: pointer;
                    }
                    &:last-child:hover {
                        color: #f56f56;
                        animation: big .5s linear infinite;
                        animation-fill-mode: forwards;
                    }

                    @keyframes big {
                        0% {
                            font-size: 20px;
                        }
                        50% {
                            font-size: 25px;
                        }
                        100% {
                            font-size: 20px;
                        }
                    }
                }
            }

            .right {
                .form{
                    width: 100%;
                    height: 300px;
                    position: relative;
                    padding: 50px 0;
                    .el-input {
                        display: block;
                        width: 70%;
                        margin: 20px auto;
                        /deep/ .el-input__inner {
                            height: 50px;
                            line-height: 50px;
                            font-size: 16px;
                            background-color: transparent;
                            color: #fff;
                        }
                    }
                    .el-button {
                        width: 70%;
                        height: 50px;
                        font-size: 16px;
                        font-weight: 600;
                        margin-left: 15%;
                        background-color: transparent;
                    }
                    >p {
                        width: 85%;
                        height: 50px;
                        line-height: 50px;
                        text-align: right;
                        color: #fff;
                        padding-right: 15%;
                        span {
                            display: inline-block;
                            color: #409eff;
                            font-size: 16px;
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }
                    &::after {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 2px;
                        height: 400px;
                        background: linear-gradient(#f56f56,#1d5da1);
                        opacity: .8;
                    }
                }
            }
        }
    }
</style>