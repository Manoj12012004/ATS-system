import React from "react";
import { useAuth } from "../components/AuthContext";
import { JobsList } from "./CandidateHome";
import { JobsByRecruiter } from "./RecruiterHome";

const Jobs=()=>{
    const auth=useAuth();
    return(
        <>{auth.user.role==="RECRUITER"?<JobsByRecruiter/>:<JobsList/>}</>
    )
}
export {Jobs};