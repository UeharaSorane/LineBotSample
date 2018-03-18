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
					
					AbilArr[i][0] = rows[i].aid;
					AbilArr[i][1] = rows[i].aname;
					AbilArr[i][2] = rows[i].adescription;

					
				}
				console.log(AbilArr);
				console.log('被動資料 讀取完成');
			}
		

			
			});
	
		
		
	});
  
  function AbilityReturn(Name){
	var returnA;
	  
  	for(var i=0; i< AbilArr.length; i++){
		if(AbilArr[i][1] == Name){
			
			returnA = AbilArr[i][2];
			
			return returnA;
		}


	}
	  
	 console.log('找不到被動' + Name);
  
  
  }
  
  module.exports = {
	 AbilityReturn
};
