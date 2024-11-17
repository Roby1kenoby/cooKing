import express from 'express'
import authentication from '../../../middlewares/authentication.js'
import * as recipeIngredientController from '../controllers/recipeIngredient.controller.js'

const router = express.Router()

router.use(authentication)

router.post('/createRecipeIngredient', recipeIngredientController.createNewRecipeIngredient)

router.put('/:id/editRecipeIngredient', recipeIngredientController.editRecipeIngredient)

router.delete('/:id/deleteRecipeIngredient', recipeIngredientController.deleteRecipeIngredient)

export default router