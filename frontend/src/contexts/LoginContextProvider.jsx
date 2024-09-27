import { createContext, useEffect, useState } from "react";
// import { Me } from "../api/LoginCRUDs.js";
export const LoginContext = createContext()

export function LoginContextProvider({ children }) {
    const [loggedUser, setLoggedUser] = useState(null)
    const [token, setToken] = useState(null)

    // props for the childrens
    const value = {loggedUser, setLoggedUser, token, setToken}
    
    const manageToken = function (){
        
        const objUrlParams = new URLSearchParams(window.location.search)
        const urlToken = objUrlParams.get('token')
        
        const storageToken = localStorage.getItem('token')

        // the url Token is always the most recent one, so has priority
        if(urlToken){
            setToken(urlToken)
            localStorage.setItem('token', urlToken)
        }

        if(!urlToken && storageToken){
            setToken(storageToken)
        }
        
    }
    

    // const getAuthorData = async function(token){
    //     if(!token) return

    //     try {
    //         const authorData = await Me(token)
            
    //         if(!authorData) throw Error('Token non valido')

    //         setLoggedUser(authorData)
    //         localStorage.setItem("token", token)    

    //     } catch (error) {
    //         console.log(error)
    //         setToken('')
    //         localStorage.clear()
    //     }
    // }

    // useEffect(() => {getAuthorData(token)}, [token])
    useEffect(manageToken, [])


    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
}
