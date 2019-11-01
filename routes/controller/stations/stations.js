const { Station } = require('./../../../model/Station')


module.exports.createStations = (req, res, next) => {
    const { name, address, province } = req.body;
    const newStation = new Station({ name, address, province })
    newStation.save()
        .then(station => res.status(201).json(station))
        .catch(err => res.status(500).json(err))
}

module.exports.getStation = (req, res, next) => {
    Station.find()
        .then(station => res.status(200).json(station))
        .catch(err => console.log(err))
}
module.exports.getStationById=(req, res, next) => {
    const { id } = req.params;
    console.log(id)
    Station.findById(id)
        .then(station => res.status(200).json(station))
        .catch(err => console.log(err))
}
module.exports.updateStationById=(req,res,next)=>{
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
}
module.exports.deleteById=(req,res,next)=>{
    const {id}=req.params;
    Station.deleteOne({_id:id})
    .then(()=> res.status(204).json({message:"Delete success"}))
    .catch(err=>res.json(err))
}


// api/trips?pageNumber=2&pageSize=3
// req.url
// url.parse(req.url).query