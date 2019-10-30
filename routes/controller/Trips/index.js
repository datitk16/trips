
const express = require('express');
const Trip = require('./trips')
const router = express.Router();
const {authenticate}=require('./../../../middleware/auth')
/**
 * 
 * @todo create get getById,updateById,delete
 */
router.post('',authenticate, Trip.createTrips)
router.get('', Trip.getTrips)
router.get('/:id', Trip.getTripById)
router.put('/:id', Trip.updateTripById)
router.delete('/:id', Trip.deleteById)
module.exports=router;