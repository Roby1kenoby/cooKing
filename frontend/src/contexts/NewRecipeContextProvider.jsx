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
        recipeIngredients:[]
    }
    
    const [newRecipe, setNewRecipe] = useState(newRecipeData)
    // props for the childrens
    const value = {newRecipe, setNewRecipe}

    return (
        <NewRecipeContext.Provider value={value}>
            {children}
        </NewRecipeContext.Provider>
    );
}
