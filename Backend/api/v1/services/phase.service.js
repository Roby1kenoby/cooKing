import Phase from '../../../models/v1/phaseSchema.js'
import * as RecipeIngredientService from '../services/recipeIngredient.service.js'

export const createPhaseHeader = async function(data, session=null){
    const newPhase = new Phase({
        recipeId: data.recipeId,
        phaseIngredients: data.phaseIngredients,
        phaseNumber: data.phaseNumber,
        description: data.description,
        phaseImageUrl: data.phaseImageUrl
    })

    const options = session ? {session} : {}

    const createdPhase = await newPhase.save(options)

    if(!createdPhase){
        const error = new Error('Failed to create phase')
        error.status = 500
        throw error
    }

    return createdPhase
}

export const savePhase = async function(data, session=null){
    const phaseHeader = {
        recipeId: data.recipeId,
        phaseNumber: data.phaseNumber,
        description: data.description,
        phaseImageUrl: data.phaseImageUrl,
        phaseIngredients: []
    }

    const phaseIngredientsArray = data.phaseIngredients
    const recipeId = data.recipeId
    // saving the phase to get it's id
    const createdPhase = await createPhaseHeader(phaseHeader, session)
    const createdPhaseId = createdPhase._id
    
    const savedIngredients = []

    for (let ingredient of phaseIngredientsArray){
        const currentIngredient = {...ingredient, phaseId: createdPhaseId, recipeId: recipeId}
        const createdPhaseIngredient = await RecipeIngredientService.createRecipeIngredient(currentIngredient, session)
        savedIngredients.push(createdPhaseIngredient._id)
    }

    createdPhase.phaseIngredients = savedIngredients

    if(!createdPhase){
        const error = new Error('Failed to save phase')
        error.status = 500
        throw error
    }

    await createdPhase.save(session)

    return createdPhase
}

export const editPhase = async function(data, phaseId, session=null){

    const phaseExists = await Phase.exists({_id: phaseId})

    if(!phaseExists){
        const error = new Error('Phase not found')
        error.status = 404
        throw error
    }

    const editedPhase = {
        recipeId: data.recipeId,
        phaseIngredients: data.phaseIngredients,
        phaseNumber: data.phaseNumber,
        description: data.description,
        phaseImageUrl: data.phaseImageUrl
    }

    const updatedPhase = await Phase.findByIdAndUpdate(phaseId, editedPhase, {new: true})
    
    if(!updatedPhase) {
        const error = new Error('Failed to update phase')
        error.status = 500
        throw error
    }

    const options = session ? {session} : {}

    await updatedPhase.save(options)

    return updatedPhase
}

export const deletePhase = async function(phaseId){

    const phaseExists = await Phase.exists({_id: phaseId})

    if(!phaseExists){
        const error = new Error('Phase Not Found')
        error.status = 404
        throw error
    }

    const deletedPhase = await Phase.findByIdAndDelete(phaseId, {new: true})

    if(!deletedPhase) {
        const error = new Error('Failed to delete phase')
        error.status = 500
        throw error
    }

    return deletedPhase
}

export const bulkDeletePhases = async function(recipeId, session=null){

    const deletedPhases = await Phase.deleteMany({recipeId: recipeId})
    if(!deletedPhases){
        const error = new Error('Failed to delete phases via recipeId')
        error.status = 500
        throw error
    }
    
    return deletedPhases
}