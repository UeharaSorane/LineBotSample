var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var CharArr= [];
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(10 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					
					CharArr[i][2] = rows[i].weapon;
					CharArr[i][3] = rows[i].weapontype;
					CharArr[i][4] = rows[i].weaponability;
					
					CharArr[i][5] = rows[i].accessory;
					CharArr[i][6] = rows[i].accessoryability;
					
					CharArr[i][7] = rows[i].badge;
					
					CharArr[i][8] = rows[i].teammate;
					
					CharArr[i][9] = Number(rows[i].hpst);
					CharArr[i][10] = Number(rows[i].hptraininglv);
					CharArr[i][11] = Number(rows[i].hpweap);
					CharArr[i][12] = Number(rows[i].hpacce);
					CharArr[i][13] = Number(rows[i].hptm);
					
					CharArr[i][14] = Number(rows[i].mpst);
					CharArr[i][15] = Number(rows[i].mptraininglv);
					CharArr[i][16] = Number(rows[i].mpweap);
					CharArr[i][17] = Number(rows[i].mpacce);
					CharArr[i][18] = Number(rows[i].mptm);
					
					CharArr[i][19] = Number(rows[i].atkst);
					CharArr[i][20] = Number(rows[i].atktraininglv);
					CharArr[i][21] = Number(rows[i].atkweap);
					CharArr[i][22] = Number(rows[i].atkacce);
					CharArr[i][23] = Number(rows[i].atktm);
					
					CharArr[i][24] = rows[i].skillability;
					CharArr[i][25] = rows[i].skill1;
					CharArr[i][26] = rows[i].skill2;
					CharArr[i][27] = rows[i].skill3;
					
					CharArr[i][28] = rows[i].teammateburst;
					CharArr[i][29] = rows[i].bursttype;
					
					CharArr[i][30] = Number(rows[i].trainingpoint);
					CharArr[i][31] = Number(rows[i].traininglv);
					
				}
				console.log(CharArr);
				console.log('玩家戰鬥資料 讀取完成');
			}
		
			
			});
	
		
		
	});
