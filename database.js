
const mysql = require('mysql2');
require('dotenv').config()
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
connection.connect((err)=>{
    if(err) {
        console.log(err)
        return
    }   
    console.log('Database conectada')
})
module.exports = connection