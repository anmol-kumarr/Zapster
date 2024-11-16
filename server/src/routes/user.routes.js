import express from 'express'
import UserMiddleware from '../middleware/user.middleware.js'
import { userData } from '../controllers/user.js'

const router=express.Router()

router.get('/details',[UserMiddleware],userData)

export default router