const paging = require('../utils/paging')
const ArticleModel = require('../models/article_model.js')

const ArticleControl = {
    getArticleList: function(req,res){
        let query = {}
        for (const key in req.query) {
            if(key!=='pageNo'&&key!=='pageSize'&&req.query[key]!==''){
                query[key] = {$regex:req.query[key]}
            }
        }
        // find({"name" : {$regex:'大虾'}}) 
        ArticleModel.find(query,(err,data)=>{
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
    getLastestArticles(req,res){
        ArticleModel.find({},(err,data)=>{
            if(err){
                //3.响应修改失败
                res.json({
                    code:500,
                    message:err.message
                });
            }else{
                let pageSize = Number(req.query.checkMoreNewIndex)*4
                let dataList = paging(1,pageSize,data.reverse())
                //3.响应修改成功
                res.json({
                    code:200,
                    message:'success',
                    data: dataList,
                    articleTotal: data.length
                });
            }
        })
    },
    getHotArticles(req,res){
        ArticleModel.find({},(err,data)=>{
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
                    message:'success',
                    data: data.filter(d=>d.readNum>100)
                });
            }
        })
    },
    getMenuList(req,res){
        ArticleModel.find(req.query,(err,data)=>{
            if(err){
                //3.响应修改失败
                res.json({
                    code:500,
                    message:err.message
                });
            }else{
                //3.响应修改成功
                let datalist = [{
                    label: req.query.serier,
                    children: []
                }]
                data.forEach(item=>{
                    datalist[0].children.push({
                        _id: item._id,
                        label: item.title
                    })
                })
                res.json({
                    code:200,
                    message:'success',
                    data: datalist,
                });
            }
        })
    },
    getArticleDetail: function(req,res){
        ArticleModel.findById(req.query,(err,data)=>{
            if(err){
                //3.响应失败
                res.json({
                    code:500,
                    message:err.message
                });
            }else{
                //3.响应成功
                res.json({
                    code:200,
                    message:'success',
                    data: data
                });
            }
        })
    },
    addOrUpdateArticle: function(req,res){
        if(req.body._id){
            ArticleModel.findByIdAndUpdate(req.body._id,req.body,(err)=>{
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
                        message:'修改成功'
                    });
                }
            })
        }else {
            ArticleModel.create(req.body,(err)=>{
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
                        message:'添加成功'
                    });
                }
            })
        }
    },
    delArticle: function(req,res){
        console.log(req.query);
        
        ArticleModel.deleteOne(req.query,(err)=>{
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
                    message:'success'
                });
            }
        })
    },
    updateReadNum: function(req,res){
        const {readNum, _id} = req.body
        ArticleModel.updateOne({_id},{$set : { readNum }},(err,data)=>{
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
                    message:'success'
                });
            }
        })
    },
    updateCommentNum: function(req, res){
        const {commentNum, _id} = req.body
        ArticleModel.updateOne({_id},{$set : { commentNum }},(err,data)=>{
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
                    message:'success'
                });
            }
        })
    }
}

module.exports = ArticleControl