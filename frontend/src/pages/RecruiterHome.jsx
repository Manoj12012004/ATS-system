import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const RecruiterApplications = () => {
    const {jobid}=useParams();
    const [applications,setApplications]=useState([])
    useEffect(()=>{
        API.get(`/rid/jobs/${jobid}/applications`).then(res=>{setApplications(res.data);})
        .catch(err=>console.error('Error fetching applications:',err))
    })
    return(
        <div>
            {applications}
        </div>
    )
}
const RecruiterDash=()=>{
    const [profile,setProfile]=useState(null);
    const [jobs,setJobs]=useState([]);
    const auth=useAuth();
    useEffect(()=>{
        API.get('/rid',{headers:{
            'Authorization':`Bearer ${auth.token}`
        },withCredentials:true}).then(res=>{
            console.log(res.data)
            setProfile(res.data.profile);
            setJobs(res.data.jobs);
        })
        .catch(err=>console.log(err))
    },[])
    
    return(
        <div>
          {profile && (
            <div>
                <h1>Welcome, {profile.Name}</h1>
                <p>Email: {profile.Email}</p>
            </div>
          )}
          {jobs.map((job, index) => (
            <div key={job.job_id || index}>
              <h2>{job.Title}</h2>
              <p>{job.applications_count}</p>
            </div>
          ))}
        </div>
    )
}
const JobsByRecruiter=()=>{
    const [jobs,setJobs]=useState([]);
    const auth=useAuth();
    useEffect(()=>{
        API.get('/rid/jobs',{headers:{'Authorization':`Bearer ${auth.token}`}}).then(res=>{setJobs(res.data.jobs)}).catch((err)=>console.log(err))
    },[])
    console.log(jobs)
    return(
        <div>jobs
            {jobs.map((job, index) => (
            <div key={job.job_id || index}>
              <h2>{job.Title}</h2>
              <p>{job.applications_count}</p>
            </div>
          ))}
        </div>
    )
}
export {JobsByRecruiter}
export {RecruiterDash};
export {RecruiterApplications};