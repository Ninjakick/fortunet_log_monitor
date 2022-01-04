var fichierservice = require('../service/fichierservice');
exports.getfichierlist = function(query, callback) {
	fichierservice.findFichier(query, function (error, response) {
        if (response) {
            callback(null, response);
        } else if (error) {
            console.log(error);
        }
    });
}
exports.createFichier = function(query, callback) {
    var body = new FileDat(query)
	fichierservice.createFIchier(body, function (error, response) {
        if (response) {
            callback(null, response);
        } else if (error) {
            console.log(error);
        }
    });
}
class FileDat {
    constructor(importationdata) {
        this.filename = importationdata.filename || '';
        this.nombre_line = importationdata.nombre_line || '';
        this.log_debut = importationdata.log_debut || '';
        this.log_fin = importationdata.log_fin || '';
        this.user_name = importationdata.user_name || '';
    }
}