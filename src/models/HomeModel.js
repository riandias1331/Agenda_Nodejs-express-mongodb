const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({

});

const homeModel = mongoose.model('homeAgendaRian', homeSchema);

module.exports = homeModel;