import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main/index'
import Home from '@/components/Home/index'
import Detail from '@/components/Detail/index'
import Admin from '@/components/Admin/index'
import Login from '@/components/Login/index'
// import CommentManage from '@/components/Admin/CommentManage'
// import Edit from '@/components/Admin/Edit'
// import ReadStatic from '@/components/Admin/ReadStatic'
// import MyArticle from '@/components/Admin/MyArticle'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/detail',
          name: 'Detail',
          component: Detail
        },
        {
          path: '/admin',
          name: 'Admin',
          component: Admin
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { 
    from.name ? next({
      name: from.name
    }) : next('/login'); 
  } else {
    next(); //如果匹配到正确跳转
  }
});

export default  router
