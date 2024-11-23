import mongoose from 'mongoose'
import User from '../models/user.model.js'

export const userData = async (req, res) => {
    try {
        const userId = req.user.id
        const userDetails = await User.findById(userId)

        userDetails.toObject()
        userDetails.password = null


        return res.status(200).json({
            success: true,
            message: 'details fetched successfully',
            data: userDetails
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}



export const getUserList = async (req, res) => {
    try {
        const { userName } = req.query
        console.log("userName", req.query.userName)

        const response = await User.find({
            userName: { $regex: new RegExp(userName, 'i') }
        }).select('userName profilePicture fullName').limit(5);
        // console.log(response)
        if (!response.length > 0) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Username fetched successfully',
            data: response
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}



export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId
        console.log(userId)
        const getUser = await User.findById(userId).select('fullName userName profilePicture gender')

        if (getUser === undefined) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            data: getUser
        })
    } catch (err) {
        console.log(err)
    }
}


export const addFriends = async (req, res) => {
    try {
        const { userId } = req.body
        const myId = req.user.id



        const session = await mongoose.startSession()
        session.startTransaction()



        await User.findByIdAndUpdate(
            myId,
            { $push: { friends: userId } },
            { new: true, session }
        );


        await User.findByIdAndUpdate(
            userId,
            { $push: { friends: myId } },
            { new: true, session }
        )


        await session.commitTransaction();


        return res.status(200).json({
            success: true,
            message: 'Friends added'
        })



    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: true,
            message: 'Internal server error'
        })
    }
}



export const getFriends = async (req, res) => {
    try {
        const userId = req.user.id
        const getDetails = await User.findById(userId).populate({
            path: 'friends',
            select: 'fullName userName profilePicture gender'
        }).select('friends')

        return res.status(200).json({
            success: true,
            message: 'Friends fetched successfully',
            data: getDetails
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}