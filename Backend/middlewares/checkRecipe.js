import Recipe from "../models/recipeSchema.js"

export default async (req,res,next) => {
    const userId = req.loggedUser._id
    const recipeTitle = req.body.title

    try {
        const recipeAlreadyExists = await Recipe.findOne({$and:[{userId: userId},{title: recipeTitle}]})
        if(recipeAlreadyExists){
            const error = new Error('Recipe title already exists for this user')
            error.status = 401
            throw error
        }
        
        next()
    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
    

}