const pool = require("../../db")

const  boom  = require("@hapi/boom")

const AccountMoneyService = require("../services/accountMoney.service")

const service = new AccountMoneyService

const createAccountCategory=async (req,res,next) =>{

    try {
        const id_user=req.user.sub
        const { name,  name_company, total_money}=req.body
        const result= await service.createAccountMoney({ name, id_user, name_company, total_money})
        res.json({data:{id:result.insertId,name,  name_company, total_money},success:true})
    } catch (error) {
        next(error)
    }

}

const getAccountsMoney=async (req,res,next) =>{
    try {
        const id_user=req.user.sub
        const roles=req.user.roles
        const result=await service.getAccountsMoneyService(id_user,roles)
        res.json({
            data:result,
            success:true
        })
    } catch (error) {
        next(error)
    }
}


module.exports={createAccountCategory,getAccountsMoney}