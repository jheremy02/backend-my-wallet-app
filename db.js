const {createPool} = require('mysql2/promise')

const pool=createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'halamadridcr72018',
    database:'my_wallet_db'
})

module.exports=pool