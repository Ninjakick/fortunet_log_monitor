(function () {
	var mongoose = require('mongoose');
	var logdata = mongoose.model('Data_import');

	exports.importdata = function (data, callback) {
	    logdata.insertMany(data).then((response) => {
	        callback(null, response);
	    }, (error) => {
	    	console.log(error)
	        callback(error, null);
	    });
	};
	exports.getdata = function (querry, callback){
		var condition = [
			{
				"$match": querry,
			},
			{
				"$group":{
					"_id": "$dategroup",
					"sentbyte": { "$sum": "$sentbyte" },
					"rcvdbyte": { "$sum": "$rcvdbyte" },
					"date": {"$first": "$date"},
				}
			},
			{	"$sort" : { "date" : 1 } }
		];
		logdata.aggregate(condition).then((response) => {
	        callback(null, response);
	    }, (error) => {
	        callback(error, null);
	    });
	}
	exports.getdatafilter = function (querry, callback){
		var condition = [
			{
				"$match": {srcname : querry.srcname, "date" : {"$gte": new Date(querry.debut), "$lt": new Date(querry.fin)}},
			},
			{
				"$group":{
					"_id": "$dategroup",
					"sentbyte": { "$sum": "$sentbyte" },
					"rcvdbyte": { "$sum": "$rcvdbyte" },
					"date": {"$first": "$date"},
				}
			},
			{	"$sort" : { "date" : 1 } }
		];
		logdata.aggregate(condition).then((response) => {
	        callback(null, response);
	    }, (error) => {
	        callback(error, null);
	    });
	}
})()