var rply ={type : 'text'}; //type是必需的,但可以更改
var Ability = require('./Ability.js');
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var SkillDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var SkillArr= [];

SkillDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	SkillDB.getRows(8 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					SkillArr[i] = [];
					
					SkillArr[i][0] = rows[i].skillid;
					SkillArr[i][1] = rows[i].skillname;
					SkillArr[i][2] = rows[i].costmp;
					SkillArr[i][3] = rows[i].suitableweapon1;
          				SkillArr[i][4] = rows[i].suitableweapon2;
          				SkillArr[i][5] = rows[i].suitableweapon3;
					SkillArr[i][6] = rows[i].launchspell;
					SkillArr[i][7] = rows[i].enhancespell;
					SkillArr[i][8] = rows[i].speed;
					SkillArr[i][9] = rows[i].hitrate;
					SkillArr[i][10] = rows[i].actionbreak;
					SkillArr[i][11] = rows[i].htgi;
					
				}
				//console.log(SkillArr);
				console.log('技能資料 讀取完成');
			}
		

			
		});
	
		
		
	});


function SkillIllustration(Name){
	for(var i = 0 ;i<SkillArr.length; i++){
		if(SkillArr[i][0] == Name || SkillArr[i][1] == Name){
			if(SkillArr[i][2] == '被動'){
				rply.text = '被動技能情報:\
						\n-----基本資料-----\
						\n 技能編號: ' + SkillArr[i][0] + '\
						\n 被動名稱: ' + SkillArr[i][1] + '\
						\n-----被動效果-----\
						\n' + Ability.SkillEffectReturn(SkillArr[i][1]) + '\
						\n-----取得途徑-----\n' + SkillArr[i][11] +'\
						\n--------------------';
			
			}else{
				rply.text = '技能情報:\
						\n-----基本資料-----\
						\n 技能編號: ' + SkillArr[i][0] + '\
						\n 技能名稱: ' + SkillArr[i][1] + '\
						\n 消耗mp: ' + SkillArr[i][2] + '\
						\n 適性武器:';
				
				rply.text += SkillArr[i][3];
				
				if(SkillArr[i][4] != '無'){
					
					rply.text += '、' + SkillArr[i][4];
					
					if(SkillArr[i][5] != '無'){
						rply.text += '、' + SkillArr[i][5];
					}
				}
				
				if(SkillArr[i][6] != '0'){
					
					rply.text +='\n 施法詠唱: ' + SkillArr[i][6];
					
				}
				
				if(SkillArr[i][7] != '0'){
					rply.text +='\n 強化詠唱: ' + SkillArr[i][7];
				}
				
				rply.text += '\n 速度: ' + SkillArr[i][8] + '\
						\n 命中率: ' + SkillArr[i][9] + '\
						\n-----技能效果-----\
						\n' + Ability.SkillEffectReturn(SkillArr[i][1]);
				
				if(SkillArr[i][10] != '0'){

						rply.text +='\n\n 阻斷行動: ' + SkillArr[i][10];
					
				}
						
				rply.text += '\n-----取得途徑-----\n' + SkillArr[i][11] +'\
						\n--------------------';
			
			
			}
			
			return rply;
		
		}
	}
	if(Name == null){
		rply.text = '-----技能圖鑑-----\n\n';
		
		for(var i = 0; i<SkillArr.length; i++){
			rply.text += '[' + SkillArr[i][0] + '] ' + SkillArr[i][1];
			if(SkillArr[i][2] == '被動'){
				rply.text += '(被動)\n';
			}else{
				rply.text += '(技能)\n';
			}
		}
		
		rply.text += '\n\n想要查詢特定技能的話，請輸入 技能圖鑑 技能編號(技能名字)';
		
		return rply;
	}
		
		rply.text = '找不到編號或名稱為' + Name +'的技能喔！\
				\n\n-----技能圖鑑-----\n\n';
		
		for(var i = 0; i<SkillArr.length; i++){
			rply.text += '[' + SkillArr[i][0] + '] ' + SkillArr[i][1];
			if(SkillArr[i][2] == '被動'){
				rply.text += '(被動)\n';
			}else{
				rply.text += '(技能)\n';
			}
		}
		
		rply.text += '\n\n想要查詢特定技能的話，請輸入 技能圖鑑 技能編號(技能名字)';
		
		return rply;
}

module.exports = {
	SkillIllustration
};
