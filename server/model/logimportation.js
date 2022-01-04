var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    date_import:{
        default: Date.now,type: Date
    },
    date: Date,
    dategroup: String,
    time: String,
    srcip: String,
    srcport: String,
    srcintf: String,
    srcintfrole: String,
    dstip: String,
    service: String,
    dstcountry : String,
    duration: Number,
    sentbyte : Number,
    rcvdbyte : Number,
    srcname: String,
    appcat: String,
    action: String,
    osname: String,
    unauthuser: String,
    unauthusersource: String,
    srcport: String,
    srcintf: String,
    dstport: String,
    dstintf: String
});

var dataforty = new mongoose.model('Data_import', schema);

module.exports = dataforty;