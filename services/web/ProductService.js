const ProductModel = require("../../models/ProductModel")

const ProductService = {

    get: async ({ id }) => {
        // console.log(id);//这个id 就是纯id数字 不是对象 是属性值 ; 所以属性值三元就是 有属性值为true 为undefined为false
        return id ? ProductModel.find({ _id: id }) : ProductModel.find()
    },


}

module.exports = ProductService
