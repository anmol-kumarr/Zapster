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


        const message = new Message({
            senderId: senderId,
            content: data?.message,
            receiverId: receiverId
        })
        // const newMessage=await message.save()

        const findConversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } })

        if (!findConversation && message) {
            io.to(socket.id).emit('errorMessage','Something went wrong')
        } else {

            await Conversation.findOneAndUpdate({
                participants: { $all: [senderId, receiverId] }
            },
                {
                    $push: { messages: message._id }
                }, { new: true }
            )
        }

        



        if (toSend) {
            console.log(toSend)
            io.to(toSend).emit('receiveMessage', message)
        }



    })
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })
})
