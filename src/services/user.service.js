const pool = require("../../db")

class UserService {
    constructor(){

    }

    async getUser(id){

        try {

            const [rows] = await pool.query('SELECT * FROM users WHERE id=?', [id])

            return rows

        } catch (error) {

            throw new Error(error.message)
        }
        

    }

      async getUsers ()  {

        try {
            const [result] = await pool.query('select * from users')
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    
    }

    async createUser (newUser) {
        const { first_name, last_name, email, description } = newUser;
    try {

        // [rows] destructuring de un array -> [rows] = [x,y,z] rows toma del valor de x respectivamente
        const [rows] = await pool.query('INSERT INTO users (first_name,last_name,email,description ) VALUES (?,?,?,?)', [first_name, last_name, email, description]);

        return rows

    } catch (error) {

        throw new Error(error.message)

    }
    }

    async updateUser (updatedUser) {
        const { first_name,
            last_name,
            email,
            description ,id } = updatedUser
        try {
            const [result] = await pool.query(`UPDATE users
            SET first_name =IFNULL(?,first_name), last_name = IFNULL(?,last_name) , email = IFNULL(?,email) , description= IFNULL(?,description) WHERE id = ? `, [first_name,
                last_name,
                email,
                description, id])
            
                return result
    
        } catch (error) {
    
            throw new Error(error.message)
        }
    }
    async  deleteUser(id) {
        try {
            const [rows] = await pool.query('DELETE  FROM users WHERE id=?', [id])
            return rows
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports=UserService
