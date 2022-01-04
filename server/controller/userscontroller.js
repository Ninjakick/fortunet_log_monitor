var userservice = require('../service/userservice');
exports.authentification = function(query, callback) {
	userservice.findUser(query, function (error, response) {
        if (response) {
            callback(null, response);
        } else if (error) {
            console.log(error);
        }
    });
}
exports.createUser = function(query, callback) {
	userservice.createuser(query, function (error, response) {
        if (response) {
            callback(null, response);
        } else if (error) {
            console.log(error);
        }
    });
}