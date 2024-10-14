import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import AddIngredient from "../Ingredient/AddIngredient";

function SinglePhaseBox({ phase, addedPhases, setAddedPhases }) {
    
    // const initialFormData = {
    //     "tempId": phaseId,
    //     "phaseIngredients": [],
    //     "phaseNumber": addedPhases.findIndex(p => p === phaseId) + 1,
    //     "description": "",
    //     "phaseImageUrl": ""
    // }

    const [formData, setFormData] = useState(phase)
    const [disable, setDisable] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [phaseSaved, setPhaseSaved] = useState(false)
    const [phaseImage, setPhaseImage] = useState()
    const { newRecipe, addPhase, editPhase, deletePhase, handlePhaseImageChange } = useContext(NewRecipeContext)

    const handleFormChange = function (event) {
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const updatePhaseImage = (event) => {
        handlePhaseImageChange(phase.tempId, event.target.files[0])
    }

    const savePhase = function () {
        // debugger
        if(editMode){
            editPhase(formData)
            setEditMode(!editMode)
        }
        else{
            addPhase(formData)
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
        setFormData({...formData, phaseNumber: newPn })
        editPhase({ ...formData, phaseNumber: newPn })
    }

    useEffect(() => {
        if (newRecipe.phases.length > 0) {
            updatePhaseNumber();
        }
    }, [addedPhases])



    return (
        <Row className="align-items-center">
            <Col sm={12} md={10}>
                <Form.Group>
                    <Form.Label>Fase</Form.Label>
                    <Form.Control type="text"
                        name="phaseNumber"
                        value={formData.phaseNumber}
                        disabled
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control type="text"
                        name="description"
                        placeholder="Descrivi i passaggi di questa fase"
                        value={formData.description}
                        onChange={handleFormChange}
                        required
                        disabled={disable} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Immagine</Form.Label>
                    <Form.Control type="file"
                        name="phaseImage"
                        onChange={updatePhaseImage}
                    />
                </Form.Group>
                {phaseSaved && <Form.Group>
                    <Form.Label>Ingredienti della fase</Form.Label>
                    <AddIngredient phaseId={phase.tempId}/>
                </Form.Group>}
            </Col>
            <Col sm={12} md={2}>
                {!disable && <Button variant="primary" onClick={savePhase}>
                    Salva
                </Button>}
                {disable && <Button variant="warning" onClick={toggleMode}>
                    Modifica
                </Button>}
                {disable && <Button variant="danger" onClick={removePhase}>
                    Elimina
                </Button>}
            </Col>
        </Row>
    );
}

export default SinglePhaseBox;