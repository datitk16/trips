
const express = require('express');
const router = express.Router();
const TicketController=require('./Ticket')
const {authenticate} =require('./../../../middleware/auth')

router.post('/',authenticate,TicketController.createTicket);


module.exports=router;