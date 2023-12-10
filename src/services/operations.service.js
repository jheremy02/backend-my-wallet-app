const pool = require("../../db");

class OperationService {

    constructor () {

    }

    async getOperation (id) {
        try {
            const [result] = await pool.query('SELECT * FROM operations WHERE id=?',[id])
           
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getOperations () {
        try {
            const [result] = await pool.query('SELECT * FROM operations')
            
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createOperation (newOperation) {


        try {
            const {id_user,type_operation,state_operation,description,id_type_category} = newOperation
            const [result] = await pool.query('INSERT INTO operations (id_user,type_operation,state_operation,id_type_category,description) values (?,?,?,?,?)',[id_user,type_operation,state_operation,id_type_category,description])

            return result

        } catch (error) {
            throw new Error(error.message)
        }
    

    }

    async updateOperation (updatedOperation) {
        try {
            const {id,id_user,type_operation,state_operation,description,id_type_category} = updatedOperation
            const [result]= await pool.query('UPDATE operations SET id_user = IFNULL(?,id_user), type_operation = IFNULL(?,type_operation), state_operation= IFNULL(?,state_operation) , id_type_category = IFNULL(?,id_type_category), description = IFNULL(?,description)  WHERE id=?',[id_user,type_operation,state_operation,id_type_category,description,id])

            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteOperation(id){
        try {
            const result = await pool.query('DELETE FROM OPERATIONS WHERE id=?',[id])
        
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }
    


}

module.exports=OperationService