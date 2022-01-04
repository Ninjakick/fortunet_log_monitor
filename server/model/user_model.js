var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_name: String,
    password: String,
});

var datauser = new mongoose.model('User', schema);

module.exports = datauser;