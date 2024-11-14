import express from 'express';
import 'dotenv/config'
import authRouter from './src/routes/auth.routes.js'
import dbConnect from './src/config/dbConnect.js';


const app=express()
app.use(express.json()) //parse json body from request

app.listen(process.env.PORT || 4001,()=>{
    console.log('Server is running')
})



app.use('/api/v1/auth',authRouter)


app.get('/',(req,res)=>{
    res.status(200).json({
        success:true
    })
})

dbConnect() //connect to database