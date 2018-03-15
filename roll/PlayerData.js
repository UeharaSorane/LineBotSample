var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var DBJson = 'spreadsheet.json';

function main(UserID) {
	
	var PlayerNumber = 0;
	
	
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	DB.getRows(1, function (err, rows) {
		if (err) {
			console.log( err );
		}
		
		console.log( rows.length );
		
		for(var i=0; i< rows.length; i++){
			if (rows[i].userid == UserID) {
			console.log( rows[i].cname );
		}
		
		}
		
		  
		  
		  fs.writeFile( DBJson, JSON.stringify( rows ), 'utf8');
		
		});
	});
	
	
	///確認玩家資料
	
	rply.text = '玩家資料正常連線!';
				
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
      
	rply.text = '玩家資料 ' + CName + '建立完成!';
				
	return rply;
	
	///

}



module.exports = {
	main,
	CreatNewPlayer
};
