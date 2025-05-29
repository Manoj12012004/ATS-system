const express = require('express');
const router = express.Router();
const { recruiterDashboard } = require('../controllers/dashboardController');
const { postJob, getJobByJobId, getJobByUserId } = require('../controllers/jobController');
const { getApplicationByJobId } = require('../controllers/applicationController');
const {authorizeRecruiter} = require('../middlewares/auth');

router.get('/',authorizeRecruiter,recruiterDashboard)
router.get('/profile',authorizeRecruiter,recruiterDashboard)
router.post('/jobs/create',authorizeRecruiter,postJob)
router.get('/jobs',authorizeRecruiter,getJobByUserId)
router.get('/jobs/:id',authorizeRecruiter,getJobByJobId)
router.get('/jobs/:id/applications',authorizeRecruiter,getApplicationByJobId)

module.exports = router;