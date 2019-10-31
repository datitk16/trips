
const express = require('express');
const UserController = require('./users')
const router = express.Router();
const {authenticate,authorize}=require('./../../../middleware/auth');
const multer=require('multer')
const {uploadImage}=require('./../../../middleware/aploadImage')
/**
 * 
 * @todo create get getById,updateById,delete
 */
router.post('/', UserController.createUser)
router.post('/login', UserController.login)
router.get('/private',authenticate,authorize(['KhachHang']),UserController.testPrivate)
router.post('/avatar',authenticate,uploadImage("avatar"),UserController.uploadImage)

module.exports=router;