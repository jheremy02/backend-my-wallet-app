const pool = require("../../db")
const OperationService = require("../services/operations.service")
const boom = require("@hapi/boom")
const { getCurrentTime, addDayToDate, compareObjects } = require("../utils/auth/functionsTools")
const AccountMoneyService = require("../services/accountMoney.service")
const service = new OperationService()
const serviceAccount = new AccountMoneyService()

const getOperation = async (req, res, next) => {

    try {
        const result = await service.getOperation(req.params.id)
        if (result.length <= 0) {

            throw boom.notFound('operation not found')

        }

        res.json({ data: { ...result[0] }, success: true })

    } catch (error) {

        next(error)

    }
}


const getOperations = async (req, res, next) => {

    try {
        const idUser=req.user.sub
        const { start, end } = req.query
        const endFormatted = end ? addDayToDate(`${end} ${getCurrentTime()}`) : null

        const result = await service.getOperations({ start, endFormatted,idUser })
        res.json({ data: result, success: true })

    } catch (error) {

        next(error)

    }

}

const createOperation = async (req, res, next) => {
    const connection = await pool.getConnection()
    try {
        await serviceAccount.setConnection(connection)
        await service.setConnection(connection)
        await connection.beginTransaction()
        const id_user = req.user.sub
        const { type_operation, state_operation, description, id_type_category, date_operation, quantity, id_account_money } = req.body
        const current_time = getCurrentTime()
        const date_operation_time = `${date_operation} ${current_time}`
        const result = await service.createOperation({ id_user, type_operation, state_operation, description, id_type_category, date_operation_time, quantity, id_account_money })
        const resultUpdateAccount = await serviceAccount.updateQuantityAccount(id_account_money, type_operation, quantity)
        await connection.commit()
        res.json({ data: { id: result.insertId, id_user, type_operation, state_operation, description, id_type_category }, success: true })
    } catch (error) {
        await connection.rollback();
        next(error)
    }

}

const getOperationsReport = async (req, res, next) => {
    const connection = await pool.getConnection()

    try {
        await service.setConnection(connection)
        const id_user=req.user.sub
        const { report_name, year ,start,end } = req.query
        switch (report_name) {
            case 'operations_by_month':
                const result_by_month = await service.reportsService({ report_name, year , id_user  })
                res.json({ data: result_by_month, success: true })
            
                break;

            case 'operations_daily':

                const result_dayly = await service.reportsService({ report_name, start,end ,id_user })
                res.json({ data: result_dayly, success: true })
              
                break;

            case 'totals':

            const totalsOperations=await service.reportsService({ report_name, start,end ,id_user })
            const totalsAccounts = await serviceAccount.getTotalsAccount(id_user)
            res.json({ data: {...totalsAccounts,...totalsOperations}, success: true })
            default:
                
                break;
        }

    } catch (error) {
        await connection.rollback()
        next(error)

    }
}

const updateOperation = async (req, res, next) => {
    const connection = await pool.getConnection()
    try {

        await serviceAccount.setConnection(connection)
        await service.setConnection(connection)
        await connection.beginTransaction()

        const { id, id_user, type_operation, state_operation, description, id_type_category, quantity, id_account_money, date_operation } = req.body

        const current_time = getCurrentTime()
        const date_operation_time = `${date_operation} ${current_time}`
        const [response] = await connection.query('SELECT * FROM operations WHERE id = ?', [id]);
        if (response.length <= 0) {
            throw new Error('Operation not found');
        }
        const operationFound = response[0];
        const idAccount = operationFound.id_account_money;

        const areEqual = compareObjects({ id_account_money: operationFound.id_account_money, quantity: operationFound.quantity, type_operation: operationFound.type_operation, state_operation: operationFound.state_operation }, { id_account_money, quantity, type_operation, state_operation })

        if (areEqual) {
            await connection.commit()
            res.json({ message: 'updated successfully', status: true, data: { id, id_user, type_operation, state_operation, description, id_type_category, quantity, id_account_money, date_operation } })
            console.log(state_operation, 'estado de operacion')
            return;
        }

        if (operationFound.type_operation === 'OUT') {

            if (operationFound.type_operation !== type_operation && operationFound.id_account_money !== id_account_money) {
                if (state_operation === 'DONE') {
                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'IN', operationFound.quantity);
                    await serviceAccount.updateQuantityAccount(id_account_money, 'IN', quantity);
                } else {
                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'IN', operationFound.quantity);
                }

            } else if (operationFound.type_operation === type_operation && operationFound.id_account_money !== id_account_money) {
                if (state_operation === 'DONE') {

                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'IN', operationFound.quantity);
                    await serviceAccount.updateQuantityAccount(id_account_money, 'OUT', quantity);
                } else {
                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'IN', operationFound.quantity);
                }


            } else {

                if (state_operation === 'DONE' && operationFound.quantity !== quantity) {

                    const operation = operationFound.type_operation === 'OUT' ? 'IN' : 'OUT'
                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, operation, operationFound.quantity);

                    await serviceAccount.updateQuantityAccount(id_account_money, type_operation, quantity);
                } else {
                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'IN', operationFound.quantity);
                }


            }

        } else if (operationFound.type_operation === 'IN') {

            if (operationFound.type_operation !== type_operation && operationFound.id_account_money !== id_account_money) {

                if (state_operation === 'DONE') {
                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'OUT', operationFound.quantity);
                    await serviceAccount.updateQuantityAccount(id_account_money, 'IN', quantity);
                } else {
                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'OUT', operationFound.quantity);
                }

            } else if (operationFound.type_operation === type_operation && operationFound.id_account_money !== id_account_money) {

                if (state_operation === 'DONE') {

                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'OUT', operationFound.quantity);
                    await serviceAccount.updateQuantityAccount(id_account_money, 'IN', quantity);
                } else {
                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'OUT', operationFound.quantity);
                }

            } else {
                if (state_operation === 'DONE' && operationFound.quantity !== quantity) {

                    const operation = operationFound.type_operation === 'OUT' ? 'IN' : 'OUT'

                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, operation, operationFound.quantity);
                    await serviceAccount.updateQuantityAccount(id_account_money, type_operation, quantity);
                } else {
                    await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'OUT', operationFound.quantity);
                }
            }
        } else {
            throw new Error('Operacion desconocida')
        }
        const result = await service.updateOperation({ id, id_user, type_operation, state_operation, description, id_type_category, quantity, id_account_money, date_operation_time })
        console.log(result)

        if (result.affectedRows <= 0) {

            throw boom.notFound('Operation not found')

        };

        const operationResult = await service.getOperation(id)

        await connection.commit()
        res.json({ message: 'updated successfully', status: true, data: { ...operationResult[0] } })

    } catch (error) {
        await connection.rollback()
        next(error)
    }
}


const deleteOperation = async (req, res, next) => {

    const connection = await pool.getConnection();

    try {
        await service.setConnection(connection)
        await serviceAccount.setConnection(connection);
        await connection.beginTransaction();
        const { id } = req.query

        const operationFound = await service.getOperation(id)

        if (operationFound.type_operation === 'OUT') {
            const resultUpdate = await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'IN', operationFound.quantity)
        } else {
            const resultUpdate = await serviceAccount.updateQuantityAccount(operationFound.id_account_money, 'OUT', operationFound.quantity)
        }


        const [result] = await service.deleteOperation(Number(id))

        await connection.commit();
        res.json({ message: 'deleted successfully', success: true })
    } catch (error) {
        await connection.rollback();
        next(error)
    }
}



module.exports = {
    getOperation,
    getOperations,
    createOperation,
    updateOperation,
    deleteOperation,
    getOperationsReport
}