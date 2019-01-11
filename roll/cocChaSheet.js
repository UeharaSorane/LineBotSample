var rply = [];

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('1hwFlTrJ7JHeWMLbHmfg7LP7f13OfAoMebF6HIkHpHPs');
var ChaIm= [];
var ChaQua= [];

DB.useServiceAccountAuth(creds, function (err) {
	DB.getCells(8,{
		'min-row': 1,
		'max-row': 15,
		'return-empty': true
	},function(err,cells){
		var cell = cells[0];
		console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
	});
	
});
