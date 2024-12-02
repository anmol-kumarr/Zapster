import mongoose, { Types } from "mongoose";
import Notification from "./notification.model.js";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others']
    },
    profilePicture: {
        type: String,
    },
    notifications: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Notification',
        }
    ],
    friendRequest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    requestSend: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    friends: [
        {

            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'

        }
    ]

}, { timestamps: true })
// schema is a blueprint of the model which defines the structure of the document

const User = mongoose.model('User', userSchema)
// model is a class with which we construct documents based on the schema
export default User