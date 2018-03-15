var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');

function main(UserID) {
	
	var CName;
	rply.text = '不希望顯示的';
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	DB.getRows(1, function (err, rows) {
		if (err) {
			console.log( err );
		}else{
		var ReplyText;
		
		for(var i=0; i< rows.length; i++){
			
			if (rows[i].userid == UserID) {
				CName = rows[i].cname;
			console.log('你的角色名:'+rows[i].cname);
		        ReplyText = '你的角色名:'+rows[i].cname;
		}
		
		}
			rply.text = ReplyText ;
			
		
		}
		

		});
	});
	
	
	///確認玩家資料
	
	
	
	console.log( rply.text );
	
	return rply;
  
	
	///

}

function CreatNewPlayer(UserID,CName,Gold,MiraStone,Title) {
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
