require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const myRouter = require('./routes/index')
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
app.use('/docs',require('./routes/doc'))

/**
 * @param su dung use khi khong xac dinh dung phuong thuc
 */
// Add headers

/**
 * @todo fix bug when call api but web can't call
 */
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', myRouter)
const port = process.env.PORT||keys.port;
app.listen(port, () => {
    console.log(`Sever running on port: ${port}`)
})
app.use('uploade', express.static('./uploads'))