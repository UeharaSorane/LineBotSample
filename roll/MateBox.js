var rply ={type : 'text'}; //type是必需的,但可以更改

///引入其他資料陣列
var BattleStates = require('./BattleStates.js');
var Mate = require('./TeammateIllustration.js');
var Ability = require('./Ability.js');
var PlayerData = require('./PlayerData.js');

var BattleStatesDataArray = BattleStates.GetArray();
var WeaponsArray = Mate.GetArray();
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
	DB.getRows(15 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					WeaponBoxArr[i] = [];
					
					WeaponBoxArr[i][0] = rows[i].userid;
					WeaponBoxArr[i][1] = rows[i].box.split(',');
					
				}
				//console.log(BadgeArr);
				console.log('玩家所持夥伴庫 讀取完成');
			}
		

			
			});
	
		
		
	});

function UpdateArray(){
	DB.useServiceAccountAuth(creds, function (err) {
		DB.getRows(15 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< WeaponBoxArr.length; i++){
					
					rows[i].userid = WeaponBoxArr[i][0];
					rows[i].box = WeaponBoxArr[i][1][0];
					for(var j=1;j<WeaponBoxArr[i][1].length;j++){
						rows[i].box += ',' + WeaponBoxArr[i][1][j];
					}
					rows[i].save();
				}
				//console.log(BadgeArr);
				console.log('玩家所持夥伴庫 更新完成');
			}
		

			
			});
		
		
	
	});
	

}


function SearchMate(UserID){
	UpdateArray();
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j = 0; j<BattleStatesDataArray.length;j++){
				if(BattleStatesDataArray[j][0] == UserID){
					rply.text = '玩家 ' + BattleStatesDataArray[j][1] + '\n\
								\n 目前同行夥伴: ' + BattleStatesDataArray[j][8] +'\n結交夥伴一覽:\n';
					for(var k = 0; k<WeaponBoxArr[i][1].length; k++){
						rply.text += WeaponBoxArr[i][1][k] + '\n';
					}
					rply.text += '\n 想更換夥伴的話，請輸入 夥伴更換 要同行的夥伴名';
					
					return rply;
					
				}
				
			}
		}
	}

	rply.text = '找不到你的角色的夥伴庫，請向GM確認';
	return rply;

}

function SwitchMate(UserID,Mate){
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j = 0; j<BattleStatesDataArray.length;j++){
				if(BattleStatesDataArray[j][0] == UserID){
					rply.text = '玩家 ' + BattleStatesDataArray[j][1] + '\n\
								\n 目前同行夥伴: ' + BattleStatesDataArray[j][8] + '\n';
					for(var k = 0; k<WeaponBoxArr[i][1].length; k++){
						if(WeaponBoxArr[i][1][k] == Mate){
							for(var l =0; l<WeaponsArray.length; l++){
								if(WeaponsArray[l][2] == Mate){
									
									rply.text += '更換成: ' + WeaponsArray[l][2] + '\n\
											\n -----能力值變動-----\
											\n 爆裂技能: ' + BattleStatesDataArray[j][28] + '[' + BattleStatesDataArray[j][29] + '] ->' + Ability.TMBurstReturn(WeaponsArray[l][3])[3] + '[' + WeaponsArray[l][8] +'] \
											\n Hp:' + (BattleStatesDataArray[i][9] + BattleStatesDataArray[i][10]*10 + BattleStatesDataArray[i][11] + BattleStatesDataArray[i][12] + BattleStatesDataArray[i][13]);
									BattleStatesDataArray[j][13] = WeaponsArray[l][5];
									rply.text += '->' + (BattleStatesDataArray[i][9] + BattleStatesDataArray[i][10]*10 + BattleStatesDataArray[i][11] + BattleStatesDataArray[i][12] + BattleStatesDataArray[i][13]) + '\n\
											\n Mp:' + (BattleStatesDataArray[i][14] + BattleStatesDataArray[i][15]*5 + BattleStatesDataArray[i][16] + BattleStatesDataArray[i][17] + BattleStatesDataArray[i][18]);
									
									BattleStatesDataArray[j][16] = WeaponsArray[l][6];
									
									rply.text+= '->' + (BattleStatesDataArray[i][14] + BattleStatesDataArray[i][15]*5 + BattleStatesDataArray[i][16] + BattleStatesDataArray[i][17] + BattleStatesDataArray[i][18]) +'\n\
											\n Atk:' + (BattleStatesDataArray[i][19] + BattleStatesDataArray[i][20] + BattleStatesDataArray[i][21] + BattleStatesDataArray[i][22] + BattleStatesDataArray[i][23]);
									BattleStatesDataArray[j][23] = WeaponsArray[l][7];
									
									rply.text += '->' + (BattleStatesDataArray[i][19] + BattleStatesDataArray[i][20] + BattleStatesDataArray[i][21] + BattleStatesDataArray[i][22] + BattleStatesDataArray[i][23]) +'\n\
									\n-------------------------';
									
									
									BattleStatesDataArray[j][8] = WeaponsArray[l][2];
									BattleStatesDataArray[j][28] = Ability.TMBurstReturn(WeaponsArray[l][3])[3];
									BattleStatesDataArray[j][29] = WeaponsArray[l][8];
									
									BattleStates.saveArray(BattleStatesDataArray);
									
									return rply;
									
									
								}
							
							}
							
							rply.text += '\n 錯誤！你持有圖鑑沒有的夥伴，請回報給GM確認';
							return rply;
							
						}
					}
					if(Mate == null){
						rply.text = '請輸入你要同行的夥伴！';
						return rply;
					}
					
					rply.text = '你尚未結交 夥伴' + Mate + '喔！';
					return rply;
					
				}
				
			}
			
			rply.text = '找不到你的角色的戰鬥資料，請向GM確認';
			return rply;
			
		}
	}

	rply.text = '找不到你的角色的夥伴庫，請向GM確認';
	return rply;
	
}

function CreatNewPlayer(UserID,STWeapon){
	
	let CAleng = WeaponBoxArr.length;
	
	WeaponBoxArr[CAleng] = [];
	WeaponBoxArr[CAleng][0] = UserID;
	WeaponBoxArr[CAleng][1] = [STWeapon];
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.addRow(15, { Userid: UserID}, function(err) {
		  if(err) {
		    console.log(err);
		  }
		  
		});
	});
	
}

module.exports = {
	SearchMate,
	SwitchMate,
	UpdateArray
};
