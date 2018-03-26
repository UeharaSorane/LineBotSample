var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var PlayerData = require('./PlayerData.js');
var BattleStates = require('./BattleStates.js');

var PD = PlayerData.GetArray();

var BattleStatesDataArray = BattleStates.GetArray();

var ShopArr = [[1,'基本能力重置',20],[2,'金幣x10000',10]];


function MiraShop(UserID,Goods,confirm){
	
	
	for(var i = 0; i<PD.length; i++){
		if(PD[i][0] == UserID){
			if(Goods == null){
				rply.text = '奇蹟石商店一覽:\
				\n\n[1] 基本能力重置 20奇蹟石\
                    		\n[2] 金幣x10000 10奇蹟石\
                    		\n 想要購買商品的話，請輸入 奇蹟石 商品名\n 奇蹟石數量: ' + PD[i][3];
				return rply;
			}
			for(var k = 0;k<ShopArr.length;k++){
				if(ShopArr[k][1] == Goods){
					if(PD[i][3]<ShopArr[k][2]){
						rply.text = '錯誤！奇蹟石不足' +(PD[i][3]-ShopArr[k][2]);
						return rply;
					}
					
					if(confirm != '確定'){
						rply.text = '\n[' + ShopArr[k][0] +  '] ' + ShopArr[k][1] + ' -' + ShopArr[k][2] + '奇蹟石\n\
							\n 持有奇蹟石: ' + PD[i][3] + '\
							\n確定購買的話，請輸入 奇蹟石 商品名 確定 完成手續';
						return rply;
					}else{
						if(ShopArr[k][1] == '基本能力重置'){
									BattleStatesDataArray[i][32] = 1;
									BattleStates.saveArray(BattleStatesDataArray);
									
									rply.text = '你成功購買了基本能力重置！請輸入 基本能力分配 hp mp atk 重新分配你的能力';
									return rply;
									
						}else if(ShopArr[k][1] == '金幣x10000'){
							PD[i][7]+=ShopArr[k][2]+=10000;
							
							PlayerData.saveArray(PD);
							rply.text = '你成功購買了金幣x10000！請輸入 玩家情報 進行確認';
						}
							
							
						
					}
				}
				
			}
			rply.text = '錯誤！找不到商品名為' + Goods + '的商品';
			return rply;
		}
	}
	
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;

}


module.exports = {
	MiraShop
};
