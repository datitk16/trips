
const express = require('express');
const StationsController = require('./stations');
const {authenticate}=require('./../../../middleware/auth')
const router = express.Router();
/**
 * 
 * @todo create get getById,updateById,delete
 */
router.post('/', StationsController.createStations)
router.get('/trips',StationsController.getStationPageId)
router.get('', StationsController.getStation)
router.get('/:id', StationsController.getStationById)
router.put('/:id',authenticate, StationsController.updateStationById)
router.delete('/:id',authenticate, StationsController.deleteById)

module.exports=router;