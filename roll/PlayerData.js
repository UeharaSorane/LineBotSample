var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');


function main(UserID) {
	
	
	DB.useServiceAccountAuth(creds, function (err) {
		rply.text ='你的角色名:';
		
		
		var CName;
 
		  // Get all of the rows from the spreadsheet.
			DB.getRows(1 , 
				function (err, rows) {
					if (err) {
						console.log( err );
					}else{

						for(var i=0; i< rows.length; i++){

							if (rows[i].userid == UserID) {
								CName = rows[i].cname;
								console.log('你的角色名:'+rows[i].cname);
								console.log('比較慢的');

							}

						}



					}

				rply.text ='你的角色名:' + CName;
			});
	
		
		
	});
	
	
	///確認玩家資料

	console.log('比較快的');
	
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
