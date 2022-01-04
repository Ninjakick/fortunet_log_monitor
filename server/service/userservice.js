(function () {
	var mongoose = require('mongoose');
	var userdata = mongoose.model('User');

	exports.createuser = function (data, callback) {
	    userdata.create(data).then((response) => {
	        callback(null, response);
	    }, (error) => {
	        callback(error, null);
	    });
	};
	exports.findUser = function (querry, callback){
		userdata.find(querry).then((response) => {
	        callback(null, response);
	    }, (error) => {
	        callback(error, null);
	    });
	}
})()