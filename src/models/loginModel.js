const mongoose = require('mongoose') 
const validator = require('validator') 
const bcryptjs = require('bcrypt') 


const loginSchema = new mongoose.Schema({
    email: { type: String, required: true }, 
    password: { type: String, required: true }, 
    createadAt: {
        type: Date,
        default: Date.now 
    }
})


const loginModel = mongoose.model('logindatabase', loginSchema)


class LoginDatabase {
    constructor(body) {
        this.body = body 
        this.errors = [] 
        this.user = null 
    }


    async login() {
        this.valida() 
        if (this.errors.length > 0) return 

        try {

            this.user = await loginModel.findOne({ email: this.body.email })
            if (!this.user) { 
                this.errors.push('Usuário não existe.')
                return
            }


            const validPassword = await bcryptjs.compare(this.body.password, this.user.password)
            if (!validPassword) {
                this.errors.push('Senha inválida')
                this.user = null 
                return
            }
        } catch (error) {
            this.errors.push('Erro no servidor, tente novamente mais tarde.')
            console.error(error) 
        }
    }


    async register() {
        this.valida() 
        if (this.errors.length > 0) return 

        await this.userExists() 
        if (this.errors.length > 0) return 


        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        try {
            this.user = await loginModel.create(this.body)
        } catch (error) {
            this.errors.push('Erro ao salvar no banco de dados.')
            console.error(error)
        }
    }

    async userExists() {
        try {

            this.user = await loginModel.findOne({ email: this.body.email })
            if (this.user) this.errors.push('Usuário existente') 
        } catch (error) {

            this.errors.push('Erro no servidor.')
            console.error(error)
        }
    }


    valida() {
        this.cleanUp() 


        if (!validator.isEmail(this.body.email)) this.errors.push(' Email Inválido ')


        if (this.body.password.length < 8 || this.body.password.length > 50) {
            this.errors.push('A Senha precisa ter entre 8 e 50 caracteres ')
        }
    }


    cleanUp() {

        this.body = {
            email: typeof this.body.email === 'string' ? this.body.email : '',
            password: typeof this.body.password === 'string' ? this.body.password : ''
        }
    }
}

module.exports = LoginDatabase 