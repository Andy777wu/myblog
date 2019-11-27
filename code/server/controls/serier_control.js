const SerierModel = require('../models/serier_model')
const paging = require('../utils/paging')

const SerierControl = {
    // 获取系列列表
    getSerierList: function(req,res){
        let querycontent = req.query.queryContent
        const reg = new RegExp(querycontent, 'i') //不区分大小写
        let query = {
            $or: [
                {serier: {$regex:reg}},
                {serierItem: {$regex:reg}},
                {intro: {$regex:reg}}
            ]
        }
        SerierModel.find(query,(err,data)=>{
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
    getHomeSerierList: function(req,res){
        SerierModel.find({},(err,data)=>{
            if(err){
                res.json({
                    code:500,
                    message:err.message
                });
            }else{
                res.json({
                    code:200,
                    message:'success',
                    data: data
                });
            }
        })
    },
    getSerierOptions: function(req,res){
        SerierModel.find({serier: '系列'},(err,data)=>{
            if(err){
                res.json({
                    code: 500,
                    message: err.message
                })
            }else{
                let options = []
                data.length>0&&data.forEach(item=>{
                    options.push({value:item.serierItem,label:item.serierItem})
                })
                res.json({
                    code: 200,
                    data: options,
                    message: 'success'
                })
            }
        })
    },
    // 删除系列
    delSerier: function(req,res){
        SerierModel.deleteOne(req.query,err=>{
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
    },
    // 获取系列详情
    getSerierDetail: function(req,res){
        SerierModel.findById(req.query,(err,data)=>{
            if(err){
                res.json({
                    code: 500,
                    message: err.message
                })
            }else{
                res.json({
                    code: 200,
                    data: data,
                    message: 'success'
                })
            }
        })
    },
    // 新增或修改系列
    addOrEditSerier: function(req,res){
        let body = req.body;
        const base64ImgSrc = body.imgSrc
        if(base64ImgSrc){
            // 将base64图片转化为二进制
            const split = base64ImgSrc.split(','); // or whatever is appropriate here. this will work for the example given
            const base64string = split[1];
            const buffer = Buffer.from(base64string, 'base64');
            body.imgSrc = {
                data: buffer,
                contentType: 'image/png'
            }
        }
        if(body._id){
            SerierModel.findByIdAndUpdate(body._id,body,(err)=>{
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
        }else{
            
            SerierModel.create(body,(err)=>{
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
}

module.exports = SerierControl