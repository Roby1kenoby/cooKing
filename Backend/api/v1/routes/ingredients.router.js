import express from 'express'
import authentication from '../../../middlewares/authentication.js'
import * as ingredientController from '../controllers/ingredient.controller.js'

const router = express.Router()

router.get('/public', ingredientController.getPublicIngredients)

router.use(authentication)

router.get('/', ingredientController.getAllIngredients)

router.get('/private', ingredientController.getPrivateIngredients)

router.post('/createPrivateIngredient', ingredientController.createNewPrivateIngredient)

router.put('/:id/editPrivateIngredient', ingredientController.editPrivateIngredient)

router.delete('/:id/deletePrivateIngredient', ingredientController.deletePrivateIngredient)

export default router