<template>
    <div class="login">
        <div class="loginbox">
            <div class="left">
                <svg preserveAspectRatio="xMaxYMax meet" viewBox="0 0 400 300">
                    <path v-for="(item,i) in pathList" :key="i" :d="item"
                    fill="none"
                    stroke="url(#MyGradient)"
                    stroke-linecap="round" 
                    linejoin="round" 
                    stroke-miterlimit="10" 
                    stroke-width="2"
                    />
                    <defs>
                        <linearGradient id="MyGradient">
                            <stop offset="5%"  stop-color="#f56f56"/>
                            <stop offset="95%" stop-color="#1d5da1"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div class="right">
                <div class="form">
                    <P>用户名</P>
                    <el-input v-model="username" placeholder="输入用户名"/>
                    <P>密码</P>
                    <el-input type='password' v-model="password" @blur="passwordBlur" placeholder="输入密码"/>
                    <P v-show="isRegister">确认密码</P>
                    <el-input type='password' v-show="isRegister" @blur="repasswordBlur" v-model="repassword" placeholder="再次输入密码"/>
                    <el-button type='primary' @click="doSomeThing">{{!isRegister?'登录': '注册'}}</el-button>
                    <p>
                        <span @click="toHome">先去看看</span>
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
            pathList:[
                'M0,50 h15 l15,15 19.5,-15 l19.5,15 15,-15 h15 l-15 60 h-18 l-15,-30 -15,30 h-18 Z',
                'M120,50 h15 l15,15 v-15 h15 v60 h-18 l-6,-30 v30 h-15 Z',
                'M195,50 h15 l15,15 15,-15 h15 l-15,30 15,30 h-15 l-15,-15 -15,15 h-15 l15,-30 Z',
                'M140,190 h50 v1',
                'M210,170 h20 c5,10 5,10 0,20 c5,10 5,10 0,20 h-20 Z',
                'M250,170 v40 h20',
                'M290,170 Q310,170 290,210 Q270,170 290,170',
                // 'M330,190 Q310,180 330,170 Q345,170 340,190  Q330,225 310,210'
                'M342,182 a14,19 0 1,0 0,15 l-10,0'
            ],
            isRegister: false,
            username: '',
            password: '',
            repassword: '',
            fromComp: ''
        }
    },
    mounted(){
        this.animate()
    },
    methods: {
        toHome(role){
            this.$store.commit('setRole',role)
            this.$store.commit('setUsername',this.username)
            // console.log(this.fromComp);
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
        },
        animate(){
            this.$anime({
                targets: '.left path',
                strokeDashoffset: [this.$anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 2000,
                delay: function(el, i) { return i * 250 },
                direction: 'alternate',
                loop: true
            })
        }
    },
}
</script>
<style lang="less" scoped>
    .login {
        width: 100%;
        height: 100vh;
        min-height: 600px;
        background: linear-gradient(45deg,#1d5da1 70%,#f56f56);
        display: flex;
        justify-content: center;
        align-items: center;
        .loginbox {
            width: 70%;
            height: 70%;
            background-color: #fff;
            border-radius: 6px;
            position: relative;
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
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .left {
                width: 40%;
                svg {
                    width: 100%;
                    height: 40%;
                }
            }

            .right {
                width: 60%;
                .form{
                    width: 70%;
                    position: relative;
                    .el-input {
                        display: block;
                        width: 70%;
                        margin: 0px auto 20px;
                        /deep/ .el-input__inner {
                            height: 50px;
                            line-height: 50px;
                            font-size: 16px;
                            background-color: transparent;
                            color: #555;
                        }
                    }
                    .el-button {
                        width: 70%;
                        height: 50px;
                        font-size: 16px;
                        font-weight: 600;
                        margin-left: 15%;
                        margin-top: 20px;
                        background: linear-gradient(45deg,#1d5da1,#f56f56);
                        border: none;
                    }
                    p {
                        width: 70%;
                        height: 24px;
                        line-height: 24px;
                        padding-left: 15%;
                        padding-right: 15%;
                        text-align: left;
                        color: #999;
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                    p:last-child {
                        height: 60px;
                        line-height: 60px;
                        text-align: right;
                        span:first-child {
                            display: inline-block;
                            color: #409eff;
                            font-size: 16px;
                            text-decoration: underline;
                            margin-right: 10px;
                            cursor: pointer;
                        }
                        span:last-child {
                            display: inline-block;
                            color: #409eff;
                            font-size: 16px;
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    }
                    &::after {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 1px;
                        height: 100%;
                        background: linear-gradient(#f56f56,#1d5da1);
                        opacity: .8;
                    }
                }
            }
        }

        @media (max-width: 625px) {
            .loginbox {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                .left {
                    width: 100%;
                    height: 40%;
                    svg {
                        width: 80%;
                        height: 100%;
                    }
                }
                .right {
                    width: 100%;
                    height: 60%;
                    align-items: flex-start;
                    .form {
                        width: 100%;
                        p {
                            width: 80%;
                            padding-left: 10%;
                            padding-right: 10%;
                            margin-bottom: 4px;
                        }
                        .el-input {
                            width: 80%;
                            margin-bottom: 10px;
                        }
                        .el-button {
                            width: 80%;
                            margin-left: 10%;
                        }
                        &::after {
                            height: 100%;
                            content: unset;
                        }
                    }
                }
            }
        }
    }
</style>