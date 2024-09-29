import GoogleStrategy from 'passport-google-oauth20'
import User from '../models/userSchema.js'
import jwt from 'jsonwebtoken'

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}/${process.env.GOOGLE_CALLBACK}`
    },
    async function  (accessToken, refreshToken, profile, cb){
        const {given_name: name, family_name: surname, email, sub: googleId} = profile._json
        let foundUser = await User.findOne({googleId: googleId})

        if(!foundUser){
            const newUser = new User({
                email: email,
                name: name,
                surname: surname,
                googleId: googleId
            })
            foundUser = await newUser.save()
        }

        jwt.sign(
            {
                userId: foundUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            },
            (err, token) => {
                if(err){
                    const error = new Error('Unauthorized access lvl 3')
                    error.status = 400
                    throw error
                }
                const resp = {
                    jwtToken: token,
                    userData: foundUser
                }
                
                return cb(null, resp)
            }
        )
    }
)

export default googleStrategy