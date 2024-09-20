import Phase from '../models/phaseSchema.js'


/* -------------- GET --------------*/

/* -------------- POST --------------*/

export const createNewPhase = async function(req, res){
    const userId = req.loggedUser._id
    const data = req.body
    
    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const newPhase = new Phase({
            recipeId: data.recipeId,
            recipeIngredientsIds: data.recipeIngredientsIds,
            phaseNumber: data.phaseNumber,
            description: data.description,
            phaseImageUrl: data.phaseImageUrl
        })

        const createdPhase = await newPhase.save()

        if(!createdPhase){
            const error = new Error('Failed to create phase')
            error.status = 500
            throw error
        }

        res.status(201).send(createdPhase)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }

}

/* -------------- PUT --------------*/

export const editPhase = async function(req, res){
    const userId = req.loggedUser._id
    const phaseId = req.params.id
    const data = req.body

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const phaseExists = await Phase.exists({_id: phaseId})

        if(!phaseExists){
            const error = new Error('Phase Not Found')
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
        await updatedPhase.save()
        res.status(202).send(updatedPhase)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}

/* -------------- DELETE --------------*/

export const deletePhase = async function(req, res){
    const userId = req.loggedUser._id
    const phaseId = req.params.id

    try {
        if (!userId){
            const error = new Error('Unauthorized access lvl 1')
            error.status = 401
            throw error
        }

        const phaseExists = await Phase.exists({_id: phaseId})

        if(!phaseExists){
            const error = new Error('Recipe Ingredient Not Found')
            error.status = 404
            throw error
        }

        const deletedPhase = await Phase.findByIdAndDelete(phaseId, {new: true})
        res.status(202).send(deletedPhase)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}
