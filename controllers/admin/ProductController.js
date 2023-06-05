const ProductService = require("../../services/admin/ProductService")

const productController = {
    add: async (req, res) => {
        // console.log(req.file);
        const coverImg = req.file ? `/productUploads/${req.file.filename}` : ""//头像图片 在 服务器上的 地址 ;待会数据库存的 就是 地址
        const { productName, introduce, detail } = req.body
        const result = await ProductService.add({
            productName,
            introduce,
            detail,
            coverImg,
            ediTime: new Date()
        })

        res.send({
            ActionType: "OK",
        })
    },
    get: async (req, res) => {
        // console.log("11111111111111111");
        // console.log(req.params);
        // console.log(req.params.id);
        const result = await ProductService.get(req.params)
        res.send({
            ActionType: "OK",
            iWantData: result
        })
    },
    // put: async (req, res) => {
    //     await ProductService.put({
    //         ...req.body,
    //         editTime: new Date()
    //     })
    //     res.send({
    //         ActionType: "OK",
    //     })
    // },
    delList: async (req, res) => {
        // console.log("看这里");
        // console.log(req.params.id);

        await ProductService.del({
            _id: req.params.id
        })
        res.send({
            ActionType: "OK",
        })
    },
    putProductList: async (req, res) => {
        // console.log(req.body);
        const coverImg = req.file ? `/productUploads/${req.file.filename}` : ""//头像图片 在 服务器上的 地址 ;待会数据库存的 就是 地址
        const { _id, productName, introduce, detail } = req.body
        console.log(coverImg);
        const result = await ProductService.putproductList({
            _id,
            productName,
            introduce,
            detail,
            coverImg,
            ediTime: new Date()//这块没有new Date 就是单纯为了占个位置
        })

        res.send({
            ActionType: "OK",
        })
    }


}
module.exports = productController