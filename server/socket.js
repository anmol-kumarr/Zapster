import express from 'express'
import http from 'http'
import { Server } from 'socket.io'


export const app = express()

export const server = http.createServer(app)

export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ["POST", "GET"]

    }
})


const connectedUser = {}
io.on('connection', (socket) => {
    console.log('user connected', socket.id)
    const userId = socket.handshake.query.userId
    console.log(userId)
    if(!userId) connectedUser[userId]=socket.id


    
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })
})
