import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const JobsList = () => {
    const [jobs,setJobs]=useState([]);
    const authData=useAuth();
    useEffect(()=>{
        API.get('/eid/jobs',{headers:{"Authorization":`Bearer ${authData.token}`}}).then(res=>{
          console.log(res.data.rows)
          setJobs(res.data.rows);}).catch(err=>console.error('Error fetching jobs:',err))
    },[])
    return(
        <div>
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map((job,index) => (
            <li key={job.Id||index}>
              <Link to={`/eid/jobs/${job.Id}`}>
                <strong>{job.title}</strong> at {job.company} ({job.location}) - Posted on {job.posted_date}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}

const EmployeeDash=()=>{
    const [profile,setProfile]=useState({});
    const authData=useAuth();
    useEffect(()=>{
        API.get('/eid',{headers:{"Authorization":`Bearer ${authData.token}`}}).then((res)=>{
            setProfile(res.data)
        })
        .catch(err=>console.log(err))
    },[])
    return(
      <div>
        {profile.Name}
      </div>
    )
}

const EmployeeProfile=()=>{
  const [profile,setProfile]=useState(null);
  useEffect(()=>{
    API.get('/eid/profile').then((res)=>{
        setProfile(res.data)
    })
    .catch(err=>console.log(err))
  })
  return(
    <>{profile}</>
  )
}

export {EmployeeProfile}
export {EmployeeDash};
export {JobsList};