const { Station } = require('./../model/Station');
const express = require('express');
const router = express.Router();

router.post('/api/stations', (req, res, next) => {
    const { name, address, province } = req.body;
    const newStation = new Station({ name, address, province })
    newStation.save()
        .then(station => res.status(201).json(station))
        .catch(err => res.status(500).json(err))
})
router.get('/api/stations', (req, res, next) => {
   
    Station.find()
        .then(station => res.status(200).json(station))
        .catch(err => console.log(err))
})

router.get('/api/stations/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    Station.findById(id)
        .then(station => res.status(200).json(station))
        .catch(err => console.log(err))
})

/**
 * @param Update
 */
router.put('/api/stations/:id',(req,res,next)=>{
    const { name, address, province } = req.body;
    const {id}=req.params;  
    Station.findById(id)
    .then(station=> {
        if(!station) return Promise.reject({status:4000,message:"Station is not existed"})
       station.name=name,
       station.address=address,
       station.province=province
       return station.save()
    })
    .then(station=>res.status(200).json(station))
    .catch(err=>{
        if(!err.status) return res.status(500).json(err)
        return res.status(err.status).json(err.message)
    })
})
/***
 * @param Delete
 */

 router.delete('/api/stations/:id',(req,res,next)=>{
     const {id}=req.params;
     Station.deleteOne({_id:id})
     .then(()=> res.status(204).json({message:"Delete success"}))
     .catch(err=>res.json(err))
 })
module.exports = router;

