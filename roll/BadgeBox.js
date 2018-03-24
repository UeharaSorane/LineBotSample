var rply ={type : 'text'}; //type是必需的,但可以更改

///引入其他資料陣列
var BattleStates = require('./BattleStates.js');
var Badge = require('./BadgeIllustration.js');
var PlayerData = require('./PlayerData.js');

var BattleStatesDataArray = BattleStates.GetArray();
var WeaponsArray = Badge.GetArray();
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
	DB.getRows(14 , 
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
				console.log('玩家所持紋章庫 讀取完成');
			}
		

			
			});
	
		
		
	});

function UpdateArray(){
	DB.useServiceAccountAuth(creds, function (err) {
		DB.getRows(14 , 
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
				console.log('玩家所持紋章庫 更新完成');
			}
		

			
			});
		
		
	
	});
	

}

function SearchBadge(UserID){
	UpdateArray();
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j = 0; j<BattleStatesDataArray.length;j++){
				if(BattleStatesDataArray[j][0] == UserID){
					rply.text = '玩家 ' + BattleStatesDataArray[j][1] + '\n\
								\n 目前裝備紋章: ' + BattleStatesDataArray[j][7] + '\n持有紋章一覽:\n';
					for(var k = 0; k<WeaponBoxArr[i][1].length; k++){
						rply.text += WeaponBoxArr[i][1][k] + '\n';
					}
					rply.text += '\n 想更換紋章的話，請輸入 紋章更換 要裝備的飾品名';
					
					return rply;
					
				}
				
			}
		}
	}

	rply.text = '找不到你的角色的紋章庫，請向GM確認';
	return rply;

}

function SwitchBadge(UserID,Badge){
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j = 0; j<BattleStatesDataArray.length;j++){
				if(BattleStatesDataArray[j][0] == UserID){
					rply.text = '玩家 ' + BattleStatesDataArray[j][1] + '\n\
								\n 目前裝備飾品: ' + BattleStatesDataArray[j][7] + '\n';
					for(var k = 0; k<WeaponBoxArr[i][1].length; k++){
						if(WeaponBoxArr[i][1][k] == Badge){
							for(var l =0; l<WeaponsArray.length; l++){
								if(WeaponsArray[l][1] == Badge){
									
									rply.text += '更換成: ' + WeaponsArray[l][1] + '\n\
											\n -----能力值變動-----\
											\n 紋章被動: ' + BattleStatesDataArray[j][7] + '->' + WeaponsArray[l][1] + '\
									\n-------------------------';
									
									
									BattleStatesDataArray[j][7] = WeaponsArray[l][1];
									
									BattleStates.saveArray(BattleStatesDataArray);
									
									return rply;
									
									
								}
							
							}
							
							rply.text += '\n 錯誤！你持有圖鑑沒有的紋章，請回報給GM確認';
							return rply;
							
						}
					}
					if(Badge == null){
						rply.text = '請輸入你要裝備的紋章！';
						return rply;
					}
					
					rply.text = '你尚未擁有紋章' + Badge + '喔！';
					return rply;
					
				}
				
			}
			
			rply.text = '找不到你的角色的戰鬥資料，請向GM確認';
			return rply;
			
		}
	}

	rply.text = '找不到你的角色的紋章庫，請向GM確認';
	return rply;
	
}

function CreatNewPlayer(UserID,STWeapon){
	
	WeaponBoxArr[WeaponBoxArr.length] = [];
	WeaponBoxArr[WeaponBoxArr.length-1][0] = UserID;
	WeaponBoxArr[WeaponBoxArr.length-1][1] = [STWeapon];
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.addRow(14, { Userid: UserID}, function(err) {
		  if(err) {
		    console.log(err);
		  }
		  
		});
	});
	
}

module.exports = {
	SearchBadge,
	SwitchBadge,
	CreatNewPlayer,
	UpdateArray
};
