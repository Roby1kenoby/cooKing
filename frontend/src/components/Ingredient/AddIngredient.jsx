import SearchDropdown from "../Interface/SearchDropdown";
import { useContext, useEffect, useState } from "react";
import SingleIngredientBox from "./SingleIngredientBox";
import { NewRecipeContext } from "../../contexts/NewRecipeContextProvider";
import SearchBar from "../Interface/SearchBar";

function AddIngredient({ phaseId = null }) {
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const { newRecipe, setNewRecipe, dataReady } = useContext(NewRecipeContext)

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

    //need this function to update the selectedRecipeIngredients state with the one in the recipe being edited
    const getIngredientsFromRecipe = function () {
        if (dataReady && newRecipe) {
            if (phaseId) {
                const phaseIngList = newRecipe.phases.find(p => p.tempId === phaseId).phaseIngredients
                console.log('phaseIngList: ', phaseIngList)
                setSelectedIngredients(phaseIngList.map(i => ({
                    _id: i.ingredientId,
                    name: i.tempName,
                    measurementCategory: i.tempMeasurementCategory,
                    tempId: i._id
                })))
            }
            else {
                setSelectedIngredients(
                    newRecipe.recipeIngredients?.map(i => ({
                        _id: i.ingredientId,
                        name: i.tempName,
                        measurementCategory: i.tempMeasurementCategory,
                        tempId: i._id
                    }))
                )
            }
        }

    }

    useEffect(() => {
        getIngredientsFromRecipe()
    }, [dataReady])

    useEffect(updateRecipe, [selectedIngredients])



    // useEffect(()=>{
    //     console.log('selectedingredients: ', selectedIngredients)
    //     console.log('newRecipe: ', newRecipe)
    // },[selectedIngredients, newRecipe])



    return (
        <>
            <SearchBar optionsArray={selectedIngredients} setOptionsArray={setSelectedIngredients} type='ingredientsIn' />
            <div className="p-0 d-flex flex-wrap row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
                {(phaseId ?
                    newRecipe.phases.find(p => p.tempId === phaseId).phaseIngredients :
                    newRecipe.recipeIngredients)
                    ?.map((ing) =>
                        <SingleIngredientBox
                            key={ing.tempId}
                            ingredient={ing}
                            phaseId={phaseId}
                            setSelectedIngredients={setSelectedIngredients}
                        />
                    )}
            </div>
        </>
    );
}

export default AddIngredient;