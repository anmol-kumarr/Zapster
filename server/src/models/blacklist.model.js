import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        reuired:true
        
    },
    expireAt:{
        type: Date,
        value:new Date(Date.now()+7*24*60*60*1000),
        reuired:true
    }
}, { timestamps: true })


const BlackList=mongoose.model('BlackList',blackListSchema)

export default BlackList