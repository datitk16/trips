
const express = require('express');
const Trip = require('./trips')
const router = express.Router();
/**
 * 
 * @todo create get getById,updateById,delete
 */
router.post('', Trip.createTrips)
router.get('', Trip.getTrips)
module.exports=router;