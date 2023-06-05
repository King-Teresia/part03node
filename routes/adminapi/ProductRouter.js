var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/productUploads/' })

const productController = require("../../controllers/admin/ProductController")

// 因为涉及到 文件上传 所以 普通的post不够用，需要加上 multer中间件
router.post('/adminapi/product/productadd', upload.single('file'), productController.add);
router.get('/adminapi/product/productlist', productController.get);
router.get('/adminapi/product/productlist/:id', productController.get);

router.delete("/adminapi/product/productlist/:id", productController.delList)//注意这个:id占位符，因为我前段就是带id过来的，不写这个:id 走不了这个分支(代表着只要符合 路径是/adminapi/user/userlist/一串id的 就可以走这个分支)

router.put("/adminapi/product/productlist", upload.single('file'), productController.putProductList);//新闻编辑后的更新(这块对应着前面user的upload，kerwin这里写的也是upload)

module.exports = router;

