const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true }, 
    descricao: String 
})

const HomeModel = mongoose.model('homedatabase', HomeSchema)

class homedatabase  {

}

module.exports = homedatabase