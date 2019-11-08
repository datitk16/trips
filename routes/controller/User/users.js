const { User } = require('./../../../model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { promisify } = require('util')
const comparePassword = promisify(bcrypt.compare)
const jwtSign = promisify(jwt.sign)
const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash)


const keys=require('./../../../config/index')
module.exports.createUser = (req, res, next) => {
    console.log(req.body)
    const { email, password, fullName, userType } = req.body;
    const newUser = new User({ email, password, fullName, userType })
    User.findOne({ email })
        .then(user => {
            if (user) return Promise.reject({ status: 404, message: "Email existed" })
            return newUser.save()
        })
        .then(user => res.status(200).json(user))
        .catch(err => {
            if (err.status) return res.status(err.status).json({ message: err.message })
            return res.status(500).json(err)
        })
}
/**
 * @todo login CREDENTIALS:email + password
 */

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) return Promise.reject({ status: 404, message: "Not found" });

            return Promise.all([comparePassword(password, user.password), user])
        })
        .then(result => {
            const [isMatch, user] = result
            if (!isMatch) return Promise.reject({ status: 400, message: "Password is correct" });

            const payload = {
                _id:user._id,
                email: user.email,
                userType: user.userType
            }
            /**
             * @Howto format err khi hết thời gian
             */
            return jwtSign(payload, keys.serect_key, { expiresIn: 3600 })

        })
        .then(token => {
            console.log(token)
            return res.status(200).json({ token })
        })
        .catch(err => {
            console.log(err)
            if (err.status) return res.status(err.status).json(err.message);
            return res.status(500).json(err)
        })
}

module.exports.testPrivate = (req, res, next) => {
    res.status(200).json({
        message: "Access login successfully",
        user: req.user
    })
}

module.exports.uploadImage = (req, res, next) => {
    const { email } = req.user;
    User.findOne({ email })
        .then(user => {
            user.avatar = req.file.path;
            return user.save()
        })
        .then(user => res.status(200).json(user))
        .catch(err => status(404).json(err))
}

