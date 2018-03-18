var rollbase = require('./rollbase.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var SkillDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var SkillArr= [];
SkillArr[0] = [];
SkillArr[1] = [];
SkillArr[2] = [];
SkillArr[3] = [];

SkillDB.useServiceAccountAuth(creds, 
	function (err) {
 // 先將資料讀進陣列
		SkillDB.getRows(2 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{
					for(var i=0; i< rows.length; i++){
						console.log(SkillArr[0]);
						SkillArr[1][i] = rows[i].tuesdayskill;
						SkillArr[2][i] = rows[i].wednesdayskill;
						SkillArr[3][i] = rows[i].thursdayskill;
					}

					for(var i=1; i<3; i++){
						var delArr = 0;
						for(var j =1;j<=SkillArr[i].length;j++){
							if(SkillArr[i][j] == 'none'){
								delete SkillArr[i][j];
								delArr++;
							}
							SkillArr[i].length-=delArr;
						}
						
					}
					SkillArr[0] = SkillArr[1].concat(SkillArr[2],SkillArr[3]);
					//console.log(SkillArr[3]);
					console.log('寶箱技能資料 讀取完成');
				}
			}
		);
	}
);



function main() {
	var date = new Date();
	var day = date.getDay();
	console.log(day);
	
	var d = new Date();
        var n = d.getHours();
	
	if (n >=16){
		day++;
		if (day>=7) day=0;
	}
        console.log(day);
	console.log(n);
	
	///寶箱機率
	var Nrate = 32;
	var Rrate = 28;
	var Hrate = 25;
	var Prate = 15;
	
	var RHP = Rrate+Hrate+Prate;
	var HP = Hrate+Prate;
	var P = Prate;
	///
	
	var Sitem = 0;
	var Mitem = 0;
	var Litem = 0;
	
	let temp = rollbase.Dice(100);
		
	if (temp > RHP){
		if(day ==0){
			Sitem = rollbase.Dice(5);
			rply.text = '恭喜，是普通獎勵。\
					\n你獲得了' + Sitem + '個武器素材(小)';
			
		}else if(day == 1){
			
			rply.text = '恭喜，是普通獎勵。\
					\n你獲得了10G';
			
		}else if(day == 2){
			
			rply.text = '恭喜，是普通獎勵。\
					\n你獲得了10G';
			
		}else if(day == 3){
			
			rply.text = '恭喜，是普通獎勵。\
					\n你獲得了10G';
			
		}else if(day == 4){
			
			rply.text = '恭喜，是普通獎勵。\
					\n你獲得了10G';
			
		}else if(day == 5){
			
			rply.text = '恭喜，是普通獎勵。\
					\n你獲得了10G';
			
		}else if(day ==6){
			Sitem = rollbase.Dice(5);
			rply.text = '恭喜，是普通獎勵。\
					\n你獲得了' + Sitem + '個公會素材(小)';
			
		}
	
	}else if (temp <=RHP && temp > HP){
		if(day ==0){
			Sitem = rollbase.Dice(10);
			Mitem = rollbase.Dice(5);
			Litem = rollbase.Dice(3);
			rply.text = '恭喜，是中等獎勵。\
					\n你獲得了' + Sitem + '個武器素材(小)\
					\n你獲得了' + Mitem + '個武器素材(中)\
					\n你獲得了' + Litem + '個武器素材(大)';
			
		}else if(day == 1){
			
			rply.text = '恭喜，是中等獎勵。\
					\n你獲得了50G';
			
		}else if(day == 2){
			
			rply.text = '恭喜，是中等獎勵。\
					\n你獲得了50G';
			
		}else if(day == 3){
			
			rply.text = '恭喜，是中等獎勵。\
					\n你獲得了50G';
			
		}else if(day == 4){
			
			rply.text = '恭喜，是中等獎勵。\
					\n你獲得了50G';
			
		}else if(day == 5){
			
			rply.text = '恭喜，是中等獎勵。\
					\n你獲得了50G';
			
		}else if(day ==6){
			Sitem = rollbase.Dice(10);
			Mitem = rollbase.Dice(5);
			Litem = rollbase.Dice(3);
			rply.text = '恭喜，是中等獎勵。\
					\n你獲得了' + Sitem + '個公會素材(小)\
					\n你獲得了' + Mitem + '個公會素材(中)\
					\n你獲得了' + Litem + '個公會素材(大)';
			
		}
	
	}else if (temp <=HP && temp > P){
		if(day ==0){
			Sitem = rollbase.Dice(20);
			Mitem = rollbase.Dice(10);
			Litem = rollbase.Dice(5);
			rply.text = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了' + Sitem + '個武器素材(小)\
					\n你獲得了' + Mitem + '個武器素材(中)\
					\n你獲得了' + Litem + '個武器素材(大)';
			
		}else if(day == 1){
			
			rply.text = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了100G';
			
		}else if(day == 2){
			
			rply.text = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了100G';
			
		}else if(day == 3){
			
			rply.text = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了100G';
			
		}else if(day == 4){
			
			rply.text = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了100G';
			
		}else if(day == 5){
			
			rply.text = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了100G';
			
		}else if(day ==6){
			Sitem = rollbase.Dice(20);
			Mitem = rollbase.Dice(10);
			Litem = rollbase.Dice(5);
			rply.text = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了' + Sitem + '個公會素材(小)\
					\n你獲得了' + Mitem + '個公會素材(中)\
					\n你獲得了' + Litem + '個公會素材(大)';
			
		}
	
	}else if (temp <=P){
		if(day == 0){
			Sitem = rollbase.Dice(90)+10;
			Mitem = rollbase.Dice(20);
			Litem = rollbase.Dice(10);
			rply.text = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了' + Sitem + '個武器素材(小)\
					\n你獲得了' + Mitem + '個武器素材(中)\
					\n你獲得了' + Litem + '個武器素材(大)';
			
		}else if(day == 1){
			
			rply.text = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了技能書「' + SkillArr[0][Math.floor((Math.random() * (SkillArr[0].length)))] + '」';
			
		}else if(day == 2){
			
			rply.text = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了技能書「' + SkillArr[1][Math.floor((Math.random() * (SkillArr[1].length)))] + '」';
			
		}else if(day == 3){
			
			rply.text = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了技能書「' + SkillArr[2][Math.floor((Math.random() * (SkillArr[2].length)))] + '」';
			
		}else if(day == 4){
			
			rply.text = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了技能書「' + SkillArr[3][Math.floor((Math.random() * (SkillArr[3].length)))] + '」';
			
		}else if(day == 5){
			
			rply.text = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了1000G';
			
		}else if(day ==6){
			Sitem = rollbase.Dice(90)+10;
			Mitem = rollbase.Dice(30);
			Litem = rollbase.Dice(20);
			rply.text = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了' + Sitem + '個公會素材(小)\
					\n你獲得了' + Mitem + '個公會素材(中)\
					\n你獲得了' + Litem + '個公會素材(大)';
			
		}
	}
	
	
	return rply;
	
}


module.exports = {
	main
};
