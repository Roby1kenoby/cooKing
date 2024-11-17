import mongoose from 'mongoose'
import Recipe from '../../../models/recipeSchema.js'
import * as RecipeIngredientService from './recipeIngredient.service.js'
import * as PhaseService from '../services/phase.service.js'

export const createRecipeHeader = async function(data, userId, session=null){

    const recipeExists = await Recipe.findOne({title: data.title})
    console.log(recipeExists)
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
    const options = session ? {session} : {}

    const createdRecipe = await newRecipe.save(options)

    if(!createdRecipe){
        const error = new Error('Failed to create recipe')
        error.status = 500
        throw error
    }
    
    return createdRecipe
}

export const saveRecipe = async function(data, userId){
    
    const recipeHeader = {
        userId: userId,
        tagsIds: data.tagsIds,
        title: data.title,
        description: data.description,
        portions: data.portions,
        preparationTime: data.preparationTime,
        recipeImageUrl: data.recipeImageUrl,
        recipeVideoUrl: data.recipeVideoUrl,
        privateRecipe: data.privateRecipe,
        phases: [],
        recipeIngredients: []
    }

    const ingredientsArray = data.recipeIngredients
    const phasesArray = data.phases

    // saving in one transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const createdRecipe = await createRecipeHeader(recipeHeader, userId, session)
        // at this point, we have a recipe on the db (in trasnaction) and in memory. I can edit
        // the recipe in memory, but if i do, i have to save again to commit the differences.
        const createdRecipeId = createdRecipe._id
        
        /**
         *      SAVING RECIPE INGREDIENTS
         */
        const savedIngredients = []
        // saving ingredients and getting ids to append to recipe
        for (let ingredient of ingredientsArray){
            const currentIngredient = {...ingredient, recipeId:createdRecipeId}
            const createdRecipeIngredient = await RecipeIngredientService.createRecipeIngredient(currentIngredient, session)
            savedIngredients.push(createdRecipeIngredient._id)
        }

        createdRecipe.recipeIngredients = savedIngredients

        /**
         *      SAVING RECIPE PHASES
         */

        const savedPhases = []
        
        for (let phase of phasesArray){
            const currentPhase = {...phase, recipeId:createdRecipeId}
            const createdPhase = await PhaseService.savePhase(currentPhase, session)
            savedPhases.push(createdPhase._id)
        }

        createdRecipe.phases = savedPhases

        // need to save again to commit the edits
        await createdRecipe.save(session)


        await session.commitTransaction();
        session.endSession();

        return createdRecipe

    } catch (error) {
        console.log(error)
        // if any error is thrown, abort transaction
        await session.abortTransaction();
        session.endSession();
        
        throw error
    }
}

export const getSpecificRecipe = async function(recipeId, userId){
    
    const recipeQuery = Recipe.findById(recipeId)
    .populate({
        path: 'phases',
        populate: {
            path: 'phaseIngredients',
            populate:{
                path: 'ingredientId'
            }
            
        }
    })
    .populate({
        path: 'recipeIngredients',
        populate: {
            path: 'ingredientId'
        }
    })
    .populate({
        path: 'tagsIds'
    })

    const recipe = await recipeQuery

    // if(recipe.privateRecipe && recipe.userId !== userId){
    //     const error = new Error('Private recipe')
    //     error.status = 404
    //     throw error
    // }

    if(!recipeQuery){
        const error = new Error('Recipe not found')
        error.status = 404
        throw error
    }

    return recipe


}

export const updateRecipe = async function(data, recipeId, userId, session=null){

    const recipeExists = await Recipe.exists({_id: recipeId})

    if(!recipeExists){
        const error = new Error('Recipe not found')
        error.status = 404
        throw error
    }

    const editedRecipeAlreadyExists = await Recipe.exists({title: data.title})

    if (editedRecipeAlreadyExists) {
        const error = new Error('Edited recipe already exists')
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
    console.log(editedRecipe)
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, editedRecipe, {new: true})
    
    if(!updatedRecipe) {
        const error = new Error('Failed to update phase')
        error.status = 500
        throw error
    }

    const options = session ? {session} : {}

    await updatedRecipe.save(options)

    return updatedRecipe
}

export const deleteRecipe = async function(recipeId){

    const recipeExists = await Recipe.exists({_id: recipeId})

    if(!recipeExists){
        const error = new Error('Recipe Not Found')
        error.status = 404
        throw error
    }

    const session = await mongoose.startSession()
    session.startTransaction()
    
    try {
        await RecipeIngredientService.bulkDeleteRecipeIngredients(recipeId, session)
        await PhaseService.bulkDeletePhases(recipeId, session)
        const deletedRecipe = await Recipe.deleteOne({_id: recipeId}, {new: true})

        if(!deletedRecipe){
            const error = new Error('Failed to delete recipe via recipeId')
            error.status = 500
            throw error
        }

        await session.commitTransaction();
        session.endSession();

        return deletedRecipe
    } catch (error) {
        console.log(error)
        // if any error is thrown, abort transaction
        await session.abortTransaction();
        session.endSession();
        
        throw error
    }
}