const jwt=require('jsonwebtoken');

const authorizeEmployee=(req,res,next)=>{
    const authHeader=req.get("Authorization");
    console.log("Authorization Header :",authHeader)
    const token=authHeader.split(' ')[1];
    console.log(token)
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    jwt.verify(token,process.env.JWT_SECRET || 'your_default_secret',(err,user)=>{
        if(err){
            return res.status(403).json({message:"Forbidd1"});
        }
        if (user.role!=='EMPLOYEE') return res.status(403).json({message:"Forbidd2"})
        req.user=user;
        console.log("Authorized Employee")
        next();
    });
}
const authorizeRecruiter=(req,res,next)=>{
    const authHeader = req.get('Authorization'); // or req.get('Authorization')
    console.log('Authorization Header:', authHeader);
    const token = authHeader.split(' ')[1]; // Assuming the format
    console.log(token)
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret', (err, user) => {
    if (err) return res.status(403).json({ message: err });

    if (user.role !== 'RECRUITER') return res.status(403).json({ message: 'Forbidd2' });

    req.user = user; // attach user info to request
    console.log("Authorized Recruiter:", req.user);
    next();
  });
}
module.exports = {authorizeRecruiter,authorizeEmployee};