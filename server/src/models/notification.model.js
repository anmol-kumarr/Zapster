import mongoose from "mongoose";

const notificationSchema=new mongoose.Schema({
    message:{
        type:String,
    },
    isSeen:{
        type:Boolean
    },
    userRequested:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    notificationType:{
        type:String,
        enum:['Request','Accept','Group']
    }
},{timestamps:true})

const Notification=mongoose.model('Notification',notificationSchema)

export default Notification