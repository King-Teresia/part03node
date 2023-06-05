const NewsService = require("../../services/web/NewsService")

const NewsController = {
    get: async (req, res) => {
        // console.log(req.params);
        // console.log(req.params.id);
        const result = await NewsService.get({ id: req.params.id })
        res.send({
            ActionType: "OK",
            iWantData: result
        })
    },
    getTop: async (req, res) => {
        const result = await NewsService.getTop({ limit: req.query.limit })
        res.send({
            ActionType: "OK",
            iWantData: result
        })
    }

}
module.exports = NewsController