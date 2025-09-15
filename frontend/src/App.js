import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Login, SignUp } from './pages/LoginPage';
import { RecruiterDash, RecruiterApplications } from './components/RecruiterHome';
import { EmployeeDash, JobsList } from './components/CandidateHome';
import JobDetail from './pages/JobsDesc';
import JobPostForm from './components/JobPostForm';
import { AuthProvider, useAuth } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dash from './pages/Dash';
import { Jobs } from './pages/Jobs';
import Applications from './pages/Applications';
import Home from './pages/Home';
import DashboardLayout from './components/DashboardLayout';
import Profile from './pages/Profile';
import AxiosInterceptorSetup from './components/AxiosInterceptorSetup';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AxiosInterceptorSetup/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />

            <Route path='/:id' element={
              <ProtectedRoute>
                <DashboardLayout/>
              </ProtectedRoute>
            }>
              <Route index element={<Dash/>}/>
            <Route path='jobs' element={<Jobs/>}/>
            <Route path='jobs/:jid' element={<JobDetail/>}/>
            <Route path='jobs/:jid/applications' element={<RecruiterApplications/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='applications' element={<Applications/>}/>
            <Route path='jobs/create' element={
                <ProtectedRoute allowedRoles={["RECRUITER"]}>
                    <JobPostForm />
                </ProtectedRoute>
            } />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
