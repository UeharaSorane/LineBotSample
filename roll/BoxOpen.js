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
						SkillArr[1][i] = rows[i].tuesdayskill;
						SkillArr[2][i] = rows[i].wednesdayskill;
						SkillArr[3][i] = rows[i].thursdayskill;
					}

					for(var i=1; i<4; i++){
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
					console.log('寶箱技能資料 讀取完成');
				}
			}
		);
	}
);



function main() {
	///確認今天是星期幾
	let date = new Date();
	let day = date.getDay();
	console.log(day);
	
	let d = new Date();
        let n = d.getHours();
	
	if (n >=16){
		day++;
		if (day>=7) day=0;
	}
	///
	
	///寶箱機率
	let Nrate = 32;
	let Rrate = 28;
	let Hrate = 25;
	let Prate = 15;
	
	let RHP = Rrate+Hrate+Prate;
	let HP = Hrate+Prate;
	let P = Prate;
	///
	
	///建立回傳用陣列(金幣,奇蹟石,技能書,武(小中大),公(小中大),對話)
	let returnArr = [];

	///
	
	var Sitem = 0;
	var Mitem = 0;
	var Litem = 0;
	
	let temp = rollbase.Dice(100);
		
	if (temp > RHP){
		if(day ==0){
			returnArr[3] = rollbase.Dice(5);
			returnArr[9] = '恭喜，是普通獎勵。\
					\n你獲得了' + returnArr[3] + '個武器素材(小)';
			
		}else if(day == 1){
			
			returnArr[0] = 10;
			returnArr[9] = '恭喜，是普通獎勵。\
					\n你獲得了10G';
			
		}else if(day == 2){
			
			returnArr[0] = 10;
			returnArr[9] = '恭喜，是普通獎勵。\
					\n你獲得了10G';
			
		}else if(day == 3){
			
			returnArr[0] = 10;
			returnArr[9] = '恭喜，是普通獎勵。\
					\n你獲得了10G';
			
		}else if(day == 4){
			
			returnArr[0] = 10;
			returnArr[9] = '恭喜，是普通獎勵。\
					\n你獲得了10G';
			
		}else if(day == 5){
			
			returnArr[0] = 100;
			returnArr[9] = '恭喜，是普通獎勵。\
					\n你獲得了100G';
			
		}else if(day ==6){
			returnArr[6] = rollbase.Dice(5);
			returnArr[9] = '恭喜，是普通獎勵。\
					\n你獲得了' + Sitem + '個公會素材(小)';
			
		}
	
	}else if (temp <=RHP && temp > HP){
		if(day ==0){
			returnArr[3] = rollbase.Dice(10);
			returnArr[4] = rollbase.Dice(5);
			returnArr[5] = rollbase.Dice(3);
			returnArr[9] = '恭喜，是中等獎勵。\
					\n你獲得了' + returnArr[3] + '個武器素材(小)\
					\n你獲得了' + returnArr[4] + '個武器素材(中)\
					\n你獲得了' + returnArr[5] + '個武器素材(大)';
			
		}else if(day == 1){
			
			returnArr[0] = 50;
			returnArr[9] = '恭喜，是中等獎勵。\
					\n你獲得了50G';
			
		}else if(day == 2){
			
			returnArr[0] = 50;
			returnArr[9] = '恭喜，是中等獎勵。\
					\n你獲得了50G';
			
		}else if(day == 3){
			
			returnArr[0] = 50;
			returnArr[9] = '恭喜，是中等獎勵。\
					\n你獲得了50G';
			
		}else if(day == 4){
			
			returnArr[0] = 50;
			returnArr[9] = '恭喜，是中等獎勵。\
					\n你獲得了50G';
			
		}else if(day == 5){
			
			returnArr[0] = 200;
			returnArr[9] = '恭喜，是中等獎勵。\
					\n你獲得了200G';
			
		}else if(day ==6){
			returnArr[3] = rollbase.Dice(10);
			returnArr[4] = rollbase.Dice(5);
			returnArr[5] = rollbase.Dice(3);
			returnArr[9] = '恭喜，是中等獎勵。\
					\n你獲得了' + returnArr[3] + '個公會素材(小)\
					\n你獲得了' + returnArr[4] + '個公會素材(中)\
					\n你獲得了' + returnArr[5] + '個公會素材(大)';
			
		}
	
	}else if (temp <=HP && temp > P){
		if(day ==0){
			returnArr[6] = rollbase.Dice(20);
			returnArr[7] = rollbase.Dice(10);
			returnArr[8] = rollbase.Dice(5);
			returnArr[9] = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了' + returnArr[6] + '個武器素材(小)\
					\n你獲得了' + returnArr[7] + '個武器素材(中)\
					\n你獲得了' + returnArr[8] + '個武器素材(大)';
			
		}else if(day == 1){
			
			returnArr[0] = 100;
			returnArr[9] = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了100G';
			
		}else if(day == 2){
			
			returnArr[0] = 100;
			returnArr[9] = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了100G';
			
		}else if(day == 3){
			
			returnArr[0] = 100;
			returnArr[9] = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了100G';
			
		}else if(day == 4){
			
			returnArr[0] = 100;
			returnArr[9] = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了100G';
			
		}else if(day == 5){
			
			returnArr[0] = 500;
			returnArr[9] = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了500G';
			
		}else if(day ==6){
			returnArr[3] = rollbase.Dice(20);
			returnArr[4] = rollbase.Dice(10);
			returnArr[5] = rollbase.Dice(5);
			returnArr[9] = '喔喔！是高等獎勵欸，恭喜！\
					\n你獲得了' + returnArr[3] + '個公會素材(小)\
					\n你獲得了' + returnArr[4] + '個公會素材(中)\
					\n你獲得了' + returnArr[5] + '個公會素材(大)';
			
		}
	
	}else if (temp <=P){
		if(day == 0){
			returnArr[6] = rollbase.Dice(90)+10;
			returnArr[7] = rollbase.Dice(20);
			returnArr[8] = rollbase.Dice(10);
			returnArr[9] = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了' + returnArr[6] + '個武器素材(小)\
					\n你獲得了' + returnArr[7] + '個武器素材(中)\
					\n你獲得了' + returnArr[8] + '個武器素材(大)';
			
		}else if(day == 1){
			returnArr[2] = SkillArr[0][Math.floor((Math.random() * (SkillArr[0].length)))];
			returnArr[9] = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了技能書「' + returnArr[2] + '」';
			
		}else if(day == 2){
			
			returnArr[2] = SkillArr[1][Math.floor((Math.random() * (SkillArr[1].length)))];
			returnArr[9] = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了技能書「' + returnArr[2] + '」';
			
		}else if(day == 3){
			
			returnArr[2] = SkillArr[2][Math.floor((Math.random() * (SkillArr[2].length)))];
			returnArr[9] = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了技能書「' + returnArr[2] + '」';
			
		}else if(day == 4){
			
			returnArr[2] = SkillArr[3][Math.floor((Math.random() * (SkillArr[3].length)))];
			returnArr[9] = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了技能書「' + returnArr[2] + '」';
			
		}else if(day == 5){
			
			returnArr[0] = 1000;
			returnArr[9] = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了1000G';
			
		}else if(day ==6){
			returnArr[3] = rollbase.Dice(90)+10;
			returnArr[4] = rollbase.Dice(30);
			returnArr[5] = rollbase.Dice(20);
			returnArr[9] = '太棒了！！！是頂級獎勵！恭喜！\
					\n你獲得了' + returnArr[3] + '個公會素材(小)\
					\n你獲得了' + returnArr[4] + '個公會素材(中)\
					\n你獲得了' + returnArr[5] + '個公會素材(大)';
			
		}
	}
	
	
	return returnArr;
	
}


module.exports = {
	main
};
