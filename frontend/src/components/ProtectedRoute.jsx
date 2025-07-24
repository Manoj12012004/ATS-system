import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute=({allowedRoles,children})=>{
    const {isAuthenticated, user} = useAuth();

    if(!user||!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if(allowedRoles&&!allowedRoles.includes(user.role)){
        return <Navigate to='/' replace/>;
    }
    return children;
}
ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;