/**
 * Created by Administrator on 2017/4/24.
 * 链接数据库的db工具库
 */

/**引入包mongoose*/
const mongoose = require('mongoose');

/**连接数据库*/
const db = mongoose.connect('mongodb://localhost/personalblog');

/**创建模型*/
const Schema = mongoose.Schema;

/**
 * 定义了一个新的模型，
 * 对mongodb数据库article表的映射
 * 但是此模式还未和article集合有关联
 * */
const articleScheMa = new Schema({
    article_title: String,
    article_type: String,
    article_time: String,
    article_content: String
},{
    versionKey: false
});

/**
 * 定义了一个新的模型，
 * 对mongodb数据库users表的映射
 * 但是此模式还未和users集合有关联
 * */
const userScheMa = new Schema({
    user_name: String,
    user_password: String
},{
    versionKey: false
});


const Models = {
    /**与users集合关联*/
    article: db.model('articles',articleScheMa),
    user: db.model('users',userScheMa)
};

module.exports = Models;