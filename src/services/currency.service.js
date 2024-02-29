const { response } = require("express");
const pool = require("../../db");
const  boom  = require("@hapi/boom");

class CurrencyService {

    constructor() {
        this.connection = null
    }

    async setConnection(connection) {
        this.connection = connection
    }

    async getCurrencies() {

        try {

            const [result]=await pool.query(`SELECT * FROM currency`,[])

            return result

        } catch (error) {

            throw error ;

        }

    }

    async updateCurrencyUser(id,idCurrency) {
        try {
            await this.connection.beginTransaction();
            const [result] = await this.connection.query(`UPDATE currency_user
            SET  id_currency = IFNULL(?,id_currency)   WHERE id = ? `, [ idCurrency,  id])

            await this.connection.commit()
            return  result
        } catch (error) {
            await this.connection.rollback();
            throw error ;
        }
    }

    async createCurrencyUser(idUser,idCurrency){

        try {

            await this.connection.beginTransaction();
            const [result]= this.connection.query(`INSERT INTO currency_user (id_user,id_currency) values(
                ?,?
            )`,[idUser,idCurrency]);

            await this.connection.commit()
                return result
        } catch (error) {
            await this.connection.rollback();
            throw error ;
        }

    }

    async getCurrencyUser(idUser){
        try {
            const [result]=await this.connection.query(`SELECT * FROM currency_user WHERE id_user=?`,[idUser])

            return result[0]
        } catch (error) {
            throw error ;
        }
    }

}

module.exports=CurrencyService