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

export const Me = async function(token){
    try {
        const request = await fetch(URI + '/me',{
            headers:{
                Authorization: 'Bearer ' + token
            }
        })
        const loggedUserData = await request.json()
        return loggedUserData
    } catch (error) {
        console.log(error)
    }
}

export const LoginWithGoogle = async function() {
    //redirect alla rotta in cui faccio il login con google, che davanti ha passport 
    window.location.href=`${URI}/login-google`
}