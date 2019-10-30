const jwt=require('jsonwebtoken');
const {promisify}=require('util');

const jwtVerify=promisify(jwt.verify);

module.exports.authenticate=(req,res,next)=>{
    const token=req.header('token');
    if(!token) return res.status(401).json({message:"Not found token"})
    jwtVerify(token,'nhandeptrai')
    .then(decoded=>{
        console.log(decoded)
    })
}