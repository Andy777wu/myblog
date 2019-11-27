const UserModel = require('../models/user_model')

const  UserControl = {
    login: function(req,res){
        let userInfo = req.body
        if(!userInfo.username){
            res.json({
                code: 10001,
                message: '用户名不能为空'
            })
            return
        }
        if(!userInfo.password){
            res.json({
                code: 10001,
                message: '密码不能为空'
            })
            return
        }
        UserModel.find(userInfo,(err,data)=>{
            if(err){
                res.json({
                    code: 500,
                    message: '用户名或密码错误'
                })
            }else{
                let result = {
                    username: data[0].username,
                    role: data[0].role
                }
                res.json({
                    code: 200,
                    data: result,
                    message: '登录成功'
                })
            }
        })
    },
    loginOut: function(req,res){
        
    },
    register: function(req,res){
        let userInfo = req.body
        if(!userInfo.username){
            res.json({
                code: 10001,
                message: '用户名不能为空'
            })
            return
        }
        if(!userInfo.password){
            res.json({
                code: 10001,
                message: '密码不能为空'
            })
            return
        }
        UserModel.find({username: userInfo['username']},(err,data)=>{
            if(err){
                res.json({
                    code: 500,
                    message: err.message
                })
            }else{
                if(data.length>0){
                    res.json({
                        code: 500,
                        message: '用户名已存在'
                    })
                }else{
                    if(userInfo.username === 'admin'){
                        userInfo['role'] = 'admin'
                    }else {
                        userInfo['role'] = 'normal'
                    }
                    UserModel.create(userInfo,(err,data)=>{
                        if(err){
                            res.json({
                                code: 500,
                                message: err.message
                            })
                        }else{
                            res.json({
                                code: 200,
                                message: '注册成功'
                            })
                        }
                    })
                }
            }
        })
    }
}

module.exports = UserControl