var express = require('express');
var router = express.Router();
var datatoimport = require('../controller/importation');
var userscontroller = require('../controller/userscontroller');
var fichiercontroller = require('../controller/fichiercontroller');
var formidable = require('formidable-serverless');
var fs = require('fs');

router.get('/', function(req, res, next) {
  datatoimport.getdata(req.query, function(error, reponse) {
  	var label = reponse.map(function(data){
  		return data._id;
  	})
  	var datasetsortant = reponse.map(function(data){
  		var ks = data.sentbyte/1024/1024/1024;
  		return ks.toFixed(2);
  	})
  	var datasetentrant = reponse.map(function(data){
  		var kb = data.rcvdbyte/1024/1024/1024;
  		return kb.toFixed(2);
  	})
  	res.render('tab', {data: JSON.stringify({label: label, datasortant: datasetsortant, dataentrant : datasetentrant})});
  });
});
router.get('/filter', function(req, res, next) {
  datatoimport.getdatafilter(req.query, function(error, reponse) {
  	var label = reponse.map(function(data){
        var leur = data._id.substr(0, data._id.search(" "));
        var date_modif = new Date(leur);
        var mois = date_modif.getMonth()+1;
        var day = date_modif.getDate();
        var heur = data._id.replace(leur, "")+"h"
        if (day.toString().length == 1) {
          day = "0"+day;
        }
        if (mois.toString().length == 1) {
          mois = "0"+mois;
        }
        return day+"/"+mois+" "+heur;
      })
  	var datasetsortant = reponse.map(function(data){
  		var ks = data.sentbyte/1024/1024/1024;
  		return ks.toFixed(2);
  	})
  	var datasetentrant = reponse.map(function(data){
  		var kb = data.rcvdbyte/1024/1024/1024;
  		return kb.toFixed(2);
  	})
  	res.render('resultfilter', {data: JSON.stringify({label: label, datasortant: datasetsortant, dataentrant : datasetentrant})});
  });
});
router.post('/authentification', function(req, res, next){
	var donne = {user_name: req.body.user_name, password: req.body.password};
	userscontroller.authentification(donne, function(error, reponse) {
		console.log(reponse)
		if (reponse.length == 0) {
			res.redirect('/users/errorconnexion');
		}
		else{
			res.redirect('/users/tableaudebord');
		}
	})
})
router.get('/users/create', function(req, res, next){
	userscontroller.createUser(req.query, function(error, reponse){
		console.log(reponse);
	})
})
router.get("/tableaudebord", function(req, res, next){
  res.render("tab");
})
router.get("/data", function(req, res, next){
  datatoimport.getdata(req.query, function(error, reponse) {
    console.log(Object.values(req.query)[0]);
    var label = reponse.map(function(data){
        var leur = data._id.substr(0, data._id.search(" "));
        var date_modif = new Date(leur);
        var mois = date_modif.getMonth()+1;
        var day = date_modif.getDate();
        var heur = data._id.replace(leur, "")+"h"
        if (day.toString().length == 1) {
          day = "0"+day;
        }
        if (mois.toString().length == 1) {
          mois = "0"+mois;
        }
        return day+"/"+mois+" "+heur;
      })
    var datasetsortant = reponse.map(function(data){
      var ks = data.sentbyte/1024/1024/1024;
      return ks.toFixed(2);
    })
    var datasetentrant = reponse.map(function(data){
      var kb = data.rcvdbyte/1024/1024/1024;
      return kb.toFixed(2);
    })
    res.json({label: label, datasortant: datasetsortant, dataentrant : datasetentrant, iq: Object.values(req.query)[0]});
  });
})
router.post("/importation", function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.maxFieldsSize = 10 * 1024 * 1024 * 1024;
	form.maxFileSize = 10 * 1024 * 1024 * 1024;
	form.multiples = true;
	form.maxFields = 0;
	form.on('file', (fieldName, file) => {
      var oldpath = file.path;
    	var newpath = './log/' + file.name;
    	fs.rename(oldpath, newpath, function (err) {
        	if (err) throw err;
        	datatoimport.create({filename: newpath}, function(error, reponse) {
        		if(reponse){
        			fichiercontroller.createFichier({filename:file.name, nombre_line: reponse.nombreligne, log_debut: reponse.initial, log_fin: reponse.final}, function(error, reponse) {
        				fs.unlink(newpath, function (err) {
                  if (err) throw err;
                  console.log("fichier "+file.name+" Crée dans la base et supprimer")
                });
        			});
        		}
        		else{
        			console.log(error);
        		}
        	});
    	});
    })
    form.parse(req);
})

router.get("/importationpage", function(req, res, next) {
	fichiercontroller.getfichierlist({}, function(error, reponse) {
		res.render("fileimportation", {filelist: JSON.stringify(reponse)});
	})
})
router.get("/errorconnexion", function(req, res, next){
	res.render('login', {error: "Mot de passe ou login incorrecte"});
})
module.exports = router;
