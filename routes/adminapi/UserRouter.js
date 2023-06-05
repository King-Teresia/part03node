// 所有有关用户的api(用户更换头像啊 更改简介介绍啊(其实就是个性签名)都在这个 userrouter里做)
var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/avatarUploads/' })

const UserController = require("../../controllers/admin/UserController")

router.post('/adminapi/user/login', UserController.login);//看readme.txt

router.post('/adminapi/user/upload', upload.single('file'), UserController.upload);

router.post('/adminapi/user/useradd', upload.single('file'), UserController.add);

// 用户列表的增删改查
router.get("/adminapi/user/userlist", UserController.getList)
router.delete("/adminapi/user/userlist/:id", UserController.delList)//注意这个:id占位符，因为我前段就是带id过来的，不写这个:id 走不了这个分支(代表着只要符合 路径是/adminapi/user/userlist/一串id的 就可以走这个分支)
router.get("/adminapi/user/userlist/:id", UserController.getList)
router.put("/adminapi/user/userlist/:id", UserController.putList)


module.exports = router;

