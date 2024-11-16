import express from 'express'
import UserMiddleware from '../middleware/user.middleware.js'
import { getMessage, sendMessage } from '../controllers/message.js'

const router=express.Router()


router.post('/send/:id',[UserMiddleware],sendMessage)
router.get('/:id',[UserMiddleware],getMessage)



export default router