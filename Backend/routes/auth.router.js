import express from 'express'
import * as authController from '../controllers/auth.controller.js'
const router = express.Router()

router.get('/me', authController.getLoggedUserInfos)

//router.get('/login-google', passportStrategy)

//router.get('/callback-google', passportStrategy)

router.post('/', authController.loginUser)

export default router