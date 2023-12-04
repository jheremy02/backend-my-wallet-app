const express=require('express')
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../../controllers/categories.controller')

const router= express.Router()

router.get('/',getCategories)
router.get('/:id',getCategory)
router.post('/',createCategory)
router.delete('/:id',deleteCategory)
router.put('/:id',updateCategory)

module.exports=router