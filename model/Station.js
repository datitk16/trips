const mongoose =require('mongoose')

const StateSchema=new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    province:{type:String,required:true},
})
const Station=mongoose.model('Station',StateSchema,'Station');

module.exports={
    Station,
    StateSchema
}