const db=require('../database/db');

exports.getAllJobs=async(req, res) => {
    try{
        const [rows]= await db.query('SELECT * FROM jobs ORDER BY id DESC')
        res.json({rows});
    }catch(err){
        console.error('Error fetching jobs:', err);
        res.status(500).json({message:"ERROR FETCHING JOBS"});
    }
}
exports.getJobByUserId=async(req,res)=>{
    const recruiter_id=req.user.id;
    console.log(recruiter_id)
    try{
        const [jobs]= await db.query('SELECT * FROM jobs WHERE CreatedBy=?',[recruiter_id])
        res.json({jobs})
    }catch(err){
        console.error('Error fetching job',err);
        res.status(500).json({message:"ERROR FETCHING JOB"});
    }
}
exports.getJobByJobId=async(req, res) => {
    try{
        const jobId=req.params.id;
        const [rows]= await db.query('SELECT * FROM jobs WHERE Id=?',[jobId]);
        if(rows.length===0){
            return res.status(404).json({message:"Job not found"});
        }
        res.json(rows[0]);
    }catch(err){
        console.error('Error fetching job:', err);
        res.status(500).json({message:"ERROR FETCHING JOB"});
    }
}
exports.postJob= async(req, res) => {
    try{
        const {title,description,location,company,salary} = req.body;
        const createdby = req.user.id;
        await db.query('INSERT INTO jobs (Title,Description,Location,Company,Salary,CreatedBy) VALUES (?,?,?,?,?,?)',[title,description,location,company,salary,createdby]);
        res.status(201).json({message:"Job created successfully"});
    }catch(err){
        console.log("Error creating job:", err);
        res.status(500).json({message:"ERROR CREATING JOB"});
    }
}