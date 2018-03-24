var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var CharArr= [];
var WeaponI = require('./WeaponIllustration.js');

var WeaponsArr = WeaponI.GetArray();

DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(10 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					
					CharArr[i][2] = rows[i].weapon;
					CharArr[i][3] = rows[i].weapontype;
					CharArr[i][4] = rows[i].weaponability;
					
					CharArr[i][5] = rows[i].accessory;
					CharArr[i][6] = rows[i].accessoryability;
					
					CharArr[i][7] = rows[i].badge;
					
					CharArr[i][8] = rows[i].teammate;
					
					CharArr[i][9] = Number(rows[i].hpst);
					CharArr[i][10] = Number(rows[i].hptraininglv);
					CharArr[i][11] = Number(rows[i].hpweap);
					CharArr[i][12] = Number(rows[i].hpacce);
					CharArr[i][13] = Number(rows[i].hptm);
					
					CharArr[i][14] = Number(rows[i].mpst);
					CharArr[i][15] = Number(rows[i].mptraininglv);
					CharArr[i][16] = Number(rows[i].mpweap);
					CharArr[i][17] = Number(rows[i].mpacce);
					CharArr[i][18] = Number(rows[i].mptm);
					
					CharArr[i][19] = Number(rows[i].atkst);
					CharArr[i][20] = Number(rows[i].atktraininglv);
					CharArr[i][21] = Number(rows[i].atkweap);
					CharArr[i][22] = Number(rows[i].atkacce);
					CharArr[i][23] = Number(rows[i].atktm);
					
					CharArr[i][24] = rows[i].skillability;
					CharArr[i][25] = rows[i].skill1;
					CharArr[i][26] = rows[i].skill2;
					CharArr[i][27] = rows[i].skill3;
					
					CharArr[i][28] = rows[i].teammateburst;
					CharArr[i][29] = rows[i].bursttype;
					
					CharArr[i][30] = Number(rows[i].trainingpoint);
					CharArr[i][31] = Number(rows[i].trainlv);
					
					CharArr[i][32] = rows[i].stresetio;
					
				}
				//console.log(CharArr);
				console.log('玩家戰鬥資料 讀取完成');
			}
		
			
			});
	
		
		
	});

function ArrayUpdate(){
	DB.useServiceAccountAuth(creds, function (err) {
		
 
	
	 // 是先將資料讀進陣列
		DB.getRows(10 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{
					for(var i=0; i< rows.length; i++){
						rows[i].userid = CharArr[i][0];
						rows[i].cname = CharArr[i][1];

						rows[i].weapon = CharArr[i][2];
						rows[i].weapontype = CharArr[i][3];
						rows[i].weaponability = CharArr[i][4];

						rows[i].accessory = CharArr[i][5];
						rows[i].accessoryability = CharArr[i][6];

						rows[i].badge = CharArr[i][7];

						rows[i].teammate = CharArr[i][8];

						rows[i].hpst = CharArr[i][9];
						rows[i].hptraininglv = CharArr[i][10];
						rows[i].hpweap = CharArr[i][11];
						rows[i].hpacce = CharArr[i][12];
						rows[i].hptm = CharArr[i][13];

						rows[i].mpst = CharArr[i][14];
						rows[i].mptraininglv = CharArr[i][15];
						rows[i].mpweap = CharArr[i][16];
						rows[i].mpacce = CharArr[i][17];
						rows[i].mptm = CharArr[i][18];

						rows[i].atkst = CharArr[i][19];
						rows[i].atktraininglv = CharArr[i][20];
						rows[i].atkweap = CharArr[i][21];
						rows[i].atkacce = CharArr[i][22];
						rows[i].atktm = CharArr[i][23];

						rows[i].skillability = CharArr[i][24];
						rows[i].skill1 = CharArr[i][25];
						rows[i].skill2 = CharArr[i][26];
						rows[i].skill3 = CharArr[i][27];

						rows[i].teammateburst = CharArr[i][28];
						rows[i].bursttype = CharArr[i][29];

						rows[i].trainingpoint = CharArr[i][30];
						rows[i].trainlv = CharArr[i][31];

						rows[i].stresetio = CharArr[i][32];
						rows[i].save();

					}
					//console.log(CharArr);
					console.log('玩家戰鬥資料 更新完成');
				}


				});



		});



}

function BattleStates(UserID){
	
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text ='你的戰鬥資料:\
				\n你的角色名:' + CharArr[i][1] + '\
				\n訓練等級: '+CharArr[i][31] + '等\
				\n尚未分配的訓練點數: ' + CharArr[i][30] + '點\
				\n-----目前裝備-----\
				\n裝備武器:' + CharArr[i][2] + '(' + CharArr[i][3] + ')\
				\n裝備飾品:' + CharArr[i][5] + '\
				\n裝備紋章:' + CharArr[i][7] + '\
				\n同行夥伴:' + CharArr[i][8] + '\
				\n-----能力值-----\
				\n HP:' + (CharArr[i][9] + CharArr[i][10]*10 + CharArr[i][11] + CharArr[i][12] + CharArr[i][13]) +'\
				\n MP:' + (CharArr[i][14] + CharArr[i][15]*5 + CharArr[i][16] + CharArr[i][17] + CharArr[i][18]) +'\
				\n ATK:' + (CharArr[i][19] + CharArr[i][20] + CharArr[i][21] + CharArr[i][22] + CharArr[i][23]) +'\
				\n-----技能一覽-----\
				\n被動之書:' + CharArr[i][24] + '\
				\n技能一:' + CharArr[i][25] + '\
				\n技能二:' + CharArr[i][26] + '\
				\n技能三:' + CharArr[i][27] + '\
				\n\
				\n爆裂技能:' + CharArr[i][28] + '[' + CharArr[i][29] + ']\
				\n-----特殊被動一覽-----\
				\n武器被動:' + CharArr[i][4] + '\
				\n飾品被動:' + CharArr[i][6] + '\
				\n紋章被動:' + CharArr[i][7] + '\
				\n------------------------';
			
			if(CharArr[i][32] == 1) rply.text += '\n!!!注意 你的基本能力值尚未分配!!!';

			return rply;

		}
	}
	
	rply.text = '警告！你沒有戰鬥能力數據，請向GM確認';

	return rply;




}

function BattleStatesSearch(Name){
	
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][1] == Name) {
			rply.text ='查詢結果\
				\n角色名:' + CharArr[i][1] + '\
				\n訓練等級: '+CharArr[i][31] + '等\
				\n尚未分配的訓練點數: ' + CharArr[i][30] + '點\
				\n-----目前裝備-----\
				\n裝備武器:' + CharArr[i][2] + '(' + CharArr[i][3] + ')\
				\n裝備飾品:' + CharArr[i][5] + '\
				\n裝備紋章:' + CharArr[i][7] + '\
				\n同行夥伴:' + CharArr[i][8] + '\
				\n-----能力值-----\
				\n HP:' + (CharArr[i][9] + CharArr[i][10]*10 + CharArr[i][11] + CharArr[i][12] + CharArr[i][13]) +'\
				\n MP:' + (CharArr[i][14] + CharArr[i][15]*5 + CharArr[i][16] + CharArr[i][17] + CharArr[i][18]) +'\
				\n ATK:' + (CharArr[i][19] + CharArr[i][20] + CharArr[i][21] + CharArr[i][22] + CharArr[i][23]) +'\
				\n-----技能一覽-----\
				\n被動之書:' + CharArr[i][24] + '\
				\n技能一:' + CharArr[i][25] + '\
				\n技能二:' + CharArr[i][26] + '\
				\n技能三:' + CharArr[i][27] + '\
				\n\
				\n爆裂技能:' + CharArr[i][28] + '[' + CharArr[i][29] + ']\
				\n-----特殊被動一覽-----\
				\n武器被動:' + CharArr[i][4] + '\
				\n飾品被動:' + CharArr[i][6] + '\
				\n紋章被動:' + CharArr[i][7] + '\
				\n------------------------';

			return rply;

		}
	}
	
	if(Name == null){
		rply.text = '請輸入要查詢的角色名！';

		return rply;
		
	}
	
	rply.text = '找不到角色名為 ' + Name + ' 的角色喔！';

	return rply;




}

function GetArray(){
	return CharArr;

}

function saveArray(ReturnF){
	CharArr = ReturnF;
	ArrayUpdate();
}

function CreatNewPlayer(UserID,Name,weaponN){
	CharArr[CharArr.length] = [];
	CharArr[CharArr.length][0] = UserID;
	CharArr[CharArr.length][1] = Name;

	for(var j =0; j<WeaponsArr.length; j++){
		if(WeaponsArr[j][1] == weaponN){
			CharArr[CharArr.length][2] = WeaponsArr[j][1];
			CharArr[CharArr.length][3] = WeaponsArr[j][3];
			CharArr[CharArr.length][4] = WeaponsArr[j][4];
			CharArr[CharArr.length][11] = WeaponsArr[j][5];
			CharArr[CharArr.length][16] = WeaponsArr[j][6];
			CharArr[CharArr.length][21] = WeaponsArr[j][7];
		}
	}

	CharArr[CharArr.length][9] = 20;
	CharArr[CharArr.length][14] = 20;
	CharArr[CharArr.length][19] = 5;

	ArrayUpdate();

}

function switchName(UserID,Name){
	for(var i=0; i< CharArr.length; i++){
		if(CharArr[i][0] == UserID){
			CharArr[i][1] = UserID;
			
			ArrayUpdate();
		
		}
	}
}


module.exports = {
	BattleStates,
	BattleStatesSearch,
	ArrayUpdate,
	GetArray,
	saveArray,
	CreatNewPlayer,
	switchName
};
