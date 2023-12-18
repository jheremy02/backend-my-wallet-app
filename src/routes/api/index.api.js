const express=require('express')
const usersApi=require('./users.api')
const operationsApi=require('./operations.api')
const categoriesApi=require('./categories.api')
const authApi=require('./auth.api')

function routerApi(app) {
    app.use('/api/users',usersApi)
    app.use('/api/operations',operationsApi)
    app.use('/api/categories',categoriesApi)
    app.use('/api/auth',authApi)
}

module.exports=routerApi