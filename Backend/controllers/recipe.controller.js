import Recipe from '../models/recipeSchema.js'


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

        const recipeExists = await Recipe.findOne({title: data.title})
        if (recipeExists){
            const error = new Error('Recipe with the same title already exists')
            error.status = 409
            throw error
        }

        const newRecipe = new Recipe({
            userId: userId,
            tagsIds: data.tagsIds,
            title: data.title,
            description: data.description,
            portions: data.portions,
            preparationTime: data.preparationTime,
            recipeImageUrl: data.recipeImageUrl,
            recipeVideoUrl: data.recipeVideoUrl,
            privateRecipe: data.privateRecipe,
            phases: data.phases,
            recipeIngredients: data.recipeIngredients
        })

        const createdRecipe = await newRecipe.save()

        if(!createdRecipe){
            const error = new Error('Failed to create recipe')
            error.status = 500
            throw error
        }

        res.status(201).send(createdRecipe)

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

        const recipeExists = await Recipe.exists({_id: recipeId})

        if(!recipeExists){
            const error = new Error('Recipe Not Found')
            error.status = 404
            throw error
        }

        const newRecipeAlreadyExists = await Recipe.exists({title: data.title})

        if (newRecipeAlreadyExists) {
            const error = new Error('Edited Ingredient Already Exists')
            error.status = 409
            throw error
        }

        const editedRecipe = {
            userId: userId,
            tagsIds: data.tagsIds,
            title: data.title,
            description: data.description,
            portions: data.portions,
            preparationTime: data.preparationTime,
            recipeImageUrl: data.recipeImageUrl,
            recipeVideoUrl: data.recipeVideoUrl,
            privateRecipe: data.privateRecipe,
            phases: data.phases,
            recipeIngredients: data.recipeIngredients
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, editedRecipe, {new: true})
        await updatedRecipe.save()
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
