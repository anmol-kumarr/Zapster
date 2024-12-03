import Notification from "../models/notification.model.js"
import User from "../models/user.model.js"

const sendRequest = async (req, res) => {
    try {
        const { requestedUserId, message, notificationType, userName } = req.body
        const userId = req.user.id

        const findUser = await User.findById(userId)
        if (findUser && findUser.notifications) {
            const createNotification = await Notification.create({
                message,
                notificationType, isSeen: false,
                userId: findUser?._id,
                userRequested: requestedUserId
            })
            const updateUser = await User.findByIdAndUpdate(friendId, { $push: { notifications: createNotification._id } }, { new: true })

            if (findUser) {
                return res.status(200).json(
                    {
                        message: 'successfully added notification',
                        success: true,
                    }
                )
            }
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

const acceptRequest = async (req, res) => {
    try {
        const userId = req.user.id
        const { userRequested } = req.body

        const findNotification = await Notification.findOne({ userRequested: userRequested, userId: userId })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}


export const getAllNotificationsAndRequest = async (req, res) => {
    try {
        const userId = req.user.id
        const findUser = await User.findById(userId).select('notifications friendRequest requestSend').populate({
            path: 'notifications',
            populate: {
                path: 'userRequested',
                select: 'userName _id fullName profilePicture'
            }
        }).populate({
            path: 'friends',
            select: "userName _id fullName profilePicture"
        })

        if (findUser) {
            return res.status(200).json({
                success: true,
                message: 'data fetched successfully',
                data: findUser
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'not found'
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}