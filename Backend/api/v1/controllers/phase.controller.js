import Phase from '../../../models/v1/phaseSchema.js'
import * as PhaseService from '../services/phase.service.js'

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

        const createdPhase = await PhaseService.createPhaseHeader(data)

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

        const updatedPhase = await PhaseService.editPhase(data, phaseId)

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

        const deletedPhase = await PhaseService.deletePhase(phaseId)
        
        res.status(202).send(deletedPhase)

    } catch (error) {
        console.log(error)
        res.status(error.status).send(error.message)
    }
}
