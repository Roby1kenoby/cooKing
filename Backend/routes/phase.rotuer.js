import express from 'express'
import * as phaseController from '../controllers/phase.controller.js'

const router = express.Router()

router.post('/createPhase', phaseController.createNewPhase)

router.put('/:id/editPhase', phaseController.editPhase)

router.delete('/:id/deletePhase', phaseController.deletePhase)

export default router