var rply ={type : 'text'}; //type是必需的,但可以更改
var returnRply;
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var CharArr= [];

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(22 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].guildid;
					CharArr[i][1] = rows[i].guildname;
					CharArr[i][2] = Number(rows[i].trainlv);
					CharArr[i][3] = Number(rows[i].factorylv);
					CharArr[i][4] = Number(rows[i].shoplv);
					CharArr[i][5] = Number(rows[i].restaurantlv);
				  	CharArr[i][6] = Number(rows[i].warehouselv);
					CharArr[i][7] = Number(rows[i].wms);
					CharArr[i][8] = Number(rows[i].wmm);
					CharArr[i][9] = Number(rows[i].wml);
					CharArr[i][10] = Number(rows[i].gms);
					CharArr[i][11] = Number(rows[i].gmm);
					CharArr[i][12] = Number(rows[i].gml);
					CharArr[i][13] = Number(rows[i].gold);
					CharArr[i][14] = Number(rows[i].mirastone);

					
				}
				console.log(CharArr);
				console.log('公會設施資料 讀取完成');
				//console.log();
			}
		

			
			});
	
		
		
	});

function ArrayUpdate() {

	DB.useServiceAccountAuth(creds, function (err) {



	 // Get all of the rows from the spreadsheet.
		DB.getRows(22 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{

					for(var i=0; i< CharArr.length; i++){

						rows[i].guildid = CharArr[i][0];
						rows[i].guildname = CharArr[i][1];
						rows[i].trainlv = CharArr[i][2];
						rows[i].factorylv = CharArr[i][3];
						rows[i].shoplv = CharArr[i][4];
						rows[i].restaurantlv = CharArr[i][5];
						rows[i].warehouselv = CharArr[i][6];
						rows[i].wms = CharArr[i][7];
						rows[i].wmm = CharArr[i][8];
						rows[i].wml = CharArr[i][9];
						rows[i].gms = CharArr[i][10];
						rows[i].gmm = CharArr[i][11];
						rows[i].gml = CharArr[i][12];
						rows[i].gold = CharArr[i][13];
						rows[i].mirastone = CharArr[i][14];
						rows[i].save();
						

					}

				}
				console.log('公會設施資料 更新完成');
			});

	});
	
}
