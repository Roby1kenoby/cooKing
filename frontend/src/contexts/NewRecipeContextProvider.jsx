import { createContext, useEffect, useState } from "react";
export const NewRecipeContext = createContext()

export function NewRecipeContextProvider({ children }) {
    const newRecipeData = {
        userId: '',
        tagsIds: [],
        title: '',
        description: '',
        portions: 1,
        preparationTime: '',
        recipeImageUrl: '',
        recipeVideoUrl: '',
        privateRecipe: false,
        phases: [],
        recipeIngredients: []
    }

    const [newRecipe, setNewRecipe] = useState(newRecipeData)
    const [phaseImages, setPhaseImages] = useState({})

    const addIngredient = function (ingredient) {
        setNewRecipe(prevRecipe => (
            // if ingredient already exists
            prevRecipe.recipeIngredients.some(i => i.tempId === ingredient.tempId) ?
                // nothing changes
                prevRecipe :
                // add ingredient tu recipeIngredients
                { ...prevRecipe, recipeIngredients: [...prevRecipe.recipeIngredients, ingredient] }
        ))
    }

    const editIngredient = function (ingredient) {
        setNewRecipe(prevRecipe => ({
            ...prevRecipe,
            recipeIngredients: prevRecipe.recipeIngredients.map(i =>
                i.tempId === ingredient.tempId ?
                    ingredient :
                    i
                )
            }
        ))
    }

    const deleteIngredient = function (ingredient) {
        setNewRecipe(prevRecipe => (
            { ...prevRecipe, recipeIngredients: [...prevRecipe.recipeIngredients.filter(i => i.tempId !== ingredient.tempId)] }
        ))
    }

    const addTag = function (tag) {
        setNewRecipe(prevRecipe => (
            prevRecipe.recipeIngredients.some(t => t._id === tag._id) ?
                prevRecipe :
                { ...prevRecipe, tagsIds: [...prevRecipe.tagsIds, tag] }
        ))
    }

    const editTag = function (tag) {
        setNewRecipe(prevRecipe => ({
            ...prevRecipe,
            recipeIngredients: prevRecipe.tagsIds.map(t =>
                t._id === tag._id ?
                    tag :
                    t
                )
            }
        ))
    }

    const deleteTag = function (tag) {
        setNewRecipe(prevRecipe => (
            { ...prevRecipe, tagsIds: [...prevRecipe.tagsIds.filter(t => t._id !== tag._id)] }
        ))
    }

    const addPhase = function (phase) {
        // debugger
        setNewRecipe(prevRecipe => (
            prevRecipe.phases.some(p => p.tempId === phase.tempId) ?
                prevRecipe :
                { ...prevRecipe, phases: [...prevRecipe.phases, phase] }
        ))
    }

    const editPhase = function (phase) {
        console.log('sono in edit phase, voglio inserire questo')
        console.log(phase)
        setNewRecipe(prevRecipe => ({
            ...prevRecipe,
            phases: prevRecipe.phases.map(p =>
                p.tempId === phase.tempId ?
                    phase :
                    p
                )
            }
        ))
    }

    const deletePhase = function (phase) {
        setNewRecipe(prevRecipe => (
            { ...prevRecipe, phases: [...prevRecipe.phases.filter(p => p.tempId !== phase.tempId)] }
        ))
    }

    const addPhaseIngredient = function(ingredient){
        // debugger
        // find the saved phase in newRecipe
        const phase = newRecipe.phases.find(p => p.tempId === ingredient.tempPhaseId)
        // find if ingredient is already present in the phase
        const foundIngredient = phase.phaseIngredients.find(i => i.tempId === ingredient.tempId)
        // creating edited phase, if the ingredient already exists i update it, otherwise i add it
        const editedPhase = foundIngredient ? 
            {...phase, phaseIngredients: phase.phaseIngredients.map(i => i.tempId === ingredient.tempId ?
                                                                        ingredient :
                                                                        i
            )} : 
            {...phase, phaseIngredients: [...phase.phaseIngredients, ingredient]}
        
        // setting the new phase inside newRecipe
        setNewRecipe(prevRecipe => {
            const editedRecipe = {...prevRecipe, phases: [...prevRecipe.phases.map(p => 
                                                            p.tempId === ingredient.tempPhaseId ?
                                                            editedPhase :
                                                            p)]}
            return editedRecipe
        })
    }

    const deletePhaseIngredient = function(ingredient){
        // find the saved phase in newRecipe
        const phase = newRecipe.phases.find(p => p.tempId === ingredient.tempPhaseId)
        console.log(phase)
        const editedPhase = {...phase, phaseIngredients: [phase.phaseIngredients.find(i => i.tempId !== ingredient.tempId)]}
        console.log(editedPhase)
        setNewRecipe(prevRecipe => {
            const editedRecipe = {...prevRecipe, phases: [...prevRecipe.phases.map(p => 
                                                            p.tempId === ingredient.tempPhaseId ?
                                                            editedPhase :
                                                            p
                                                            )]}
                                                            console.log(editedRecipe)
            return editedRecipe
        })
    }

    const handlePhaseImageChange = (tempId, file) => {
        setPhaseImages(prevImages => ({
            ...prevImages,
            [tempId]: file  // Salva l'immagine associata alla fase in base al suo tempId
        }));
        console.log(phaseImages)
    };





    // props for the childrens
    const value = {
        newRecipe, setNewRecipe,
        addIngredient, editIngredient, deleteIngredient, addPhaseIngredient, deletePhaseIngredient,
        addTag, editTag, deleteTag,
        addPhase, editPhase, deletePhase, handlePhaseImageChange
    }

    return (
        <NewRecipeContext.Provider value={value}>
            {children}
        </NewRecipeContext.Provider>
    );
}
