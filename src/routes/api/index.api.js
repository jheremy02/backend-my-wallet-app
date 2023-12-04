const express=require('express')
const usersApi=require('./users.api')
const operationsApi=require('./operations.api')
const categoriesApi=require('./categories.api')


function routerApi(app) {
    app.use('/api/users',usersApi)
    app.use('/api/operations',operationsApi)
    app.use('/api/categories',categoriesApi)
   
}

module.exports=routerApi