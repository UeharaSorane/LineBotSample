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
	
	var WSitem = 0;
	var WMitem = 0;
	var WLitem = 0;
	var GSitem = 0;
	var GMitem = 0;
	var GLitem = 0;
	var Gold =0;
	
	let temp = rollbase.Dice(100);
	
	console.log(CharArr.length);
	console.log(CharArr[0][0]);
	
	for(var i = 0; i<=CharArr.length; i++){
		if(userID == CharArr[i][0]){
			if (temp > RHP){
				if(day ==0){
					WSitem = rollbase.Dice(5);
					CharArr[i][7]+= WSitem;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了' + WSitem + '個武器素材(小)';

				}else if(day == 1){
					CharArr[i][2]+= 10;
					Gold =10;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了10G';

				}else if(day == 2){
					CharArr[i][2]+= 10;
					Gold =10;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了10G';

				}else if(day == 3){
					CharArr[i][2]+= 10;
					Gold =10;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了10G';

				}else if(day == 4){
					CharArr[i][2]+= 10;
					Gold =10;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了10G';

				}else if(day == 5){
					CharArr[i][2]+= 100;
					Gold =100;

					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了100G';

				}else if(day ==6){
					GSitem = rollbase.Dice(5);
					CharArr[i][10]+= GSitem;
					rply.text = '恭喜，是普通獎勵。\
							\n你獲得了' + GSitem + '個公會素材(小)';

				}

			}else if (temp <=RHP && temp > HP){
				if(day ==0){
					WSitem = rollbase.Dice(10);
					WMitem = rollbase.Dice(5);
					WLitem = rollbase.Dice(3);
					
					CharArr[i][7]+= WSitem;
					CharArr[i][8]+= WMitem;
					CharArr[i][9]+= WLitem;
					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了' + WSitem + '個武器素材(小)\
							\n你獲得了' + WMitem + '個武器素材(中)\
							\n你獲得了' + WLitem + '個武器素材(大)';

				}else if(day == 1){
					CharArr[i][2]+= 50;
					Gold =50;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了50G';

				}else if(day == 2){
					CharArr[i][2]+= 50;
					Gold =50;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了50G';

				}else if(day == 3){
					CharArr[i][2]+= 50;
					Gold =50;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了50G';

				}else if(day == 4){
					CharArr[i][2]+= 50;
					Gold =50;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了50G';

				}else if(day == 5){
					CharArr[i][2]+= 200;
					Gold =200;

					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了200G';

				}else if(day ==6){
					GSitem = rollbase.Dice(10);
					GMitem = rollbase.Dice(5);
					GLitem = rollbase.Dice(3);
					CharArr[i][10]+= GSitem;
					CharArr[i][11]+= GMitem;
					CharArr[i][12]+= GLitem;
					rply.text = '恭喜，是中等獎勵。\
							\n你獲得了' + GSitem + '個公會素材(小)\
							\n你獲得了' + GMitem + '個公會素材(中)\
							\n你獲得了' + GLitem + '個公會素材(大)';

				}

			}else if (temp <=HP && temp > P){
				if(day ==0){
					WSitem = rollbase.Dice(20);
					WMitem = rollbase.Dice(10);
					WLitem = rollbase.Dice(5);
					CharArr[i][7]+= WSitem;
					CharArr[i][8]+= WMitem;
					CharArr[i][9]+= WLitem;
					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了' + WSitem + '個武器素材(小)\
							\n你獲得了' + WMitem + '個武器素材(中)\
							\n你獲得了' + WLitem + '個武器素材(大)';

				}else if(day == 1){
					CharArr[i][2]+= 100;
					Gold =100;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了100G';

				}else if(day == 2){
					CharArr[i][2]+= 100;
					Gold =100;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了100G';

				}else if(day == 3){
					CharArr[i][2]+= 100;
					Gold =100;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了100G';

				}else if(day == 4){
					CharArr[i][2]+= 100;
					Gold =100;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了100G';

				}else if(day == 5){
					CharArr[i][2]+= 500;
					Gold =500;

					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了500G';

				}else if(day ==6){
					GSitem = rollbase.Dice(20);
					GMitem = rollbase.Dice(10);
					GLitem = rollbase.Dice(5);
					CharArr[i][10]+= GSitem;
					CharArr[i][11]+= GMitem;
					CharArr[i][12]+= GLitem;
					rply.text = '喔喔！是高等獎勵欸，恭喜！\
							\n你獲得了' + GSitem + '個公會素材(小)\
							\n你獲得了' + GMitem + '個公會素材(中)\
							\n你獲得了' + GLitem + '個公會素材(大)';

				}

			}else if (temp <=P){
				if(day == 0){
					WSitem = rollbase.Dice(90)+10;
					WMitem = rollbase.Dice(20);
					WLitem = rollbase.Dice(10);
					CharArr[i][7]+= WSitem;
					CharArr[i][8]+= WMitem;
					CharArr[i][9]+= WLitem;
					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了' + WSitem + '個武器素材(小)\
							\n你獲得了' + WMitem + '個武器素材(中)\
							\n你獲得了' + WLitem + '個武器素材(大)';

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
					Gold =1000;

					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了1000G';

				}else if(day ==6){
					GSitem = rollbase.Dice(90)+10;
					GMitem = rollbase.Dice(30);
					GLitem = rollbase.Dice(20);
					CharArr[i][10]+= GSitem;
					CharArr[i][11]+= GMitem;
					CharArr[i][12]+= GLitem;
					rply.text = '太棒了！！！是頂級獎勵！恭喜！\
							\n你獲得了' + GSitem + '個公會素材(小)\
							\n你獲得了' + GMitem + '個公會素材(中)\
							\n你獲得了' + GLitem + '個公會素材(大)';

				}
			}
			
			if(test =='測試'){
				PlayerData.ArrayUpdate()
				ArrayUpdate();
				rply.text+='\n測試而已沒有儲存';
				return rply;
			}else{
				DB.useServiceAccountAuth(creds, function (err) {
		
					DB.getRows(1 , 
						function (err, rows) {
							if (err) {
								console.log( err );
							}else{
								rows[i].Gold += Gold;
								rows[i].MiraStone = CharArr[i][3];
								rows[i].WmaterialS = WSitem;
								rows[i].WmaterialM = WMitem;
								rows[i].WmaterialL = WLitem;
								rows[i].GmaterialS = GSitem;
								rows[i].GmaterialM = GMitem;
								rows[i].GmaterialL = GLitem;
								rows[i].save();

							}
						});
				});
			}
			
			
		}
		
	
	}
	
	console.log(rply.text);
	return rply;

	
}


module.exports = {
	main
};
