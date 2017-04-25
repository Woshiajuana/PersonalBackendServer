/**
 * Created by Administrator on 2017/4/24.
 * 接口工具库
 */

/**引入分页查询工具库*/
const dbHelper = require('./page-query');

/**引入token工具*/
const jwt = require('jsonwebtoken');

/**引入数据库工具库*/
const models = require('../database/db');
const users = models.user;
const articles = models.article;

/**引入express包*/
const express = require('express');

/**创建路由*/
const router = express.Router();

/**验证token的中间键*/
const check_api_token = require('./check_api_token');

/**创建接口*/
/**验证后台管理员帐号*/
router.post('/ajuan_backstage/login',(req,res) => {
    /**这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')*/
    let user = {
        user_name: req.query.user_name,
        user_password: req.query.user_password
    };
    if(!req.query.user_name) {
        res.json({status: 0, msg: '请输入帐号'});
        return;
    }
    if(!req.query.user_password) {
        res.json({status: 0, msg: '请输入密码'});
        return;
    }
    users.count(user, function(err, doc){
        if(doc == 1){
            /**创建token*/
            let token = jwt.sign(user, 'app.get(superSecret)', {
                expiresIn: 60*60*24 /**设置过期时间*/
            });
            res.json({
                status: 1,
                msg: '登陆成功',
                token: token
            });
        }else{
            res.json({
                status: 0,
                msg: '登录失败'
            });
        }
    });
});

/**获取文章*/
router.get('/ajuan_backstage/fetchArticle',check_api_token,(req,res) => {
    let article_type = req.query.tab == 'all' ? '' : req.query.tab;
    let page = +req.query.page_num || 1;
    let rows = +req.query.page_size || 12;
    let key_word = req.query.key_word;
    let query = {};
    if(article_type) query.article_type = article_type;
    if(key_word) query.article_title =  eval("/"+key_word+"/ig");
    dbHelper.pageQuery(page, rows, articles, '', query, {}, (error, $page) => {
        if(error){
            res.json({status: 0, msg: '获取信息失败'});
        }else{
            res.json({
                status:1,
                data: $page.results,
                article_total: $page.total,
                page_count: Math.ceil($page.pageCount)
            });
        }
    });
});

/**创建文章*/
router.get('/ajuan_backstage/insertArticle',check_api_token,(req,res) => {
    if(!req.query.article){
        res.json({status: 0, msg: '请把信息填写完整'});
        return;
    }
    let article = JSON.parse(req.query.article);
    articles.create(article,(err, doc) => {
        if(err){
            res.json({status: 0, msg: '提交文章失败'});
        }else {
            res.json({status: 1, msg: '提交文章成功'});
        }
    });
});

/**删除文章*/
router.get('/ajuan_backstage/removeArticle',check_api_token,(req,res) => {
    let article_id = req.query.article_id;
    articles.remove({_id:article_id},(err, doc) => {
        if(err){
            res.json({status: 0, msg: '删除文章失败'});
        }else {
            res.json({status: 1, msg: '删除文章成功'});
        }
    })
});

module.exports = router;