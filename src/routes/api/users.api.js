const express=require('express')
const pool = require('../../../db')
const {getUsers,createUser,getUser, deleteUser, updateUser} = require('../../controllers/users.controller')
const { validatorHandler } = require('../../middlewares/validator.handler')
const { creatUserSchema } = require('../../schemas/user.schema')


const router= express.Router()


router.get('/', getUsers)
router.get('/:id',getUser)
router.post('/',validatorHandler(creatUserSchema,'body'), createUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)


module.exports=router