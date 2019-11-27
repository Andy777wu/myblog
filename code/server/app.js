// 导入模块
const express = require('express')

// 创建服务器
const app = express()

// 中间件

//使用body-parser中间件：一旦配置好body-parser中间之后，所有的req对象就会有一个属性对象body属性，他就是post请求的参数
//补充说明：body-parser只能获取post请求的参数
//(1)导入中间件
const bodyParser = require('body-parser');
//(2)使用中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
// app.use(bodyParser.urlencoded({ extended: false }))

// 托管静态文件
app.use('/node_modules', express.static('node_modules'));

// 路由容器
app.use(require('./routers/articles._route.js'))
app.use(require('./routers/seriers_route.js'))
app.use(require('./routers/user_route.js'))

// 连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/blog',{useUnifiedTopology: true,useNewUrlParser: true })

//使用cookie-session中间件实现保持用户登录状态
//(1)导入中间件
var cookieSession = require('cookie-session');
//(2)使用中间件
app.use(cookieSession({
    name: 'a',//cookie的字段的键
    keys: ['666fgdndfgnhgd'],//cookie的加密钥匙，钥匙不一样得到的密文是不一样
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours  //设置cookie的有效期，默认是24小时
  }));

// 启动服务器
app.listen(3000,function(){
    console.log('hello world');
})