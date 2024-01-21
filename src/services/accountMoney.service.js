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

    async updateQuantityAccount (idAccount,type_operation,newAquantity) {
        try {
            const response = await this.getAccountMoneyById(idAccount);
            
            if (response.length<=0) {
                throw new Error('Account Not found')
            }

            const [accountFound]=response
            let quantityAccount = accountFound.total_money

            if (type_operation==='IN') {
                quantityAccount+=newAquantity
                const [result] = await pool.query(`UPDATE account_money
            SET total_money=IFNULL(?,total_money)  WHERE id = ? `, [quantityAccount,idAccount])
            return result
            }else if (type_operation==='OUT'){

                quantityAccount-=newAquantity

                if (quantityAccount<0) {
                    throw new Error('Monto insuficiente en la cuenta')
                }

                const [result] = await pool.query(`UPDATE account_money
            SET total_money=IFNULL(?,total_money)  WHERE id = ? `, [quantityAccount,idAccount])

            return result
            } else {
                throw new Error('Operacion desconocida')
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAccountsMoneyService(idUser,roles) {
        
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
            const {id, name,  name_company}=updatedAccount
            const [result] = await pool.query(`UPDATE account_money
            SET name =IFNULL(?,name), name_company= IFNULL(?,name_company)  WHERE id = ? `, [name, name_company, id])

            return result
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async getAccountMoneyById(id){
        try {

            const [rows] = await pool.query('SELECT * FROM account_money WHERE id=?', [id])

            return rows

        } catch (error) {

            throw new Error(error.message)
        }
    }

    async deleteAccountMoney(idAccount){
        try {
            const [rows] = await pool.query('DELETE FROM account_money WHERE id=?', [idAccount])
            return rows
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports=AccountMoneyService