import express from 'express'
import * as userController from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', userController.getAllUsers)

router.get('/:id', userController.getSpecificUser)

router.get('/:id/recipes', userController.getSpecificUserRecipes)

router.get('/:id/ingredients', userController.getSpecificUserPrivateIngredients)

router.get('/:id/tags', userController.getSpecificUserPrivateTags)

router.post('/createUser', userController.createNewUser)

router.put('/:id/editUser', userController.editSpecificUser)

router.put('/:id/editUserAvatar', userController.editSpecificUserAvatar)

router.delete('/:id/deleteUser', userController.deleteSpecificUser)

export default router