var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var PlayerData = require('./PlayerData.js');
var WeaponBox = require('./WeaponBox.js');
var BadgeBox = require('./BadgeBox.js');
var MateBox = require('./MateBox.js');
var ItemBox = require('./ItemBox.js');

var PD = PlayerData.GetArray();
var WD = WeaponBox.GetArray();
var AD = require('./AccessoryBox.js').GetArray();
var BD = BadgeBox.GetArray();
var MD = MateBox.GetArray();


var ShopDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var ShopArr= [];

ShopDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	ShopDB.getRows(18 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					ShopArr[i] = [];
					
					ShopArr[i][0] = rows[i].goodid;
					ShopArr[i][1] = rows[i].name;
					ShopArr[i][2] = rows[i].type;
					ShopArr[i][3] = Number(rows[i].cost);
					ShopArr[i][4] = rows[i].weapon;
					ShopArr[i][5] = rows[i].accessory;
					ShopArr[i][6] = rows[i].badge;
					ShopArr[i][7] = rows[i].mate;
					ShopArr[i][8] = rows[i].item;
					ShopArr[i][9] = Number(rows[i].WMS);
					ShopArr[i][10] = Number(rows[i].WMM);
					ShopArr[i][11] = Number(rows[i].WML);
					ShopArr[i][12] = Number(rows[i].GMS);
					ShopArr[i][13] = Number(rows[i].GMM);
					ShopArr[i][14] = Number(rows[i].GMM);
					ShopArr[i][15] = rows[i].gdescription;
					
				}
				//console.log(ShopArr);
				console.log('夥伴商店資料 讀取完成');
			}
		

			
			});
	
		
		
	});

function MateShop(UserID,Goods,confirm){
	
	
	for(var i = 0; i<PD.length; i++){
		if(PD[i][0] == UserID){
			if(Goods == null){
				rply.text = '特殊夥伴商店一覽:\n';
				for(var j = 0 ;j<ShopArr.length;j++){
					rply.text += '\n[' + ShopArr[j][0] +  '] ' + ShopArr[j][1] + ' (' + ShopArr[j][2] + ') -' + ShopArr[j][3] + '夥伴碎片\n\
							\n' + ShopArr[j][15] + '\n';
				}
				
				rply.text += '\n 持有夥伴碎片: ' + PD[i][13] + '\
						\n想要購買商品的話，請輸入 夥伴商店 道具名';
				return rply;
			}
			for(var k = 0;k<ShopArr.length;k++){
				if(ShopArr[k][1] == Goods){
					if(PD[i][13]<ShopArr[k][3]){
						rply.text = '錯誤！夥伴碎片不足' +(PD[i][13]-ShopArr[k][3]);
						return rply;
					}
					
					if(confirm != '確定'){
						rply.text = '\n[' + ShopArr[k][0] +  '] ' + ShopArr[k][1] + ' (' + ShopArr[k][2] + ') -' + ShopArr[k][3] + '夥伴碎片\n\
							\n' + ShopArr[k][15] + '\n\
							\n 持有夥伴碎片: ' + PD[i][13] + '\
							\n確定購買的話，請輸入 夥伴商店 道具名 確定 完成手續';
						return rply;
					}else{
						if(ShopArr[k][2] == '武器'){
							for(var l = 0;l<WD.length;l++){
								if(WD[l][0] == UserID){
									for(var m =0;m<WD[l][2].length; m++){
										if(WD[l][m] == Goods){
											rply.text = '錯誤！你已經擁有' + Goods + '了';
											return rply;
										}
									}
									WD.getWeapon(UserID,Goods);
								}
							}
						}else if(ShopArr[k][2] == '飾品'){
							for(var l = 0;l<AD.length;l++){
								if(AD[l][0] == UserID){
									for(var m =0;m<AD[l][2].length; m++){
										if(AD[l][2][m] == Goods){
											rply.text = '錯誤！你已經擁有' + Goods + '了';
											return rply;
										}
									}
									require('./AccessoryBox.js').getAcce(UserID,Goods);
								}
							}
						}else if(ShopArr[k][2] == '紋章'){
							for(var l = 0;l<BD.length;l++){
								if(BD[l][0] == UserID){
									for(var m =0;m<BD[l][2].length; m++){
										if(BD[l][2][m] == Goods){
											rply.text = '錯誤！你已經擁有' + Goods + '了';
											return rply;
										}
									}
									BadgeBox.getBadge(UserID,Goods);
								}
							}
						}else if(ShopArr[k][2] == '夥伴'){
							for(var l = 0;l<MD.length;l++){
								if(MD[l][0] == UserID){
									for(var m =0;m<MD[l][2].length; m++){
										if(MD[l][2][m] == Goods){
											rply.text = '錯誤！你已經擁有' + Goods + '了';
											return rply;
										}
									}
									let Temp = [Goods];
									MateBox.getMate(UserID,Temp);
								}
							}
						}else if(ShopArr[k][2] == '道具'){
							ItemBox.getItem(UserID,Goods);
						}else if(ShopArr[k][2] == '素材'){
							PD[i][7]+=ShopArr[k][9];
							PD[i][8]+=ShopArr[k][10];
							PD[i][9]+=ShopArr[k][11];
							PD[i][10]+=ShopArr[k][12];
							PD[i][11]+=ShopArr[k][13];
							PD[i][12]+=ShopArr[k][14];
						}
						
						PD[i][13]-=ShopArr[k][3];
						PlayerData.saveArray(PD);
						
						rply.text = '你成功購買了' + Goods + '！';
						return rply;
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
	MateShop
};
