import User from '../../../models/v1/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginUser = async function(req, res) {
    const data = req.body
    try {
        // searching for the user
        const foundUser = await User.findOne({email: data.email}).select('+password')
        if(!foundUser){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 400
            throw error
        }

        //verifying password
        const passwordOk = bcrypt.compareSync(data.password, foundUser.password)

        if(!passwordOk){
            const error = new Error('Unauthorized access lvl 2')
            error.status = 400
            throw error
        }

        // releasing token
        jwt.sign(
            {
                userId: foundUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '10h'
            },
            (err, token) => {
                if(err){
                    const error = new Error('Unauthorized access lvl 3')
                    error.status = 400
                    throw error
                }
                
                // need to convert the foundUser to a simpler object to remove the password
                const userObject = foundUser.toObject();
                delete userObject.password;

                res.send({
                    jwtToken: token,
                    userData: userObject
                })
            }
        )
    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

export const getLoggedUserInfos = function(req, res) {
    // non serve se ci pensa già la funzione di login?
    return res.send(req.loggedUser);
}

export const callbackGoogle = (req,res) => {
    console.log(req.user.jwtToken)
	const token = req.user.jwtToken
    console.log(`sto facendo il redirect a ${process.env.FRONTEND_URL}/api/login?token=${token}`)
	res.redirect(`${process.env.FRONTEND_URL}/api/login?token=${token}`)
}

