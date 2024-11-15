import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        
    },
    expireAt:{
        type: new Date(Date.now()+7*24*60*60*1000)
    }
}, { timestamps: true })


const BlackList=mongoose.model('BlackList',blackListSchema)

export default BlackList