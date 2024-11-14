import express from 'express';
import 'dotenv/config'


const app=express()

app.listen(process.env.PORT || 4001,()=>{
    console.log('Server is running')
})

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true
    })
})