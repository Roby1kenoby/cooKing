const URI = `${process.env.REACT_APP_API_URL}/api/tags`

export const getAllTags = async function(token, searchString = null){
    try {
        
        const qryString = searchString ? `/?searchString=${searchString}` : ''
        
        const resp = await fetch(`${URI + qryString}`,{
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-type": 'application/json',
                'api-version': 'v1'
            }
        })

        if(!resp){
            throw new Error('Impossibile recuperare i tag')
        }

        const data = await resp.json()
        return data
    } catch (error) {
        return error
    }
}