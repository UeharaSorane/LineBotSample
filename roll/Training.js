var rply ={type : 'text'}; //type是必需的,但可以更改

///引入其他資料陣列
var BattleStates = require('./BattleStates.js');
var PlayerData = require('./PlayerData.js');

var BattleStatesDataArray = BattleStates.GetArray();
///

function TrainingStates(UserID){
	
	BattleStatesDataArray = BattleStates.GetArray();
	
	for(var i =0; i<BattleStatesDataArray.length;i++){
		if(UserID == BattleStatesDataArray[i][0]){
			rply.text ='玩家 ' + BattleStatesDataArray[i][1] + '的訓練情報:\n\
					\n Hp基本值: ' + BattleStatesDataArray[i][9] + '\
					\n Hp訓練等級: ' + BattleStatesDataArray[i][10] + '(+' + BattleStatesDataArray[i][10]*10 + ')\
					\n Hp總和值: ' + (BattleStatesDataArray[i][9] + BattleStatesDataArray[i][10]*10 + BattleStatesDataArray[i][11] + BattleStatesDataArray[i][12] + BattleStatesDataArray[i][13]) + '\
					\n----------\
					\n Mp基本值: ' + BattleStatesDataArray[i][14] + '\
					\n Mp訓練等級: ' + BattleStatesDataArray[i][15] + '(+' + BattleStatesDataArray[i][15]*5 + ')\
					\n Mp總和值: ' + (BattleStatesDataArray[i][14] + BattleStatesDataArray[i][15]*5 + BattleStatesDataArray[i][16] + BattleStatesDataArray[i][17] + BattleStatesDataArray[i][18]) + '\
					\n----------\
					\n Atk基本值: ' + BattleStatesDataArray[i][19] + '\
					\n Atk訓練等級: ' + BattleStatesDataArray[i][20] + '(+' + BattleStatesDataArray[i][20] + ')\
					\n Atk總和值: ' + (BattleStatesDataArray[i][19] + BattleStatesDataArray[i][20] + BattleStatesDataArray[i][21] + BattleStatesDataArray[i][22] + BattleStatesDataArray[i][23]) + '\
					\n----------\
					\n\
					\n 訓練等級: ' + BattleStatesDataArray[i][31] + '等\
					\n 尚未分配的訓練點數: ' + BattleStatesDataArray[i][30] + '點\
					\n\
					\n 想要分配訓練點數的話，請輸入 訓練點數分配 HP分配點數 Mp分配點數 Atk分配點數 ';
			
			return rply;
			
			
		}
	}
	
	rply.text = '找不到你的角色的戰鬥資料，請向GM確認';
	return rply;

}

function setTrain(UserID,Hp,Mp,Atk){
	BattleStatesDataArray = BattleStates.GetArray();
	
	let HpTemp,MpTemp,AtkTemp;
	
	if(Hp == null) HpTemp = 0;
	else HpTemp = Hp;
	
	if(Mp == null) MpTemp = 0;
	else MpTemp = Mp;
	
	if(Atk == null) AtkTemp = 0;
	else AtkTemp = Atk;
	
	for(var i =0; i<BattleStatesDataArray.length;i++){
		if(UserID == BattleStatesDataArray[i][0]){
			
			if(HpTemp + MpTemp + AtkTemp > BattleStatesDataArray[i][31]){
				rply.text = '錯誤！你的訓練點數不足';
				return rply;
			}
			
			
			
			rply.text ='玩家 ' + BattleStatesDataArray[i][1] + ':\n分配結果\
					\n Hp基本值: ' + BattleStatesDataArray[i][9] + '\
					\n Hp訓練等級: ' + BattleStatesDataArray[i][10] + '(+' + BattleStatesDataArray[i][10]*10 + ') -> ' + HpTemp + '(+' + HpTemp*10 + ')\
					\n Hp總和值: ' + (BattleStatesDataArray[i][9] + BattleStatesDataArray[i][10]*10 + BattleStatesDataArray[i][11] + BattleStatesDataArray[i][12] + BattleStatesDataArray[i][13])
						+ ' -> ' + (BattleStatesDataArray[i][9] + HpTemp*10 + BattleStatesDataArray[i][11] + BattleStatesDataArray[i][12] + BattleStatesDataArray[i][13]) + '\
					\n----------\
					\n Mp基本值: ' + BattleStatesDataArray[i][14] + '\
					\n Mp訓練等級: ' + BattleStatesDataArray[i][15] + '(+' + BattleStatesDataArray[i][15]*5 + ') -> ' + MpTemp + '(+' + MpTemp*5 + ')\
					\n Mp總和值: ' + (BattleStatesDataArray[i][14] + BattleStatesDataArray[i][15]*5 + BattleStatesDataArray[i][16] + BattleStatesDataArray[i][17] + BattleStatesDataArray[i][18])
						+ ' -> ' + (BattleStatesDataArray[i][14] + MpTemp*5 + BattleStatesDataArray[i][16] + BattleStatesDataArray[i][17] + BattleStatesDataArray[i][18]) + '\
					\n----------\
					\n Atk基本值: ' + BattleStatesDataArray[i][19] + '\
					\n Atk訓練等級: ' + BattleStatesDataArray[i][20] + '(+' + BattleStatesDataArray[i][20] + ') -> ' + AtkTemp + '(+' + AtkTemp + ')\
					\n Atk總和值: ' + (BattleStatesDataArray[i][19] + BattleStatesDataArray[i][20] + BattleStatesDataArray[i][21] + BattleStatesDataArray[i][22] + BattleStatesDataArray[i][23])
						+ ' -> ' + (BattleStatesDataArray[i][19] + AtkTemp + BattleStatesDataArray[i][21] + BattleStatesDataArray[i][22] + BattleStatesDataArray[i][23]) + '\
					\n----------\
					\n\
					\n 訓練等級: ' + BattleStatesDataArray[i][31] + '等\
					\n 尚未分配的訓練點數: ' + BattleStatesDataArray[i][30] + '點 -> ' + (BattleStatesDataArray[i][31] - HpTemp - MpTemp - AtkTemp) + '點\
					\n\
					\n --------------';
			
			BattleStatesDataArray[i][10] = HpTemp;
			BattleStatesDataArray[i][15] = MpTemp;
			BattleStatesDataArray[i][20] = AtkTemp;
			BattleStatesDataArray[i][30] = BattleStatesDataArray[i][31] - HpTemp - MpTemp - AtkTemp;
			
			BattleStates.saveArray(BattleStatesDataArray);
			return rply;
			
			
		}
	}
	
	rply.text = '找不到你的角色的戰鬥資料，請向GM確認';
	return rply;
	
	
}


module.exports = {
	TrainingStates,
	setTrain
};
