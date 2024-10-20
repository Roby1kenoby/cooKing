import { Badge, Container } from "react-bootstrap";

function SearchIngredientBox({ingredients, setIngredients, canEdit}) {
    
    const removeIngredient = function (ingredientId) {
        canEdit && setIngredients([...ingredients.filter(i => i._id !== ingredientId)])
    }


    return (
        <Container className="mt-2">
            <div className="badgeContainer">
                {ingredients?.map(ing =>
                    <Badge pill 
                        key={ing._id}
                        onClick={() => removeIngredient(ing._id)}
                        className="ingredient"
                    >
                        {ing.name}
                    </Badge>
                )}
            </div>
        </Container>
    );
}

export default SearchIngredientBox;