import express from 'express'
import UserMiddleware from '../middleware/user.middleware.js'
import { addFriends, getFriends, getUserList, getUserProfile, userData } from '../controllers/user.js'

const router = express.Router()

router.get('/details', [UserMiddleware], userData)
router.get('/list/username', getUserList),
router.get('/get-profile/:userId',getUserProfile)
router.post('/add-friends',[UserMiddleware],addFriends)
router.get('/get-friends',[UserMiddleware],getFriends)

export default router