// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Router from 'vue-router'
// 引入样式
import '../src/assets/css/base.css'
import '../src/assets/iconfont/iconfont.css'
// 引入element-ui
import { 
  Tree,
  Table,
  TableColumn,
  Button,
  Input,
  Select,
  Option,
  Pagination,
  DatePicker,
  Message,
  MessageBox,
  Row,
  Col,
  Dialog,
  Upload,
  Form,
  FormItem
} from 'element-ui'

import VueAnime from 'vue-animejs';
Vue.use(VueAnime)

Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Form)
Vue.use(FormItem)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false
// 解决重复跳转相同路由 报错问题
const originPush = Router.prototype.push
Router.prototype.push = function push(location){
  return originPush.call(this,location).catch((err)=>err)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
