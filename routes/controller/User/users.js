const { User } = require('./../../../model/User')
const bcrypt = require('bcryptjs');

const { promisify } = require('util')

const genSalt=promisify(bcrypt.genSalt);
const hash=promisify(bcrypt.hash)
module.exports.createUser = (req, res, next) => {
    const { email, password, fullName } = req.body;
    const newUser = new User({ email, password, fullName })
   User.findOne({email})
   .then(user=>{
       if(user) return Promise.reject({status:404,message:"Email existed"})
       return genSalt(10)
   })
    .then(salt=>{
        return hash(password,salt);
    })
    .then(hash=>{
        newUser.password=hash;
        return newUser.save()
    })
    .then(user => res.status(200).json(user))
    .catch(err=>{
        if(err.status) return res.status(err.status).json({message:err.message})
        return res.status(500).json(err)
    })
}
