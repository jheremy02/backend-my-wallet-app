const pool = require("../../db")
const OperationService = require("../services/operations.service")
const boom = require("@hapi/boom")
const service = new OperationService()


const getOperation = async (req, res, next) => {

    try {
        const result = await service.getOperation(req.params.id)
        if (result.length <= 0) {

            throw boom.notFound('operation not found')

        }
        
        res.json({ data: {...result[0]},success:true })

    } catch (error) {

        next(error)

    }
}


const getOperations = async (req, res, next) => {

    try {

        const result = await service.getOperations()
        res.json({data:result,success:true})

    } catch (error) {

        next(error)

    }

}

const createOperation = async (req, res, next) => {
    try {
        const { id_user, type_operation, state_operation, description, id_type_category } = req.body
        const result = await service.createOperation({ id_user, type_operation, state_operation, description, id_type_category })

        res.json({ data: { id: result.insertId, id_user, type_operation, state_operation, description, id_type_category} , success:true })
    } catch (error) {
        next(error)
    }



}

const updateOperation = async (req, res, next) =>{
    try {

        const {id , id_user, type_operation, state_operation, description, id_type_category} = req.body

        const result = await service.updateOperation({id , id_user, type_operation, state_operation, description, id_type_category} )

        if (result.affectedRows <= 0) {
            throw boom.notFound('user nor found')
        }

        const operationResult= await service.getOperation(id)

        res.json({ message: 'updated successfully', status: true, data: { ...operationResult[0]  } })
        
    } catch (error) {
        next(error)
    }
}


const deleteOperation=async (req, res, next)=>{
    try {
        const {id}=req.body
        const [result]= await service.deleteOperation(id)
      
        if (result.affectedRows <= 0) {

            throw boom.notFound('Operation not found')

        }
        res.json({ message: 'deleted successfully', success: true })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getOperation,
    getOperations,
    createOperation,
    updateOperation,
    deleteOperation
}