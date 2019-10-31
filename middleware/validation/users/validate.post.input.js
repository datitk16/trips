const _ = require('lodash');
const validator = require('validator');

const { User } = require('./../../../model/User');

module.exports.validatePostInput = async (req, res, next) => {
    let errors = {}
    const email = _.get(req.body, "email", "");
    const password = _.get(req.body, "password", "");
    const fullName = _.get(req.body, "fullName", "");
    const userType = _.get(req.body, "userType", "")

    if (validator.isEmpty(email)) {
        errors.email = "Email không được để rỗng"
    }
    else {
        const user = await User.findOne({ email })
        console.log(validator.isEmail(email))
        if (user) {
            errors.email = "Email đã tồn tại"
        }
        else if (validator.isEmail(email) == false) {
            errors.email = "Email không đúng định dạng"
        }
    }
    if(validator.isEmpty(password)){
        errors.password="Pass không được để trống";
    }else if(!validator.isLength(password,{min:8})){
        errors.password="Pass phải có 8 ký tự"
    }
    if(validator.isEmpty(fullName)){
        errors.fullName="Nhập đầy đủ họ tên"
    }
    if(validator.isEmpty(userType))
    {
        errors.userType="Nhập loại người dùng"
    }
     else if(!validator.equals(userType,"admin")&&!validator.equals(userType,"user")){
         errors.userType="Loại người dùng admin hoặc là user"
     }
    if (_.isEmpty(errors)) return next();
    return res.status(400).json(errors)
}