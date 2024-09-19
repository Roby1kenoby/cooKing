import Phase from '../models/phaseSchema.js'

/* -------------- GET --------------*/

/* -------------- POST --------------*/
export const createNewPhase = async function(req,res){
    const data = req.body

    try {
        // search for already existing user
        const userExists = await User.exists({email: data.email})
        
        // user already existing
        if(userExists) {
            const error = new Error('Cannot register this user')
            error.status = 409
            throw error
        }

        // creating new user
        const newUser = new User({
            email: data.email,
            password: await bcrypt.hash(data.password, 10),
            username: data.username,
            avatarUrl: avatarPath,
            name: data.name,
            surname: data.surname,
            preferredMu: data.preferredMu,
        })
        const createdUser = await newUser.save()

        // if failed
        if(!createdUser){
            const error = new Error('Failed to create user')
            error.status = 400
            throw error
        }

        res.status(201).send(createdUser)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
    
}

/* -------------- PUT --------------*/
export const editPhase = function(req,res){
    console.log('ciao')
    res.send()
}

/* -------------- DELETE --------------*/
export const deletePhase = function(req,res){
    console.log('ciao')
    res.send() 
}