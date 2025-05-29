const express=require('express');
const cors=require('cors');
const employeeRoutes=require('./routes/employee');
const recruiterRoutes=require('./routes/recruiter');
const authRoutes=require('./routes/auth');
require('./database/db');

const app=express();
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auth',authRoutes);
app.use('/eid',employeeRoutes);
app.use('/rid',recruiterRoutes);


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`);});