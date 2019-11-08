const express = require('express');
const mongoose = require('mongoose');
const myRouter = require('./routes/index')
require('dotenv').config()
const keys=require('./config/index')
console.log(keys)

mongoose.connect(keys.mong_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`Connected to mongodb ${keys.mong_url}`))
    .catch(console.log)

const app = express();
app.use(express.json())
app.use('/uploads', express.static('./uploads'))
app.use('/',express.static('./public'))
/**
 * @param su dung use khi khong xac dinh dung phuong thuc
 */

app.use('/', myRouter)
const port = process.env.PORT||keys.port;
app.listen(port, () => {
    console.log(`Sever running on port: ${port}`)
})
app.use('uploade', express.static('./uploads'))