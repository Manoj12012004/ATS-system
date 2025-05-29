import React from "react";
import { Button, Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import API from "../api/axios";
import { useAuth } from "../components/AuthContext";




const handleFormChange = (setForm) => (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const SignUp=()=>{
    const [form,setForm]=React.useState({
        name:"",
        email:"",
        password:"",
        role:"",
    })
    const navigate=useNavigate();
    const [status,setStatus]=React.useState(null);

    const handleChange = handleFormChange(setForm);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await API.post('/signup',form);
            setStatus({type:"success",message:response.data.message});
            navigate('/login');
        }
        catch(error){
            setStatus({type:"error",message:error.response.data.message});
        }
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required/>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    required/>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required/>
            </Form.Group>
            <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select>
                    <option>Select Role</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Employee">Employee</option>
                </Form.Select>
            </Form.Group>
            <Button onClick={handleSubmit}>SignUp</Button>
            {status && (<div className={`alert alert-${status.type}`}>
                    {status.message}
                </div>)}
        </Form>
    )
}

const Login=()=>{
    const [form,setForm]=React.useState({
        email:"",
        password:"",
    })
    const {login} = useAuth();
    const [status,setStatus]=React.useState(null);
    const navigate=useNavigate();

    const handleChange = handleFormChange(setForm);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            console.log(form)
            const response=await API.post('/auth/login',form, { withCredentials: true,});
            setStatus({type:"success",message:response.data.message}); 
            login(response.data.user,response.data.token) 
            console.log(response.data.user.id)
            navigate(`/${response.data.user.id}`);
        }
        catch(error){
            setStatus({type:"error",message:error});
            
        }
        
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    required/>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required/>
            </Form.Group>
            <Button type="submit">Login</Button>
            {status && (<div className={`alert alert-${status.type}`}>
                    {status.message}
                </div>)}
        </Form>
    )
}

export { Login, SignUp };