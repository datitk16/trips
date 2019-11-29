const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const multer=require('multer')
const jwtVerify = promisify(jwt.verify);
const keys=require('./../config/index')

module.exports.authenticate = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).json({ message: "Not found token" })
    jwtVerify(token, keys.serect_key)
        .then(decoded => {
             /**
             * @todo req.user = decoded lấy cái uer decode từ token tại header gán bằng decoded để 
             *middleware khác nhận được khi gọi req.uer.(id,email,userType)
             */
            req.user = decoded;
            return next()
        })
}
module.exports.authorize = (userTypeArr) => {

    return (req, res, next) => {
        const { user } = req;
        console.log(user);
        
        if (userTypeArr.findIndex(elm => { return elm === user.userType })>-1) return next();



        return res.status(403).json({ message: "Ban da dang nhap nhung khong co quyen" })
    }
}
