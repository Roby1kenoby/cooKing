import Ingredient from '../models/ingredientSchema.js'


/* -------------- GET --------------*/

export const getAllIngredients = function(req, res){

}

export const getPrivateIngredients = async function(req, res){
    const searchString = req.query.searchString
    const userId = req.loggedUser._id

    try {

        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }
        // if ther's a searchString, i filter the ingredient list.
        // i get only the ingredients that has userId = userId of logged user
        const ingredientsList = await Ingredient.find(
                searchString ? 
                    {$and:[{name: {$regex: searchString ,$options: "i"}}, {userId: userId}]}
                    : {userId: userId})
        
        res.send(ingredientsList)

    } catch (error) {
        res.status(500).send('Ingredients not found')
    }
}

export const getPublicIngredients = async function(req, res){
    const searchString = req.query.searchString
    try {
        // if ther's a searchString, i filter the ingredient list.
        // i get only the ingredients that has no userId
        const ingredientsList = await Ingredient.find(
                searchString ? 
                    {$and:[{name: {$regex: searchString ,$options: "i"}}, {userId: null}]}
                    : {userId: null})
        
        res.send(ingredientsList)

    } catch (error) {
        res.status(500).send('Ingredients not found')
    }
}

/* -------------- POST --------------*/

export const createNewPrivateIngredient = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body
    
    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const ingredientExists = Ingredient.findOne({name: data.name})
        if (ingredientExists){
            const error = new Error('Ingredient already exists')
            error.status = 500
            throw error
        }

        const newPrivateIngredient = new Ingredient({
            category1: data.category1,
            cateogry2: data.category2,
            name: data.name,
            measurementCategory: data.measurementCategory,
            userId: data.userId
        })

        

        const createdPrivateIngredient = await newPrivateIngredient.save()

        if(!createdPrivateIngredient){
            const error = new Error('Failed to create private ingredient')
            error.status = 500
            throw error
        }

        res.status(201).send(createdPrivateIngredient)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
    
    
}

/* -------------- PUT --------------*/

export const editPrivateIngredient = function(req, res){

}

/* -------------- DELETE --------------*/

export const deletePrivateIngredient = function(req, res){

}
