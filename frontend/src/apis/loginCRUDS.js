const URI = `${process.env.REACT_APP_API_URL}/login`

export const Login = async (loginData) => {
    try {
        const resp = await fetch(URI, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(loginData)
        })
        if(!resp){
            const error = new Error('Something went wrong! Try again later')
            throw error
        }

        const data = await resp.json()
        return data

    } catch (error) {
        console.log(error.message)
    }
}