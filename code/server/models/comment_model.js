const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentModelSchema = new Schema({
    article_id: String, // 文章id
    current_user: String, // 当前用户
    article_title: String, // 文章标题
    serier: String, // 文章所属系列
    content: {type:String,required:[true,'评论内容不能为空']} // 评论内容
}, {
    timestamps: {type: Number,default: new Date().getTime()}
});

const CommentModel = mongoose.model('CommentModel', CommentModelSchema);

module.exports = CommentModel