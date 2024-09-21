import RecipeIngredient from '../models/recipeIngredientSchema.js'

export const createRecipeIngredient = async function(data, session=null){
    const newRecipeIngredient = new RecipeIngredient({
        recipeId: data.recipeId,
        ingredientId: data.ingredientId,
        measurementUnit: data.measurementUnit,
        quantity: data.quantity,
        additionalInfos: data.additionalInfos
    })

    const options = session ? {session} : {}

    const createdRecipeIngredient = await newRecipeIngredient.save(options)

    if(!createdRecipeIngredient){
        const error = new Error('Failed to create recipe ingredient')
        error.status = 500
        throw error
    }

    return createdRecipeIngredient
}

export const editRecipeIngredient = async function(data, recipeIngredientId){

    const recipeIngredientExists = await RecipeIngredient.exists({_id: recipeIngredientId})

    if(!recipeIngredientExists){
        const error = new Error('Recipe ingredient not found')
        error.status = 404
        throw error
    }

    const editedRecipeIngredient = {
        recipeId: data.recipeId,
        ingredientId: data.ingredientId,
        measurementUnit: data.measurementUnit,
        quantity: data.quantity,
        additionalInfos: data.additionalInfos
    }

    const updatedRecipeIngredient = await RecipeIngredient.findByIdAndUpdate(recipeIngredientId, editedRecipeIngredient, {new: true})
    
    if(!editedRecipeIngredient) {
        const error = new Error('Failed to create recipe ingredient')
        error.status = 500
        throw error
    }

    await updatedRecipeIngredient.save()
    
    return updatedRecipeIngredient
}

export const deleteRecipeIngredient = async function(recipeIngredientId){

    const recipeIngredientExists = await RecipeIngredient.exists({_id: recipeIngredientId})

        if(!recipeIngredientExists){
            const error = new Error('Recipe ingredient not found')
            error.status = 404
            throw error
        }

        const deletedRecipeIngredient = await RecipeIngredient.findByIdAndDelete(recipeIngredientId, {new: true})
        
        if(!deletedRecipeIngredient) {
            const error = new Error('Failed to delete recipe ingredient')
            error.status = 500
            throw error
        }

        return deletedRecipeIngredient
}