import RecipeIngredient from '../models/recipeIngredientSchema.js'


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

        const newRecipeIngredient = new RecipeIngredient({
            recipeId: data.recipeId,
            ingredientId: data.ingredientId,
            measurementUnit: data.measurementUnit,
            quantity: data.quantity,
            additionalInfos: data.additionalInfos
        })

        const createdRecipeIngredient = await newRecipeIngredient.save()

        if(!createdRecipeIngredient){
            const error = new Error('Failed to create recipe ingredient')
            error.status = 500
            throw error
        }

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

        const recipeIngredientExists = await RecipeIngredient.exists({_id: recipeIngredientId})

        if(!recipeIngredientExists){
            const error = new Error('Recipe Ingredient Not Found')
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
        await updatedRecipeIngredient.save()
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

        const recipeIngredientExists = await RecipeIngredient.exists({_id: recipeIngredientId})

        if(!recipeIngredientExists){
            const error = new Error('Recipe Ingredient Not Found')
            error.status = 404
            throw error
        }

        const deletedRecipeIngredient = await RecipeIngredient.findByIdAndDelete(recipeIngredientId, {new: true})
        res.status(202).send(deletedRecipeIngredient)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}
