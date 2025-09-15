import React from "react";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-center text-gray-800">Sign Up</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">Role</label>
            <select name="role" value={form.role} onChange={handleChange} required className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500">
              <option value="">Select Role</option>
              <option value="RECRUITER">Recruiter</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>

          <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none">
            Sign Up
          </button>

          {status &&
            <div className={`p-4 mt-4 text-sm text-white rounded-lg ${status.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {status.message}
            </div>
          }
          <div className="text-center mt-4">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-center text-gray-800">Login</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>

          <button type="submit" className="w-full py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none">
            Login
          </button>

          {status &&
            <div className={`p-4 mt-4 text-sm text-white rounded-lg ${status.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {status.message}
            </div>
          }
          <div className="text-center mt-4">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export{Login,SignUp};
