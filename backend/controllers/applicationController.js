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
    console.log(req.user)
    const userId = req.user.id; // Assuming authorizeEmployee sets req.user
    console.log(jobId,userId)
    // Example logic
    const [candidaterows]=await db.query('SELECT Id from Candidates where Email=?',[req.user.email])

    if (candidaterows.length === 0) {
      await db.query(
        'insert into candidates (Id,Name,Email) values(?,?)',[req.user.Id,req.user.name,req.user.email]
      )
    }

    const candidateId=candidaterows[0].Id;

    const [existing]=await db.query('SELECT * from Applications where CandidateId=? and JobId=?',[candidateId,jobId])

    if (existing.length>0){
      console.log(existing)
      return res.status(409).json({message:'Already Applied for this Job'})
    }

    await db.query(
      'Insert into applications (JobId,CandidateId,Status) values (?,?,?)',[jobId,candidateId,"Applied"]
    )
    res.status(201).json({ message: 'Application submitted successfully'});
  } catch (error) {
    console.error('Apply to job error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
