import SearchDropdown from "../Interface/SearchDropdown";
import { useContext, useEffect, useState } from "react";
import SingleIngredientBox from "./SingleIngredientBox";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";

function AddIngredient() {
    const [selectedIngredients, setSelectedIngredients] = useState([])
    // const {newRecipe} = useContext(NewRecipeContext)

    // useEffect(() => {
    //     console.log(newRecipe)
    //     console.log(selectedIngredients)
    // }, [newRecipe])

    return (
        <>
            <SearchDropdown optionsArray={selectedIngredients} setOptionsArray={setSelectedIngredients} type='ingredients'></SearchDropdown>
            {selectedIngredients.map((ing) => 
                <SingleIngredientBox 
                    key={ing.tempId} 
                    ingredient={ing}
                    selectedIngredients={selectedIngredients} 
                    setSelectedIngredients={setSelectedIngredients}
                />
            )}
        </>
    );
}

export default AddIngredient;