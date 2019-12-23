const express = require('express');
const router = express.Router();
const CommentControl = require('../controls/comment_control.js')

router.get('/api/comment',CommentControl.getCommentList) // 获取评论list
.get('/api/comment/tableList',CommentControl.getCommentTableList) // 表格接口 分页
.post('/api/comment/add',CommentControl.addComment) // 新增评论
.get('/api/comment/delete',CommentControl.deleteComment) // 删除评论

module.exports = router