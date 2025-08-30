const mongoose = require('mongoose');
const validator = require('validator');

const loginSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const loginModel = mongoose.model('LoginAgendaRian', loginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    Register(){
        this.Validate();
    }
    Validate(){
        this.cleanUp();
        // Validação
        // O email precisa ser válido
        if(!validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido!');
        }
        // A senha precisa ter entre 4 e 20 caracteres
        if(this.body.password.length < 4 || this.body.password.length > 20){
            this.errors.push('A senha precisa ter entre 4 e 10 caracteres!');
        }
    
    }
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}


module.exports = loginModel;