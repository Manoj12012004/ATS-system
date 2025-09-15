import { useAuth } from "../components/AuthContext";
import { EmployeeProfile } from "../components/CandidateHome";
import { RecruiterProfile } from "../components/RecruiterHome";

const Profile = () => {
    const { user } = useAuth();
    return (
        <div>
            {user ? (user.role === "RECRUITER" ? <RecruiterProfile /> : <EmployeeProfile />) : null}
        </div>
    )
}

export default Profile;