var express = require('express');
var router = express.Router();
const productController = require("../../controllers/web/ProductController")

router.get('/webapi/product/productlist', productController.get);


module.exports = router;

