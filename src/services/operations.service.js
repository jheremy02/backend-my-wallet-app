const pool = require("../../db");

class OperationService {

    constructor () {

    }

    async getOperation (id) {
        try {
            const result = await pool.query('SELECT * operations WHERE id=?',[id])
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    


}