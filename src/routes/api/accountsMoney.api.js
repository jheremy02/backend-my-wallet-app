const express=require('express')
const { validatorHandler } = require('../../middlewares/validator.handler')
const { createAccountCategory, getAccountsMoney } = require('../../controllers/accountsMoney.controller')

const router= express.Router()


router.post("/",createAccountCategory)
router.get("/",getAccountsMoney)


module.exports=router