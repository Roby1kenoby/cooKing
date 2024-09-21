import Phase from '../models/phaseSchema.js'

export const createPhase = async function(data, session=null){
    const newPhase = new Phase({
        recipeId: data.recipeId,
        recipeIngredientsIds: data.recipeIngredientsIds,
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

export const editPhase = async function(data, phaseId, session=null){

    const phaseExists = await Phase.exists({_id: phaseId})

    if(!phaseExists){
        const error = new Error('Phase not found')
        error.status = 404
        throw error
    }

    const editedPhase = {
        recipeId: data.recipeId,
        recipeIngredientsIds: data.recipeIngredientsIds,
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