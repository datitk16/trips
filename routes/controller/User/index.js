
const express = require('express');
const UserController = require('./users')
const router = express.Router();
/**
 * 
 * @todo create get getById,updateById,delete
 */
router.post('/', UserController.createUser)

module.exports=router;