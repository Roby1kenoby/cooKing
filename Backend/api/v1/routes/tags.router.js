import express from 'express'
import authentication from '../../../middlewares/authentication.js'
import * as tagController from '../controllers/tag.controller.js'

const router = express.Router()

router.get('/public', tagController.getPublicTags)

router.use(authentication)

router.get('/', tagController.getAllTags)

router.get('/private', tagController.getPrivateTags)

router.post('/createPrivateTag', tagController.createNewPrivateTag)

router.put('/:id/editPrivateTag', tagController.editPrivateTag)

router.delete('/:id/deletePrivateTag', tagController.deletePrivateTag)

export default router