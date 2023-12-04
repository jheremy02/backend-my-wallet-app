const express=require('express')
const pool = require('../../../db')
const {getUsers,createUser,getUser, deleteUser, updateUser} = require('../../controllers/users.controller')


const router= express.Router()


router.get('/',getUsers)
router.get('/:id',getUser)
router.post('/',createUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)


module.exports=router