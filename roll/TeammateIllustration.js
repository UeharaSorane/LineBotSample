var rply ={type : 'text'}; //type是必需的,但可以更改
var Ability = require('./Ability.js');
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var TMDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var TMArr= [];

TMDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	TMDB.getRows(9 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					TMArr[i] = [];
					
					TMArr[i][0] = rows[i].tmsid;
					TMArr[i][1] = rows[i].tmid;
					TMArr[i][2] = rows[i].tmname;
					TMArr[i][3] = rows[i].tmcname;
					TMArr[i][4] = rows[i].tmtitle;
					TMArr[i][5] = Number(rows[i].hp);
					TMArr[i][6] = Number(rows[i].mp);
					TMArr[i][7] = Number(rows[i].atk);
					TMArr[i][8] = rows[i].bursttype;
					TMArr[i][9] = rows[i].htgi;
					
				}
				//console.log(TMArr);
				console.log('夥伴資料 讀取完成');
			}
		

			
			});
	
		
		
	});


function TMIllustration(Name){
	
	for(var i = 0 ;i<TMArr.length; i++){
		if(TMArr[i][1] == Name || TMArr[i][2] == Name){
			let TMB = Ability.TMBurstReturn(TMArr[i][3]);
			
			rply.text = '夥伴情報:\
					\n-----基本資料-----\
					\n 夥伴編號: ' + TMArr[i][1] + '\
					\n 夥伴名稱: ' + TMArr[i][2] + '\
					\n 夥伴稱號: ' + TMArr[i][4] + '\
					\n-----能力值一覽-----\
					\n 增加Hp: ' + TMArr[i][5] + '\
					\n 增加Mp: ' + TMArr[i][6] + '\
					\n 增加攻擊力: ' + TMArr[i][7] + '\
					\n-----爆裂之力-----\
					\n 爆裂類型: ' + TMB[1] + '\
					\n\n' + TMB[0] + '\n\
					\n 勝利台詞: ' + TMB[2] + '\
					\n-----取得途徑-----\n' + TMArr[i][9] + '\
					\n--------------------';
			
			return rply;
		
		}
	}
	if(Name == null){
		rply.text = '-----夥伴圖鑑-----\n\n';
		
		for(var i = 0; i<TMArr.length; i++){
			rply.text += '[' + TMArr[i][1] + '] ' + TMArr[i][2] + '\n';
		}
		
		rply.text += '\n\n想要查詢特定夥伴的話，請輸入 夥伴圖鑑 夥伴編號(夥伴名字)';
		
		return rply;
	}
		
		rply.text = '找不到編號或名稱為' + Name +'的夥伴喔！\
				\n\n-----夥伴圖鑑-----\n\n';
		
		for(var i = 0; i<TMArr.length; i++){
			rply.text += '[' + TMArr[i][1] + '] ' + TMArr[i][2] + '\n';
		}
		
		rply.text += '\n\n想要查詢特定夥伴的話，請輸入 夥伴圖鑑 夥伴編號(夥伴名字)';
		
		return rply;
}

module.exports = {
	TMIllustration
};
