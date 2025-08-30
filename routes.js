const express = require('express')
const route = express.Router()

const homeController = require('./src/controllers/homeController.js')
const loginController = require('./src/controllers/loginController.js')
const contatoController = require('./src/controllers/contatoController.js')

// Home
route.get('/', homeController.index)


// login
route.get('/login/register', loginController.indexRegister) 
route.get('/login/login', loginController.indexLogin) 

route.post('/login/register', loginController.register)   
route.post('/login/login', loginController.login)   

// contact

module.exports = route