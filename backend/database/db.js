const mysql= require('mysql2');
const path=require('path');
const fs=require('fs');

const connection=mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'root',
    database:'ats_db',
    multipleStatements:true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const sqlFilePath=path.join(__dirname,'schema.sql');
const sql=fs.readFileSync(sqlFilePath,'utf8');
connection.connect((err)=>{
    if(err){
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    connection.query(sql,(err)=>{
        if(err){
            console.error('Error executing SQL script:', err);
            return;
        }
        console.log('Database schema created successfully');
    });
});
module.exports=connection.promise();
