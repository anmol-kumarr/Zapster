import express from 'express'
import UserMiddleware from '../middleware/user.middleware.js'
import { getAllNotificationsAndRequest } from '../controllers/friend.js'

const router=express.Router()


router.get('/getNotifications',[UserMiddleware],getAllNotificationsAndRequest)

export default router