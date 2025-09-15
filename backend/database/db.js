const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});

if (process.env.NODE_ENV !== 'production') {
    const sqlFilePath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return;
        }
        console.log('Connected to the database via pool');
        connection.query(sql, (err) => {
            connection.release();
            if (err) {
                console.error('Error executing SQL script:', err);
                return;
            }
            console.log('Database schema created successfully');
        });
    });
}

module.exports = pool.promise();
