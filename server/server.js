import express from 'express';
import 'dotenv/config'
import dbConnect from './src/config/dbConnect.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import messageRoutes from './src/routes/message.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import userRoutes from './src/routes/user.routes.js'
import notificationRoutes from './src/routes/notification.routes.js'
import { app, server } from './socket.js';
import cluster from 'cluster';
import os from 'os';



app.use(express.json()) //parse json body from request
app.use(cookieParser()) // to parse cookie from client
app.use(cors({
    // origin:'https://zapster-brown.vercel.app',
    origin:process.env.WEb_APP_URL,
    credentials:true
}))
// server.listen(4000 || 4001,()=>{
//     console.log('Server is running')
// })



app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/message',messageRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/notification',notificationRoutes)

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Restart the worker
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    server.listen(process.env.PORT || 4001, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
app.get('/',(req,res)=>{
    res.status(200).json({
        success:true
    })
})

dbConnect() //connect to database