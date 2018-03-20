var rply ={type : 'text'}; //type是必需的,但可以更改
var BoxOpen = require('./BoxOpen.js');
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var CharArr= [];
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					CharArr[i][2] = Number(rows[i].gold);
					CharArr[i][3] = Number(rows[i].mirastone);
					CharArr[i][4] = rows[i].title;
					CharArr[i][5] = rows[i].inheritio;
					CharArr[i][6] = rows[i].inheritpassword;
					CharArr[i][7] = Number(rows[i].wmaterials);
					CharArr[i][8] = Number(rows[i].wmaterialm);
					CharArr[i][9] = Number(rows[i].wmateriall);
					CharArr[i][10] = Number(rows[i].gmaterials);
					CharArr[i][11] = Number(rows[i].gmaterialm);
					CharArr[i][12] = Number(rows[i].gmateriall);
					CharArr[i][13] = Number(rows[i].mateshards);
					
				}
				//console.log(CharArr);
				console.log('玩家基本資料 讀取完成');
			}
		

			
			});
	
		
		
	});
