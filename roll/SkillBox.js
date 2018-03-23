var rply ={type : 'text'}; //type是必需的,但可以更改

///引入其他資料陣列
var BattleStates = require('./BattleStates.js');
var Skill = require('./SkillIllustration.js');
var PlayerData = require('./PlayerData.js');

var BattleStatesDataArray = BattleStates.GetArray();
var SkillArray = Skill.GetArray();
///

///引入資料庫

var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var WeaponBoxArr= [];

DB.useServiceAccountAuth(creds, function (err) {
	var PlayerNumber = 0;
	
 // 是先將資料讀進陣列
	DB.getCells(16 , 
		function (err, cells) {
			if (err) {
				console.log( err );
			}else{
				
				for(var i = 0; i<cells.length; i++){
					if(cells[i].row == 1){
						PlayerNumber++;
					
					}
				}
				
				for(var i = 0; i<PlayerNumber; i++){
					WeaponBoxArr[i] = [];
					
					var WeaponNumber = 0;
					
					for(var j = 0; j<cells.length; j++){
						
						if(cells[j].col == i+1){
							WeaponBoxArr[i][j-WeaponNumber] = cells[j].value;
						}else{
							WeaponNumber++;
						}
					
					}
					
				}
				console.log('玩家所持技能庫 讀取完成');
			}
		

			
			});
	
		
		
	});


function SearchSkill(UserID){
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j = 0; j<BattleStatesDataArray.length;j++){
				if(BattleStatesDataArray[j][0] == UserID){
					rply.text = '玩家 ' + BattleStatesDataArray[j][1] + '\n\
								\n 目前裝備被動之書: ' + BattleStatesDataArray[j][24] + '\
								\n        技能書一: ' + BattleStatesDataArray[j][25] + '\
								\n        技能書二: ' + BattleStatesDataArray[j][26] + '\
								\n        技能書三: ' + BattleStatesDataArray[j][27] + '\
								\n---------------------------\
								\n持有技能書一覽:\n';
					
					for(var k = 1; k<WeaponBoxArr[i].length; k++){
						for(var l = 0; l<SkillArray.length; l++){
							if(WeaponBoxArr[i][k] == SkillArray[l][1] && SkillArray[l][1] != '被動'){
								rply.text += WeaponBoxArr[i][k] + '\n';
							}
						}
					}
					
					rply.text += '\n持有被動之書一覽:\n';
					
					for(var k = 1; k<WeaponBoxArr[i].length; k++){
						for(var l = 0; l<SkillArray.length; l++){
							if(WeaponBoxArr[i][k] == SkillArray[l][1] && SkillArray[l][1] == '被動'){
								rply.text += WeaponBoxArr[i][k] + '\n';
							}
						}
					}
					rply.text += '\n 想更換技能的話，請輸入 技能更換 技能欄位(被動,1,2,3) 要裝備的技能名';
					
					return rply;
					
				}
				
			}
		}
	}

	rply.text = '找不到你的角色的技能庫，請向GM確認';
	return rply;

}

module.exports = {
	SearchSkill
};
