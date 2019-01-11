var rply = [];

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('1hwFlTrJ7JHeWMLbHmfg7LP7f13OfAoMebF6HIkHpHPs');
var ChaAccess = [];
var ChaIm= [];
var ChaQua= [];

DB.useServiceAccountAuth(creds, function (err) {
	DB.getRows(8 , function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					DB.getCells(rows[i].saveworksheet,{
						'min-row': 2,
						'max-row': 8,
						'min-col': 2,
						'max-col': 2,
						'return-empty': true
					},function(err,cells){
						var cell = cells[0];
						console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
					});
					
				}
				console.log('角色連結資料 讀取完成');
			}	
	});
});
