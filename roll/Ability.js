var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var AbilityDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var AbilArr= [];

AbilityDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	AbilityDB.getRows(4 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					AbilArr[i] = [];
					
					AbilArr[i][0] = rows[i]awid;
					AbilArr[i][1] = rows[i].aname;
					AbilArr[i][2] = rows[i].adescription;

					
				}
				console.log(AbilArr);
				console.log('被動資料 讀取完成');
			}
		

			
			});
	
		
		
	});
  
  function AbilityReturn(Name){
  
  
  
  }
  
  module.exports = {
	 AbilityReturn
};
