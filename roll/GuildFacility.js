var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var Guild = require('./Guild.js');
var PlayerData = require('./PlayerData.js');
var WB = require('./WeaponBox.js');
var BB = require('./BadgeBox.js');
var MB = require('./MateBox.js');
var IB = require('./ItemBox.js');

var PB = PlayerData.GetArray();
var GB = Guild.GetArray();


var CharArr= [];

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(22 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].guildid;
					CharArr[i][1] = rows[i].guildname;
					CharArr[i][2] = Number(rows[i].trainlv);
					CharArr[i][3] = Number(rows[i].factorylv);
					CharArr[i][4] = Number(rows[i].shoplv);
					CharArr[i][5] = Number(rows[i].restaurantlv);
				  	CharArr[i][6] = Number(rows[i].warehouselv);
					CharArr[i][7] = Number(rows[i].wms);
					CharArr[i][8] = Number(rows[i].wmm);
					CharArr[i][9] = Number(rows[i].wml);
					CharArr[i][10] = Number(rows[i].gms);
					CharArr[i][11] = Number(rows[i].gmm);
					CharArr[i][12] = Number(rows[i].gml);
					CharArr[i][13] = Number(rows[i].gold);
					CharArr[i][14] = Number(rows[i].mirastone);

					
				}
				//console.log(CharArr);
				console.log('公會設施資料 讀取完成');
				//console.log();
			}
		

			
			});
	
		
		
	});

var needWM = 
[
	[[30,15,5,500],[40,20,6,600],[70,30,11,1100],[170,80,31,3600]],
 
	[[10,5,1,100],[30,10,5,500],[100,50,20,2500]],
 
	[[5,0,0],[10,5,0],[15,5,1],[50,25,10]]

];

var needGM = 
[
	[1000,500,50,1000],
	[1500,1000,100,5000],
	[3000,2000,300,10000],
	[5000,2500,50,50000]
];



function ArrayUpdate() {

	DB.useServiceAccountAuth(creds, function (err) {



	 // Get all of the rows from the spreadsheet.
		DB.getRows(22 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{

					for(var i=0; i< CharArr.length; i++){

						rows[i].guildid = CharArr[i][0];
						rows[i].guildname = CharArr[i][1];
						rows[i].trainlv = CharArr[i][2];
						rows[i].factorylv = CharArr[i][3];
						rows[i].shoplv = CharArr[i][4];
						rows[i].restaurantlv = CharArr[i][5];
						rows[i].warehouselv = CharArr[i][6];
						rows[i].wms = CharArr[i][7];
						rows[i].wmm = CharArr[i][8];
						rows[i].wml = CharArr[i][9];
						rows[i].gms = CharArr[i][10];
						rows[i].gmm = CharArr[i][11];
						rows[i].gml = CharArr[i][12];
						rows[i].gold = CharArr[i][13];
						rows[i].mirastone = CharArr[i][14];
						rows[i].save();
						

					}

				}
				console.log('公會設施資料 更新完成');
			});

	});
	
}

function GuildCheck(UserID,command,facility,confirm){
	for(var i = 0;i <PB.length;i++){
		if(PB[i][0] == UserID){
			if(PB[i][14] == '輔導公會'){
				if(command == null){
					rply.text = '這是輔導公會的設施情報:\
						\n-----設施等級一覽-----\
						\n 訓練房: 1等\
						\n 煉金工坊: 1等\
						\n 公會商店: 1等\
						\n 公會餐廳: 1等\
						\n 公會倉庫: 1等\
						\n-----倉庫素材一覽-----\
						\n 無法使用公會倉庫\
						\n\
						\n 想要使用設施，請輸入 公會設施 設施名\
						\n\
						\n 警告:無法升級任何輔導公會的設施';
					return rply;
				}else{
					rply.text = '錯誤！你目前在輔導公會，無法做任何命令';
					return rply;
					
				}
			}
			
			for(var j = 0; j<CharArr.length;j++){
				if(PB[i][14] == CharArr[j][1]){
					if(command == null){
						rply.text = '這是你目前所處公會設施情報:\
								\n 公會名: ' + CharArr[j][1] + '\
								\n-----設施等級一覽-----\
								\n 訓練房: ' + CharArr[j][2] + '等\
								\n 煉金工坊: ' + CharArr[j][3] + '等\
								\n 公會商店: ' + CharArr[j][4] + '等\
								\n 公會餐廳: ' + CharArr[j][5] + '等\
								\n 公會倉庫: ' + CharArr[j][6] + '等\
								\n-----倉庫素材一覽-----\
								\n 武器素材(小): ' + CharArr[j][7] + '\
								\n 武器素材(中): ' + CharArr[j][8] + '\
								\n 武器素材(大): ' + CharArr[j][9] + '\
								\n 公會素材(小): ' + CharArr[j][10] + '\
								\n 公會素材(中): ' + CharArr[j][11] + '\
								\n 公會素材(大): ' + CharArr[j][12] + '\
								\n 金幣: ' + CharArr[j][13] + 'G\
								\n 奇蹟石: ' + CharArr[j][14] + '個\
								\n\
								\n 想要使用設施，請輸入 設施名';
						for(var k = 0;k<GB.length;k++){
							if(CharArr[j][1] == GB[k][1]){
								if(UserID == GB[k][2][0]){
									rply.text+='\n 想要升級公會設施，請輸入 公會設施 升級 設施名';
									return rply;
								}
								
								return rply;
							}
						}
						rply.text = '嚴重錯誤！發現無基本資料的公會，請找GM確認';
			
						return rply;
						
					}else if(command == '升級'){
						let fancilityN = 0;
						
						for(var k = 0;k<GB.length;k++){
							if(CharArr[j][1] == GB[k][1]){
								if(UserID == GB[k][2][0]){
									if(facility == null){
										rply.text = '這是你目前所處公會設施情報:\
												\n 公會名: ' + CharArr[j][1] + '\
												\n-----設施等級一覽-----\
												\n 1 訓練房: ' + CharArr[j][2] + '等\
												\n 2 煉金工坊: ' + CharArr[j][3] + '等\
												\n 3 公會商店: ' + CharArr[j][4] + '等\
												\n 4 公會餐廳: ' + CharArr[j][5] + '等\
												\n 5 公會倉庫: ' + CharArr[j][6] + '等\
												\n\
												\n 請輸入 公會設施 升級 想要升級的設施名(編號)';
										return rply;
									}else{
										if(facility == 1||facility == '訓練房') fancilityN = 2;
										else if(facility == 2||facility == '煉金工坊') fancilityN = 3;
										else if(facility == 3||facility == '公會商店') fancilityN = 4;
										else if(facility == 4||facility == '公會餐廳') fancilityN = 5;
										else if(facility == 5||facility == '公會倉庫') fancilityN = 6;
										else{
											rply.text = '錯誤！沒有名稱或編號為 ' + facility + '的設施';
											return rply;
										}
										
										if(confirm != '確定'){
											let NameT;
											if(fancilityN == 2) NameT = '訓練房';
											else if(fancilityN == 3) NameT = '煉金工坊';
											else if(fancilityN == 4) NameT = '公會商店';
											else if(fancilityN == 5) NameT = '公會餐廳';
											else if(fancilityN == 6) NameT = '公會倉庫';
											
											rply.text = '公會設施 ' + NameT + '\
													\n 目前等級: ' + CharArr[j][fancilityN] + '等';
													
											if(CharArr[j][fancilityN] == 5){
												rply.text += '\n 等級以達到上限，不必再升級了';
												
												return rply;
											}else{
												rply.text+= '\n 升級至' + (CharArr[j][fancilityN] + 1) + '等\
														\n 需要以下公會素材:\
														\n 公會素材(小): ' + needGM[CharArr[j][fancilityN]-1][0] + '\
														\n 公會素材(中): ' + needGM[CharArr[j][fancilityN]-1][1] + '\
														\n 公會素材(大): ' + needGM[CharArr[j][fancilityN]-1][2] + '\
														\n 金幣: ' + needGM[CharArr[j][fancilityN]-1][3] + '\
														\n 確定要升級的話，請輸入\
														\n 公會設施 升級 設施名 確定';
												return rply;
											}
											
										}else{
											if(CharArr[j][10] < needGM[CharArr[j][fancilityN]-1][0]){
												rply.text = '錯誤！倉庫裡的公會素材(小)不足(' + (CharArr[j][10] - needGM[CharArr[j][fancilityN]-1][0]) + ')';
												return rply;
											}else if(CharArr[j][11] < needGM[CharArr[j][fancilityN]-1][1]){
												rply.text = '錯誤！倉庫裡的公會素材(中)不足(' + (CharArr[j][11] - needGM[CharArr[j][fancilityN]-1][1]) + ')';
												return rply;
											}else if(CharArr[j][12] < needGM[CharArr[j][fancilityN]-1][2]){
												rply.text = '錯誤！倉庫裡的公會素材(大)不足(' + (CharArr[j][12] - needGM[CharArr[j][fancilityN]-1][2]) + ')';
												return rply;
											}else if(CharArr[j][13] < needGM[CharArr[j][fancilityN]-1][3]){
												rply.text = '錯誤！倉庫裡的金幣不足(' + (CharArr[j][13] - needGM[CharArr[j][fancilityN]-1][3]) + 'G)';
												return rply;
											}else{
												CharArr[j][10] -= needGM[CharArr[j][fancilityN]-1][0];
												CharArr[j][11] -= needGM[CharArr[j][fancilityN]-1][1];
												CharArr[j][12] -= needGM[CharArr[j][fancilityN]-1][2];
												CharArr[j][13] -= needGM[CharArr[j][fancilityN]-1][3];
												CharArr[j][fancilityN]++;
												
												ArrayUpdate();
												rply.text = '升級成功！';
												return rply;
												
												
											}
											
										}
										 
									}

								}
								rply.text='\n 只有會長才能升級設施喔';
								return rply;
							}
						}
						rply.text = '嚴重錯誤！發現無基本資料的公會，請找GM確認';
			
						return rply;
						
					}else{
						rply.text = '錯誤！沒有 ' + command + '的指令';
						return rply;

					}
				}
			}
			rply.text = '嚴重錯誤！發現無資料的公會，請找GM確認';
			
			return rply;
			
		}
	}
	
	rply.text = '錯誤！此LINE帳號尚未持有角色';
			
	return rply;
	
}

function Warehouse(UserID,command,type,NumberA){
	var number = Number(NumberA);
	
	for(var i = 0;i <PB.length;i++){
		if(PB[i][0] == UserID){
			if(PB[i][14] == '輔導公會'){
				rply.text = '錯誤！輔導公會是不能使用公會倉庫的';
				return rply;
			}
			
			for(var j = 0; j<CharArr.length;j++){
				if(PB[i][14] == CharArr[j][1]){
					if(command == null){
						rply.text = '這是你目前所處公會的倉庫情報:\
								\n 公會名: ' + CharArr[j][1] + '\
								\n 倉庫等級: ' + CharArr[j][6] + '等\
								\n-----倉庫素材一覽-----\
								\n 1 武器素材(小): ' + CharArr[j][7] + '\
								\n 2 武器素材(中): ' + CharArr[j][8] + '\
								\n 3 武器素材(大): ' + CharArr[j][9] + '\
								\n 4 公會素材(小): ' + CharArr[j][10] + '\
								\n 5 公會素材(中): ' + CharArr[j][11] + '\
								\n 6 公會素材(大): ' + CharArr[j][12] + '\
								\n 7 金幣: ' + CharArr[j][13] + 'G\
								\n 8 奇蹟石: ' + CharArr[j][14] + '個\
								\n\
								\n 想要儲放素材，請輸入 公會倉庫 儲放 素材名(編號) 數量';
						return rply;
					}else if(command == '儲放'){
						if(type == null){
							rply.text = '請輸入想要儲放的素材';
							return rply;
						}
						
						if(number == null){
							rply.text = '請輸入想要儲放的數量';
							return rply;
						}else if(isNaN(number)){
							rply.text = '請輸入阿拉伯半形數字';
							return rply;
						}else if(number<=0 || number%1 != 0){
							rply.text = '請輸入有效的數字(大於0的正整數)';
							return rply;
						}
						
						
						if(type == '武器素材(小)'||type == 1){
							if(number>PB[i][7]){
								rply.text = '持有素材不足(' + (PB[i][7]-number) + ')';
								return rply;
							}else{
								PB[i][7]-=number;
								CharArr[j][7]+=number;
								
								rply.text = '儲放成功';
								
								if(CharArr[j][6] == 1&&CharArr[j][7] > 1000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][7] - 1000) + '個素材進行歸還';
									PB[i][7]+=CharArr[j][7]-1000;
									CharArr[j][7] = 1000;
										
								}else if(CharArr[j][6] == 2&&CharArr[j][7] > 2000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][7] - 2000) + '個素材進行歸還';
									PB[i][7]+=CharArr[j][7]-2000;
									CharArr[j][7] = 2000;
										
								}else if(CharArr[j][6] == 3&&CharArr[j][7] > 3000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][7] - 3000) + '個素材進行歸還';
									PB[i][7]+=CharArr[j][7]-3000;
									CharArr[j][7] = 3000;
										
								}else if(CharArr[j][6] == 4&&CharArr[j][7] > 5000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][7] - 5000) + '個素材進行歸還';
									PB[i][7]+=CharArr[j][7]-5000;
									CharArr[j][7] = 5000;
										
								}else if(CharArr[j][6] == 5&&CharArr[j][7] > 10000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][7] - 10000) + '個素材進行歸還';
									PB[i][7]+=CharArr[j][7]-10000;
									CharArr[j][7] = 10000;
										
								}
								
								ArrayUpdate();
								PlayerData.saveArray(PB);
								
								return rply;
							}
							
						}else if(type == '武器素材(中)'||type == 2){
							if(number>PB[i][8]){
								rply.text = '持有素材不足(' + (PB[i][8]-number) + ')';
								return rply;
							}else{
								PB[i][8]-=number;
								CharArr[j][8]+=number;
								
								rply.text = '儲放成功';
								
								if(CharArr[j][6] == 1&&CharArr[j][8] > 1000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][8] - 1000) + '個素材進行歸還';
									PB[i][8]+=CharArr[j][8]-1000;
									CharArr[j][8] = 1000;
										
								}else if(CharArr[j][6] == 2&&CharArr[j][8] > 2000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][8] - 2000) + '個素材進行歸還';
									PB[i][8]+=CharArr[j][8]-2000;
									CharArr[j][8] = 2000;
										
								}else if(CharArr[j][6] == 3&&CharArr[j][8] > 3000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][8] - 3000) + '個素材進行歸還';
									PB[i][8]+=CharArr[j][8]-3000;
									CharArr[j][8] = 3000;
										
								}else if(CharArr[j][6] == 4&&CharArr[j][8] > 5000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][8] - 5000) + '個素材進行歸還';
									PB[i][8]+=CharArr[j][8]-5000;
									CharArr[j][8] = 5000;
										
								}else if(CharArr[j][6] == 5&&CharArr[j][8] > 10000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][8] - 10000) + '個素材進行歸還';
									PB[i][8]+=CharArr[j][8]-10000;
									CharArr[j][8] = 10000;
										
								}
								
								ArrayUpdate();
								PlayerData.saveArray(PB);
								return rply;
							}
							
						}else if(type == '武器素材(大)'||type == 3){
							if(number>PB[i][9]){
								rply.text = '持有素材不足(' + (PB[i][9]-number) + ')';
								return rply;
							}else{
								PB[i][9]-=number;
								CharArr[j][9]+=number;
								
								rply.text = '儲放成功';
								
								if(CharArr[j][6] == 1&&CharArr[j][9] > 1000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][9] - 1000) + '個素材進行歸還';
									PB[i][9]+=CharArr[j][9]-1000;
									CharArr[j][9] = 1000;
										
								}else if(CharArr[j][6] == 2&&CharArr[j][9] > 2000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][9] - 2000) + '個素材進行歸還';
									PB[i][9]+=CharArr[j][9]-2000;
									CharArr[j][9] = 2000;
										
								}else if(CharArr[j][6] == 3&&CharArr[j][9] > 3000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][9] - 3000) + '個素材進行歸還';
									PB[i][9]+=CharArr[j][9]-3000;
									CharArr[j][9] = 3000;
										
								}else if(CharArr[j][6] == 4&&CharArr[j][9] > 5000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][9] - 5000) + '個素材進行歸還';
									PB[i][9]+=CharArr[j][9]-5000;
									CharArr[j][9] = 5000;
										
								}else if(CharArr[j][6] == 5&&CharArr[j][9] > 10000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][9] - 10000) + '個素材進行歸還';
									PB[i][9]+=CharArr[j][9]-10000;
									CharArr[j][9] = 10000;
								}
								
								ArrayUpdate();
								PlayerData.saveArray(PB);
								return rply;
							}
							
						}else if(type == '公會素材(小)'||type == 4){
							if(number>PB[i][10]){
								rply.text = '持有素材不足(' + (PB[i][10]-number) + ')';
								return rply;
							}else{
								PB[i][10]-=number;
								CharArr[j][10]+=number;
								
								rply.text = '儲放成功';
								
								if(CharArr[j][6] == 1&&CharArr[j][10] > 1000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][10] - 1000) + '個素材進行歸還';
									PB[i][10]+=CharArr[j][10]-1000;
									CharArr[j][10] = 1000;
										
								}else if(CharArr[j][6] == 2&&CharArr[j][10] > 2000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][10] - 2000) + '個素材進行歸還';
									PB[i][10]+=CharArr[j][10]-2000;
									CharArr[j][10] = 2000;
										
								}else if(CharArr[j][6] == 3&&CharArr[j][10] > 3000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][10] - 3000) + '個素材進行歸還';
									PB[i][10]+=CharArr[j][10]-3000;
									CharArr[j][10] = 3000;
										
								}else if(CharArr[j][6] == 4&&CharArr[j][10] > 5000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][10] - 5000) + '個素材進行歸還';
									PB[i][10]+=CharArr[j][10]-5000;
									CharArr[j][10] = 5000;
										
								}else if(CharArr[j][6] == 5&&CharArr[j][10] > 10000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][10] - 10000) + '個素材進行歸還';
									PB[i][10]+=CharArr[j][10]-10000;
									CharArr[j][10] = 10000;
								}
								
								ArrayUpdate();
								PlayerData.saveArray(PB);
								return rply;
							}
							
						}else if(type == '公會素材(中)'||type == 5){
							if(number>PB[i][11]){
								rply.text = '持有素材不足(' + (PB[i][11]-number) + ')';
								return rply;
							}else{
								PB[i][11]-=number;
								CharArr[j][11]+=number;
								
								rply.text = '儲放成功';
								
								if(CharArr[j][6] == 1&&CharArr[j][11] > 1000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][11] - 1000) + '個素材進行歸還';
									PB[i][11]+=CharArr[j][11]-1000;
									CharArr[j][11] = 1000;
										
								}else if(CharArr[j][6] == 2&&CharArr[j][11] > 2000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][11] - 2000) + '個素材進行歸還';
									PB[i][11]+=CharArr[j][11]-2000;
									CharArr[j][11] = 2000;
										
								}else if(CharArr[j][6] == 3&&CharArr[j][11] > 3000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][11] - 3000) + '個素材進行歸還';
									PB[i][11]+=CharArr[j][11]-3000;
									CharArr[j][11] = 3000;
										
								}else if(CharArr[j][6] == 4&&CharArr[j][11] > 5000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][11] - 5000) + '個素材進行歸還';
									PB[i][11]+=CharArr[j][11]-5000;
									CharArr[j][11] = 5000;
										
								}else if(CharArr[j][6] == 5&&CharArr[j][11] > 10000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][11] - 10000) + '個素材進行歸還';
									PB[i][11]+=CharArr[j][11]-10000;
									CharArr[j][11] = 10000;
								}
								
								ArrayUpdate();
								PlayerData.saveArray(PB);
								return rply;
							}
							
						}else if(type == '公會素材(大)'||type == 6){
							if(number>PB[i][12]){
								rply.text = '持有素材不足(' + (PB[i][12]-number) + ')';
								return rply;
							}else{
								PB[i][12]-=number;
								CharArr[j][12]+=number;
								
								rply.text = '儲放成功';
								
								if(CharArr[j][6] == 1&&CharArr[j][12] > 1000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][12] - 1000) + '個素材進行歸還';
									PB[i][12]+=CharArr[j][12]-1000;
									CharArr[j][12] = 1000;
										
								}else if(CharArr[j][6] == 2&&CharArr[j][12] > 2000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][12] - 2000) + '個素材進行歸還';
									PB[i][12]+=CharArr[j][12]-2000;
									CharArr[j][12] = 2000;
										
								}else if(CharArr[j][6] == 3&&CharArr[j][12] > 3000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][12] - 3000) + '個素材進行歸還';
									PB[i][12]+=CharArr[j][12]-3000;
									CharArr[j][12] = 3000;
										
								}else if(CharArr[j][6] == 4&&CharArr[j][12] > 5000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][12] - 5000) + '個素材進行歸還';
									PB[i][12]+=CharArr[j][12]-5000;
									CharArr[j][12] = 5000;
										
								}else if(CharArr[j][6] == 5&&CharArr[j][12] > 10000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][12] - 10000) + '個素材進行歸還';
									PB[i][12]+=CharArr[j][12]-10000;
									CharArr[j][12] = 10000;
								}
								
								ArrayUpdate();
								PlayerData.saveArray(PB);
								return rply;
							}
							
						}else if(type == '金幣'||type == 7){
							if(number>PB[i][2]){
								rply.text = '持有金幣不足(' + (PB[i][2]-number) + ')';
								return rply;
							}else{
								PB[i][2]-=number;
								CharArr[j][13]+=number;
								
								rply.text = '儲放成功';
								
								if(CharArr[j][6] == 1&&CharArr[j][13] > 10000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][13] - 10000) + 'G金幣進行歸還';
									PB[i][2]+=CharArr[j][13]-10000;
									CharArr[j][13] = 10000;
										
								}else if(CharArr[j][6] == 2&&CharArr[j][13] > 1500000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][13] - 1500000) + 'G金幣進行歸還';
									PB[i][2]+=CharArr[j][13]-1500000;
									CharArr[j][13] = 1500000;
										
								}else if(CharArr[j][6] == 3&&CharArr[j][13] > 100000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][13] - 100000) + 'G金幣進行歸還';
									PB[i][2]+=CharArr[j][13]-100000;
									CharArr[j][13] = 100000;
										
								}else if(CharArr[j][6] == 4&&CharArr[j][13] > 150000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][13] - 150000) + 'G金幣進行歸還';
									PB[i][2]+=CharArr[j][13]-150000;
									CharArr[j][13] = 150000;
										
								}else if(CharArr[j][6] == 5&&CharArr[j][13] > 200000){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][13] - 200000) + 'G金幣進行歸還';
									PB[i][2]+=CharArr[j][13]-200000;
									CharArr[j][13] = 200000;
								}
								
								ArrayUpdate();
								PlayerData.saveArray(PB);
								return rply;
							}
							
						}else if(type == '奇蹟石'||type == 8){
							if(CharArr[j][6] < 4){
								rply.text = '\n 設施等級不足，無法儲存奇蹟石';
								return rply;

							}
							
							if(number>PB[i][3]){
								rply.text = '持有奇蹟石不足(' + (PB[i][3]-number) + ')';
								return rply;
							}else{
								PB[i][3]-=number;
								CharArr[j][14]+=number;
								
								rply.text = '儲放成功';
								
								if(CharArr[j][6] == 4&&CharArr[j][14] > 100){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][14] - 100) + '個奇蹟石進行歸還';
									PB[i][3]+=CharArr[j][14]-100;
									CharArr[j][14] = 100;
										
								}else if(CharArr[j][6] == 5&&CharArr[j][14] > 500){
									rply.text += '\n 警告，已達儲放上限，將超過的' + (CharArr[j][14] - 500) + '個奇蹟石進行歸還';
									PB[i][3]+=CharArr[j][14]-500;
									CharArr[j][14] = 500;
									
								}
								
								ArrayUpdate();
								PlayerData.saveArray(PB);
								return rply;
							}
							
						}else{
							rply.text = '錯誤！沒有 ' + type + '的素材';
							return rply;
						}
					}else{
						
						rply.text = '錯誤！沒有 ' + command + '的指令';
						return rply;
					}		
				}
			}
			rply.text = '嚴重錯誤！發現無資料的公會，請找GM確認';
			
			return rply;
			
		}
	}
	
	rply.text = '錯誤！此LINE帳號尚未持有角色';
			
	return rply;
}

module.exports = {
	ArrayUpdate,
	GuildCheck,
	Warehouse
};
