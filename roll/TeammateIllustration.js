var rply ={type : 'text'}; //type是必需的,但可以更改
var Ability = require('./Ability.js');
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
					
					WeapArr[i][0] = rows[i].wid;
					WeapArr[i][1] = rows[i].wname;
					WeapArr[i][2] = rows[i].rare;
					WeapArr[i][3] = rows[i].wtype;
					WeapArr[i][4] = rows[i].ability;
					WeapArr[i][5] = Number(rows[i].hp);
					WeapArr[i][6] = Number(rows[i].mp);
					WeapArr[i][7] = Number(rows[i].atk);
					WeapArr[i][8] = rows[i].wdescription;
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


function WeapIllustration(Name){
	for(var i = 0 ;i<WeapArr.length; i++){
		if(WeapArr[i][0] == Name || WeapArr[i][1] == Name){
			rply.text = '武器情報:\
					\n-----基本資料-----\
					\n 武器編號: ' + WeapArr[i][0] + '\
					\n 武器名稱: ' + WeapArr[i][1] + '\
					\n 稀有度: ' + WeapArr[i][2] + '\
					\n 武器類型: ' + WeapArr[i][3] + '\
					\n 武器被動: ' + WeapArr[i][4] + '\
					\n' + Ability.AbilityReturn(WeapArr[i][4]) + '\
					\n-----能力值一覽-----\
					\n 增加Hp: ' + WeapArr[i][5] + '\
					\n 增加Mp: ' + WeapArr[i][6] + '\
					\n 增加攻擊力: ' + WeapArr[i][7] + '\
					\n-----武器描述-----\n' + WeapArr[i][8] + '\
					\n-----取得途徑-----\n' + WeapArr[i][9] + '\
					\n-----進化相關-----\
					\n 向上進化: ' + WeapArr[i][10] + '\
					\n-----進化樹-----\n' + WeapArr[i][12] + '\
					\n--------------------';
			
			return rply;
		
		}
	}
	if(Name == null){
		rply.text = '-----武器圖鑑-----\n\n';
		
		for(var i = 0; i<WeapArr.length; i++){
			rply.text += '[' + WeapArr[i][0] + '] ' + WeapArr[i][1] + ' ('  + WeapArr[i][2] + ') [' + WeapArr[i][3] + ']\n';
		}
		
		rply.text += '\n\n想要查詢特定武器的話，請輸入 武器圖鑑 武器編號(武器名字)';
		
		return rply;
	}
		
		rply.text = '找不到編號或名稱為' + Name +'的武器喔！\
				\n\n-----武器圖鑑-----\n\n';
		
		for(var i = 0; i<WeapArr.length; i++){
			rply.text += '[' + WeapArr[i][0] + '] ' + WeapArr[i][1] + ' ('  + WeapArr[i][2] + ') [' + WeapArr[i][3] + ']\n';
		}
		
		rply.text += '想要查詢特定武器的話，請輸入 武器圖鑑 武器編號(武器名字)';
		
		return rply;
}

module.exports = {
	WeapIllustration
};
