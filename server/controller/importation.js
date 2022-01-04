var dataimportation = require('../service/logservice');
var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');
var logfmt = require('logfmt');
exports.create = function(data, callback) {
	var lineNr = 0;
	var initial = "";
	var final = "";
	var datamongo = [];
	var cont = 0;
	var s = fs.createReadStream(data.filename)
	    .pipe(es.split())
	    .pipe(es.mapSync(function(line){
	        s.pause();
	        line = line.replace(/"/g, '\"')
	        var sb = logfmt.parse(line);
	        var body = {}
	        var temp = new Date(sb.date+" "+sb.time);
			var hour = temp.getHours();
	    	body.dategroup = sb.date+" "+hour || '';
		    body.date = sb.date+" "+sb.time || '';
		    body.time = sb.time || '';
		    body.srcip = sb.srcip || '';
		    body.srcport = sb.srcport || '';
		    body.srcintf = sb.srcintf || '';
		    body.srcintfrole = sb.srcintfrole || '';
		    body.dstip = sb.dstip || '';
		    body.service = sb.service || '';
		    body.dstcountry  = sb.dstcountry || '';
		    body.duration = parseInt(sb.duration) || 0;
		    body.sentbyte  = parseInt(sb.sentbyte) || 0;
		    body.rcvdbyte  = parseInt(sb.rcvdbyte) || 0;
		    body.srcname = sb.srcname || '';
		    body.appcat = sb.appcat || '';
		    body.action = sb.action || '';
		    body.osname = sb.osname || '';
		    body.unauthuser = sb.unauthuser || '';
		    body.unauthusersource = sb.unauthusersource || '';
		    body.srcport = sb.srcport || '';
		    body.srcintf = sb.srcintf || '';
		    body.dstport = sb.dstport || '';
		    body.dstintf = sb.dstintf || '';
	        if (body.time != "" && body.duration > 0) {
	        	datamongo.push(body);
	        }
		    if (lineNr == 0) {
	        	initial = new Date(sb.date+" "+sb.time);
	        }
	        if (sb.date != undefined) {
	        	final = new Date(sb.date+" "+sb.time);
	        }
		    lineNr += 1;
	        s.resume();
	    })
	    .on('error', function(err){
	        callback(err, null)
	    })
	    .on('end', function(){
	    	dataimportation.importdata(datamongo, function (error, response) {
	        	console.log("importation"+data.filename+"success")
		    });
	        callback(null, {nombreligne : lineNr, initial : initial, final: final})
	    })
	);
}
exports.getdata = function(query, callback) {
	var kb = Object.keys(query)[0];
	var req = {};
	req[kb] =  new RegExp(Object.values(query)[0]);
	dataimportation.getdata(req, function (error, response) {
        if (response) {
            callback(null, response);
        } else if (error) {
            console.log(error);
        }
    });
}
exports.getdatafilter = function(query, callback) {
	var kb = Object.keys(query)[0];
	var req = {};
	req[kb] =  new RegExp(Object.values(query)[0]);
	req.debut = new Date(Object.values(query)[1]);
	req.fin = new Date(Object.values(query)[2]);
	dataimportation.getdatafilter(req, function (error, response) {
        if (response) {
            callback(null, response);
        } else if (error) {
            console.log(error);
        }
    });
}