const express=require('express')

const { validatorHandler } = require('../../middlewares/validator.handler')
const {getCurrencyUser,updateCurrencyUser,getCurrencies}=require('../../controllers/currency.controller')

const router= express.Router();

router.get('/',getCurrencies);
router.get('/:id', validatorHandler(getCategorySchema,'query'), getCurrencyUser);
router.put('/',validatorHandler(updateCategorySchema,'body'),updateCurrencyUser);

module.exports=router