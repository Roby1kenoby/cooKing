import express from 'express'
import authentication from '../middlewares/authentication.js'
import * as ingredientController from '../controllers/ingredient.controller.js'

const router = express.Router()

router.get('/', ingredientController.getAllIngredients)

router.get('/private', authentication, ingredientController.getPrivateIngredients)

router.get('/public', ingredientController.getPublicIngredients)

router.post('/createPrivateIngredient', authentication, ingredientController.createNewPrivateIngredient)

router.put('/:id/editPrivateIngredient', authentication, ingredientController.editPrivateIngredient)

router.delete('/:id/deletePrivateIngredient', authentication, ingredientController.deletePrivateIngredient)

export default router