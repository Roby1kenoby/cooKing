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
        console.log('sono in edit ingredient')
        console.log(ingredient)
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
        setNewRecipe(prevRecipe => (
            prevRecipe.phases.some(p => p.tempId === phase.tempId) ?
                prevRecipe :
                { ...prevRecipe, phases: [...prevRecipe.phases, phase] }
        ))
    }

    const editPhase = function (phase) {
        console.log('pahse in context')
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




    // props for the childrens
    const value = {
        newRecipe, setNewRecipe,
        addIngredient, editIngredient, deleteIngredient,
        addTag, editTag, deleteTag,
        addPhase, editPhase, deletePhase
    }

    return (
        <NewRecipeContext.Provider value={value}>
            {children}
        </NewRecipeContext.Provider>
    );
}
