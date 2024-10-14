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

export const saveRecipe = async function(token, recipeData){
    console.log('sono in saveRecipe Crud')
    console.log('dati ricetta')
    console.log(recipeData)
    try {
        console.log("token", token)
        console.log(recipeData)
        const savedRecipe = await fetch(`${URI}/saveRecipe`,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-type": 'application/json',
            },
            method: "POST",
            body: JSON.stringify(recipeData)
        })
        if(!savedRecipe){
            throw new Error('Impossibile salvare la ricetta')
        }    

        return savedRecipe
    } catch (error) {
        return error
    }
}