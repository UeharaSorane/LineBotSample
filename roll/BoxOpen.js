var rollbase = require('./rollbase.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

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
