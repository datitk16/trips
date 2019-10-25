
const express = require('express');
const stationRouter=require('./controller/stations/index')
const tripRouter=require('./controller/Trips/index')
const userRouter=require('./controller/User/index')
const router = express.Router();

router.use('/api/stations',stationRouter)
router.use('/api/trips',tripRouter)
router.use('/api/users',userRouter)
module.exports = router;

