const ProductModel = require("../../models/ProductModel")


const ProductService = {
    add: async ({ productName, introduce, detail, ediTime, coverImg }) => {
        return ProductModel.create(
            { productName, introduce, detail, ediTime, coverImg }
        )
    },
    get: async ({ id }) => {
        // console.log(id);这个id 就是纯id数字 不是对象 是属性值 ; 所以属性值三元就是 有属性值为true 为undefined为false
        return id ? ProductModel.find({ _id: id })
            : ProductModel.find({})
    },
    put: async ({ _id, isPublish, editTime }) => {
        return ProductModel.updateOne({ _id }, { isPublish, editTime })
    },
    del: async (id) => {
        return ProductModel.deleteOne(id)
    },
    putproductList: async ({ _id, productName, introduce, detail, coverImg, ediTime }) => {
        if (coverImg) {//注意这块，我们不能把一个空字符串传递给数据库
            console.log(_id);
            return ProductModel.updateOne({ _id }, {
                productName, introduce, detail, coverImg, ediTime
            })
        } else {
            return ProductModel.updateOne({ _id }, {
                productName, introduce, detail, ediTime
            })
        }
    }
}

module.exports = ProductService

