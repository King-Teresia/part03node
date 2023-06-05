// 复制粘贴 + 修改
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const productLimit = {
    productName: String,
    introduce: String,
    detail: String,
    coverImg: String,
    ediTime: Date//这块没有new Date 就是单纯为了占个位置
}

// 将限制添加给 news模型(并创建 news模型)
const ProductModel = mongoose.model("product", new Schema(productLimit))
module.exports = ProductModel
