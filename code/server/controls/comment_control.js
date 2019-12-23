const CommentModel = require('../models/comment_model')
const paging = require('../utils/paging')

const CommentControl = {
    getCommentList: function(req,res){
        CommentModel.find(req.query,(err,data)=>{
            if(err){
                //3.请求失败
                res.json({
                    code:500,
                    message:err.message
                });
            }else{
                res.json({
                    code: 200,
                    message: 'success',
                    data: data
                })
            }
        })
    },
    getCommentTableList: function(req,res){
        let querycontent = req.query.queryContent
        const reg = new RegExp(querycontent, 'i') //不区分大小写
        let query = {
            $or: [ // 模糊搜索匹配
                {current_user: {$regex:reg}},
                {article_title: {$regex:reg}},
                {serier: {$regex:reg}}
            ]
        }
        CommentModel.find(query,(err,data)=>{
            if(err){
                //3.响应修改失败
                res.json({
                    code:500,
                    message:err.message
                });
            }else{
                //3.响应修改成功
                let pageNo = Number(req.query.pageNo)
                let pageSize = Number(req.query.pageSize)
                let dataList = paging(pageNo,pageSize,data)
                res.json({
                    code:200,
                    message:'success',
                    data: dataList,
                    pageNo: pageNo,
                    pageSize: pageSize,
                    total: data.length
                });
            }
        })
    },
    addComment: function(req, res){
        CommentModel.create(req.body,(err)=>{
            if(err){
                //3.响应修改失败
                res.json({
                    code:500,
                    message:err.message
                });
            }else{
                //3.响应修改成功
                res.json({
                    code:200,
                    message:'评论成功'
                });
            }
        })
    },
    deleteComment: function(req, res){
        CommentModel.deleteOne(req.query,err=>{
            if(err){
                res.json({
                    code: 500,
                    message: err.message
                })
            }else{
                res.json({
                    code: 200,
                    message: 'success'
                })
            }
        })
    }
}

module.exports = CommentControl