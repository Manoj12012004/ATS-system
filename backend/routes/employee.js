const express = require('express');
const router = express.Router();
const { employeeDashboard } = require('../controllers/dashboardController');
const { EmployeeProfile } = require('../controllers/profileController');
const { getAllJobs, getJobByJobId } = require('../controllers/jobController');
const { applyToJob, getApplicationsByEmployeeId } = require('../controllers/applicationController');
const {authorizeEmployee}  = require('../middlewares/auth');

router.get('/',authorizeEmployee,employeeDashboard)
router.get('/profile',authorizeEmployee,EmployeeProfile)
router.get('/jobs',authorizeEmployee,getAllJobs)
router.get('/jobs/:id',authorizeEmployee,getJobByJobId)
router.post('/jobs/:id/apply',authorizeEmployee,applyToJob)
router.get('/jobs/applications',authorizeEmployee,getApplicationsByEmployeeId)

module.exports = router;