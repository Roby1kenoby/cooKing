import mongoose from "mongoose"
import 'dotenv/config'

const mongoDbConnection = async () => {
    const connectionString = process.env.MONGODB_CONNECTION_STRING
    try {
        await mongoose.connect(connectionString)
        console.log('Connected to mongoDb')
    } catch (error) {
        console.log(error)
    }
}

export default mongoDbConnection