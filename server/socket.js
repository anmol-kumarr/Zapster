import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Message from './src/models/message.model.js'
import Conversation from './src/models/conversation.model.js'
import Notification from './src/models/notification.model.js'
import User from './src/models/user.model.js'
import 'dotenv/config'


export const app = express()

export const server = http.createServer(app)

export const io = new Server(server, {
    cors: {
        origin: process.env.WEb_APP_URL,
        // origin:'http://localhost:5173',
        methods: ["GET", "POST"]
        // ['http://localhost:5173']

    }
})

const connectedUser = {}
const socketToUser = {}

io.on('connection', (socket) => {
    console.log('user connected', socket.id)
    const userId = socket.handshake.query.userId
    console.log(userId)


    if (userId) {
        connectedUser[userId] = socket.id
        socketToUser[socket.id] = userId
    }
    console.log('connectedUser', connectedUser)

    socket.on('sendMessage', async (data) => {
        console.log(data)

        const toSend = connectedUser[data?.userId]
        console.log(toSend)
        const senderId = socketToUser[socket.id]
        const receiverId = data?.userId




        const findConversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } })

        if (findConversation && data.message) {
            const message = new Message({
                senderId: senderId,
                content: data?.message,
                receiverId: receiverId,
                conversation: findConversation._id
            })

            const newMessage = await message.save()

            await Conversation.findOneAndUpdate({
                participants: { $all: [senderId, receiverId] }
            },
                {
                    $push: { messages: newMessage._id }
                }, { new: true }
            )

            if (!findConversation && newMessage) {
                io.to(socket.id).emit('errorMessage', 'Something went wrong')

            }


            if (toSend) {
                console.log(toSend)
                io.to(toSend).emit('receiveMessage', newMessage)
            }
            io.to(socket.id).emit('receiveMessage', newMessage)
        }





    })


    socket.on('sendNotification', async (data) => {
        console.log(data)
        const toSend = connectedUser[data.friendId]
        // const senderId=socketToUser[]
        const createNotification = await Notification.create({
            userRequested: data.userId,
            message: data.message,
            isSeen: false,
            notificationType: 'Request',
            userId: data?.friendId
        })

        const updateFriend = await User.findByIdAndUpdate(data?.friendId, {
            $push: {
                notifications: createNotification?._id, friendRequest: data.userId
            }

        }, { new: true }).select('notifications').populate({
            path: 'notifications',
            populate: {
                path: 'userRequested',
                select: 'userName _id fullName profilePicture'
            }
        })


        const updateUser = await User.findByIdAndUpdate(data?.userId, {
            $push: {
                requestSend: data.friendId
            }
        })
        // updateFriend.toObject()
        // updateFriend.

        if (toSend) {
            io.to(toSend).emit('friendRequestReceive', updateFriend)
            console.log(updateFriend)
        }
    })

    socket.on('acceptRequest', async (data) => {
        console.log(data)
        const toSend = connectedUser[data.friendId]

        const createConversation = await Conversation.create({
            participants: [data?.userId, data?.friendId],
            messages: []
        })




        const addFriend = await User.findByIdAndUpdate(data.userId, { $push: { friends: data.friendId }, $pull: { friendRequest: data.friendId } }, { new: true }).select('userName _id fullName profilePicture')


        const createNotification = await Notification.create({
            message: data?.message,
            userId: data.friendId,
            notificationType: 'Accept',
            isSeen: false,
            userRequested: data.userId
        })


        const updateFriend = await User.findByIdAndUpdate(data.friendId, {
            $push: { friends: data.userId, notifications: createNotification._id },
            $pull: { requestSend: data.userId }
        },
            { new: true }
        ).select('userName _id fullName profilePicture').populate({
            path: 'notifications',
            populate: {
                path: 'userRequested',
                select: 'userName _id fullName profilePicture'
            },
            options: { sort: { createdAt: -1 }, limit: 1 }
        })

        const deleteNotification = await Notification.findByIdAndDelete(data?.notificationId)
        if (toSend) {
            io.to(toSend).emit('requestAccepted', { addFriend, updateFriend })
        }

        
        const { userName, profilePicture, _id, fullName } = updateFriend;
        io.to(socket.id).emit('friendAdded',{ userName, profilePicture, _id, fullName})


    })



    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })


})


// const newMessage={
//     content: data.message,
//     conversation: "67459e90d6f3e40495eb0952",
//     createdAt: "2024-11-26T15:30:50.595Z",
//     receiverId: "6741a5b4ae008673a35fe251",
//     senderId: "6741a5c7ae008673a35fe254",
//     updatedAt: "2024-11-26T15:30:50.595Z",
//     __v: 0,
//     _id: "6745e9aa487f8a36f8da589b",
// }
