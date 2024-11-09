const URI = `${process.env.REACT_APP_API_URL}/ingredients`

export const getAllIngredients = async function(token, searchString = null){
    try {
        console.log(searchString)
        const qryString = searchString ? `/?searchString=${searchString}` : ''
        
        const resp = await fetch(`${URI + qryString}`,{
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-type": 'application/json'
            }
        })

        if(!resp){
            throw new Error('Impossibile recuperare gli ingredienti')
        }

        const data = await resp.json()
        return data
    } catch (error) {
        return error
    }
}