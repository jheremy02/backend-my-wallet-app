const pool = require("../../db");
const AccountMoneyService = require("./accountMoney.service");

const accountService=new AccountMoneyService();

class OperationService {

    constructor() {

    }

    async getOperation(id) {
        try {
            const [result] = await pool.query('SELECT * FROM operations WHERE id=?', [id])

            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getOperations() {
        try {
            const [result] = await pool.query('SELECT * FROM operations')

            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createOperation(newOperation) {


        try {
            const { id_user, type_operation, state_operation, description, id_type_category, date_operation_time, quantity, id_account_money } = newOperation
            const [result] = await pool.query('INSERT INTO operations (id_user,type_operation,state_operation,id_type_category,description,date_operation,quantity,id_account_money) values (?,?,?,?,?,?,?,?)', [id_user, type_operation, state_operation, id_type_category, description, date_operation_time, quantity, id_account_money])

            const resultUpdateAccount=await accountService.updateQuantityAccount(id_account_money,type_operation,quantity)

            return result

        } catch (error) {
            throw new Error(error.message)
        }


    }

    async updateOperation(updatedOperation) {

        try {
            let { id, id_user, type_operation, state_operation, description, id_type_category, quantity, id_account_money, date_operation_time } = updatedOperation
            const response = await this.getOperation(id)
            const [operationFound] = response
            if (response.length <= 0) {
                throw new Error('Operation not found')
            }

            const [result] = await pool.query('UPDATE operations SET id_user = IFNULL(?,id_user), type_operation = IFNULL(?,type_operation), state_operation= IFNULL(?,state_operation) , id_type_category = IFNULL(?,id_type_category), description = IFNULL(?,description),quantity = IFNULL(?,quantity),id_account_money = IFNULL(?,id_account_money),date_operation = IFNULL(?,date_operation)   WHERE id=?', [id_user, type_operation, state_operation, id_type_category, description, quantity, id_account_money, date_operation_time, id])
            //console.log(result,'updated operation')

            const idAccount=operationFound.id_account_money

            if ((operationFound.type_operation !== type_operation) || ((operationFound.quantity !== quantity)) || operationFound.id_account_money!==id_account_money ) {

                
                if (operationFound.type_operation === 'OUT') {
                    const result=await accountService.updateQuantityAccount(idAccount,'IN',operationFound.quantity)

                } else if (operationFound.type_operation === 'IN') {
                    const result=await accountService.updateQuantityAccount(idAccount,'OUT',operationFound.quantity)

                }

                const resultUpdateAccount=await accountService.updateQuantityAccount(id_account_money,type_operation,quantity)

            } 
            
            
       
            return result
        } catch (error) {
            console.log(error)
            throw new Error(error.message);

        }
    }

    async deleteOperation(id) {
        try {
            const result = await pool.query('DELETE FROM OPERATIONS WHERE id=?', [id])

            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }



}

module.exports = OperationService