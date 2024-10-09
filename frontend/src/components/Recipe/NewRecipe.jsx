import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AddIngredient from "../Ingredient/AddIngredient";

function NewRecipe() {
    const initialFormData = {
        tagsIds: [],
        title: '',
        description: '',
        portions: 1,
        preparationTime: '',
        recipeImageUrl: '',
        recipeVideoUrl: '',
        privateRecipe: false,
        phases: [],
        recipeIngredients:[]
    }

    const [formData, setFormData] = useState(initialFormData)
    const [image, setImage] = useState()
    const [ingredients, setIngredients] = useState([])
    const [tags, setTags] = useState([])

    const handleFormChange = function(event){
        const target = event.target
        setFormData({ ...formData, [target.name]: target.value })
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const saveRecipe = async function() {
        console.log('ciao')
    }

    return ( 
    <Container>
        <Form onSubmit={saveRecipe}>
            <Form.Group>
                <Form.Label>Titolo</Form.Label>
                <Form.Control type="text"
                    name="title"
                    placeholder="Titolo della ricetta"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Descrizione</Form.Label>
                <Form.Control type="text"
                    name="description"
                    placeholder="Breve descrizione della ricetta"
                    value={formData.description}
                    onChange={handleFormChange}
                    required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Porzioni</Form.Label>
                <Form.Control type="numeric"
                    name="portions"
                    value={formData.portions}
                    onChange={handleFormChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Tempo di preparazione</Form.Label>
                <Form.Control type="text"
                    name="preparationTime"
                    placeholder="Indica quanto ci vorrà per preparare la ricetta"
                    value={formData.preparationTime}
                    onChange={handleFormChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ricetta Privata</Form.Label>
                <Form.Check type="checkbox"
                    name="privateRecipe"
                    checked={formData.privateRecipe}
                    onChange={handleFormChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Immagine frontespizio</Form.Label>
                <Form.Control type="file"
                    name="recipeImage"
                    onChange={handleImageChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Link videoricetta</Form.Label>
                <Form.Control type="text"
                    name="recipeVideoUrl"
                    placeholder="Inserisci qui il link al video della tua ricetta"
                    value={formData.recipeVideoUrl}
                    onChange={handleFormChange}
                    required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ingredienti</Form.Label>
                <div>
                    <AddIngredient ingredients={ingredients} setIngredients={setIngredients}/>
                </div>
            </Form.Group>
            {/* inserire box per i tag (ricerca + selezione), ingredienti e fasi */}
            <div className="loginButtonGroup">
                <Button variant="primary" type='submit'>
                    Salva Ricetta
                </Button>
            </div>
        </Form>
    </Container>
    );
}

export default NewRecipe;