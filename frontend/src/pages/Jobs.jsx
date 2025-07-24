import React from "react";
import { useAuth } from "../components/AuthContext";
import { JobsList } from "../components/CandidateHome";
import { JobsByRecruiter } from "../components/RecruiterHome";

const Jobs=()=>{
    const auth=useAuth();
    return(
        <>{auth.user.role==="RECRUITER"?<JobsByRecruiter/>:<JobsList/>}</>
    )
}
export {Jobs};