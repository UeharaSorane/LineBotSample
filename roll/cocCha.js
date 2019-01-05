var rply = [];

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('1hwFlTrJ7JHeWMLbHmfg7LP7f13OfAoMebF6HIkHpHPs');
var ChaIm= [];

DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(2 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					ChaIm[i] = [];
					
					ChaIm[i][0] = rows[i].userid;
					ChaIm[i][1] = rows[i].chaname;
					ChaIm[i][2] = rows[i].plname;
					ChaIm[i][3] = rows[i].age;
					ChaIm[i][4] = rows[i].class;
					ChaIm[i][5] = rows[i].sex;
					ChaIm[i][6] = rows[i].born;
					ChaIm[i][7] = rows[i].live;
					
				}
				console.log('角色基本資料 讀取完成');
			}
		

			
		});
	
		
		
});
