import express from 'express'
import * as authController from '../controllers/auth.controller.js'
import authentication from '../../../middlewares/authentication.js'
import passport from 'passport'

const router = express.Router()

router.get('/login-google', passport.authenticate('google',{scope:['profile', 'email']}))

router.get('/callback-google', passport.authenticate('google',{session: false}), authController.callbackGoogle)

router.get('/me', authentication, authController.getLoggedUserInfos)

router.post('/', authController.loginUser)

export default router