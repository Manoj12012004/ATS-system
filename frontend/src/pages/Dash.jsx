import React from "react";  
import { RecruiterDash } from "../components/RecruiterHome";
import { EmployeeDash } from "../components/CandidateHome";
import { useAuth } from "../components/AuthContext";
import SideBar from "../components/Sidebar";

const Dash=()=>{
     const { user } = useAuth();

    return(
        <div className="container mt-5 d-flex">
            {user.role==="RECRUITER" ? <RecruiterDash/>:<EmployeeDash/>}
        </div> 
    )

}
export default Dash;