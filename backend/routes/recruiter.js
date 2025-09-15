const express = require('express');
const router = express.Router();
const { recruiterDashboard } = require('../controllers/dashboardController');
const { postJob, getJobByJobId, getJobByUserId } = require('../controllers/jobController');
const { getApplicationByJobId, updateApplicationStatus } = require('../controllers/applicationController');
const { RecruiterProfile } = require('../controllers/profileController');
const {authorizeRecruiter} = require('../middlewares/auth');

router.get('/',authorizeRecruiter,recruiterDashboard)
router.get('/profile',authorizeRecruiter,RecruiterProfile)
router.post('/jobs/create',authorizeRecruiter,postJob)
router.get('/jobs',authorizeRecruiter,getJobByUserId)
router.get('/jobs/:id',authorizeRecruiter,getJobByJobId)
router.get('/jobs/:id/applications',authorizeRecruiter,getApplicationByJobId)
router.put('/applications/:id',authorizeRecruiter,updateApplicationStatus)

module.exports = router;
