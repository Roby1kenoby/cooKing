import express from 'express'
import 'dotenv/config'
import mongoDbConnection from './configs/db.js'
import passport from 'passport'
import googleStrategy from './configs/passport.config.js'
import cors from 'cors'

// import middlewares
import apiVersioning from './middlewares/apiVersioning.js'

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

// routing via versioning middleware
server.use('/api', apiVersioning)
