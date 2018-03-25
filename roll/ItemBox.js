var rply ={type : 'text'}; //type是必需的,但可以更改

///引入其他資料陣列
var BattleStates = require('./BattleStates.js');
var Item = require('./itemIllustration.js');
var PlayerData = require('./PlayerData.js');

var BattleStatesDataArray = BattleStates.GetArray();
var WeaponsArray = Item.GetArray();
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
	DB.getRows(19 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					WeaponBoxArr[i] = [];
					
					WeaponBoxArr[i][0] = rows[i].userid;
					WeaponBoxArr[i][1] = rows[i].cname;
					WeaponBoxArr[i][2] = rows[i].box.split(',');
					WeaponBoxArr[i][3] = rows[i].numbers.split(',');
					
				}
				//console.log(BadgeArr);
				console.log('玩家所持道具庫 讀取完成');
			}
		

			
			});
	
		
		
	});
	
	function UpdateArray(){
	DB.useServiceAccountAuth(creds, function (err) {
		DB.getRows(19 , 
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
					rows[i].numbers = WeaponBoxArr[i][3][0];
					for(var j=1;j<WeaponBoxArr[i][2].length;j++){
						rows[i].box += ',' + WeaponBoxArr[i][3][j];
					}
					rows[i].save();
				}
				//console.log(BadgeArr);
				console.log('玩家所持道具庫 更新完成');
			}
		

			
			});
		
		
	
	});
	

}

function SearchItem(UserID){
	UpdateArray();
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j = 0; j<BattleStatesDataArray.length;j++){
				if(BattleStatesDataArray[j][0] == UserID){
					rply.text = '玩家 ' + BattleStatesDataArray[j][1] + '\n\
								\n 持有道具一覽:\n';
					for(var k = 0; k<WeaponBoxArr[i][2].length; k++){
						rply.text += WeaponBoxArr[i][2][k] + 'x' + WeaponBoxArr[i][3][k] +  '\n';
					}
					rply.text += '\n 想使用道具的話，請輸入 使用道具 要使用的道具名';
					
					return rply;
					
				}
				
			}
		}
	}

	rply.text = '找不到你的角色的道具庫，請向GM確認';
	return rply;

}

function useItem(UserID,Name,confirm){
	if(Name == null){
		rply.text = '請輸入想使用的道具名';
		return rply;
	}
	
	for(var i =0; i<WeaponBoxArr.length;i++){
		if(WeaponBoxArr[i][0] == UserID){
			for(var j =0;j<WeaponBoxArr[i][2].length;j++){
				if(WeaponBoxArr[i][2][j] == Name){
					if(WeaponBoxArr[i][3][j]<=0){
						rply.text = '錯誤！你沒有這項道具了';
						return rply;
					}else{
						if(confirm != '確定'){
							rply.text = '道具名:' + Name + '\n';
							for(var k = 0; k<WeaponsArray.length;k++){
								if(WeaponsArray[k][1] == Name){
									rply.text += WeaponsArray[k][2];
								}
							}
							
							rply.text = '所持數: ' + WeaponBoxArr[i][3][j] + '\
									\n 確定要使用的話，請輸入 使用道具 道具名 確認 以使用道具';
							return rply;
						}else{
							WeaponBoxArr[i][3][j]--;
							rply.text = '玩家 ' + BattleStatesDataArray[j][1] + '使用道具' + Name + '！';
							UpdateArray();
							return rply;
						}
					}
				}
			}
		}
	}

	rply.text = '找不到你的角色的道具庫，請向GM確認';
	return rply;
	
}

module.exports = {
	SearchItem,
	UpdateArray,
	useItem
};
