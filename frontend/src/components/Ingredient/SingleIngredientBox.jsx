import { useContext, useEffect, useState } from "react";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import units from '../../data/measurementUnits.json'

function SingleIngredientBox({ ingredient, phaseId}) {
    const { addIngredient, editIngredient, deleteIngredient, addPhaseIngredient, deletePhaseIngredient } = useContext(NewRecipeContext)

    const um = ingredient.tempMeasurementCategory === "Solid"
        ? units.unitSystem['metric']['solid']
        : units.unitSystem['metric']['liquid']

    const [formData, setFormData] = useState(ingredient)
    const [disable, setDisable] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const handleFormChange = function (event) {
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const saveIngredient = function () {
        // debugger
        phaseId ? addPhaseIngredient(formData) : editIngredient(formData)
        if(editMode){
            setEditMode(!editMode)
        }
        setDisable(!disable)
    }

    const toggleMode = function(){
        setDisable(!disable)
        setEditMode(!editMode)
    }

    const removeIngredient = function(){
        phaseId ? deletePhaseIngredient(formData) : deleteIngredient(formData)
    }   

    return (
            <Row  className="d-flex align-items-center">
                <Col sm={12} md={3}>
                    {ingredient.tempName}
                </Col>
                <Col sm={12} md={9} className="d-flex align-items-center">
                    <Form.Group sm={12} md={2}>
                        <Form.Label>Quantità</Form.Label>
                        <Form.Control type="numeric"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleFormChange}
                            required
                            disabled={disable}
                        />
                    </Form.Group>
                    <Form.Group sm={12} md={2}>
                        <Form.Label>Um</Form.Label>
                        <Form.Select
                            name="measurementUnit"
                            value={formData.measurementUnit}
                            onChange={handleFormChange}
                            required
                            disabled={disable}
                        >
                            {um.map(opt =>
                                <option key={opt.name} value={opt.name}>{opt.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group sm={12} md={7}>
                        <Form.Label>Informazioni aggiuntive</Form.Label>
                        <Form.Control type="text"
                            name="additionalInfos"
                            value={formData.additionalInfos}
                            onChange={handleFormChange}
                            disabled={disable}
                        />
                    </Form.Group>
                    <div className="col-sm-12 col-md-1 d-flex flex-column">
                        {!disable && <Button variant="primary" onClick={saveIngredient}>
                            Salva
                        </Button>}
                        {disable && <Button variant="primary" onClick={toggleMode}>
                            Modifica
                        </Button>}
                        {
                            disable && <Button variant="danger" onClick={removeIngredient}>
                                Elimina
                            </Button>
                        }
                    </div>
                </Col>
            </Row>
    );
}

export default SingleIngredientBox;