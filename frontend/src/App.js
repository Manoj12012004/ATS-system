import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login, SignUp } from './pages/LoginPage';
import { RecruiterDash } from './pages/RecruiterHome';
import { EmployeeDash, JobsList } from './pages/CandidateHome';
import JobDetail from './pages/JobsDesc';
import JobPostForm from './components/JobPostForm';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dash from './pages/Dash';
import { Jobs } from './pages/Jobs';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/:id' element={<ProtectedRoute><Dash/></ProtectedRoute>}/>
          <Route path='/:id/jobs' element={<ProtectedRoute><Jobs/></ProtectedRoute>}/>
          <Route path='/:id/jobs/:jid' element={<ProtectedRoute><JobDetail/></ProtectedRoute>}/>
          <Route path='/:id/jobs/applications'/>
          {/* EMPLOYEE ROUTES */}
          <Route path='/eid/jobs' element={<ProtectedRoute role="EMPLOYEE"><JobsList /></ProtectedRoute>} />
          <Route path='/eid/jobs/:jid' element={<ProtectedRoute role="EMPLOYEE"><JobDetail /></ProtectedRoute>} />

          {/* RECRUITER ROUTES */}
          <Route path='/rid' element={<ProtectedRoute role="RECRUITER"><RecruiterDash /></ProtectedRoute>} />
          <Route path='/rid/jobs' element={<ProtectedRoute role="RECRUITER"><JobsList /></ProtectedRoute>} />
          <Route path='/rid/jobs/create' element={<ProtectedRoute role="RECRUITER"><JobPostForm /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
