const { json } = require("express")
const pool = require("../../db")



const getUsers=async (req,res)=>{

    const [result] =  await pool.query('select * from users')
      res.json(result)
  
}

const createUser= async (req,res) =>{

    const {first_name,last_name,email,description} = req.body ;

    // [rows] destructuring de un array -> [rows] = [x,y,z] rows toma del valor de x respectivamente
    const [rows]= await pool.query('INSERT INTO users (first_name,last_name,email,description ) VALUES (?,?,?,?)',[first_name,last_name,email,description]) ;

    res.json( { id:rows.insertId, first_name,last_name,email,description})

}



const getUser= async (req,res) =>{

    try {
        const [rows]=await pool.query('SELECT * FROM users WHERE id=?',[req.params.id])

    if (rows.length<=0) return res.status(404).json({message:'Not found',status:false})

    res.json({result})
    } catch (error) {
        
       return  res.status(500).json({message:error.message,status:false})
    }
}


const deleteUser=async (req,res)=>{

    const [rows] =await pool.query('DELETE  FROM users WHERE id=?',[req.params.id])

    if (rows.affectedRows <= 0) return res.status(404).json({message:'Not found',status:false})

    res.json({message:'deleted successfully',status:true})

}

module.exports={getUsers,createUser,getUser,deleteUser}