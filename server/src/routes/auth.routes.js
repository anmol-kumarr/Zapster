import express from 'express'
import { login } from '../controllers/auth.js'

const router=express.Router()


router.post('/signup',login)
router.post('/login',login)
router.post('/logout',login)


export default router