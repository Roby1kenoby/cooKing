import SearchDropdown from "../Interface/SearchDropdown";
import { useContext, useEffect, useState } from "react";
import SingleIngredientBox from "./SingleIngredientBox";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";

function AddIngredient({ phaseId = null }) {
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const { newRecipe, setNewRecipe } = useContext(NewRecipeContext)

    // useEffect(() => {
    //     console.log(newRecipe)
    // }, [newRecipe])

    const updateRecipe = function () {
        const ingredients = selectedIngredients.map(i => {
            // for each ingredient i search if it already exists, than add a new "void" ingredient
            // or keep the one already present with it's data
            const ingredientList = phaseId ? 
                newRecipe.phases.find(p => p.tempId === phaseId).phaseIngredients
                : newRecipe.recipeIngredients

            const existingIngredient = ingredientList.find(ing => ing.tempId === i.tempId)

            const singleIngredient = {
                tempId: existingIngredient?.tempId || i.tempId,
                tempPhaseId: existingIngredient?.phaseId || phaseId,
                tempName: existingIngredient?.name || i.name,
                tempMeasurementCategory: existingIngredient?.measurementCategory || i.measurementCategory,
                ingredientId: i._id,
                measurementUnit: existingIngredient?.measurementUnit || '',
                phaseId: existingIngredient?.phaseId || null,
                quantity: existingIngredient?.quantity || 0,
                additionalInfos: existingIngredient?.additionalInfos || ''
            }
            return singleIngredient
        })
        if (!phaseId) {
            setNewRecipe(prevRecipe => ({ ...prevRecipe, recipeIngredients: ingredients }))
        }
        else {
            const ingPhase = newRecipe.phases.find(p => p.tempId === phaseId)
            const updPhase = { ...ingPhase, phaseIngredients: ingredients }
            setNewRecipe(prevRecipe => (
                {
                    ...prevRecipe, phases: [...prevRecipe.phases.map(p =>
                        p.tempId === phaseId ?
                            updPhase :
                            p
                    )]
                }
            ))
        }

    }

    useEffect(updateRecipe, [selectedIngredients])
    
    return (
        <>
            <SearchDropdown optionsArray={selectedIngredients} setOptionsArray={setSelectedIngredients} type='ingredients'></SearchDropdown>
            {(phaseId ? 
                newRecipe.phases.find(p => p.tempId === phaseId).phaseIngredients : 
                newRecipe.recipeIngredients)
                ?.map((ing) =>
                <SingleIngredientBox
                    key={ing.tempId}
                    ingredient={ing}
                    phaseId={phaseId}
                />
            )}
        </>
    );
}

export default AddIngredient;