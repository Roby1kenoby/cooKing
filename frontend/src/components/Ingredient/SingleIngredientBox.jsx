import { useContext, useState } from "react";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import units from '../../data/measurementUnits.json'
import {v4 as uuidv4} from 'uuid';

function SingleIngredientBox({ ingredient, ingredients, setIngredients }) {
    const { newRecipe, setNewRecipe } = useContext(NewRecipeContext)

    const um = ingredient.measurementCategory === "Solid"
        ? units.unitSystem['metric']['solid']
        : units.unitSystem['metric']['liquid']

    const [id] = useState(uuidv4())
    
    const initialFormData = {
        id: id,
        ingredientId: ingredient._id,
        measurementUnit: '',
        phaseId: null,
        quantity: 0,
        additionalInfos: ''
    }

    const [formData, setFormData] = useState(initialFormData)
    const [disable, setDisable] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const handleFormChange = function (event) {
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const saveIngredient = function () {
        // NECESSARIO CAPIRE COME GESTIRE UNA MODIFICA DELL'INGREDIENTE
        // NON POSSO SALVARE DIRETTAMENTE. NECESSARIO ANCHE FARE CONTROLLO DUPLICATI PRIMA DI SALVARE
        // save new element
        if(!newRecipe.recipeIngredients.includes(formData)){
            setNewRecipe({...newRecipe, recipeIngredients: [...newRecipe.recipeIngredients, formData]})
        }
        
        if(newRecipe.recipeIngredients.find(i => 
            // id already in ingredientsArray
            i.id === id
        )){
            console.log(id)
            setNewRecipe({...newRecipe, recipeIngredients: [...newRecipe.recipeIngredients.filter(i => 
                i.id !== id 
            ), formData]
        })
        }
        setDisable(!disable)
    }

    const toggleMode = function(){
        setDisable(!disable)
        setEditMode(!editMode)
    }

    const deleteIngredient = function(){
        const tempIngArray = newRecipe.recipeIngredients.filter(i => i.id !== id)
        setNewRecipe({...newRecipe, recipeIngredients: tempIngArray})
    }   

    return (
        <Container>
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
                        {!disable && <Button variant="primary" onClick={() => saveIngredient()}>
                            Salva
                        </Button>}
                        {disable && <Button variant="primary" onClick={() => toggleMode()}>
                            Modifica
                        </Button>}
                        {
                            disable && <Button variant="danger" onClick={() => deleteIngredient()}>
                                Elimina
                            </Button>
                        }
                    </div>
                </Col>
            </Row>

        </Container>
    );
}

export default SingleIngredientBox;