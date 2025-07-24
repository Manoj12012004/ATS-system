import { useAuth } from "../components/AuthContext";
import {EmployeeProfile} from "../components/CandidateHome";

const Profile = () => {
    const { user } = useAuth();
    return(
        <div>
            {user ? (user.role === "RECRUITER" ? null : <EmployeeProfile />) : null}
        </div>
    )
}

export default Profile;