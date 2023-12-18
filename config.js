const  {config}=require('dotenv')

config()

 const PORT=process.env.PORT
 const DB_HOST=process.env.DB_HOST
const DB_PORT=process.env.DB_PORT
 const DB_USER=process.env.DB_USER
 const DB_PASSWORD=process.env.DB_PASSWORD
 const DB_DATABASE=process.env.DB_DATABASE
const API_KEY=process.env.API_KEY
 module.exports={PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
   API_KEY}