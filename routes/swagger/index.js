const {pathStations,pathStationsId,definitionStation,definitionStations} = require('./station');
const keys = require('./../../config/index');
 module.exports = {
     swagger: '2.0',
     host: 'localhost:6789',
     basePath: '/api',
     schemes: ['http','https'],
     consumes: ['application/json'],
     produces: ['application/json'],
     paths:{
         '/stations': pathStations,
         '/stations/{stationId}': pathStationsId
     },
     definitions:{
         Station: definitionStation,
         Stations: definitionStations
     }
 }