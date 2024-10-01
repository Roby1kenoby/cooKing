import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import { Outlet, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

function GuestRoutes() {
    const {token, loggedUser} = useContext(LoginContext)
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    
    const redirectUrl = userId ? `/profile/${userId}` : `/profile/${loggedUser?._id}`
    

    
    if (token && !loggedUser) {
        return <div>Loading...</div>;
    }

    return ( 
        !token ? <Outlet/> : <Navigate to={redirectUrl}/>
    );
}

export default GuestRoutes;