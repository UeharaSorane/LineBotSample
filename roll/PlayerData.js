var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');


function main(UserID) {
	
	var testF = function(){
		
		console.log(rply.text);
	}
	
	
	var returnF = function(){
		var rplyT ={type : 'text'};
		
		rplyT.text=rply.text;
		return rplyT;
	}
	
	DB.useServiceAccountAuth(creds, function (err) {
		rply.text ='你的角色名:';
		
		
		var CName;
		var Gold;
		var MiraStone;
		var Title;
		var TempRply;
		
 
		  // Get all of the rows from the spreadsheet.
			DB.getRows(1 , 
				function (err, rows) {
					if (err) {
						console.log( err );
					}else{

						for(var i=0; i< rows.length; i++){

							if (rows[i].userid == UserID) {
								CName = rows[i].cname;
								Gold = rows[i].gold;
								MiraStone = rows[i].mirastone;
								Title = rows[i].title;
								TempRply ='基本資料:\
								\n你的角色名:' + CName + '\
								\n持有金幣: '+Gold + 'G\
								\n持有奇蹟石: '+MiraStone + '顆\
								\n當前稱號: '+Title;

							}
						}
					}

				
			rply.text = TempRply;
			});
	
		
		
	});
	
	
	///確認玩家資料
	
              setTimeout(testF, 3000);
	
              return JSON.stringify(setTimeout(returnF, 3000));

	
	
  
	
	///

}

function CreatNewPlayer(UserID,CName,Gold,MiraStone,Title) {
	var AlreadyHaveCharacter = 0;
	
	DB.useServiceAccountAuth(creds, function (err) {		
		var CName;
		var AHC = 0;
 
		  // Get all of the rows from the spreadsheet.
			DB.getRows(1 , 
				function (err, rows) {
					if (err) {
						console.log( err );
					}else{

						for(var i=0; i< rows.length; i++){

							if (rows[i].userid == UserID) {
								AHC = 1;
								CName = '你的Line帳號已經有角色了，請輸入「玩家情報確認」';
								console.log('你的Line帳號已經有角色了，請輸入「玩家情報確認」');

							}

						}



					}
				AlreadyHaveCharacter = AHC;
				rply.text =CName;
			});
	
		
		
	});
	
	
	if(AlreadyHaveCharacter == 1){
		rply.text = '你的Line帳號已經有角色了，請輸入「玩家情報確認」';

		return rply;
	
	}
	
	
	if(CName == null|| Gold == null || MiraStone == null|| Title == null) {
		
	rply.text = '有資料沒有填進去喔!';
				
	return rply;
        }
	
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.addRow(1, { UserID: UserID, CName: CName, Gold: Gold, MiraStone: MiraStone,Title: Title }, function(err) {
		  if(err) {
		    console.log(err);
		  }
		});
	});
	
	
			
	///確認玩家資料
      
	rply.text = '玩家資料 ' + CName + ' 建立完成!';
				
	return rply;
	
	///

}



module.exports = {
	main,
	CreatNewPlayer
};
