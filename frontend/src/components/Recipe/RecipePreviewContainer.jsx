import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { getUserPublicRecipes, getUserRecipes } from "../../apis/userCRUDS";
import RecipePreview from './RecipePreview.jsx'

function RecipePreviewContainer({userId, tags, ingredients, searchValue}) {
    // if context user = userId, get all recipes, otherwise only the public ones
    const {token, loggedUser} = useContext(LoginContext)
    const [recipes, setRecipes] = useState([])
    const [refreshRecipes, setRefreshRecipes] = useState(false)
        
    const loadRecipes = async function(){
        let loadedRecipes = []
        if(userId === loggedUser._id){
            loadedRecipes = await getUserRecipes(token, userId) 
        } else{
            loadedRecipes = await getUserPublicRecipes(token, userId)
        } 

        // filtering for tags
        if (tags.length > 0) {
            loadedRecipes = loadedRecipes.filter(recipe => 
                tags.every(tagInArray => recipe.tagsIds?.some(
                    tagInRecipe => tagInRecipe._id === tagInArray._id))  
            );
        }

        // filtering for ingredients
        if (ingredients.length > 0){
            loadedRecipes = loadedRecipes.filter(recipe =>
                ingredients.every(ingInArray => recipe?.recipeIngredients?.some(
                    ingInRecipe => ingInRecipe?.ingredientId._id === ingInArray._id
                ))
            )
        }

        // filtering fo title
        if (searchValue){
            loadedRecipes = loadedRecipes.filter(recipe => 
                recipe.title.toLowerCase().includes(searchValue.toLowerCase()))
        }
    
        // filtra loadedRecipe per ingredientId
        setRecipes(loadedRecipes)
    }

    useEffect(() => {loadRecipes()}, [refreshRecipes, tags, ingredients, searchValue])
    useEffect(()=>{
        console.log(ingredients)
        console.log(recipes)
    }, [recipes])
    // console.log(recipes)
    return (    
        <>
            {
                recipes.map(recipe => 
                    <RecipePreview key={recipe._id} recipe={recipe} 
                        refreshRecipes={refreshRecipes}
                        setRefreshRecipes={setRefreshRecipes}/>)
            }
            {recipes.length === 0 && <p>Nessuna ricetta trovata</p>}
        </>
    );
}

export default RecipePreviewContainer;