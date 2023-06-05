var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const UsersRouterApi = require("./routes/adminapi/UserRouter")
const NewsRouterApi = require("./routes/adminapi/NewsRouter")
const productRouterApi = require("./routes/adminapi/ProductRouter")

const NewsRouterWebApi = require("./routes/webapi/NewsRouter")
const ProductRouterWebApi = require("./routes/webapi/ProductRouter")
app.use(NewsRouterWebApi)//NewsRouterWebApi的注册 要放 token校验前面，因为这是展示页 不需要token验证
app.use(ProductRouterWebApi)

let JWT = require("./util/JWT")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// express框架初始化的时候 咱们来整这个token(这个中间件 用来拦截一下 请求中的token)
app.use((req, res, next) => {
  if (req.url === "/adminapi/user/login") { //先把第一次登陆踹出去
    next()
    return
  }

  // console.log(req.headers["authorization"]);
  // 输出值是 Bearer token的实际值
  const token = req.headers["authorization"].split(" ")[1] // [0]是咱们自己写的不成文规定 Bearer 所以[1]才是token值
  // console.log(token);
  if (token) {
    let payload = JWT.verify(token)
    // console.log(payload);
    if (payload) {
      // console.log(payload);
      const newToken = JWT.generate({
        id: payload._id,
        username: payload.username
      }, "10h")
      res.header("Authorization", newToken)
      // console.log("token更新完成");
      // console.log(newToken);
      next()
    } else {
      res.status(401).send({ errCode: "-1", errInfo: "token过期了" })
    }
  }

})

// 接下来是/adminapi  和 /webapi 的注册
app.use(UsersRouterApi)
app.use(NewsRouterApi)
app.use(productRouterApi)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
