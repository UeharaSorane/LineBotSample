var rply ={type : 'text'}; //type是必需的,但可以更改
var Ability = require('./Ability.js');
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var BadgeDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var BadgeArr= [];

BadgeDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	BadgeDB.getRows(6 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					BadgeArr[i] = [];
					
					BadgeArr[i][0] = rows[i].bid;
					BadgeArr[i][1] = rows[i].bname;
					BadgeArr[i][2] = rows[i].ability;
					BadgeArr[i][3] = rows[i].htgi;
					
				}
				console.log(BadgeArr);
				console.log('紋章資料 讀取完成');
			}
		

			
			});
	
		
		
	});


function BadgeIllustration(Name){
	for(var i = 0 ;i<BadgeArr.length; i++){
		if(BadgeArr[i][0] == Name || BadgeArr[i][1] == Name){
			rply.text = '紋章情報:\
					\n-----基本資料-----\
					\n 紋章編號: ' + BadgeArr[i][0] + '\
					\n 紋章名稱: ' + BadgeArr[i][1] + '\
					\n 紋章被動:\n' + Ability.AbilityReturn(BadgeArr[i][2]) + '\
					\n-----取得途徑-----\n' + BadgeArr[i][3] + '\
					\n--------------------';
			
			return rply;
		
		}
	}
	if(Name == null){
		rply.text = '-----紋章圖鑑-----\n\n';
		
		for(var i = 0; i<BadgeArr.length; i++){
			rply.text += '[' + BadgeArr[i][0] + '] ' + BadgeArr[i][1] + '\n';
		}
		
		rply.text += '\n\n想要查詢特定紋章的話，請輸入 紋章圖鑑 飾品編號(紋章名字)';
		
		return rply;
	}
		
		rply.text = '找不到編號或名稱為' + Name +'的紋章喔！\
				\n\n-----紋章圖鑑-----\n\n';
		
		for(var i = 0; i<BadgeArr.length; i++){
			rply.text += '[' + BadgeArr[i][0] + '] ' + BadgeArr[i][1] + '\n';
		}
		
		rply.text += '\n\n想要查詢特定紋章的話，請輸入 紋章圖鑑 紋章編號(紋章名字)';
		
		return rply;
}

module.exports = {
	BadgeIllustration
};
