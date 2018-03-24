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
	DB.getRows(16 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					WeaponBoxArr[i] = [];
					
					WeaponBoxArr[i][0] = rows[i].userid;
					WeaponBoxArr[i][1] = rows[i].cname;
					WeaponBoxArr[i][2] = rows[i].box.split(',');
					
				}
				//console.log(BadgeArr);
				console.log('玩家所持技能庫 讀取完成');
			}
		

			
			});
	
		
		
	});

function UpdateArray(){
	DB.useServiceAccountAuth(creds, function (err) {
		DB.getRows(16 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< WeaponBoxArr.length; i++){
					
					rows[i].userid = WeaponBoxArr[i][0];
					rows[i].cname = WeaponBoxArr[i][1];
					rows[i].box = WeaponBoxArr[i][2][0];
					for(var j=1;j<WeaponBoxArr[i][2].length;j++){
						rows[i].box += ',' + WeaponBoxArr[i][2][j];
					}
					rows[i].save();
				}
				console.log(WeaponBoxArr);
				console.log('玩家所持技能庫 更新完成');
			}
		

			
			});
		
		
	
	});
	

}


function SearchSkill(UserID){
	UpdateArray();
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
					
					for(var k = 0; k<WeaponBoxArr[i][2].length; k++){
						for(var l = 0; l<SkillArray.length; l++){
							if(WeaponBoxArr[i][2][k] == SkillArray[l][1] && SkillArray[l][2] != '被動'){
								rply.text += WeaponBoxArr[i][2][k] + '\n';
							}
						}
					}
					
					rply.text += '\n持有被動之書一覽:\n';
					
					for(var k = 0; k<WeaponBoxArr[i][2].length; k++){
						for(var l = 0; l<SkillArray.length; l++){
							if(WeaponBoxArr[i][2][k] == SkillArray[l][1] && SkillArray[l][2] == '被動'){
								rply.text += WeaponBoxArr[i][2][k] + '\n';
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

function switchSkill(UserID,SkillSlot,SkillName){
	for(var i = 0; i<WeaponBoxArr.length; i++){
		if(WeaponBoxArr[i][0] == UserID){
			
			for(var q = 0; q<BattleStatesDataArray.length;q++){
				if(BattleStatesDataArray[q][0] == UserID){
			
					for(var j = 0;j<SkillArray.length;j++){

						if(SkillName ==SkillArray[j][1]){

							for(var k = 0;k<WeaponBoxArr[i][2].length; k++){

								if(SkillName == WeaponBoxArr[i][2][k]){
									
									if(SkillName != '無'){
										if(SkillName == BattleStatesDataArray[q][24]||SkillName == BattleStatesDataArray[q][25]||SkillName == BattleStatesDataArray[q][26]||SkillName == BattleStatesDataArray[q][27]){
											rply.text += '你以裝備此技能';
					
											return rply;
											
										}
									}

									if(SkillSlot == '被動'){

										for(var l = 0; l<SkillArray.length; l++){

											if(WeaponBoxArr[i][2][k] == SkillArray[l][1] && SkillArray[l][2] == '被動'){

												rply.text = '玩家 ' + BattleStatesDataArray[q][1] + 
													'\n 被動之書:' + BattleStatesDataArray[q][24] + '->' + WeaponBoxArr[i][2][k] + '\
													 \n        技能書一: ' + BattleStatesDataArray[q][25] + '\
													 \n        技能書二: ' + BattleStatesDataArray[q][26] + '\
													 \n        技能書三: ' + BattleStatesDataArray[q][27] + '\
													 \n---------------------------';

												BattleStatesDataArray[q][24] = WeaponBoxArr[i][2][k];
												BattleStates.saveArray(BattleStatesDataArray);
												return rply;

											}
										}

										rply.text = '技能書 ' + SkillName + '不是被動之書喔！';
										return rply;
									}else if(SkillSlot == 1){

										for(var l = 0; l<SkillArray.length; l++){

											if(WeaponBoxArr[i][2][k] == SkillArray[l][1] && SkillArray[l][2] != '被動'){

												rply.text = '玩家 ' + BattleStatesDataArray[q][1] + 
													'\n 被動之書:' + BattleStatesDataArray[q][24] + '\
													 \n        技能書一: ' + BattleStatesDataArray[q][25] + '->' + WeaponBoxArr[i][2][k] + '\
													 \n        技能書二: ' + BattleStatesDataArray[q][26] + '\
													 \n        技能書三: ' + BattleStatesDataArray[q][27] + '\
													 \n---------------------------';

												BattleStatesDataArray[q][25] = WeaponBoxArr[i][2][k];
												BattleStates.saveArray(BattleStatesDataArray);
												return rply;

											}
										}

										rply.text = '技能書 ' + SkillName + '不是主動技能書喔！';
										return rply;

									}else if(SkillSlot == 2){

										for(var l = 0; l<SkillArray.length; l++){

											if(WeaponBoxArr[i][2][k] == SkillArray[l][1] && SkillArray[l][2] != '被動'){

												rply.text = '玩家 ' + BattleStatesDataArray[q][1] + 
													'\n 被動之書:' + BattleStatesDataArray[q][24] + '\
													 \n        技能書一: ' + BattleStatesDataArray[q][25] + '\
													 \n        技能書二: ' + BattleStatesDataArray[q][26] + '->' + WeaponBoxArr[i][2][k] + '\
													 \n        技能書三: ' + BattleStatesDataArray[q][27] + '\
													 \n---------------------------';

												BattleStatesDataArray[q][26] = WeaponBoxArr[i][2][k];
												BattleStates.saveArray(BattleStatesDataArray);
												return rply;

											}
										}

										rply.text = '技能書 ' + SkillName + '不是主動技能書喔！';
										return rply;

									}else if(SkillSlot == 3){

										for(var l = 0; l<SkillArray.length; l++){

											if(WeaponBoxArr[i][2][k] == SkillArray[l][1] && SkillArray[l][2] != '被動'){

												rply.text = '玩家 ' + BattleStatesDataArray[q][1] + 
													'\n 被動之書:' + BattleStatesDataArray[q][24] + '\
													 \n        技能書一: ' + BattleStatesDataArray[q][25] + '\
													 \n        技能書二: ' + BattleStatesDataArray[q][26] + '\
													 \n        技能書三: ' + BattleStatesDataArray[q][27] + '->' + WeaponBoxArr[i][2][k] + '\
													 \n---------------------------';

												BattleStatesDataArray[q][27] = WeaponBoxArr[i][2][k];
												BattleStates.saveArray(BattleStatesDataArray);
												return rply;

											}
										}

										rply.text = '技能書 ' + SkillName + '不是主動技能書喔！';
										return rply;
									}else if(SkillSlot == null){
										rply.text = '請輸入想要更換的技能欄位！';
										return rply;
									}else{
										rply.text = '沒有技能欄位 ' + SkillSlot + '的欄位喔！';
										return rply;
									}

								}


							}

							rply.text = '你尚未擁有技能名為' + SkillName + '的技能喔！';
							return rply;

						}
					}

					if(SkillName == null){
						rply.text = '請輸入想要裝備的技能！';
						return rply;
					}

					rply.text = '，找不到技能名為' + SkillName + '的技能喔！';
					return rply;


				}
			}
			rply.text = '找不到你的角色的戰鬥資料，請向GM確認';
			return rply;
			
		}
	}
	
	rply.text = '找不到你的角色的技能庫，請向GM確認';
	return rply;
	
}

function CreatNewPlayer(UserID,cname,STWeapon){
	
	let CAleng = WeaponBoxArr.length;
	
	WeaponBoxArr[CAleng] = [];
	WeaponBoxArr[CAleng][0] = UserID;
	WeaponBoxArr[CAleng][1] = cname;
	WeaponBoxArr[CAleng][2] = [STWeapon];
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.addRow(16, { Userid: UserID}, function(err) {
		  if(err) {
		    console.log(err);
		  }
		  
		});
	});
	
}

function getSkill(UserID,getS){
	let returnS = [];
	
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j =0; j<WeaponBoxArr[i][2].length;j++){
				if(WeaponBoxArr[i][2][j] == getS){
					returnS[0] = '得到重複技能' + getS +'轉換成500G';
					returnS[1] = 500;
					
					return returnS;
				}
			
			}
			let temp = WeaponBoxArr[i][2].length;
			
			WeaponBoxArr[i][2][temp] = getS;
			
			UpdateArray();
			
			returnS[0] = '得到新技能' + getS;
			returnS[1] = 0;
			
			return returnS;
			
		}
	}
	
	returnS[0] = '錯誤:找不到你的技能庫，請向GM確認';
	returnS[1] = 0;
					
	return returnS;

}

function switchName(UserID,Name){
	for(var i = 0; i<WeaponBoxArr.length; i++){
		if(WeaponBoxArr[i][0] == UserID){
			WeaponBoxArr[i][1] = Name;
			
			UpdateArray();
		
		}
	}
}

function InheritPlayer(UserID,Name){
	for(var i = 0; i<WeaponBoxArr.length; i++){
		if(WeaponBoxArr[i][1] == Name){
			WeaponBoxArr[i][0] = UserID;
			
			UpdateArray();
		
		}
	}
}


module.exports = {
	SearchSkill,
	switchSkill,
	getSkill,
	CreatNewPlayer,
	UpdateArray,
	switchName,
	InheritPlayer
};
