import { Container } from "react-bootstrap";
import IngredientBox from "../Ingredient/IngredientBox";

function Phase({phase}) {
    return ( 
        <Container>
            <div>
                <img src={phase.phaseImageUrl} alt="" />
            </div>
            <div>
                <IngredientBox ingredients={phase.phaseIngredients}/>
            </div>
            <div>
                {phase.description}
            </div>
        </Container>
    );
}

export default Phase;