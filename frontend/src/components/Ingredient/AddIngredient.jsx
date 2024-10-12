import SearchDropdown from "../Interface/SearchDropdown";
import { useContext, useEffect, useState } from "react";
import SingleIngredientBox from "./SingleIngredientBox";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";

function AddIngredient({ ingredients, setIngredients }) {
    // rimuovere il contesto, non serve qua, se non per il log
    const { newRecipe, setNewRecipe } = useContext(NewRecipeContext)
    const arrayAggiornato = function () {
        console.log(ingredients)
    }

    // console log per vedere la ricetta aggiornata con gli ingredienti, rimuvoere
    useEffect(()=>{
        console.log(newRecipe)
    },[newRecipe])
    

    useEffect(arrayAggiornato, [ingredients])

    return (
        <>
            <SearchDropdown optionsArray={ingredients} setOptionsArray={setIngredients}></SearchDropdown>
            {ingredients.map((ing, idx) => 
                <SingleIngredientBox 
                    key={idx} 
                    ingredient={ing} 
                    ingredients={ingredients} 
                    setIngredients={setIngredients}
                />
            )}
        </>
    );
}

export default AddIngredient;