import RecipeIngredient from '../models/recipeIngredientSchema.js'
import * as RecipeIngredientService from '../services/recipeIngredient.service.js'

/* -------------- GET --------------*/

/* -------------- POST --------------*/

export const createNewRecipeIngredient = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const createdRecipeIngredient = await RecipeIngredientService.createRecipeIngredient(data)

        res.status(201).send(createdRecipeIngredient)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }

}

/* -------------- PUT --------------*/

export const editRecipeIngredient = async function(req, res){
    const userId = req.loggedUser._id
    const recipeIngredientId = req.params.id
    const data = req.body

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const updatedRecipeIngredient = await RecipeIngredientService.editRecipeIngredient(data, recipeIngredientId)
        
        res.status(202).send(updatedRecipeIngredient)
        

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

/* -------------- DELETE --------------*/

export const deleteRecipeIngredient = async function(req, res){
    const userId = req.loggedUser._id
    const recipeIngredientId = req.params.id

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }
        
        const deletedRecipeIngredient = await RecipeIngredientService.deleteRecipeIngredient(recipeIngredientId)

        res.status(202).send(deletedRecipeIngredient)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}
