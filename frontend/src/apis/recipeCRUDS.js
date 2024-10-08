const URI = `${process.env.REACT_APP_API_URL}/recipes`

export const getRecipeData = async function(token, recipeId){
    try {
        const recipeData = await fetch(`${URI}/${recipeId}`,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-type": 'application/json'
            }
        })
        if(!recipeData){
            throw new Error('Impossibile trovare la ricetta desiderata')
        }    

        return recipeData
    } catch (error) {
        return error
    }
    
}