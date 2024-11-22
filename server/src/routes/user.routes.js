import express from 'express'
import UserMiddleware from '../middleware/user.middleware.js'
import { getUserList, getUserProfile, userData } from '../controllers/user.js'

const router = express.Router()

router.get('/details', [UserMiddleware], userData)
router.get('/list/username', getUserList),
router.get('/get-profile/:userId',getUserProfile)

export default router