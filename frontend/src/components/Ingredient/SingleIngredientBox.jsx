import { Button, Form, Row } from "react-bootstrap";

function SingleIngredientBox({ ingredient, setEditIngredient }) {
    // questo componente visualizza un form per singolo elemento che gli viene passato 
    // dal componente padre. Il form sarà abilitato se non è ancora stato salvato niente 
    // nell'array degli ingredienti salvati
    
    const editIngredient = function(){
        setEditIngredient(ingredient)
    }

    return (
        <Row>
            <h3>{ingredient.name}</h3>
            <Form.Group>
                <Form.Label>Qta</Form.Label>
                <Form.Control type="numeric"
                    name="quantity"
                    value={ingredient.quantity}
                    readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Um</Form.Label>
                <Form.Control 
                    type="text"
                    name="measurementUnit"
                    value={ingredient.measurementUnit}
                    readOnly
                >
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Altre informazioni</Form.Label>
                <Form.Control type="text"
                    name="additionalInfos"
                    value={ingredient.additionalInfos}
                    readOnly
                />
            </Form.Group>
            <div>
                {<Button onClick={editIngredient}>
                    Modifica
                </Button>}
            </div>
        </Row>
    );
}

export default SingleIngredientBox;