const Login = require('../models/loginModel')

// //get
// exports.indexRegister = (req, res) => {
//     res.render('register')
// }
// exports.indexLogin = (req, res) => {   
//     res.render('login')
// }



exports.index = (req, res) => {
    console.log(req.session.user)  
    if(req.session.user) return res.render('login-connected')  
    return res.render('login')  
}

// Função de registro de usuário
exports.register = async (req, res) => {
    res.render('register')
    console.log(req.body)
    try {
        
        const login = new Login(req.body)
        await login.register()  

        
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)  
            req.session.save(() => res.redirect('/login/index'))  
            return
        }

        
        req.flash('success', 'Seu usuário foi criado com sucesso')
        req.session.save(() => res.redirect('/login/index'))  

    } catch (e) {
        console.log(e)  
        return res.render('404')  
    }
}

// Função de login de usuário
exports.login = async (req, res) => {
    res.render('login')
    try {
        console.log(req.body)  
        const login = new Login(req.body)  
        await login.login() 

        
        if (login.errors.length > 0) {
            req.flash('errors', login.errors)  
            req.session.save(() => res.redirect('/login/index'))  
            return
        }

        
        req.flash('success', 'Você entrou no Sistema.')
        req.session.user = login.user  
        req.session.save(() => res.redirect('/login/index'))  

    } catch (e) {
        console.log(e)  
        return res.render('404')  
    }
}

// Função de logout do usuário
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')  
    })

}