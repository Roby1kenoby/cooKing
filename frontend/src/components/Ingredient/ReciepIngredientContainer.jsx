import { Row } from "react-bootstrap";
import NewIngredientForm from "./NewIngredientForm";
import SingleIngredientBox from "./SingleIngredientBox";
import { useEffect, useState } from "react";
    // qui ci andranno il pulsante per aggiungere un nuovo ingrediente
        // il visualizzatore degli ingredienti in attesa di essere finalizzati, disabilitati se 
        // è stato premuto il pulsante salva
        // Lo stato deve avere l'array di ingredienti da passare al visualizzatore, e al form
        // per l'inserimento di nuovi ingredienti
function RecipeIngredientContainer() {
    const [ingredients, setIngredients] = useState([])
    const [editIngredient, setEditIngredient] = useState()

    useEffect(() => {
        console.log(ingredients)
    }, [ingredients ])
    return ( 
    
        <Row>
            <NewIngredientForm setIngredients={setIngredients} editIngredient={editIngredient}/>
            {ingredients.map(i => <SingleIngredientBox 
                key={i.tempId} ingredient={i} setEditIngredient={setEditIngredient} />
                )}
        </Row>
        
    );
}

export default RecipeIngredientContainer;