import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute=({children})=>{
    const {isAuthenticated, user} = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // if (role && user.role !==role){
    //     return <Navigate to="/" />;
    // }

    return children;
}

export default ProtectedRoute;