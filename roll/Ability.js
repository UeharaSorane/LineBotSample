var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var AbilityDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var AbilArr = [];
var SkillEffArr = [];
var TMBurstArr = [];

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
				//console.log(AbilArr);
				console.log('被動資料 讀取完成');
			}
		

			
			});
	
	AbilityDB.getRows(7 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					SkillEffArr[i] = [];
					
					SkillEffArr[i][0] = rows[i].sid;
					SkillEffArr[i][1] = rows[i].sname;
					SkillEffArr[i][2] = rows[i].sdescription;

					
				}
				//console.log(SkillEffArr);
				console.log('技能效果資料 讀取完成');
			}
		

			
			});
	
	AbilityDB.getRows(11 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					TMBurstArr[i] = [];
					
					TMBurstArr[i][0] = rows[i].tmbid;
					TMBurstArr[i][1] = rows[i].tmcname;
					TMBurstArr[i][2] = rows[i].tmburst;
					TMBurstArr[i][3] = rows[i].bursttype;
					TMBurstArr[i][4] = rows[i].victorydeclaration;

					
				}
				console.log(SkillEffArr);
				console.log('夥伴爆裂資料 讀取完成');
			}
		

			
			});
	
		
		
	});
  
  function AbilityReturn(Name){
	let returnA;
	  
  	for(var i=0; i< AbilArr.length; i++){
		if(AbilArr[i][1] == Name){
			
			returnA = AbilArr[i][2];
			
			return returnA;
		}


	}
	  
	 console.log('找不到被動' + Name);
  
  
  }

function SkillEffectReturn(Name){
	let returnSE;
	  
  	for(var i=0; i< SkillEffArr.length; i++){
		if(SkillEffArr[i][1] == Name){
			
			returnSE = SkillEffArr[i][2];
			
			return returnSE;
		}


	}
	  
	 console.log('找不到技能' + Name);
  
  
  }

function TMBurstReturn(Name){
	let returnTMB = [];
	  
  	for(var i=0; i< TMBurstArr.length; i++){
		if(TMBurstArr[i][1] == Name){
			
			returnTMB[0] = TMBurstArr[i][2];
			returnTMB[1] = TMBurstArr[i][3];
			returnTMB[2] = TMBurstArr[i][4];
			
			return returnTMB;
		}


	}
	  
	 console.log('找不到夥伴' + Name);
  
  
  }
  
  module.exports = {
	AbilityReturn,
	SkillEffectReturn,
	TMBurstReturn
};
