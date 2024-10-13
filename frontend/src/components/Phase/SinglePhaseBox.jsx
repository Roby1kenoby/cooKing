import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";

function SinglePhaseBox({ phaseId, addedPhases, setAddedPhases }) {
    
    const initialFormData = {
        "tempId": phaseId,
        "phaseIngredients": [],
        "phaseNumber": addedPhases.findIndex(p => p === phaseId) + 1,
        "description": "",
        "phaseImageUrl": ""
    }

    const [formData, setFormData] = useState(initialFormData)
    const [disable, setDisable] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [phaseImage, setPhaseImage] = useState()
    const { newRecipe, addPhase, editPhase, deletePhase } = useContext(NewRecipeContext)

    const handleFormChange = function (event) {
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const handlePhaseImageChange = (event) => {
        setPhaseImage(event.target.files[0])
    }

    const savePhase = function () {
        if (editMode) {
            editPhase(formData)
            setEditMode(!editMode)
        }
        else {
            addPhase(formData)
        }
        setDisable(!disable)
    }

    const toggleMode = function () {
        setDisable(!disable)
        setEditMode(!editMode)
    }

    const removePhase = function () {
        deletePhase(formData)
        console.log('ho cancellato la fase da newRecipe')
        setAddedPhases(prevAddedPhases => {
            const updatedPhases = [...prevAddedPhases.filter(p => p !== phaseId)]
            console.log('ho cancellato id da addedPhases')
            return updatedPhases
        })
        console.log(formData)
    }

    const updatePhaseNumber = function () {
        console.log('entro in update pn post aggiornamento addedPhases')
        const newPn = addedPhases.findIndex(p => p === phaseId) + 1
        console.log('questo è il nuovo pn', newPn)
        console.log('per ', phaseId)
        setFormData({...formData, phaseNumber: newPn })
        editPhase({ ...formData, phaseNumber: newPn })
    }

    useEffect(() => {
        if (addedPhases.length > 0) {
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
                        onChange={handlePhaseImageChange}
                    />
                </Form.Group>
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