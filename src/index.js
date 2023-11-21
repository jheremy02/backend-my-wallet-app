const express = require('express');
const routerApi = require('./routes/api/index.api');
const pool = require('../db');

const app = express(); const port = 3000;

app.use(express.json())
routerApi(app);
/*

    app.get('/',async  (req, res) => { 
    const [result] = await pool.query('select * from users')
    res.json(result)
 });
*/

 


app.listen(port, () => { console.log('Mi port' + port); });