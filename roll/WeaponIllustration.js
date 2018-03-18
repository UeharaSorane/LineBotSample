var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var WeaponDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var WeapArr= [];

WeaponDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	WeaponDB.getRows(3 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					WeapArr[i] = [];
					
					WeapArr[i][0] = rows[i].id;
					WeapArr[i][1] = rows[i].name;
					WeapArr[i][2] = rows[i].rare;
					WeapArr[i][3] = rows[i].type;
					WeapArr[i][4] = rows[i].ability;
					WeapArr[i][5] = Number(rows[i].hp);
					WeapArr[i][6] = Number(rows[i].mp);
					WeapArr[i][7] = Number(rows[i].atk);
					WeapArr[i][8] = rows[i].description;
					WeapArr[i][9] = rows[i].htgi;
					WeapArr[i][10] = rows[i].evolution;
					WeapArr[i][11] = rows[i].evolutionrate;
					WeapArr[i][12] = rows[i].evolutiontree;
					
				}
				//console.log(WeapArr);
				console.log('武器資料 讀取完成');
			}
		

			
			});
	
		
		
	});
