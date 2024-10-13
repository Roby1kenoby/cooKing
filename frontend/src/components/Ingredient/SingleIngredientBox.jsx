import { useContext, useEffect, useState } from "react";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import units from '../../data/measurementUnits.json'

function SingleIngredientBox({ ingredient, selectedIngredients, setSelectedIngredients }) {
    const { addIngredient, editIngredient, deleteIngredient } = useContext(NewRecipeContext)

    const um = ingredient.measurementCategory === "Solid"
        ? units.unitSystem['metric']['solid']
        : units.unitSystem['metric']['liquid']

    
    
    const initialFormData = {
        tempId: ingredient.tempId,
        ingredientId: ingredient._id,
        measurementUnit: '',
        phaseId: null,
        quantity: 0,
        additionalInfos: ''
    }

    const [formData, setFormData] = useState(initialFormData)
    const [disable, setDisable] = useState(false)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        console.log('edit mode è ora:', editMode);
    }, [editMode]);


    const handleFormChange = function (event) {
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const saveIngredient = function () {
        if(editMode){
            console.log('sono in edit mode, cambio ingrediente ' + formData)
            editIngredient(formData) 
            setEditMode(!editMode)
        }
        else{
            console.log('sono in add ingredient, aggiungo ingrediente' + formData)
            addIngredient(formData)
        }
        setDisable(!disable)
    }

    const toggleMode = function(){
        setDisable(!disable)
        setEditMode(!editMode)
    }

    const removeIngredient = function(){
        deleteIngredient(formData)
        setSelectedIngredients(prevSelIng => ([...prevSelIng.filter(i => i.tempId != ingredient.tempId)]))
    }   

    return (
            <Row  className="d-flex align-items-center">
                <Col sm={12} md={3}>
                    {ingredient.name}
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