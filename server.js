const express = require('express');
const mongoose = require('mongoose');
const myRouter = require('./routes/index')

console.log("node env", process.env.NODE_ENV)
const mong_cloud_url = 'mongodb+srv://admin:admin@cluster0-nqivn.mongodb.net/vexere?retryWrites=true&w=majority';
const mong_local_url = 'mongodb://localhost:27017/fs07-vexere'
let mong_url;
if (process.env.NODE_ENV === "local") {
    mong_url = mong_local_url
}
else if (process.env.NODE_ENV === "staging") {
    mong_url = mong_cloud_url
}
mongoose.connect(mong_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`Connected to mongodb ${mong_url}`))
    .catch(console.log)

const app = express();
app.use(express.json())
app.use('/uploads', express.static('./uploads'))
/**
 * @param su dung use khi khong xac dinh dung phuong thuc
 */

app.use('/', myRouter)
const port = 5000;
app.listen(port, () => {
    console.log(`Sever running on port: ${port}`)
})
app.use('uploade', express.static('./uploads'))