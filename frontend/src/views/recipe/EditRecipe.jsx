import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import AddIngredient from "../../components/Ingredient/AddIngredient";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import AddTag from "../../components/Tag/AddTag";
import AddPhase from "../../components/Phase/AddPhase";
import './NewRecipe.css'
import { LoginContext } from "../../contexts/LoginContextProvider";
import CustomModal from "../../components/Modal/CustomModal";

function EditRecipe() {
    const navigate = useNavigate()
    const { newRecipe, setNewRecipe, saveRecipeHeader, handlePhaseImageChange } = useContext(NewRecipeContext)

    const [formData, setFormData] = useState(newRecipe)
    const [image, setImage] = useState()
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()
    const [showModal, setShowModal] = useState(false)
    const [modalConfig, setModalConfig] = useState({});
    const {loggedUser} = useContext(LoginContext)

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
        try {
            await saveRecipeHeader(formData)
            setModalConfig({
                title: 'Successo!',
                message: 'Ricetta salvata con successo.',
                onConfirm: () => {
                    setShowModal(false);
                    navigate(`/profile/${loggedUser._id}`); 
                },
                showAbortButton: false
            });
        } catch (error) {
            setModalConfig({
                title: 'Errore!',
                message: 'Si è verificato un errore nel salvataggio della ricetta. Riprova.',
                onConfirm: () => setShowModal(false), 
                showAbortButton: false
            });
        }
        setShowModal(true); 
    }

    const handleCloseModal = () => {
        setShowModal(false); // Chiude il Modal
        if (messageType === 'success') {
            navigate(`/profile/${newRecipe.creatorId}`); // Reindirizza alla pagina del profilo
        }
    }

    return (
        <Container className="mainContainer">
            {message && (
                <Alert variant={messageType === 'success' ? 'success' : 'danger'} className="text-center">
                    {message}
                </Alert>
            )}
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
                    <Col md={4} className="d-flex justify-content-center">
                        <Form.Group>
                            <Form.Label>Ricetta Privata</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="privateRecipe"
                                checked={formData.privateRecipe}
                                onChange={handleFormChange}
                                className="privateRecipeCheckbox"
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
            <CustomModal
                show={showModal}
                title={modalConfig.title}
                message={modalConfig.message}
                onConfirm={modalConfig.onConfirm}
                onCancel={modalConfig.onCancel}
                showAbortButton={modalConfig.showAbortButton}
            />
        </Container>
    );

}

export default EditRecipe