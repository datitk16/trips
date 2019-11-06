
const express = require('express');
const UserController = require('./users')
const router = express.Router();
const { authenticate, authorize } = require('./../../../middleware/auth');
const { uploadImage } = require('./../../../middleware/aploadImage')
const { validatePostInput } = require('../../../middleware/validation/users/validate.post.input');
const { User } = require('./../../../model/User');
const crypto = require("crypto");
const nodemailer = require('nodemailer')
/**
 * 
 * @todo create get getById,updateById,delete
 */
router.post('/', validatePostInput, UserController.createUser)
router.post('/login', UserController.login)
router.get('/private', authenticate, authorize(['admin']), UserController.testPrivate)
router.post('/avatar', authenticate, uploadImage("avatar"), UserController.uploadImage)
/**
 * @todo Cập nhật password mới
 * Người dùng khi nhập mail sẽ được gửi một link token và token đó được save xuống mongodb
 * Kiểm tra token tồn tại và cho phép cập nhật password mới
 */

//forgot password
router.post('/forgotpass', function (req, res) {
    const email = req.body.email;
    console.log(email)
    User.findOne({ email })
        .then(user => {
            console.log(user.password)
            // if (!user) return Promise.reject({ status: 400, message: "Email not exist" })
            const token = crypto.randomBytes(32).toString('hex');
            console.log('Token', token)
            res.json(token)
            user.resetPasswordToken = token;

            return user.save()
        })
        .then(user => {
            console.log('newPass', user.password)
            const transport = {
                service: 'gmail',
                auth: {
                    user: "16110304@student.hcmute.edu.vn",
                    pass: ""
                }
            }
            const transporter = nodemailer.createTransport(transport);
            const mailOptions = {
                from: "16110304@student.hcmute.edu.vn",
                to: "nguyendataht@gmail.com",
                subject: "Mail xác nhận mua vé!",
                html: `${req.headers.host}/reset/${user.resetPasswordToken}`
            }
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    return console.log(error.message)
                }
                console.log("success")
            })

        })


})
//update new password
router.post('/reset/:token', function (req, res) {
    const resetPasswordToken = req.params.token;
    const { email, password, fullName } = req.body;

    User.findOne({ resetPasswordToken })
        .then(user => {
            if (!user) return res.json({ status: 404, message: "Email existed" })
            const newUser = new User({
                email: user.email, password, fullName: user.fullName
            });
            return newUser.save()
        })
        .then(user => {
            res.json(user)
        })
})

module.exports = router;