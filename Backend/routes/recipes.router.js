import express from 'express'
import authentication from '../middlewares/authentication.js'
import * as recipeController from '../controllers/recipe.controller.js'

const router = express.Router()

// router.get('/public', recipeController.getPublicRecipes)

router.use(authentication)

// router.get('/', recipeController.getAllRecipes)

// router.get('/private', recipeController.getPrivateRecipes)

router.post('/createRecipe', recipeController.createNewRecipeHeader)

router.put('/:id/editRecipe', recipeController.editRecipe)

// router.delete('/:id/deletePrivateIngredient', recipeController.deleteRecipe)

export default router