// 复制粘贴 + 修改
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const newsLimit = {
    title: String,
    content: String,
    category: Number,//category(种类，分类) 1我们设置为 最新动态 2设置为 典型案例 3为通知公告
    coverImg: String,//封面图片
    isPublish: Number,//0代表没发布，1代表发布新闻了
    editTime: Date,// 编辑时间 这块我要多说一嘴，因为后续 我们有一个 按时间排列新闻 这么个内容，所以先在这里创建好
    username: String
}

// 将限制添加给 news模型(并创建 news模型)
const NewsModel = mongoose.model("news", new Schema(newsLimit))
module.exports = NewsModel
