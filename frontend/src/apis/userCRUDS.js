const URI = `${process.env.REACT_APP_API_URL}/users`

export const createUser = async function(userData, avatar){
    try {
        console.log('sono in createUser')
        const formData = new FormData()
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('userName', userData.userName)
        formData.append('name', userData.name)
        formData.append('surname', userData.surname)
        formData.append('preferredMu', userData.preferredMu)
        formData.append('avatar', avatar)
        
        const resp = await fetch(URI+'/createUser',{
            method: 'POST',
            body: formData
        })
        
        if(!resp.ok) throw new Error('Problema nella creazione dell\'utente')

        const data = await resp.json()
        return data

    } catch (error) {
        console.log(error)
        return 
    }
}