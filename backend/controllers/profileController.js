const db = require('../database/db');

exports.EmployeeProfile = async(req,res)=>{
    const employee_id=req.user.id
    const rows=await db.query(
        `SELECT u.Name,u.Email,u.Role,u.Resume_url from users u where u.Id=?`,[employee_id])

    res.json(rows[0]);
}
exports.RecruiterProfile=(req,res)=>{
    const recruiter_id=req.user.id
    db.query(
        `SELECT u.name,u.email,u.phone,u.role FROM users u WHERE u.id=?`,[recruiter_id],(err,results)=>{
            if(err) return res.status(500).json({error:err.message});
            if(results.length==0)return res.status(404).json({message:"Recruiter Not Found"});
            res.json(results[0]);
        }
    )
}