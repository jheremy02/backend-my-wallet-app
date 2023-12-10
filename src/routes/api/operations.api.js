const express=require('express')
const { getOperations, createOperation, getOperation, updateOperation, deleteOperation } = require('../../controllers/operations.controller')
const { validatorHandler } = require('../../middlewares/validator.handler')
const { updateOperationSchema, createOperationSchema } = require('../../schemas/operation.schema')

const router= express.Router()



router.get('/',getOperations)
router.get('/',getOperation)
router.post('/',validatorHandler(createOperationSchema,'body'),createOperation)
router.delete('/',deleteOperation)
router.put('/' ,validatorHandler(updateOperationSchema,'body') ,updateOperation)

module.exports=router