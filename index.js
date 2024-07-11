const express=require('express')
const cookieParser = require('cookie-parser');
const app=express()
const router = require('./routes/router');
require('./db/conn')
require('dotenv').config();






///all app.use 
const Port=process.env.PORT
app.use(express.json())
app.use(router)
app.use(cookieParser());



app.listen(Port , ()=>{
    console.log(`Server is running on port ${Port}`)
})


