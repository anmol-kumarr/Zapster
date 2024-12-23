import express from 'express'
import { checkUserName, insertData, login, logout, otpSender, SignUp } from '../controllers/auth.js'

const router=express.Router()

router.post('/otp',otpSender)
router.post('/signup',SignUp)
router.post('/login',login)
router.post('/logout',logout)
router.post('/check-username',checkUserName)

router.post('/insert-data',insertData)
export default router