const Login = require('../models/loginModel.js')

exports.indexLogin = (req, res) => {
    res.render('login')
}
exports.indexRegister = (req, res) => {
    res.render('register')
}

exports.register = (req, res) => { 
    const login = new Login(req.body)

    res.send(login.body)}
exports.login = (req, res) => { 
    const login = new Login(req.body)

    res.send(login.body)
}