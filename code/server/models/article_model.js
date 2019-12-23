// 数据库
// 获取 Mongoose
const mongoose = require('mongoose')

// 定义一个模式
const Schema = mongoose.Schema;

const ArticleModelSchema = new Schema({
    title: {type:String,required:[true,'标题不能为空']},
    summarize: {type:String,required:[true,'文章概述不能为空']},
    serier: {type:String,required:[true,'系列不能为空']},
    readNum: Number,
    commentNum: Number,
    articleContent: {type:String,required:[true,'内容不能为空']}
}, {
    timestamps: {type: Number,default: new Date().getTime()}
});

// 使用模式“编译”模型
// 第一个参数是为模型所创建集合的别名（Mongoose 将为 ArticleModel 模型创建数据库集合），第二个参数是创建模型时使用的模式
const ArticleModel = mongoose.model('ArticleModel', ArticleModelSchema);

module.exports = ArticleModel