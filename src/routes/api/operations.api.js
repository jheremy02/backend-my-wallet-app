const express=require('express')

const router= express.Router()



router.get('/',getCategories)
router.get('/:id',getCategory)
router.post('/',createCategory)
router.delete('/:id',deleteCategory)
router.put('/:id',updateCategory)

module.exports=router