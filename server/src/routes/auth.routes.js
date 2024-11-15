import express from 'express'
import { login, logout, otpSender, SignUp } from '../controllers/auth.js'

const router=express.Router()

router.post('/otp',otpSender)
router.post('/signup',SignUp)
router.post('/login',login)
router.post('/logout',logout)


export default router