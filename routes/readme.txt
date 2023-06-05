因为大型项目东西比较多，比较杂，所以像一些接口 比如express自带的users接口还有/接口 他就写到这里了我们也一样 最后统一到app.js中去注册就可以了
 但是，我们还要细分，(因为他东西多啊)像 上面的根目录里的东西:

 router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

我们就要把 function这部分摘出去 再咱们创建的nodeServer 这个专门做node后端的文件夹下 我们创建一个 controller
在controller里面，我们再创建adminapi 和 webapi来分别创建 这部分 function
后续 请到controller文件夹下的 readme.txt里查看
