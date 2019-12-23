const express = require('express');
const router = express.Router();
const ArticleControl = require('../controls/article_control.js')

router.get('/api/article',ArticleControl.getArticleList) // 获取文章
.get('/api/article/detail',ArticleControl.getArticleDetail)
.post('/api/article/addOrUpdate',ArticleControl.addOrUpdateArticle) // 新增或修改文章
.get('/api/article/delete',ArticleControl.delArticle) // 删除文章
.get('/api/home/lastest_articles',ArticleControl.getLastestArticles) // 最新文章列表
.get('/api/home/hot_articles',ArticleControl.getHotArticles) // 热门文章列表
.get('/api/detail/menuList',ArticleControl.getMenuList) // 详情页目录
.post('/api/article/updateReadNum',ArticleControl.updateReadNum)
.post('/api/article/updateCommentNum',ArticleControl.updateCommentNum)

module.exports = router