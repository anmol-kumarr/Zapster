import express from 'express';
import 'dotenv/config'
import dbConnect from './src/config/dbConnect.js';
import cookieParser from 'cookie-parser';


import messageRoutes from './src/routes/message.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import userRoutes from './src/routes/user.routes.js'


const app=express()
app.use(express.json()) //parse json body from request
app.use(cookieParser()) // to parse cookie from client

app.listen(process.env.PORT || 4001,()=>{
    console.log('Server is running')
})





app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/message',messageRoutes)


app.get('/',(req,res)=>{
    res.status(200).json({
        success:true
    })
})

dbConnect() //connect to database