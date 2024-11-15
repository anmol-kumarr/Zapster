import mongoose from "mongoose";
import mailSender from "../config/mailSender";

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        reuired:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expries:300
    }
})

// pre function is a middleware function that runs before the save function


otpSchema.pre('save',async(next)=>{
    try{
        await mailSender(this.email,this.otp)
        next()
    }catch(err){
        console.log(err)
        next(err)
    }
})


const OTP=mongoose.model('OTP',otpSchema)
export default OTP