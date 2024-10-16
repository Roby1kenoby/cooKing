import {model, Schema} from 'mongoose'

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            select: false
        },
        userName: {
            type: String
        },
        avatarUrl: {
            type: String
        },
        name: {
            type: String
        },
        surname: {
            type: String
        },
        preferredMu :{
            type: String
        },
        googleId :{
            type: String
        }
    },
    {
        collection: 'users',
        timestamps: true
    }
)

const User = model('User', userSchema)

export default User