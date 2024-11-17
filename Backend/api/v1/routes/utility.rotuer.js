import express from 'express'
import cloudinary from '../../../middlewares/cloudinary.js'
import authentication from '../../../middlewares/authentication.js'
import * as utility from '../controllers/utility.controller.js'

const router = express.Router()
router.use(authentication)
router.post('/saveImage', cloudinary.single('image'), utility.saveImage)

export default router