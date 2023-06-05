const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

const UserController = {
    login: async (req, res) => {
        // console.log(req.body);
        // 看readme.txt
        let result = await UserService.login(req.body)
        if (result.length === 0) {//UserModel.find返回值是一个数组，所以就有了长度
            res.send({
                code: "-1",
                error: "查无此人"
            })
        } else {
            //在这用引入的 JWT来设置token
            const token = JWT.generate({
                id: result[0].id,
                username: result[0].username
            }, "20h")
            res.header("Authorization", token)

            res.send({
                type: "ok",
                // 来做后续工作，到时候前端页面上药显示头像和一些用户信息，所以要把这些数据传过去
                data: {
                    username: result[0].username,//密码就不要传了嗷
                    sex: result[0].sex ? result[0].sex : 0,  //数据库中有性别数据 那就用，没有的话，给个默认值 0 (保密)
                    introduce: result[0].introduce,
                    avatar: result[0].avatar,
                    // 来测试一下 拟真从数据库传过来的用户头像 能否被使用
                    // avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",

                    role: result[0].role,
                }
            })

        }
        // console.log(result);
    },
    upload: async (req, res) => {
        // console.log(req.body);
        // console.log(req.file);
        const { username, introduce, sex } = req.body
        const token = req.headers["authorization"].split(" ")[1]//复制粘贴app的 把token取出来
        const avatar = req.file ? `/avatarUploads/${req.file.filename}` : ""//头像图片 在 服务器上的 地址 ;待会数据库存的 就是 地址
        let payload = JWT.verify(token)//复制粘贴 app的 解密token
        await UserService.upload({ // 调用service 模块 去存到数据库
            id: payload._id,
            username,
            introduce,
            sex: Number(sex),//因为传到后端这个性别是String 而 数据库咱做的limit是Number，所以要转换一下
            avatar
        })
        //    然后这块也配合一下 用户不更新头像，只更新其他数据，不能拿空的头像和其他数据合并返回前端
        if (avatar) {
            res.send({
                ActionType: 1111,
                data: {
                    username, introduce, sex: Number(sex), avatar
                },
            })
        } else {
            res.send({
                ActionType: 1111,
                data: {
                    username, introduce, sex: Number(sex)
                },
            })
        }
    },
    add: async (req, res) => {
        // console.log(req.body);
        console.log(req.file);
        const { username, introduce, sex, role, password } = req.body
        const avatar = req.file ? `/avatarUploads/${req.file.filename}` : ""//头像图片 在 服务器上的 地址 ;待会数据库存的 就是 地址
        await UserService.add({ // 调用service 模块 去存到数据库
            username,
            introduce,
            sex: Number(sex),//因为传到后端这个性别是String 而 数据库咱做的limit是Number，所以要转换一下
            avatar,
            role: Number(role),
            password
        })
        res.send({
            ActionType: "OKKKKKK"
        })
    },
    getList: async (req, res) => {

        const result = await UserService.getList(req.params)
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    delList: async (req, res) => {
        console.log(req.params.id);//用 params这个方法 去查询 req中 名为 id的 东西 (这里的id取决于 UserRouter ......看笔记吧)
        const result = await UserService.deList({
            _id: req.params.id
        })
        res.send({
            ActionType: "ok"
        })
    },
    putList: async (req, res) => {
        const result = await UserService.putList({ _id: req.params.id }, req.body)
        // const result = await UserService.putList(req.body) 这是第二种方法 (kerwin用的方法) 我是直接把东西拆出来了，到UserService里直接拿来用就行了
        res.send({
            ActionType: "ok"
        })

    }
}
module.exports = UserController