import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Message from './src/models/message.model.js'
import Conversation from './src/models/conversation.model.js'


export const app = express()

export const server = http.createServer(app)

export const io = new Server(server, {
    cors: {
        origin: "*",
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
                io.to(socket.id).emit('receiveMessage',newMessage)
            }
        }





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
