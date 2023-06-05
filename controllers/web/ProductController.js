const ProductService = require("../../services/web/ProductService")

const ProductController = {
    get: async (req, res) => {
        // console.log(req.params);
        // console.log(req.params.id);
        const result = await ProductService.get({ id: req.params.id })
        res.send({
            ActionType: "OK",
            iWantData: result
        })
    },


}
module.exports = ProductController