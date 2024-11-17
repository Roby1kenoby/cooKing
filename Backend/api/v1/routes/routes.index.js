import express from 'express'

import userRouter from './users.rotuer.js'
import authRouter from './auth.router.js'
import ingredientRouter from './ingredients.router.js'
import tagRouter from './tags.router.js'
import phaseRouter from './phases.rotuer.js'
import recipeIngredientRouter from './recipeIngredients.router.js'
import recipeRouter from './recipes.router.js'
import utilityRouter from './utility.rotuer.js'

// this router collect all the routes used by this api version, 
// so that the versioning middleware can call them

const router = express.Router()
router.use('/users', userRouter)
router.use('/login', authRouter)
router.use('/ingredients', ingredientRouter)
router.use('/tags', tagRouter)
router.use('/phases', phaseRouter)
router.use('/recipeIngredients', recipeIngredientRouter)
router.use('/recipes', recipeRouter)
router.use('/utility', utilityRouter)

export default router