import { useContext} from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import { Outlet, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

function ProtectedRoutes() {
    // qui verificare se c'è nel query string un url di redirect, se si, redirect a login con ?urlRedirect
    // nella login, se c'è un redirect, post login devo passare l'id del profilo
    const {token} = useContext(LoginContext)
    const params = useParams()
    const userId = params.profileId

    const redirectUrl = userId ? `/login/?userId=${userId}` : '/login'
    
    return ( 
        token ? <Outlet/> : <Navigate to={redirectUrl} />
    );
}

export default ProtectedRoutes;