import React from "react";
import { Button, Form, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import API from "../api/axios";
import { useAuth } from "../components/AuthContext";

const handleFormChange = (setForm) => (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const SignUp = () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const [status, setStatus] = React.useState(null);
  const handleChange = handleFormChange(setForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/register', form);
      setStatus({ type: "success", message: response.data.message });
      navigate('/login');
    } catch (error) {
      const errMessage = error?.response?.data?.message || "Something went wrong!";
      setStatus({ type: "danger", message: errMessage });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '100%', maxWidth: '500px' }} className="p-4 shadow">
        <h3 className="text-center mb-4">Sign Up</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Employee">Employee</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="w-100" variant="primary">
            Sign Up
          </Button>

          {status &&
            <Alert variant={status.type} className="mt-3">
              {status.message}
            </Alert>
          }
          <div className="text-center mt-3">
            <span>Already have an account </span>
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};



const Login = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const [status, setStatus] = React.useState(null);
  const navigate = useNavigate();
  const handleChange = handleFormChange(setForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', form, { withCredentials: true });
      setStatus({ type: "success", message: response.data.message });
      login(response.data.user, response.data.token);
      navigate(`/${response.data.user.id}`);
    } catch (error) {
      const errMessage = error?.response?.data?.message || "Login failed!";
      setStatus({ type: "danger", message: errMessage });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '100%', maxWidth: '500px' }} className="p-4 shadow">
        <h3 className="text-center mb-4">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required />
          </Form.Group>

          <Button type="submit" className="w-100" variant="dark">
            Login
          </Button>

          {status &&
            <Alert variant={status.type} className="mt-3">
              {status.message}
            </Alert>
          }
          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-primary">
              Sign Up
            </Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export{Login,SignUp};
