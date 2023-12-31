const pool = require("../../db");


class AccountMoneyService {

    constructor(){

    }

    async createAccountMoney(newAccount) {
            const {name,id_user,name_company,total_money}=newAccount
            try {
                const [result]=await pool.query('INSERT INTO account_money  (name,id_user,name_company,total_money) VALUES (?,?,?,?)',[name,id_user,name_company,total_money])

                return result
            } catch (error) {
                throw new Error(error.message)
            }
    }


    async getAccountsMoneyService(idUser,roles){
        
        try {

            if (roles.includes(1)) {

                const [result] = await pool.query('SELECT * from account_money')
                return result

            } else {
                const [result] = await pool.query('SELECT * from account_money where id_user=?', [idUser])

                return result
            }

        } catch (error) {

            throw new Error(error.message);
            
        }

    }

    async updateAccountMoneyService(updatedAccount) {
        try {
            const {id, name, id_user, name_company, total_money, created_at, updated_at}=updatedAccount
            const [result] = await pool.query(`UPDATE categories_type_operation
            SET name =IFNULL(?,name), id_user = IFNULL(?,id_user) , type_operation= IFNULL(?,type_operation)  WHERE id = ? `, [name, id_user, type_operation, id])
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports=AccountMoneyService