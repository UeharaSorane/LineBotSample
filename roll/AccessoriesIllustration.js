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
					WeapArr[i] = [];
					
					AccessArr[i][0] = rows[i].wid;
					AccessArr[i][1] = rows[i].wname;
					AccessArr[i][2] = rows[i].rare;
					AccessArr[i][3] = rows[i].wtype;
					AccessArr[i][4] = rows[i].ability;
					AccessArr[i][5] = Number(rows[i].hp);
					AccessArr[i][6] = Number(rows[i].mp);
					AccessArr[i][7] = Number(rows[i].atk);
					AccessArr[i][8] = rows[i].wdescription;
					AccessArr[i][9] = rows[i].htgi;
					AccessArr[i][10] = rows[i].evolution;
					AccessArr[i][11] = rows[i].evolutionrate;
					AccessArr[i][12] = rows[i].evolutiontree;
					
				}
				//console.log(AccessArr);
				console.log('飾品資料 讀取完成');
			}
		

			
			});
	
		
		
	});


function AccessoriesIllustration(Name){
	for(var i = 0 ;i<WeapArr.length; i++){
		if(AccessArr[i][0] == Name || AccessArr[i][1] == Name){
			rply.text = '武器情報:\
					\n-----基本資料-----\
					\n 武器編號: ' + AccessArr[i][0] + '\
					\n 武器名稱: ' + AccessArr[i][1] + '\
					\n 稀有度: ' + AccessArr[i][2] + '\
					\n 武器類型: ' + AccessArr[i][3] + '\
					\n 武器被動: ' + AccessArr[i][4] + '\
					\n' + Ability.AbilityReturn(AccessArr[i][4]) + '\
					\n-----能力值一覽-----\
					\n 增加Hp: ' + AccessArr[i][5] + '\
					\n 增加Mp: ' + AccessArr[i][6] + '\
					\n 增加攻擊力: ' + AccessArr[i][7] + '\
					\n-----武器描述-----\n' + AccessArr[i][8] + '\
					\n-----取得途徑-----\n' + AccessArr[i][9] + '\
					\n-----進化相關-----\
					\n 向上進化: ' + AccessArr[i][10] + '\
					\n-----進化樹-----\n' + AccessArr[i][12] + '\
					\n--------------------';
			
			return rply;
		
		}
	}
	if(Name == null){
		rply.text = '-----武器圖鑑-----\n\n';
		
		for(var i = 0; i<AccessArr.length; i++){
			rply.text += '[' + AccessArr[i][0] + '] ' + AccessArr[i][1] + ' ('  + AccessArr[i][2] + ') [' + AccessArr[i][3] + ']\n';
		}
		
		rply.text += '\n\n想要查詢特定武器的話，請輸入 武器圖鑑 武器編號(武器名字)';
		
		return rply;
	}
		
		rply.text = '找不到編號或名稱為' + Name +'的武器喔！\
				\n\n-----武器圖鑑-----\n\n';
		
		for(var i = 0; i<AccessArr.length; i++){
			rply.text += '[' + AccessArr[i][0] + '] ' + AccessArr[i][1] + ' ('  + AccessArr[i][2] + ') [' + AccessArr[i][3] + ']\n';
		}
		
		rply.text += '想要查詢特定武器的話，請輸入 武器圖鑑 武器編號(武器名字)';
		
		return rply;
}

module.exports = {
	AccessoriesIllustration
};
