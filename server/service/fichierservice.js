(function () {
	var mongoose = require('mongoose');
	var fichierdata = mongoose.model('Fichier');

	exports.createFIchier = function (data, callback) {
	    fichierdata.create(data).then((response) => {
	        callback(null, response);
	    }, (error) => {
	        callback(error, null);
	    });
	};
	exports.findFichier = function (querry, callback){
		fichierdata.find(querry).then((response) => {
	        callback(null, response);
	    }, (error) => {
	        callback(error, null);
	    });
	}
})()