import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'
import 'dotenv/config'

export default (req, res, next) => {
    const userData = req.headers.authorization
    
    if(!userData) return res.status(400).send("Unauthorized access")
    
    const authParts = userData.split(' ')
    
    if(authParts.length != 2) return res.status(400).send("Unauthorized access lvl 2")
    
    if(authParts[0] != 'Bearer') return res.status(400).send("Unauthorized access lvl 3")
    
    const token = authParts[1]
    
    // veryfing the token
    jwt.verify(token, 
        
        process.env.JWT_SECRET, 
        
        // function to manage the token
        async (err, payload) => {
            
            if(err) return res.status(500).send('Server Error' + err)
            
            // retrieving user from db
            const foundUser = await User.findById(payload.userId).select('-password')
        
            if(!foundUser) return res.status(400).send('Unauthorized access')

            // adding the userData to the request
            req.loggedUser = foundUser
            
            next()
    })
}
