const express=require('express');
const mongoose =require('mongoose');
const myRouter=require('./routes/index')

mongoose.connect('mongodb://localhost:27017/fs07-vexere',
{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=>console.log('Connected to mongodb'))
.catch(console.log)

const app=express();
app.use(express.json())
app.use('/uploads',express.static('./uploads'))
/**
 * @param su dung use khi khong xac dinh dung phuong thuc
 */

app.use('/',myRouter)
const port=5000;
app.listen(port,()=>{
    console.log(`Sever running on port: ${port}`)
})
app.use('uploade',express.static('./uploads'))