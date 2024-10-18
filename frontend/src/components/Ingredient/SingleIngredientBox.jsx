import { useContext, useEffect, useState } from "react";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import { Button, Card, CardHeader, Col, Container, Form, Row } from "react-bootstrap";
import units from '../../data/measurementUnits.json'
import './SingleIngredientBox.css'

function SingleIngredientBox({ ingredient, phaseId, setSelectedIngredients }) {
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
        if (editMode) {
            setEditMode(!editMode)
        }
        setDisable(!disable)
    }

    const toggleMode = function () {
        setDisable(!disable)
        setEditMode(!editMode)
    }

    const removeIngredient = function () {
        phaseId ? deletePhaseIngredient(formData) : deleteIngredient(formData)

        setSelectedIngredients(prevSelIng => [...prevSelIng.filter(ing => ing.tempId !== ingredient.tempId)])
    }

    // return (
    //         <Row  className="d-flex align-items-center">
    //             <Col sm={12} md={3}>
    //                 {ingredient.tempName}
    //             </Col>
    //             <Col sm={12} md={9} className="d-flex align-items-center">
    //                 <Form.Group sm={12} md={2}>
    //                     <Form.Label>Quantità</Form.Label>
    //                     <Form.Control type="numeric"
    //                         name="quantity"
    //                         value={formData.quantity}
    //                         onChange={handleFormChange}
    //                         required
    //                         disabled={disable}
    //                     />
    //                 </Form.Group>
    //                 <Form.Group sm={12} md={2}>
    //                     <Form.Label>Um</Form.Label>
    //                     <Form.Select
    //                         name="measurementUnit"
    //                         value={formData.measurementUnit}
    //                         onChange={handleFormChange}
    //                         required
    //                         disabled={disable}
    //                     >
    //                         {um.map(opt =>
    //                             <option key={opt.name} value={opt.name}>{opt.name}</option>
    //                         )}
    //                     </Form.Select>
    //                 </Form.Group>
    //                 <Form.Group sm={12} md={7}>
    //                     <Form.Label>Informazioni aggiuntive</Form.Label>
    //                     <Form.Control type="text"
    //                         name="additionalInfos"
    //                         value={formData.additionalInfos}
    //                         onChange={handleFormChange}
    //                         disabled={disable}
    //                     />
    //                 </Form.Group>
    //                 <div className="col-sm-12 col-md-1 d-flex flex-column">
    //                     {!disable && <Button variant="primary" onClick={saveIngredient}>
    //                         Salva
    //                     </Button>}
    //                     {disable && <Button variant="primary" onClick={toggleMode}>
    //                         Modifica
    //                     </Button>}
    //                     {
    //                         disable && <Button variant="danger" onClick={removeIngredient}>
    //                             Elimina
    //                         </Button>
    //                     }
    //                 </div>
    //             </Col>
    //         </Row>
    // );

    return (
        <Card className="mb-3 singleIngredientCard">
            <CardHeader className='d-flex justify-content-between bg-accent'>
                <h5 className="m-0">{ingredient.tempName}</h5>
            </CardHeader>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Row className="d-flex align-items-center">
                    <Form.Group controlId="quantity">
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleFormChange}
                            required
                            disabled={disable}
                            placeholder="Quantità"
                            className="text-form-field"
                        />
                    </Form.Group>
                    <Form.Group controlId="measurementUnit">
                        <Form.Select
                            name="measurementUnit"
                            value={formData.measurementUnit}
                            onChange={handleFormChange}
                            required
                            disabled={disable}
                            className="text-form-field"
                        >
                            {um.map(opt => (
                                <option key={opt.name} value={opt.name}>{opt.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="flex-grow-1">
                        <Form.Control
                            type="text"
                            name="additionalInfos"
                            value={formData.additionalInfos}
                            onChange={handleFormChange}
                            disabled={disable}
                            placeholder="Dettagli"
                            className="text-form-field"
                        />
                    </Form.Group>

                </Row>
                <Row className="mt-2">

                    <div className="p-0 newRecipeButtons">
                        {!disable &&
                            <Button className="btn-save" onClick={saveIngredient} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                                    <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                                </svg>
                            </Button>}
                        {disable &&
                            <Button className="btn-edit" onClick={toggleMode} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                </svg>
                            </Button>}
                        {disable &&
                            <Button variant="danger" onClick={removeIngredient}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                </svg>
                            </Button>}
                    </div>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default SingleIngredientBox;