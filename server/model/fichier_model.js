var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    filename: String,
    date_importation: {
        default: Date.now,type: Date
    },
    nombre_line: Number,
    log_debut : Date,
    log_fin : Date,
    user_name : String
});

var datauser = new mongoose.model('Fichier', schema);

module.exports = datauser;