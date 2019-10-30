const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { promisify } = require('util')

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  userType: { type: String, default: 'KhachHang' }
})
UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) return next()
  genSalt()
    .then(salt => hash(user.password, salt))
    .then(hash => {
      user.password = hash;
      next()
    })
})
const User = mongoose.model('User', UserSchema, 'User');

module.exports = {
  User,
  UserSchema
}