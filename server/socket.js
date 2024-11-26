import express from 'express'
import http from 'http'
import { Server } from 'socket.io'


export const app = express()

export const server = http.createServer(app)

export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
        // ['http://localhost:5173']

    }
})

let connectedUser = {}
io.on('connection', (socket) => {
    console.log('user connected', socket.id)
    const userId = socket.handshake.query.userId
    console.log(userId)

    
    if (userId) {
        connectedUser[userId] = socket.id
    }
    console.log('connectedUser',connectedUser)

    socket.on('sendMessage', (data) => {
        console.log(data)
        let toSend = connectedUser[data?.userId]
        console.log(toSend)
        if (toSend) {
            console.log(toSend)
            io.to(toSend).emit('receiveMessage', data?.message)
        }
    })
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })
})
