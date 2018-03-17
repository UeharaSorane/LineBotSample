var rollbase = require('./rollbase.js');
var PlayerData = require('./PlayerData.js');
var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var CharArr= [];
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					CharArr[i][2] = rows[i].gold;
					CharArr[i][7] = rows[i].wmaterials;
					CharArr[i][8] = rows[i].wmaterialm;
					CharArr[i][9] = rows[i].wmateriall;
					CharArr[i][10] = rows[i].gmaterials;
					CharArr[i][11] = rows[i].gmaterialm;
					CharArr[i][12] = rows[i].gmateriall;
					
				}
				console.log(CharArr);
				console.log('玩家基本資料 讀取完成');
			}
		

			
			});
	
		
		
	});

console.log(CharArr);

let TuesdayBox = [
		'突刺',
		'穿心射擊',
		'刺拳',
		'掃堂腿',
		'風神腿',
		'突襲',
		'當頭棒喝',
		'麻痺箭',
		'劇毒箭',
		'燃燒箭',
		'重劈',
		'猛虎一式',
		'獵龍一式',
		'蓄力打擊',
		'交叉反擊',
		'眩光箭',
		'紅蓮怒拳',
		'銀槍連閃'
		 ];

let WednesdayBox = [
		'冰雹',
		'雷擊',
		'冰獄彈',
		'轟炎彈',
		'魔導劍擊',
		'魔導穿槍',
		'魔導狙擊',
		'魔導彈'
		 ];

let ThursdayBox = [
		'祝福',
		'光盾',
		'狙擊姿態',
		'舉劍',
		'隱藏術',
		'怒吼',
		'咒術筆記',
		'劍聖的教誨(被動)',
		'大賢者的知惠(被動)',
		'箭神的心得(被動)',
		'狂戰士的回憶(被動)',
		'牧師的專業(被動)',
		'不滅意志(被動)',
		'急速詠唱'
		 ];

let MondayBox = [];

MondayBox.length = TuesdayBox.length + WednesdayBox.length  + ThursdayBox.length;

MondayBox = TuesdayBox.concat(WednesdayBox,ThursdayBox);

function ArrayUpdate() {

	DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 //讀取情報
		DB.getRows(1 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{

					for(var i=0; i< rows.length; i++){



						CharArr[i] = [];

						CharArr[i][0] = rows[i].userid;
						CharArr[i][1] = rows[i].cname;
						CharArr[i][2] = rows[i].gold;
						CharArr[i][3] = rows[i].mirastone;
						CharArr[i][7] = rows[i].wmaterials;
						CharArr[i][8] = rows[i].wmaterialm;
						CharArr[i][9] = rows[i].wmateriall;
						CharArr[i][10] = rows[i].gmaterials;
						CharArr[i][11] = rows[i].gmaterialm;
						CharArr[i][12] = rows[i].gmateriall;

					}

					}
					console.log(CharArr);
					console.log('玩家基本資料 更新完成');


			});
	
		
		
	});
}

function main(userID, test) {
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
	
	for(var i; i<=CharArr.length; i++){
		if(userID == CharArr[i][0]){
			if (temp > RHP){
				if(day ==0){
					Sitem = rollbase.Dice(5);
					CharArr[i][7]+= Sitem;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了' + Sitem + '個武器素材(小)';

				}else if(day == 1){
					CharArr[i][2]+= 10;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了10G';

				}else if(day == 2){
					CharArr[i][2]+= 10;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了10G';

				}else if(day == 3){
					CharArr[i][2]+= 10;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了10G';

				}else if(day == 4){
					CharArr[i][2]+= 10;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了10G';

				}else if(day == 5){
					CharArr[i][2]+= 100;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了100G';

				}else if(day ==6){
					Sitem = rollbase.Dice(5);
					CharArr[i][10]+= Sitem;
					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了' + Sitem + '個公會素材(小)';

				}

			}else if (temp <=RHP && temp > HP){
				if(day ==0){
					Sitem = rollbase.Dice(10);
					Mitem = rollbase.Dice(5);
					Litem = rollbase.Dice(3);
					
					CharArr[i][7]+= Sitem;
					CharArr[i][8]+= Mitem;
					CharArr[i][9]+= Litem;
					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了' + Sitem + '個武器素材(小)\
							\n你獲得了' + Mitem + '個武器素材(中)\
							\n你獲得了' + Litem + '個武器素材(大)';

				}else if(day == 1){
					CharArr[i][2]+= 50;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了50G';

				}else if(day == 2){
					CharArr[i][2]+= 50;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了50G';

				}else if(day == 3){
					CharArr[i][2]+= 50;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了50G';

				}else if(day == 4){
					CharArr[i][2]+= 50;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了50G';

				}else if(day == 5){
					CharArr[i][2]+= 200;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了200G';

				}else if(day ==6){
					Sitem = rollbase.Dice(10);
					Mitem = rollbase.Dice(5);
					Litem = rollbase.Dice(3);
					CharArr[i][10]+= Sitem;
					CharArr[i][11]+= Mitem;
					CharArr[i][12]+= Litem;
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
					CharArr[i][7]+= Sitem;
					CharArr[i][8]+= Mitem;
					CharArr[i][9]+= Litem;
					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了' + Sitem + '個武器素材(小)\
							\n你獲得了' + Mitem + '個武器素材(中)\
							\n你獲得了' + Litem + '個武器素材(大)';

				}else if(day == 1){
					CharArr[i][2]+= 100;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了100G';

				}else if(day == 2){
					CharArr[i][2]+= 100;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了100G';

				}else if(day == 3){
					CharArr[i][2]+= 100;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了100G';

				}else if(day == 4){
					CharArr[i][2]+= 100;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了100G';

				}else if(day == 5){
					CharArr[i][2]+= 500;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了500G';

				}else if(day ==6){
					Sitem = rollbase.Dice(20);
					Mitem = rollbase.Dice(10);
					Litem = rollbase.Dice(5);
					CharArr[i][10]+= Sitem;
					CharArr[i][11]+= Mitem;
					CharArr[i][12]+= Litem;
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
					CharArr[i][7]+= Sitem;
					CharArr[i][8]+= Mitem;
					CharArr[i][9]+= Litem;
					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了' + Sitem + '個武器素材(小)\
							\n你獲得了' + Mitem + '個武器素材(中)\
							\n你獲得了' + Litem + '個武器素材(大)';

				}else if(day == 1){

					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了技能書「' + MondayBox[Math.floor((Math.random() * (MondayBox.length)))] + '」';

				}else if(day == 2){

					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了技能書「' + TuesdayBox[Math.floor((Math.random() * (TuesdayBox.length)))] + '」';

				}else if(day == 3){

					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了技能書「' + WednesdayBox[Math.floor((Math.random() * (WednesdayBox.length)))] + '」';

				}else if(day == 4){

					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了技能書「' + ThursdayBox[Math.floor((Math.random() * (ThursdayBox.length)))] + '」';

				}else if(day == 5){
					CharArr[i][2]+= 1000;

					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了1000G';

				}else if(day ==6){
					Sitem = rollbase.Dice(90)+10;
					Mitem = rollbase.Dice(30);
					Litem = rollbase.Dice(20);
					CharArr[i][10]+= Sitem;
					CharArr[i][11]+= Mitem;
					CharArr[i][12]+= Litem;
					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了' + Sitem + '個公會素材(小)\
							\n你獲得了' + Mitem + '個公會素材(中)\
							\n你獲得了' + Litem + '個公會素材(大)';

				}
			}
			
			if(test =='測試'){
				PlayerData.ArrayUpdate()
				ArrayUpdate();
				return rply;
			}
			DB.useServiceAccountAuth(creds, function (err) {
		
				DB.getRows(1 , 
					function (err, rows) {
						if (err) {
							console.log( err );
						}else{
							rows[i].Gold = CharArr[i][2];
							rows[i].MiraStone = CharArr[i][3];
							rows[i].WmaterialS = CharArr[i][7];
							rows[i].WmaterialM = CharArr[i][8];
							rows[i].WmaterialL = CharArr[i][9];
							rows[i].GmaterialS = CharArr[i][10];
							rows[i].GmaterialM = CharArr[i][11];
							rows[i].GmaterialL = CharArr[i][12];
							rows[i].save();
							
						}
					});
			});
			
			
			return rply;
			
		}else{
		rply.text = '錯誤:你尚未建立角色';

		return rply;
		}
	
	}
	

	
}


module.exports = {
	main
};
