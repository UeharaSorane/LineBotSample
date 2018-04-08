var rply ={type : 'text'}; //type是必需的,但可以更改
var BattleStates = require('./BattleStates.js');
var WB = require('./WeaponBox.js');
var BB = require('./BadgeBox.js');
var MB = require('./MateBox.js');
var SB = require('./SkillBox.js');
var IB = require('./ItemBox.js');


var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var CharArr= [];
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					CharArr[i][2] = Number(rows[i].gold);
					CharArr[i][3] = Number(rows[i].mirastone);
					CharArr[i][4] = rows[i].title;
					CharArr[i][5] = rows[i].inheritio;
					CharArr[i][6] = rows[i].inheritpassword;
					CharArr[i][7] = Number(rows[i].wmaterials);
					CharArr[i][8] = Number(rows[i].wmaterialm);
					CharArr[i][9] = Number(rows[i].wmateriall);
					CharArr[i][10] = Number(rows[i].gmaterials);
					CharArr[i][11] = Number(rows[i].gmaterialm);
					CharArr[i][12] = Number(rows[i].gmateriall);
					CharArr[i][13] = Number(rows[i].mateshards);
					CharArr[i][14] = rows[i].guild;
					CharArr[i][15] = rows[i].guildtitle;
					CharArr[i][16] = rows[i].waitingg;
					CharArr[i][17] = rows[i].waitinggname;
					
				}
				//console.log(CharArr);
				console.log('玩家基本資料 讀取完成');
				//console.log();
			}
		

			
			});
	
		
		
	});

function ArrayUpdate() {

	DB.useServiceAccountAuth(creds, function (err) {



	 // Get all of the rows from the spreadsheet.
		DB.getRows(1 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{

					for(var i=0; i< CharArr.length; i++){

						rows[i].UserID = CharArr[i][0];
						rows[i].Cname = CharArr[i][1];
						rows[i].Gold = CharArr[i][2];
						rows[i].MiraStone = CharArr[i][3];
						rows[i].Title = CharArr[i][4];
						rows[i].InheritIO = CharArr[i][5];
						rows[i].InheritPassword = CharArr[i][6];
						rows[i].WmaterialS = CharArr[i][7];
						rows[i].WmaterialM = CharArr[i][8];
						rows[i].WmaterialL = CharArr[i][9];
						rows[i].GmaterialS = CharArr[i][10];
						rows[i].GmaterialM = CharArr[i][11];
						rows[i].GmaterialL = CharArr[i][12];
						rows[i].MateShards = CharArr[i][13];
						rows[i].guild = CharArr[i][14];
						rows[i].guildtitle = CharArr[i][15];
						rows[i].waitingg = CharArr[i][16];
						rows[i].waitinggname = CharArr[i][17];
						rows[i].save();

					}

					}
					console.log('玩家基本資料 更新完成');


				});



		});
	
}
	

function main(UserID) {
	///確認玩家資料
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text ='你的基本資料:\
				\n你的角色名:' + CharArr[i][1] + '\
				\n持有金幣: '+CharArr[i][2] + 'G\
				\n持有奇蹟石: '+CharArr[i][3] + '顆\
				\n當前稱號: '+CharArr[i][4] + '\
				\n-----持有素材-----\
				\n 武器素材(小):' + CharArr[i][7]+'\
				\n 武器素材(中):' + CharArr[i][8]+'\
				\n 武器素材(大):' + CharArr[i][9]+'\
				\n 公會素材(小):' + CharArr[i][10]+'\
				\n 公會素材(中):' + CharArr[i][11]+'\
				\n 公會素材(大):' + CharArr[i][12]+'\
				\n 夥伴碎片:' + CharArr[i][13] + '\
				\n-----公會相關-----\
				\n 所屬公會: ' + CharArr[i][14] + '\
				\n 公會職位: ' + CharArr[i][15] + '\
				\n--------------------------------';
			
			if(CharArr[i][5] == 1) rply.text += '\n!!!警告 繼承模式開啟中，請盡速繼承!!!';
			
			ArrayUpdate();
			return rply;

		}
	}
	
	rply.text = '你的Line帳號尚未建立角色，請輸入 玩家建立 角色名 稱號(隨意) 初始武器(木劍、木弓、木短杖、木長杖、普通筆記本) 以建立角色';

	return rply;

	
	
  
	
	///

}

function SearchPlayer(Name) {
	///確認玩家資料
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][1] == Name) {
			rply.text ='查詢結果:\
				\n角色名:' + CharArr[i][1] + '\
				\n持有金幣: '+CharArr[i][2] + 'G\
				\n持有奇蹟石: '+CharArr[i][3] + '顆\
				\n當前稱號: '+CharArr[i][4] + '\
				\n-----持有素材-----\
				\n 武器素材(小):' + CharArr[i][7]+'\
				\n 武器素材(中):' + CharArr[i][8]+'\
				\n 武器素材(大):' + CharArr[i][9]+'\
				\n 公會素材(小):' + CharArr[i][10]+'\
				\n 公會素材(中):' + CharArr[i][11]+'\
				\n 公會素材(大):' + CharArr[i][12]+'\
				\n 夥伴碎片:' + CharArr[i][13]+ '\
				\n-----公會相關-----\
				\n 所屬公會: ' + CharArr[i][14] + '\
				\n 公會職位: ' + CharArr[i][15] + '\
				\n--------------------------------';

			return rply;

		}
	}
	
	if(Name == null){
		rply.text = '請輸入要查詢的角色名！';

		return rply;
		
	}
	
	rply.text = '找不到角色名為 ' + Name + ' 的角色喔！';

	return rply;
	///

}

function CreatNewPlayer(userID,CName,Title,weapon) {
	var CharArrleng = CharArr.length;

	CharArr[CharArrleng] = [];
	
	CharArr[CharArrleng][0] = userID;
	CharArr[CharArrleng][1] = CName;
	CharArr[CharArrleng][2] = 1000;
	CharArr[CharArrleng][3] = 5;
	CharArr[CharArrleng][4] = Title;
	CharArr[CharArrleng][5] = 0;
	CharArr[CharArrleng][7] = 0;
	CharArr[CharArrleng][8] = 0;
	CharArr[CharArrleng][9] = 0;
	CharArr[CharArrleng][10] = 0;
	CharArr[CharArrleng][11] = 0;
	CharArr[CharArrleng][12] = 0;
	CharArr[CharArrleng][13] = 0;
	CharArr[CharArrleng][14] = '輔導公會';
	CharArr[CharArrleng][15] = '會員';
	CharArr[CharArrleng][16] = 0;
	///確認玩家資料
	
	
	DB.useServiceAccountAuth(creds, function (err) {
 
		// Get all of the rows from the spreadsheet.
		DB.addRow(1, { Userid: userID}, function(err) {
			if(err) {
				console.log(err);
		 	}else{
				ArrayUpdate();
			}
		  
		});
	});
	
		///

}


function GetArray(){
	return CharArr;

}

function saveArray(ReturnF){
	CharArr = ReturnF;
	ArrayUpdate();
}

module.exports = {
	main,
	SearchPlayer,
	ArrayUpdate,
	GetArray,
	saveArray,
	CreatNewPlayer
};
