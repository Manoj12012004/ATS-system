import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button, Card, Container, Spinner } from "react-bootstrap";

const RecruiterApplications = () => {
    const [app, setApp] = useState([]);
    const { jid } = useParams(); // Destructure directly
    const authData = useAuth();
    const user = authData?.user;

    useEffect(() => {
        if (user?.role === "RECRUITER" && jid) {
            API.get(`/rid/jobs/${jid}/applications`, {
                headers: { 'Authorization': `Bearer ${authData.token}` }
            })
            .then(res => setApp(res.data.data))
            .catch(err => console.error("Error fetching applications:", err));
        }
    }, [user?.role, jid, authData.token]);

    return (
        <div>
            <h2>Applications for Job ID: {jid}</h2>
            {app.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <ul>
                    {app.map((application, index) => (
                        <li key={application.id||index}>
                            <pre>{JSON.stringify(application, null, 2)}</pre>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

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
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        API.get('/rid/jobs',{headers:{'Authorization':`Bearer ${auth.token}`}}).then(res=>{
            setJobs(res.data.jobs);
            setLoading(false);
        }).catch((err)=>console.log(err))
    },[])
    if(loading) return (
        <Container>
            <Spinner animation="border" variant="primary"/>
        </Container>
    )
    return(
        <Container className="mt-4">
            <h2>Your Posted Jobs</h2>
            {jobs.length === 0 ? (
                <p>No jobs posted yet.</p>
            ) : (
                jobs.map((job, index) => (
                    <Card key={job.job_id || index} className="mb-3 shadow">
                        <Card.Body>
                            <Card.Title>
                                <Link to={`/rid/jobs/${job.job_id}`}>{job.Title}</Link>
                            </Card.Title>
                            <Card.Text className="text-muted mb-1">
                                Applications: {job.applications_count}
                            </Card.Text>
                            <Link to={`/rid/jobs/${job.job_id}/applications`}>
                                <Button variant="primary">View Applications</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    )
}
export {JobsByRecruiter,RecruiterApplications,RecruiterDash}
