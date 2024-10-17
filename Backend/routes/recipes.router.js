import express from 'express'
import authentication from '../middlewares/authentication.js'
import checkRecipe from '../middlewares/checkRecipe.js'
import * as recipeController from '../controllers/recipe.controller.js'

const router = express.Router()

router.post('/public', recipeController.getPublicRecipes)

router.use(authentication)

router.get('/:id', recipeController.getSpecificRecipe)

router.post('/', recipeController.getAllRecipes)

router.post('/private', recipeController.getPrivateRecipes)

// this route saves the recipe header in the db
router.post('/createRecipeHeader', recipeController.createNewRecipeHeader)

// this route takes a full recipe object from the frontend, and calls other routes to save every component
// of the recipe, referencing them with one another after the save
router.post('/saveRecipe', checkRecipe, recipeController.saveRecipe)

router.put('/:id/editRecipe', recipeController.editRecipe)

router.delete('/:id/deleteRecipe', recipeController.deleteRecipe)

export default router