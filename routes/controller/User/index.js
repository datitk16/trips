
const express = require('express');
const UserController = require('./users')
const router = express.Router();
const {authenticate,authorize}=require('./../../../middleware/auth');
const multer=require('multer')
/**
 * 
 * @todo create get getById,updateById,delete
 */


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/avatar')
    },
    fileName:function(req,file,cb){
         cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload=multer({storage})

router.post('/', UserController.createUser)
router.post('/login', UserController.login)
router.get('/private',authenticate,authorize(['KhachHang']))
router.post('/avatar',authenticate,upload.single("avatar"),UserController.uploadImage)

module.exports=router;