var rply = [];

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('1hwFlTrJ7JHeWMLbHmfg7LP7f13OfAoMebF6HIkHpHPs');
var ChaIm= [];
var ChaQua= [];

DB.useServiceAccountAuth(creds, function (err) {
  DB.getCells({
		'min-row': 1,
    'max-row': 5,
    'return-empty': true}
});
