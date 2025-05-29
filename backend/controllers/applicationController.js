const db= require('../database/db');

exports.getApplicationsByEmployeeId=async(req,res)=>{
    const employeeId=req.user.id;
    try{
        const [rows]=db.query('SELECT * FROM applications WHERE CandidateId=? ORDER BY updatedat DESC',[employeeId]);
        res.json({rows});
        res.status(200).json({message:"Applications fetched successfully"});
    }
    catch(err){
        console.error('Error fetching applications:', err);
        res.status(500).json({message:"ERROR FETCHING APPLICATIONS"});
    }
}
exports.getApplicationByJobId=async(req,res)=>{
    const jobId=req.params.id;
    try{
        const [rows]= await db.query('SELECT * FROM applications WHERE JobId=?',[jobId]);
        if(rows.length===0){
            return res.status(404).json({message:"Application not found"});
        }
        res.json(rows[0]);
    }
    catch(err){
        console.error('Error fetching application:', err);
        res.status(500).json({message:"ERROR FETCHING APPLICATION"});
    }
}
// controller/jobController.js
exports.applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id; // Assuming authorizeEmployee sets req.user

    // Example logic
    const alreadyApplied = await db.Application.findOne({ where: { jobId, userId } });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const application = await db.Application.create({
      jobId,
      userId,
      status: 'applied',
      appliedAt: new Date(),
    });

    res.status(201).json(application);
  } catch (error) {
    console.error('Apply to job error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
