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

        setRecipes(loadedRecipes)
    }

    useEffect(() => {loadRecipes()}, [refreshRecipes])
    
    // console.log(recipes)
    return (    
        <>
            {
                recipes.map(recipe => 
                    <RecipePreview key={recipe._id} recipe={recipe} 
                        refreshRecipes={refreshRecipes}
                        setRefreshRecipes={setRefreshRecipes}/>)
            }
        </>
    );
}

export default RecipePreviewContainer;