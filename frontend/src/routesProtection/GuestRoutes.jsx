import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import { Outlet, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

function GuestRoutes() {
    const {token, loggedUser} = useContext(LoginContext)
    console.log('sono in guest routes')
    if (token && !loggedUser) {
        return <div>Loading...</div>;
    }

    return ( 
        !token ? <Outlet/> : <Navigate to={`/profile/${loggedUser._id}`}/>
    );
}

export default GuestRoutes;