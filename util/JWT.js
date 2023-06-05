const jsonwebtoken = require("jsonwebtoken")
const miyao = "doctor"
const JWT = {
    generate(value, expire) {//设置token  expire是失效时间
        return jsonwebtoken.sign(value, miyao, { expiresIn: expire })
    },
    verify(token) {//验证token
        try {
            return jsonwebtoken.verify(token, miyao)
        } catch (error) {
            return false
        }
    }
}
// const token1 = JWT.generate({ name: "amiya" }, "3s")
// console.log(token1);
// console.log(JWT.verify(token1));
module.exports = JWT

