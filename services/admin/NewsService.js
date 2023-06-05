const NewsModel = require("../../models/NewsModel")


const NewsService = {
    add: async ({ title, content, category, isPublish, coverImg, editTime, username }) => {
        console.log(username);
        return NewsModel.create(
            { title, content, category, isPublish, coverImg, editTime, username }
        )
    },
    get: async ({ id }) => {
        // console.log(id);这个id 就是纯id数字 不是对象 是属性值 ; 所以属性值三元就是 有属性值为true 为undefined为false
        return id ? NewsModel.find({ _id: id })
            : NewsModel.find({})
    },
    put: async ({ _id, isPublish, editTime }) => {
        return NewsModel.updateOne({ _id }, { isPublish, editTime })
    },
    del: async (id) => {
        return NewsModel.deleteOne(id)
    },
    putNewsList: async ({ _id, title, content, category, isPublish, coverImg, editTime }) => {
        console.log("qwe");
        if (coverImg) {//注意这块，我们不能把一个空字符串传递给数据库
            return NewsModel.updateOne({
                _id
            }, {
                title, content, category, isPublish, coverImg, editTime
            })
        } else {
            return NewsModel.updateOne({
                _id
            }, {
                title, content, category, isPublish, editTime
            })
        }
    }
}

module.exports = NewsService
