// 我们的user模型 对应的是 数据库mongodb中的users集合
const mongoose = require("mongoose")
const Schema = mongoose.Schema
// 创建 限制 (mongodb本身太自由了，什么类型都能传，但容易出问题 所以做限制)
const userLimit = {
    username: String,
    password: String,
    sex: Number,//0代表保密 1代表男性 2代表女性
    introduce: String,//简介介绍
    avatar: String,//头像
    role: Number,//1代表管理员角色身份 2代表普通编辑者角色身份
}

// 将限制添加给 user模型(并创建 user模型)

const UserModel = mongoose.model("user", new Schema(userLimit))
module.exports = UserModel
