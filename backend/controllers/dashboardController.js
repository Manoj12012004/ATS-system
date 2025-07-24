const { application } = require('express');
const db=require('../database/db');

exports.employeeDashboard= async (req,res)=>{
    const employee_id=req.user.id
    
    const [userResults]=await db.query(
            `SELECT u.Id, u.Name, u.Email, a.Id AS application_id, a.Status, j.Title AS job_title
        FROM users u
        LEFT JOIN applications a ON u.Id = a.CandidateId
        LEFT JOIN jobs j ON a.JobId = j.Id
        WHERE u.Id = ?`,
        [employee_id]
    )

    const {Id,Name,Email}=userResults[0];
    const applications=userResults
            .filter(app=>app.application_id !== null)
            .map(app=>({
                application:app.application_id,
                Status:app.Status,
                JobTitle:app.job_title
            }));
    if (userResults.length==0) return res.status(404).json({message:"Employee Not Found"});
    res.json({Id,Name,Email,applications})
    
};

exports.recruiterDashboard=async(req,res)=>{
    const recruiter_id=req.user.id
    console.log("Recruiter ID:", recruiter_id);
    const [userResults]=await db.query(
        `SELECT u.Id, u.Name, u.Email
     FROM users u
     WHERE u.Id = ? AND u.Role = 'RECRUITER'`,
    [recruiter_id],
    );

    if(userResults.length===0) return res.status(404).json({message:"Recruiter Not Found"});

    const [jobResults]=await db.query(
        `SELECT j.Id AS job_id, j.Title, COUNT(a.id) AS applications_count
         FROM jobs j
         LEFT JOIN applications a ON j.Id = a.JobId
         WHERE j.CreatedBy = ?
         GROUP BY j.Id`,
        [recruiter_id])
    
    res.json({ profile: userResults[0], jobs: jobResults });
    }
