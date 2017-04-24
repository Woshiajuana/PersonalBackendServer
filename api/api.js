/**
 * Created by Administrator on 2017/4/24.
 * 接口工具库
 */

/**引入token工具*/
const jwt = require('jsonwebtoken');

/**引入数据库工具库*/
const models = require('../database/db');
const users = models.user;

/**引入express包*/
const express = require('express');

/**创建路由*/
const router = express.Router();

/**创建接口*/
/**验证后台管理员帐号*/
router.get('/123',(req,res) => {
    /**这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')*/
    res.send('createAccount successedsasasxaxaxxs');
});
router.post('/ajuan_backstage/login',(req,res) => {
    /**这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')*/
    let user = {
        user_name: req.query.user_name,
        user_password: req.query.user_password
    };
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

/**
var token = rq.body.token || rq.query.token || rq.headers["x-access-token"]; // 从body或query或者header中获取token
 jwt.verify(token, secretOrPrivateKey, function (err, decode) {
            if (err) {  //  时间失效的时候/ 伪造的token
               rs.json({err:err})
            } else {
                rq.decode = decode;
                console.log(decode.msg);   // today  is  a  good  day
                next();
            }
        })
 * */

module.exports = router;