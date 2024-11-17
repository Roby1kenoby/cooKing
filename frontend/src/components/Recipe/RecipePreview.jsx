import { Button, Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { deleteRecipe } from '../../apis/recipeCRUDS';
import './RecipePreview.css'
import TagBox from '../Tag/TagBox';
import { useContext, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import CustomModal from '../Modal/CustomModal';

function RecipePreview({ recipe, refreshRecipes, setRefreshRecipes }) {
    const [message, setMessage] = useState()
    const [messageType, setMessageType] = useState()
    const [showModal, setShowModal] = useState(false)
    const [modalConfig, setModalConfig] = useState({});
    const navigate = useNavigate()

    const { token, loggedUser } = useContext(LoginContext)

    const deleteRecipeFromDb = async function () {
        
        setModalConfig({
            title: 'Conferma eliminazione',
            message: 'Sei sicuro di voler eliminare questa ricetta?',
            onConfirm: async () => {
                try {
                    
                    await deleteRecipe(token, recipe._id);
                    setModalConfig({
                        title: 'Successo!',
                        message: 'Ricetta eliminata con successo.',
                        onConfirm: () => {
                            setShowModal(false);
                            setRefreshRecipes(!refreshRecipes)
                        },
                        showAbortButton: false
                    });
                } catch (error) {
                    setModalConfig({
                        title: 'Errore!',
                        message: 'Si è verificato un errore nel rimuovere la ricetta. Riprovare più tardi.',
                        onConfirm: () => setShowModal(false),
                        showAbortButton: false
                    });
                }
            },
            onCancel: () => setShowModal(false),  
            showAbortButton: true
        });
    
        setShowModal(true);
    }
    


    return (
        <>
            <Card className='cardRecipe'>
                <CardHeader className='d-flex justify-content-between align-items-center bg-accent'>
                    <Link to={`/api/recipe/${recipe._id}`}>{recipe.title}</Link>
                    <div className='btnContainer'>
                        <Button as={Link} to={`/api/recipe/editRecipe/${recipe._id}`} className="btn-edit" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </Button>
                        <Button variant="danger" onClick={() => deleteRecipeFromDb()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="recipeBody">
                    <Row>
                        <Col sm="12" md="3" className="imageCol">
                            <img
                                src={recipe.recipeImageUrl}
                                alt={recipe.title}
                                className="recipeImage"
                            />
                        </Col>
                        <Col sm="12" md="6" className="contentCol">
                            <div className="recipeTitle">
                                <Link to={`/api/recipe/${recipe._id}`}>{recipe.title}</Link>
                            </div>
                            <div className="recipeDescription">
                                {recipe.description}
                            </div>
                        </Col>
                        <Col sm="12" md="3" className="tagCol">
                            <TagBox tags={recipe.tagsIds} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <CustomModal
                show={showModal}
                title={modalConfig.title}
                message={modalConfig.message}
                onConfirm={modalConfig.onConfirm}
                onCancel={modalConfig.onCancel}
                showAbortButton={modalConfig.showAbortButton}
            />
        </>
    );
}

export default RecipePreview;