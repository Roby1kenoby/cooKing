import express from 'express'
import authentication from '../middlewares/authentication.js'
import * as recipeController from '../controllers/recipe.controller.js'

const router = express.Router()

// router.get('/public', recipeController.getPublicRecipes)

router.use(authentication)

// router.get('/', recipeController.getAllRecipes)

// router.get('/private', recipeController.getPrivateRecipes)

// this route saves the recipe header in the db
router.post('/createRecipeHeader', recipeController.createNewRecipeHeader)

// this route takes a full recipe object from the frontend, and calls other routes to save every component
// of the recipe, referencing them with one another after the save
router.post('/saveRecipe', recipeController.saveRecipe)

router.put('/:id/editRecipe', recipeController.editRecipe)

// router.delete('/:id/deletePrivateIngredient', recipeController.deleteRecipe)

export default router