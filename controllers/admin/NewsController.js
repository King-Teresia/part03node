const NewsService = require("../../services/admin/NewsService")

const NewsController = {
    add: async (req, res) => {
        // console.log(req.file);
        const coverImg = req.file ? `/newsUploads/${req.file.filename}` : ""//头像图片 在 服务器上的 地址 ;待会数据库存的 就是 地址
        const { title, content, category, isPublish, username } = req.body

        const result = await NewsService.add({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            coverImg,
            editTime: new Date(),
            username
        })

        res.send({
            ActionType: "OK",
        })
    },
    get: async (req, res) => {
        // console.log("11111111111111111");
        // console.log(req.params);
        // console.log(req.params.id);
        const result = await NewsService.get(req.params)
        res.send({
            ActionType: "OK",
            iWantData: result
        })
    },
    put: async (req, res) => {
        await NewsService.put({
            ...req.body,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK",
        })
    },
    delList: async (req, res) => {
        // console.log("看这里");
        // console.log(req.params.id);

        await NewsService.del({
            _id: req.params.id
        })
        res.send({
            ActionType: "OK",
        })
    },
    putNewsList: async (req, res) => {
        console.log(req.body);
        const coverImg = req.file ? `/newsUploads/${req.file.filename}` : ""//头像图片 在 服务器上的 地址 ;待会数据库存的 就是 地址
        const { title, content, category, isPublish, _id } = req.body

        const result = await NewsService.putNewsList({
            _id,
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            coverImg,
            editTime: new Date()
        })

        res.send({
            ActionType: "OK",
        })
    }
}
module.exports = NewsController