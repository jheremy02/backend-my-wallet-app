const { json } = require("express")
const pool = require("../../db")
const UserService = require("../services/user.service")
const  boom  = require("@hapi/boom")

const service = new UserService()


const getUsers = async (req, res,next) => {

    try {
        const result = await service.getUsers()
        res.json({
            data:result,
            success:true
        })
    } catch (error) {
        next(error)
    }

}

const createUser = async (req, res,next) => {

    const { first_name, last_name, email, description ,password,roles} = req.body;
   
    try {

        // [rows] destructuring de un array -> [rows] = [x,y,z] rows toma del valor de x respectivamente
        const rows = await service.createUser({ first_name, last_name, email, description,password,roles })

        res.json({data:{ id: rows.insertId, first_name, last_name, email, description },success:true})
        
    } catch (error) {

        next(error)

    }

}

const updateUser = async (req, res,next) => {

    try {
        const { id } = req.params
        const { first_name,
            last_name,
            email,
            description } = req.body
        const result = await service.updateUser({
            first_name,
            last_name,
            email,
            description, id
        })

        if (result.affectedRows <= 0) {
            throw boom.notFound('user nor found')
        }

        const userResult = await service.getUser(id)
        res.json({ message: 'updated successfully', success: true, data: { ...userResult[0]  } })

    } catch (error) {

        next(error)
    }
}



const getUser = async (req, res,next) => {

    try {

        const user = await service.getUser(req.params.id)

        

        res.json({
            data:{ ...user[0] },
            success:true
        });

    } catch (error) {

        next(error)
    }

}


const deleteUser = async (req, res) => {

    try {
        const rows = await service.deleteUser(req.params.id)

        if (rows.affectedRows <= 0) {

            throw boom.notFound('User Not found')

        }

        res.json({ message: 'deleted successfully', success: true })
    } catch (error) {

        next(error)

    }

}

module.exports = { getUsers, createUser, getUser, deleteUser, updateUser }