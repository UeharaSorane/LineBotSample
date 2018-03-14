var rply ={type : 'text'}; //type是必需的,但可以更改
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA/edit#gid=0');

function main(UserID) {
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.getRows(1, function (err, rows) {
	    console.log(rows);
	  });
	});
	
	
			
	///確認玩家資料
      
	rply.text =  '資料庫連結沒有問題';
				
	return rply;
	
	///

}

function inheritPlayerData(UserID) {
	DB.useServiceAccountAuth(creds, function (err) {
 
	  	//將玩家UID繼承到玩家資料
		DB.addRow(2, { UUID: 'bernie0905' }, function(err) {
		  if(err) {
		    console.log(err);
		  }
		});
	});
	
	
			
	///確認玩家資料
      
	rply.text =  '資料庫連結沒有問題';
				
	return rply;
	
	///

}


module.exports = {
	main,
	inheritPlayerData
};
