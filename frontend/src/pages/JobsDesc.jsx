import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../components/AuthContext";

const JobDetail=()=>{
    const {jid}=useParams();
    const [job,setJob]=useState(null);
    const [message,setMessage]=useState('');
    const navigate=useNavigate;
    const auth=useAuth();
    console.log(auth.token)
    useEffect(()=>{
        API.get(`/eid/jobs/${jid}`,{headers:{"Authorization":`Bearer ${auth.token}`}}).then(res=>{setJob(res.data)}).catch(err=>{console.log(err)}); 
    },[jid]);
    console.log(job)
    const handleApply=()=>{
        API.post(
    `/eid/jobs/${jid}/apply`,
    {}, // No body
    {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }
  )
    .then((res) => setMessage(res.data.message))
    .catch((err) => {
      if (err.response && err.response.status === 409) {
        setMessage('You already applied for this job.');
      } else {
        console.error('Application error:', err);
        setMessage('Error submitting application.');
      }
    });
    }

    return (
    <div>
      {job ? (
        <>
          <h2>{job.title}</h2>
          <p><strong>Company:</strong> {job.Company}</p>
          <p><strong>Location:</strong> {job.Location}</p>
          <p><strong>Description:</strong> {job.Description}</p>
          <p><strong>Posted:</strong> {job.CreatedAt}</p>
          <button onClick={handleApply}>Apply</button>
          {message && <p>{message}</p>}
          <button onClick={() => navigate('/eid/jobs')}>← Back to Jobs</button>
        </>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
}
export default JobDetail;