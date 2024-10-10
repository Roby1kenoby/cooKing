import { useContext, useState } from "react";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import units from '../../data/measurementUnits.json'
function SingleIngredientBox({ ingredient }) {

    const { newRecipe, setNewRecipe } = useContext(NewRecipeContext)

    const um = ingredient.measurementCategory === "Solid"
        ? units.unitSystem['metric']['solid']
        : units.unitSystem['metric']['liquid']

    const initialFormData = {
        ingredientId: ingredient._id,
        measurementUnit: '',
        phaseId: null,
        quantity: 0,
        additionalInfos: ''
    }

    const [formData, setFormData] = useState(initialFormData)
    const [disable, setDisable] = useState(false)

    const handleFormChange = function (event) {
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const saveIngredient = function () {
        // NECESSARIO CAPIRE COME GESTIRE UNA MODIFICA DELL'INGREDIENTE
        // NON POSSO SALVARE DIRETTAMENTE. NECESSARIO ANCHE FARE CONTROLLO DUPLICATI PRIMA DI SALVARE
        setNewRecipe({...newRecipe, recipeIngredients: [...newRecipe.recipeIngredients, formData]})
        setDisable(!disable)
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
                    <div className="col-sm-12 col-md-1">
                        <Button variant="primary" onClick={() => saveIngredient()}>
                            Salva
                        </Button>
                    </div>
                </Col>
            </Row>

        </Container>
    );
}

export default SingleIngredientBox;