import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AddIngredient from "../../components/Ingredient/AddIngredient";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import AddTag from "../../components/Tag/AddTag";
import AddPhase from "../../components/Phase/AddPhase";
import './NewRecipe.css'

function NewRecipe() {
    const { newRecipe, setNewRecipe, saveRecipeHeader, handlePhaseImageChange } = useContext(NewRecipeContext)

    const [formData, setFormData] = useState(newRecipe)
    const [image, setImage] = useState()

    const handleFormChange = function (event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setFormData({ ...formData, [target.name]: value })
    }

    const handleImageChange = (event) => {
        handlePhaseImageChange("recipeImage", event.target.files[0])
    }

    const saveRecipe = async function (event) {
        event.preventDefault()
        saveRecipeHeader(formData)
        console.log(newRecipe)
    }

    // return (
    //     <Container>
    //         <Form onSubmit={saveRecipe}>
    //             <Form.Group>
    //                 <Form.Label>Titolo</Form.Label>
    //                 <Form.Control type="text"
    //                     name="title"
    //                     placeholder="Titolo della ricetta"
    //                     value={formData?.title}
    //                     onChange={handleFormChange}
    //                     required
    //                 />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label>Descrizione</Form.Label>
    //                 <Form.Control type="text"
    //                     name="description"
    //                     placeholder="Breve descrizione della ricetta"
    //                     value={formData.description}
    //                     onChange={handleFormChange}
    //                     maxLength={150}
    //                     required />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label>Porzioni</Form.Label>
    //                 <Form.Control type="numeric"
    //                     name="portions"
    //                     value={formData.portions}
    //                     onChange={handleFormChange}
    //                 />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label>Tempo di preparazione</Form.Label>
    //                 <Form.Control type="text"
    //                     name="preparationTime"
    //                     placeholder="Indica quanto ci vorrà per preparare la ricetta"
    //                     value={formData.preparationTime}
    //                     onChange={handleFormChange}
    //                 />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label>Ricetta Privata</Form.Label>
    //                 <Form.Check type="checkbox"
    //                     name="privateRecipe"
    //                     checked={formData.privateRecipe}
    //                     onChange={handleFormChange}
    //                 />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label>Immagine frontespizio</Form.Label>
    //                 <Form.Control type="file"
    //                     name="recipeImage"
    //                     onChange={handleImageChange}
    //                 />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label>Link videoricetta</Form.Label>
    //                 <Form.Control type="text"
    //                     name="recipeVideoUrl"
    //                     placeholder="Inserisci qui il link al video della tua ricetta"
    //                     value={formData.recipeVideoUrl}
    //                     onChange={handleFormChange}
    //                 />
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label>Tags</Form.Label>
    //                 <div>
    //                     <AddTag />
    //                 </div>
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label>Ingredienti</Form.Label>
    //                 <div>
    //                     <AddIngredient />
    //                 </div>
    //             </Form.Group>
    //             <Form.Group>
    //                 <Form.Label>Fasi</Form.Label>
    //                 <div>
    //                     <AddPhase />
    //                 </div>
    //             </Form.Group>
    //             <div>
    //                 <Button variant="primary" type='submit'>
    //                     Salva Ricetta
    //                 </Button>
    //             </div>
    //         </Form>
    //     </Container>
    // );

    return (
        <Container className="mainContainer">
            <Form className="form-border newRecipeForm" onSubmit={saveRecipe}>
                
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Titolo</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Titolo della ricetta"
                                value={formData.title}
                                onChange={handleFormChange}
                                required
                                className="text-form-field"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Breve descrizione della ricetta"
                                value={formData.description}
                                onChange={handleFormChange}
                                maxLength={150}
                                className="text-form-field"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Porzioni</Form.Label>
                            <Form.Control
                                type="number"
                                name="portions"
                                value={formData.portions}
                                onChange={handleFormChange}
                                className="text-form-field"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Tempo di preparazione</Form.Label>
                            <Form.Control
                                type="text"
                                name="preparationTime"
                                placeholder="Quanto ci vorrà?"
                                value={formData.preparationTime}
                                onChange={handleFormChange}
                                className="text-form-field"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Ricetta Privata</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="privateRecipe"
                                checked={formData.privateRecipe}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="separator"></hr>
                
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Immagine frontespizio</Form.Label>
                            <Form.Control
                                type="file"
                                name="recipeImage"
                                onChange={handleImageChange}
                                className="text-form-field"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Link videoricetta</Form.Label>
                            <Form.Control
                                type="text"
                                name="recipeVideoUrl"
                                placeholder="Inserisci qui il link al video della tua ricetta"
                                value={formData.recipeVideoUrl}
                                onChange={handleFormChange}
                                className="text-form-field"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="separator"></hr>

                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Tags</Form.Label>
                            <div className="p-0">
                                <AddTag />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="separator"></hr>
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Ingredienti</Form.Label>
                            <div className="p-0">
                                <AddIngredient />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <hr className="separator"></hr>
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label className="p-0">Fasi</Form.Label>
                            <div className="p-0">
                                <AddPhase />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <div className="text-center">
                    <Button variant="primary" type='submit'>
                        Salva Ricetta
                    </Button>
                </div>
            </Form>
        </Container>
    );

}

export default NewRecipe;