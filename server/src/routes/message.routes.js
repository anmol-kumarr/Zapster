import express from 'express'
import UserMiddleware from '../middleware/user.middlerware.js'
import { sendMessage } from '../controllers/message.js'

const router=express.Router()


router.post('/send/:id',[UserMiddleware],sendMessage)



export default router