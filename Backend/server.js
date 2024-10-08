import express from 'express'
import 'dotenv/config'
import mongoDbConnection from './configs/db.js'
import passport from 'passport'
import googleStrategy from './configs/passport.config.js'
import cors from 'cors'
// router import
import userRouter from './routes/users.rotuer.js'
import authRouter from './routes/auth.router.js'
import ingredientRouter from './routes/ingredients.router.js'
import tagRouter from './routes/tags.router.js'
import phaseRouter from './routes/phases.rotuer.js'
import recipeIngredientRouter from './routes/recipeIngredients.router.js'
import recipeRouter from './routes/recipes.router.js'
import morgan from 'morgan'

const server = express()
server.use(express.json())
server.use(cors())
server.use(morgan('dev'))

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log('Server up and running on port ' + port)
})

// connecting to mongoDb.
mongoDbConnection()

passport.use('google', googleStrategy)
// routes

server.use('/users', userRouter)
server.use('/login', authRouter)
server.use('/ingredients', ingredientRouter)
server.use('/tags', tagRouter)
server.use('/phases', phaseRouter) // todo
server.use('/recipeIngredients', recipeIngredientRouter)
server.use('/recipes', recipeRouter)
