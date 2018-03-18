var rply ={type : 'text'}; //type是必需的,但可以更改
var Ability = require('./Ability.js');
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var AccessDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var AccessArr= [];

AccessDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	AccessDB.getRows(5 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					AccessArr[i] = [];
					
					AccessArr[i][0] = rows[i].acid;
					AccessArr[i][1] = rows[i].acname;
					AccessArr[i][2] = rows[i].ability;
					AccessArr[i][3] = Number(rows[i].hp);
					AccessArr[i][4] = Number(rows[i].mp);
					AccessArr[i][5] = Number(rows[i].atk);
					AccessArr[i][6] = rows[i].acdescription;
					AccessArr[i][7] = rows[i].htgi;
					
				}
				//console.log(AccessArr);
				console.log('飾品資料 讀取完成');
			}
		

			
			});
	
		
		
	});


function AccessoriesIllustration(Name){
	for(var i = 0 ;i<AccessArr.length; i++){
		if(AccessArr[i][0] == Name || AccessArr[i][1] == Name){
			rply.text = '飾品情報:\
					\n-----基本資料-----\
					\n 飾品編號: ' + AccessArr[i][0] + '\
					\n 飾品名稱: ' + AccessArr[i][1] + '\
					\n 飾品被動: ' + AccessArr[i][2] + '\
					\n' + Ability.AbilityReturn(AccessArr[i][2]) + '\
					\n-----能力值一覽-----\
					\n 增加Hp: ' + AccessArr[i][3] + '\
					\n 增加Mp: ' + AccessArr[i][4] + '\
					\n 增加攻擊力: ' + AccessArr[i][5] + '\
					\n-----飾品描述-----\n' + AccessArr[i][6] + '\
					\n-----取得途徑-----\n' + AccessArr[i][7] + '\
					\n--------------------';
			
			return rply;
		
		}
	}
	if(Name == null){
		rply.text = '-----飾品圖鑑-----\n\n';
		
		for(var i = 0; i<AccessArr.length; i++){
			rply.text += '[' + AccessArr[i][0] + '] ' + AccessArr[i][1] + '\n';
		}
		
		rply.text += '\n\n想要查詢特定飾品的話，請輸入 飾品圖鑑 飾品編號(飾品名字)';
		
		return rply;
	}
		
		rply.text = '找不到編號或名稱為' + Name +'的飾品喔！\
				\n\n-----飾品圖鑑-----\n\n';
		
		for(var i = 0; i<AccessArr.length; i++){
			rply.text += '[' + AccessArr[i][0] + '] ' + AccessArr[i][1] + '\n';
		}
		
		rply.text += '\n\n想要查詢特定飾品的話，請輸入 飾品圖鑑 飾品編號(飾品名字)';
		
		return rply;
}

module.exports = {
	AccessoriesIllustration
};
