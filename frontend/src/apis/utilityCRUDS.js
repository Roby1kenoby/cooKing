const URI = `${process.env.REACT_APP_API_URL}/utility`

export const saveImage = async function(token, file){
    try {
        
        const formData = new FormData()
        formData.append('image', file)
        
        const resp = await fetch(URI+'/saveImage',{
            headers:{
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: formData
        })
        
        if(!resp.ok) throw new Error("Problema nel salvataggio dell'immagine")
        const data = resp.json()
        
        return data

    } catch (error) {
        console.log(error)
        return 
    }
}