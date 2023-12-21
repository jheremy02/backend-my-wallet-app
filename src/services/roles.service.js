const pool = require("../../db")

class RoleService {
    constructor(){}


    async getRolesService(){
        try {
            const [rows]=await pool.query("SELECT * FROM roles")
     
            return rows
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports=RoleService