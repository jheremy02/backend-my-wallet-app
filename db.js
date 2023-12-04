const {createPool} = require('mysql2/promise')
const {DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USER}=require('./config')
const pool=createPool({
    host:DB_HOST,
    port:DB_PORT,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_DATABASE
})
console.log(DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USER)
module.exports=pool