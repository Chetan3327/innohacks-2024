import express from 'express'
import {registerUser, loginUser, allUser, findUser} from '../controllers/user.controllers.js'
import { sendChatMessage, getChatMessages } from '../controllers/chat.controllers.js';
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/all', verifyToken, allUser)
router.get('/', verifyToken, findUser)
router.post('/chat/send', verifyToken, sendChatMessage);
router.get('/chat/messages', verifyToken, getChatMessages);

export default router