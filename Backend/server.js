import express from 'express'
import 'dotenv/config'
import mongoDbConnection from './configs/db.js'

// router import
import userRouter from './routes/users.rotuer.js'
import authRouter from './routes/auth.router.js'
import ingredientRouter from './routes/ingredients.router.js'
import tagRouter from './routes/tags.router.js'

const server = express()
server.use(express.json())

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log('Server up and running on port ' + port)
})

// connecting to mongoDb.
mongoDbConnection()

// routes

server.use('/users', userRouter)
server.use('/login', authRouter)
server.use('/ingredients', ingredientRouter)
server.use('/tags', tagRouter)
