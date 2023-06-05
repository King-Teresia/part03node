const UserModel = require("../../models/UserModel")

const UserService = {
    login: async ({ username, password }) => {
        return UserModel.find({ username, password })

    },
    upload: async ({ id, username, introduce, sex, avatar }) => {
        if (avatar) {//如果用户点击更换头像了那就走这个
            return UserModel.updateOne({//更新数据库的 方法 记一下
                id
            }, {
                username, introduce, sex, avatar
            })
        } else {//那如果没有，那就更新其他数据
            return UserModel.updateOne({//更新数据库的 方法 记一下
                id
            }, {
                username, introduce, sex
            })
        }
    },
    add: async ({ username, introduce, sex, role, password, avatar }) => {
        return UserModel.create({
            username, introduce, sex, role, password, avatar
        })

    },
    getList: async ({ id }) => {
        return id ? UserModel.find({ _id: id }, ["username", "introduce", "role", "password"])//这个括号是空的 默认代表 find所有
            : UserModel.find({}, ["username", "introduce", "sex", "role", "avatar"])//这个括号是空的 默认代表 find所有
    },
    deList: async (id) => {
        return UserModel.deleteOne(id)
    },
    putList: async (id, Data) => {
        // console.log(Data);
        return UserModel.updateOne(id, Data)
    }
    // 这是第二种方法 (kerwin用的方法)
    // putList: async (body) => {
    //     console.log(body);
    //     return UserModel.updateOne({ _id: body._id }, body)
    // }

}

module.exports = UserService