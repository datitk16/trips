
const express = require('express');
const StationsController = require('./stations')
const router = express.Router();
/**
 * 
 * @todo create get getById,updateById,delete
 */
router.post('', StationsController.createStations)
router.get('', StationsController.getStation)
router.get('/:id', StationsController.getStationById)
router.put('/:id', StationsController.updateStationById)
router.delete('/:id', StationsController.deleteById)

module.exports=router;