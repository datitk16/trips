const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:{type:String,required:true},
  password:{type:String,required:true},
  fullName:{type:String,required:true},
  userType:{type:String,default:'KhachHang'}
})
const User = mongoose.model('User', UserSchema, 'User');

module.exports = {
    User,
    UserSchema
}