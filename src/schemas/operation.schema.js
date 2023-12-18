const Joi = require("joi");

const id = Joi.number().integer().strict()
const id_user = Joi.number().integer()
const type_operation = Joi.string().valid("IN", "OUT")
const state_operation = Joi.string().valid("PENDING", "DONE")
const id_type_category = Joi.number().integer()
const description=Joi.string().max(255)

const createOperationSchema = Joi.object({
    id: id,
    id_user: id_user.required(),
    type_operation: type_operation.required(),
    state_operation: state_operation.required(),
    id_type_category: id_type_category.required(),
    description:description
}).unknown(true)

const updateOperationSchema=Joi.object({
    id: id.required(),
    id_user: id_user,
    type_operation: type_operation,
    state_operation: state_operation,
    id_type_category: id_type_category,
    description:description
}).unknown(true)

const deleteOperationSchema=Joi.object({
    id:id.required()
}).unknown(true)

const getOperationSchema=Joi.object({
    id:id.required()
}).unknown(true)

const getOperationsSchema=Joi.object({
    id:id.required()
}).unknown(true)


module.exports={

    createOperationSchema,updateOperationSchema,getOperationSchema,
    getOperationsSchema,deleteOperationSchema
}

