import { CandidateApplications } from "../components/CandidateHome";
import { RecruiterApplications } from "../components/RecruiterHome";
import { useAuth } from "../components/AuthContext"

const Applications=()=>{
    const {user}=useAuth();
    return(
        <>{user&&user.role==="RECRUITER"?<RecruiterApplications/>:<CandidateApplications/>}</>
    )
}
export default Applications;