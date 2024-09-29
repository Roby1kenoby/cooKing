import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function GuestRoutes() {
    const {token, loggedUser} = useContext(LoginContext)

    if (token && !loggedUser) {
        return <div>Loading...</div>;  // Puoi usare un componente spinner
    }

    return ( 
        !token ? <Outlet/> : <Navigate to={`/profile/${loggedUser._id}`}/>
    );
}

export default GuestRoutes;