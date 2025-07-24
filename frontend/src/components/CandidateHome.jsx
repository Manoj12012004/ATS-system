import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Alert, Form,Card,Button, Container, Spinner, Table } from "react-bootstrap";

const JobsList = () => {
    const [jobs,setJobs]=useState([]);
    const authData=useAuth();
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        API.get('/eid/jobs',{headers:{"Authorization":`Bearer ${authData.token}`}}).then(res=>{
          setJobs(res.data.rows);
        setLoading(false)}).catch(err=>console.error('Error fetching jobs:',err))
    },[])
    if(loading) return (
    <Container>
      <Spinner animation="border" variant="primary"/>
    </Container>
    )
    return(
        <Container className="mt-4">
          <h4>Available Jobs</h4>
          {jobs.length === 0 ? (
            <Alert variant="info">No jobs available at the moment.</Alert>
          ) : (
            jobs.map((job, index) => (
              <Card key={job.job_id || index} className="mb-3 shadow">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/eid/jobs/${jobs.Id}`}>{job.Title}</Link>
                  </Card.Title>  
                  <Card.Text className="text-muted mb-1">
                    {job.company} - {job.location}<br />
                  </Card.Text>
                  <Card.Text className="small">
                    Posted on:{new Date(job.posted_date).toLocaleDateString()}
                  </Card.Text>
                  <Link to={`/eid/jobs/${job.Id}/apply`}>
                    <Button variant="primary">Apply Now</Button>
                  </Link>
                </Card.Body>
              </Card>
          )))}
        </Container>
    )
}

const EmployeeDash=()=>{
    const [profile,setProfile]=useState({});
    const authData=useAuth();
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    useEffect(()=>{
        API.get('/eid',{headers:{"Authorization":`Bearer ${authData.token}`}}).then((res)=>{
            console.log(res.data)
            setProfile(res.data)
            setLoading(false);
        })
        .catch(err=>{
          const msg=err?.response?.data?.message || "An error occurred";
          setError(msg);
          setLoading(false);
        })
    },[])
    if(loading) return (
      <Container>
        <Spinner animation="border" variant="primary"/>
      </Container>
    );

    if(error) return (
      <Container>
        <Alert variant="danger">
          {error}</Alert>
      </Container>
    )

    return(
      <Container className="mt-4">
        <Card className="mb-4 shadow" >
          <Card.Body>
            <Card.Title>Welcome,{profile.Name}</Card.Title>
            <Card.Subtitle className="text-muted">{profile.Email}</Card.Subtitle>
          </Card.Body>
        </Card>

        <h4>My Job Applications</h4>
        {profile.applications && profile.applications.length > 0 ? (
          <p>You haven't applied for any jobs yet.</p>
        ):(
          <Table striped bordered hover responsive className="shadow">
            <thead>
              <tr>
                <th>#</th>
                <th>Job Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {profile.applications.map((app, index) => (
                <tr key={app.application_id||index}>
                  <td>{index + 1}</td>
                  <td>{app.JobTitle||'N/A'}</td>
                  <td>
                    <span className={`badge bg-${getStatusVarient(app.Status)}`}>{app.Status}</span></td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    )
}
const getStatusVarient=(status)=>{
  switch(status){
    case 'Applied':
      return 'primary';
    case 'Interviewed':
      return 'warning';
    case 'Accepted':
      return 'success';
    case 'Rejected':
      return 'danger';
    default:
      return 'secondary';
  }
}
const EmployeeProfile=()=>{
  const [profile,setProfile]=useState(null);
  const [loading,setLoading]=useState(true);
  const [status,setStatus]=useState(null);
  const authData=useAuth();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setProfile((prev)=>({...prev,[name]:value}))
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    setStatus(null);
    
  }
  useEffect(()=>{
    API.get('/eid/profile',{headers:{"Authorization":`Bearer ${authData.token}`}}).then((res)=>{
        setProfile(res.data)
        setLoading(false);
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
    })
  })
  if(loading) return (
    <Container>
      <Spinner animation="border" variant="primary"/>
    </Container>
  )
  return(
    <Container className="my-5" style={{maxWidth:'600px'}}>
      <Card className="p-4 shadow">
        <h3 className="mb-4">My Profile</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" contorlId='name'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                onChange={handleChange}
                value={profile.Name}
                required
                placeholder='Enter Full Name'
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                required
                name='email'
                value={profile.Email}
                onChange={handleChange}
                placeholder='name@example.com'
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type='text'
                name='role'
                value={profile.Role}
                disabled
                plaintext
                readOnly
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Update Profile</Button>
          </Form>
      </Card>
    </Container>
  )
}
const CandidateApplications = () => {
    const [applications, setApplications] = useState([]);
    const authData = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        API.get("/eid/applications", {
            headers: { 'Authorization': `Bearer ${authData.token}` }
        }).then(res=>{
            setApplications(res.data.data);
            setLoading(false);
        }).catch(err => {
            let msg="Error fetching applications"+ err.message;
            setError(msg)
            setLoading(false);
        });
    },[])
    if (loading) return(
        <Container>
            <Spinner animation="border" variant="primary"/>
        </Container>
    )
    return(
        <Container className="mt-4">
            <h2>My Applications</h2>
            {error && <p className="text-danger">{error}</p>}
            {applications.length === 0 ? (
                <p>You haven't applied for any jobs yet.</p>):(
                    <Table striped bordered hover responsive className="shadow">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Job Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app,index)=>{
                                return(
                                    <tr key={app.application_id||index}>
                                        <td>{index+1}</td>
                                        <td>{app.job_title}</td>
                                        <td>{app.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                )}
        </Container>
    )
}

export {CandidateApplications ,EmployeeProfile,EmployeeDash,JobsList};