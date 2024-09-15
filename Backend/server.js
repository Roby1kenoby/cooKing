import express from 'express'
import 'dotenv/config'

const server = express()
server.use(express.json())

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log('Server up and running on port ' + port)
})