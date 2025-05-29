import React from "react";  
import { RecruiterDash } from "./RecruiterHome";
import { EmployeeDash } from "./CandidateHome";
import { useAuth } from "../components/AuthContext";

const Dash=()=>{
     const { user } = useAuth();

    console.log(user.role)
    return(
        <div>
            {user.role==="RECRUITER" ? <RecruiterDash/>:<EmployeeDash/>}
        </div> 
    )

}
export default Dash;