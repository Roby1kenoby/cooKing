import Recipe from '../models/recipeSchema.js'
import * as RecipeService from '../services/recipe.service.js'

/* -------------- GET --------------*/

// export const getAllIngredients = async function(req, res){
//     const searchString = req.query.searchString
//     const userId = req.loggedUser._id
    
//     try {

//         if (!userId){
//             const error = new Error('Unauthorized access lvl 1')
//             error.status = 401
//             throw error
//         }
//         // if ther's a searchString, i filter the ingredient list (including private one).
//         const ingredientsListQuery = Ingredient.find(
//                 searchString ? 
//                     {$and:[{name: {$regex: searchString ,$options: "i"}}, {$or:[{userId: userId}, {userId: null}]}]}
//                     : {$or: [{userId: userId}, {userId: null}]})

//             ingredientsListQuery.sort({name: 1})
//             const ingredientsList = await ingredientsListQuery
//         res.send(ingredientsList)

//     } catch (error) {
//         console.log(error)
//         res.status(error.status).send(error.message)
//     }

// }

// export const getPrivateIngredients = async function(req, res){
//     const searchString = req.query.searchString
//     const userId = req.loggedUser._id

//     try {

//         if (!userId){
//             const error = new Error('Unauthorized access lvl 1')
//             error.status = 401
//             throw error
//         }
//         // if ther's a searchString, i filter the ingredient list.
//         // i get only the ingredients that has userId = userId of logged user
//         const ingredientsList = await Ingredient.find(
//                 searchString ? 
//                     {$and:[{name: {$regex: searchString ,$options: "i"}}, {userId: userId}]}
//                     : {userId: userId})
        
//         res.send(ingredientsList)

//     } catch (error) {
//         console.log(error)
//         res.status(error.status).send(error.message)
//     }
// }

// export const getPublicIngredients = async function(req, res){
//     const searchString = req.query.searchString
//     try {
//         // if ther's a searchString, i filter the ingredient list.
//         // i get only the ingredients that has no userId
//         const ingredientsListQuery = Ingredient.find(
//                 searchString ? 
//                     {$and:[{name: {$regex: searchString ,$options: "i"}}, {userId: null}]}
//                     : {userId: null})
//             ingredientsListQuery.sort({name: 1})
//         const ingredientsList = await ingredientsListQuery
        
//         res.send(ingredientsList)

//     } catch (error) {
//         res.status(500).send('Ingredients not found')
//     }
// }

/* -------------- POST --------------*/

export const createNewRecipeHeader = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body
    
    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const createdRecipe = await RecipeService.createRecipeHeader(data, userId)

        res.status(201).send(createdRecipe)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }

}

export const saveRecipe = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const savedRecipe = await RecipeService.saveRecipe(data, userId)
        res.status(201).send(savedRecipe)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

/* -------------- PUT --------------*/

export const editRecipe = async function(req, res){
    const userId = req.loggedUser._id
    const recipeId = req.params.id
    const data = req.body

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const updatedRecipe = await RecipeService.updatedRecipe(data, recipeId, userId)
        
        res.status(202).send(updatedRecipe)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

/* -------------- DELETE --------------*/

// export const deletePrivateIngredient = async function(req, res){
//     const userId = req.loggedUser._id
//     const privateIngredientId = req.params.id

//     try {
//         if (!userId){
//             const error = new Error('Unauthorized access lvl 1')
//             error.status = 401
//             throw error
//         }

//         const privateIngredientExists = await Ingredient.exists({_id: privateIngredientId})

//         if(!privateIngredientExists){
//             const error = new Error('Ingredient Not Found')
//             error.status = 404
//             throw error
//         }

//         const deletedPrivateIngredient = await Ingredient.findByIdAndDelete(privateIngredientId, {new: true})
//         res.status(202).send(deletedPrivateIngredient)

//     } catch (error) {
//         console.log(error)
//         res.status(error.status).send(error.message)
//     }
// }
