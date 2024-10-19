import { useContext, useEffect, useState } from "react";
import { Card, Button, Col, Form, Row } from "react-bootstrap";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import AddIngredient from "../Ingredient/AddIngredient";
import './SinglePhaseBox.css'
function SinglePhaseBox({ phase, addedPhases, setAddedPhases }) {

    const [formData, setFormData] = useState(phase)
    const [disable, setDisable] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [phaseSaved, setPhaseSaved] = useState(false)
    const { newRecipe, editPhase, deletePhase, handlePhaseImageChange, dataReady, editModeContext } = useContext(NewRecipeContext)

    useEffect(()=>{
        console.log('newRecipe ', newRecipe)
    },[newRecipe])

    // function to update formData after receiving the recipe from the context
    const setDataFromContext = function () {
        if (dataReady) {
            console.log("phase:", phase)
            setFormData({
                tempId: phase.tempId,
                description: phase.description,
                phaseNumber: phase.phaseNumber,
                phaseImageUrl: phase.phaseImageUrl,
                phaseIngredients: phase.phaseIngredients

                // title: newRecipe.title || '',
                // description: newRecipe.description || '',
                // portions: newRecipe.portions || 1,
                // preparationTime: newRecipe.preparationTime || '',
                // recipeImageUrl: newRecipe.recipeImageUrl || '',
                // recipeVideoUrl: newRecipe.recipeVideoUrl || '',
                // privateRecipe: newRecipe.privateRecipe === undefined ? false : newRecipe.privateRecipe
            });
        }
    }

    useEffect(()=>{
        setDataFromContext()
    }, [dataReady])

    // function to change icons if editing a recipe instead of creating it.
    useEffect(() => {
        editModeContext ? setDisable(true) : setDisable(false)
        editModeContext ?setPhaseSaved(true) : setPhaseSaved(false)
    }, [])

    const handleFormChange = function (event) {
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const updatePhaseImage = (event) => {
        handlePhaseImageChange(phase.tempId, event.target.files[0])
    }

    const savePhase = function () {
        // debugger
        if (editMode) {
            editPhase(formData)
            setEditMode(!editMode)
        }
        else {
            editPhase(formData)
            setPhaseSaved(true)
        }
        setDisable(!disable)
    }

    const toggleMode = function () {
        setDisable(!disable)
        setEditMode(!editMode)
    }

    const removePhase = function () {
        deletePhase(formData)
        console.log(phase.tempId)
        setAddedPhases(prevAddPhase => (prevAddPhase.filter(p => p !== phase.tempId)))
    }

    // need this function to update phase number if one is removed from the array
    const updatePhaseNumber = function () {
        const newPn = newRecipe.phases.findIndex(p => p.tempId === phase.tempId) + 1
        setFormData({ ...formData, phaseNumber: newPn })
        editPhase({ ...formData, phaseNumber: newPn })
    }

    useEffect(() => {
        if (newRecipe.phases.length > 0) {
            updatePhaseNumber();
        }
    }, [addedPhases])



    return (
        <Card className="mb-1">
            <Card.Header>
                <h5>Fase # {formData.phaseNumber}</h5>
            </Card.Header>
            <Card.Body>
                <Row className="align-items-center">
                    <Col sm={12} md={10} className="p-0">
                        <Form.Group className="p-0">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Descrivi i passaggi di questa fase"
                                value={formData.description}
                                onChange={handleFormChange}
                                required
                                disabled={disable}
                                className="text-form-field"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control
                                type="file"
                                name="phaseImage"
                                onChange={updatePhaseImage}
                                className="text-form-field"
                            />
                        </Form.Group>
                        {phaseSaved && (
                            <Form.Group>
                                <Form.Label>Ingredienti della fase</Form.Label>
                                <AddIngredient phaseId={phase.tempId} />
                            </Form.Group>
                        )}
                    </Col>
                    <Col sm={12} md={2} className="text-end p-0 newPhaseButtons flex-md-column flex-sm-row justify-content-sm-center">
                        {!disable && (
                            <Button className="btn-save" onClick={savePhase}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                                    <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                                </svg>
                            </Button>
                        )}
                        {disable && (
                            <Button className="btn-edit" onClick={toggleMode}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                </svg>
                            </Button>
                        )}
                        {disable && (
                            <Button variant="danger" onClick={removePhase}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                </svg>
                            </Button>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    );
}

export default SinglePhaseBox;