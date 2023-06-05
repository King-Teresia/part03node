var express = require('express');
var router = express.Router();
const newsController = require("../../controllers/web/NewsController")

router.get('/webapi/news/newslist', newsController.get);
router.get('/webapi/news/newslist/:id', newsController.get);
router.get('/webapi/news/toplist', newsController.getTop);

module.exports = router;

