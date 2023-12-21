const express=require('express')
const usersApi=require('./users.api')
const operationsApi=require('./operations.api')
const categoriesApi=require('./categories.api')
const authApi=require('./auth.api')
const rolesApi=require('./roles.api')
const { checkRoles } = require('../../middlewares/auth.handler')
const passport = require('passport')

function routerApi(app) {

    /**
     app.use('/api/users',passport.authenticate('jwt',{
        session:false
    }),checkRoles([1,2]) ,usersApi)
     */
    app.use('/api/users' ,usersApi)
    app.use('/api/roles' ,rolesApi)
    app.use('/api/operations',passport.authenticate('jwt',{
        session:false
    }),operationsApi)
    app.use('/api/categories',passport.authenticate('jwt',{
        session:false
    }),categoriesApi)
    app.use('/api/auth',authApi)
    
}

module.exports=routerApi