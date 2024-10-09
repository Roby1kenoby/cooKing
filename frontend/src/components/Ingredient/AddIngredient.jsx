import { DropdownButton } from "react-bootstrap";
import SearchDropdown from "../Interface/SearchDropdown";
import { useEffect } from "react";
import IngredientBox from "./IngredientBox";

function AddIngredient({ ingredients, setIngredients }) {

    const arrayAggiornato = function () {
        console.log(ingredients)
    }

    useEffect(arrayAggiornato, [ingredients])

    return (
        <>
            <SearchDropdown optionsArray={ingredients} setOptionsArray={setIngredients}></SearchDropdown>
            
        </>
    );
}

export default AddIngredient;