const pool = require("../../db");

class CategoryService {

    constructor() {

    }

    async getCategory(id) {

        try {

            const [rows] = await pool.query('SELECT * FROM categories_type_operation WHERE id=?', [id])

            return rows

        } catch (error) {

            throw new Error(error.message)
        }

    }

    async getCategories (idUser)  {

        try {
            const [result] = await pool.query('SELECT * from categories_type_operation where id_user=?',[idUser])
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    
    }

    async createCategory(newCategory) {

        try {
            const { name, id_user, type_operation } = newCategory
            // [rows] destructuring de un array -> [rows] = [x,y,z] rows toma del valor de x respectivamente
            const [rows] = await pool.query('INSERT INTO categories_type_operation (name,id_user,type_operation) VALUES (?,?,?)', [name, id_user, type_operation]);

            return rows

        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateCategory (updatedCategory) {
        try {
            const { id , name, id_user, type_operation } = updatedCategory

            const [result] = await pool.query(`UPDATE categories_type_operation
            SET name =IFNULL(?,name), id_user = IFNULL(?,id_user) , type_operation= IFNULL(?,type_operation)  WHERE id = ? `,[name, id_user, type_operation,id])

            return result

        } catch (error) {

            throw new Error(error.message)

        }
    }

    async deleteCategory (id) {
        try {
            const [rows]=await pool.query('DELETE FROM categories_type_operation where id=?',[id])

            return rows
        } catch (error) {
            throw new Error(error.message)
        }
    }




}

module.exports = CategoryService