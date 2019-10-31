const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const multer=require('multer')
const jwtVerify = promisify(jwt.verify);

module.exports.authenticate = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).json({ message: "Not found token" })
    jwtVerify(token, 'nhandeptrai')
        .then(decoded => {
            req.user = decoded;
            return next()
        })
}
module.exports.authorize = (userTypeArr) => {

    return (req, res, next) => {
        const { user } = req;
        console.log(user);
        
        if (userTypeArr.findIndex(elm => { return elm === user.userType })>-1) return next()

        return res.status(403).json({ message: "Ban da dang nhap nhung khong co quyen" })
    }
}
