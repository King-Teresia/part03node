const NewsModel = require("../../models/NewsModel")

const NewsService = {

    get: async ({ id }) => {
        // console.log(id);//这个id 就是纯id数字 不是对象 是属性值 ; 所以属性值三元就是 有属性值为true 为undefined为false
        return id ? NewsModel.find({ _id: id, isPublish: 1 })
            : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 })
    },
    getTop: async ({ limit }) => {
        // console.log(id);//这个id 就是纯id数字 不是对象 是属性值 ; 所以属性值三元就是 有属性值为true 为undefined为false
        return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit)//前面的limit是mongodb的方法  ;  所以这一行代码是 取已经发布的 ，取按时间排序倒序的(最新) ， 取四个
    },


}

module.exports = NewsService
