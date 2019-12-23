<template>
    <header>
        <p @click="toHome">WNX-Blog <span>生有涯，而学无涯</span></p>
        <div>
          <i class="blog-iconuser"></i>&nbsp;
          <span style="margin-right: 5px" @click="login">{{isLogin?'注销': '登录'}}</span>
          <span class="toAdmin" v-if="authority === 'admin'" @click="toAdmin">后台</span>
        </div>
    </header>
</template>
<script>
export default {
  data() {
    return {
      isLogin: null,
      authority: ''
    }
  },
  created(){
    this.authority = this.$store.state.role
    this.isLogin = sessionStorage.getItem('isLogin') || null
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    toAdmin() {
      this.$router.push('/admin')
    },
    login() {
      sessionStorage.removeItem('isLogin')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
  header {
    background-color: #1d5da1;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    padding: 0 200px;
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 400px);
    z-index: 999;
    >p {
      font-size: 24px;
      font-weight: 600;
      cursor: pointer;
      span {
        font-size: 12px;
      }
    }
    >div {
      i {
        color: #fff;
        font-size: 16px;
      }
      span {
        cursor: pointer;
        font-size: 16px
      }
      span:hover {
          color: #f56f56;
      }
    }
  }
  @media (max-width: 700px) {
    header {
      width: calc(100% - 20px);
      padding: 0 10px;
      >p {
        font-size: 18px;
        font-weight: 600;
        span {
          font-size: 10px;
        }
      }
      >div {
        span,i {
          font-size: 10px;
        }
        span.toAdmin {
          display: none;
        }
      }
    } 
  }
</style>