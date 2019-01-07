var rply = [];

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('1hwFlTrJ7JHeWMLbHmfg7LP7f13OfAoMebF6HIkHpHPs');
var ChaIm= [];
var ChaQua= [];

var skilllist = ['會計','人類學','估價','考古','魅惑','攀爬','電腦使用','信用評級','喬裝','閃避','自動車駕駛',
		 '電器維修','電子學','話術','急救','歷史','威嚇','跳躍','法律','圖書館使用','聆聽','鎖匠',
		 '機械維修','醫學','自然學','導航','神祕學','操作重機具','說服','心理學','心理分析',
		 '巧手','偵查','隱密行動','游泳','投擲','追蹤'];

var ChaSki= [];
var ChaWea= [];
var ChaItem= [];
var AccessDB= [];
var GetOldCha = [[]];
var GetOldChaN = 0;

DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(2 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					ChaIm[i] = [];
					
					ChaIm[i][0] = rows[i].chaid;
					ChaIm[i][1] = rows[i].chaname;
					ChaIm[i][2] = rows[i].plname;
					ChaIm[i][3] = rows[i].age;
					ChaIm[i][4] = rows[i].class;
					ChaIm[i][5] = rows[i].sex;
					ChaIm[i][6] = rows[i].born;
					ChaIm[i][7] = rows[i].live;
					ChaIm[i][8] = Number(rows[i].maxhp);
					ChaIm[i][9] = Number(rows[i].hp);
					ChaIm[i][10] = Number(rows[i].maxmp);
					ChaIm[i][11] = Number(rows[i].mp);
					ChaIm[i][12] = Number(rows[i].startsan);
					ChaIm[i][13] = Number(rows[i].san);
					ChaIm[i][14] = Number(rows[i].completes);
					
					
				}
				//console.log('角色基本資料 讀取完成');
			}	
		});
	
	DB.getRows(3 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					ChaQua[i] = [];
					
					ChaQua[i][0] = rows[i].chaname;
					ChaQua[i][1] = Number(rows[i].str);
					ChaQua[i][2] = Number(rows[i].dex);
					ChaQua[i][3] = Number(rows[i].con);
					ChaQua[i][4] = Number(rows[i].app);
					ChaQua[i][5] = Number(rows[i].pow);
					ChaQua[i][6] = Number(rows[i].int);
					ChaQua[i][7] = Number(rows[i].edu);
					ChaQua[i][8] = Number(rows[i].siz);
					ChaQua[i][9] = Number(rows[i].mov);
					ChaQua[i][10] = Number(rows[i].idea);
					ChaQua[i][11] = Number(rows[i].know);
					ChaQua[i][12] = Number(rows[i].luk);
					
				}
				//console.log(ChaQua);
				console.log('角色素質資料 讀取完成');
			}	
		});
	
	DB.getRows(4 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					ChaSki[i] = [];
					
					ChaSki[i][0] = rows[i].chaname;
					ChaSki[i][1] = rows[i].default.split(',');
					for(var De = 0;De<ChaSki[i][1].length;De++){
						ChaSki[i][1][De] = Number(ChaSki[i][1][De]);
					}
					ChaSki[i][2] = rows[i].classp.split(',');
					for(var De = 0;De<ChaSki[i][2].length;De++){
						ChaSki[i][2][De] = Number(ChaSki[i][2][De]);
					}
					ChaSki[i][3] = rows[i].interestp.split(',');
					for(var De = 0;De<ChaSki[i][3].length;De++){
						ChaSki[i][3][De] = Number(ChaSki[i][3][De]);
					}
					ChaSki[i][4] = rows[i].skillupp.split(',');
					for(var De = 0;De<ChaSki[i][4].length;De++){
						ChaSki[i][4][De] = Number(ChaSki[i][4][De]);
					}
					ChaSki[i][5] = rows[i].createst.split(',');
					
					ChaSki[i][6] = rows[i].createsde.split(',');
					for(var De = 0;De<ChaSki[i][6].length;De++){
						ChaSki[i][6][De] = Number(ChaSki[i][6][De]);
					}
					ChaSki[i][7] = rows[i].createscp.split(',');
					for(var De = 0;De<ChaSki[i][7].length;De++){
						ChaSki[i][7][De] = Number(ChaSki[i][7][De]);
					}
					ChaSki[i][8] = rows[i].createip.split(',');
					for(var De = 0;De<ChaSki[i][8].length;De++){
						ChaSki[i][8][De] = Number(ChaSki[i][8][De]);
					}
					ChaSki[i][9] = rows[i].createupp.split(',');
					for(var De = 0;De<ChaSki[i][9].length;De++){
						ChaSki[i][9][De] = Number(ChaSki[i][9][De]);
					}
					ChaSki[i][10] = Number(rows[i].getclassskillp);
					ChaSki[i][11] = Number(rows[i].classskillp);
					
					ChaSki[i][12] = Number(rows[i].getinterestskillp);
					ChaSki[i][13] = Number(rows[i].interestskillp);
					
					ChaSki[i][14] = rows[i].classskill.split(',');
					ChaSki[i][15] = rows[i].specialskill.split(',');
					ChaSki[i][16] = Number(rows[i].cpoint);
					
				}
				//console.log(ChaSki);
				console.log('角色技能資料 讀取完成');
			}	
		});
	DB.getRows(5 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					ChaWea[i] = [];
					
					ChaWea[i][0] = rows[i].chaname;
					ChaWea[i][1] = rows[i].damagebonus;
					ChaWea[i][2] = rows[i].weaponn.split(',');
					ChaWea[i][3] = rows[i].damage.split(',');
					ChaWea[i][4] = rows[i].dbio.split(',');
					for(var De = 0;De<ChaWea[i][4].length;De++){
						ChaWea[i][4][De] = Number(ChaWea[i][4][De]);
					}
					ChaWea[i][5] = rows[i].debuff.split(',');
					ChaWea[i][6] = rows[i].debufftimes.split(',');
					ChaWea[i][7] = rows[i].range.split(',');
					ChaWea[i][8] = rows[i].turn.split(',');
					ChaWea[i][9] = rows[i].bullet.split(',');
					ChaWea[i][10] = rows[i].broken.split(',');
					for(var De = 0;De<ChaWea[i][10].length;De++){
						ChaWea[i][10][De] = Number(ChaWea[i][10][De]);
					}
				}
				//console.log(ChaWea);
				console.log('角色武器資料 讀取完成');
			}	
		});
	
	DB.getRows(6 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					ChaItem[i] = [];
					
					ChaItem[i][0] = rows[i].chaname;
					ChaItem[i][1] = Number(rows[i].money);
					ChaItem[i][2] = rows[i].item.split(',');
					ChaItem[i][3] = rows[i].spability.split(',');
					ChaItem[i][4] = rows[i].injure.split(',');
					ChaItem[i][5] = rows[i].scary.split(',');
					ChaItem[i][6] = rows[i].spell.split(',');
					ChaItem[i][7] = rows[i].spcreature.split(',');
				}
				//console.log(ChaItem);
				console.log('角色物品資料 讀取完成');
			}	
		});
	
	DB.getRows(7 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					AccessDB[i] = [];
					
					AccessDB[i][0] = rows[i].userid;
					AccessDB[i][1] = rows[i].playern;
					AccessDB[i][2] = rows[i].playcha;
					AccessDB[i][3] = rows[i].havecha.split(',');
					AccessDB[i][4] = rows[i].transkey;
					AccessDB[i][5] = Number(rows[i].transio);
				}
				console.log(AccessDB);
				console.log('帳號連結資料 讀取完成');
			}	
		});
});

function CheckCha(UserID){
	for(var a = 0;a<AccessDB.length;a++){
		if(AccessDB[a][0] == UserID) return AccessDB[a][2];
	}
	return 0;
}

function SwitchCha(UserID,ChaName){
	rply[0] = 'rply';
	
	for(var a = 0;a<AccessDB.length;a++){
		if(AccessDB[a][0] == UserID){
			if(ChaName == null){
				rply[1] = '【COC帳號情報】\
					\n你目前使用的角色:' + AccessDB[a][2] + '\
					\n=====你目前持有的角色=====';
				
				for(var b = 0;b<AccessDB[a][3].length;b++){
					rply[1] += '\n' + AccessDB[a][3][b];
				}
				rply[1] += '\n若想要更換角色，請輸入[角色更換 角色名]即可';
				return rply;
			}else{
				for(var b = 0;b<AccessDB[a][3].length;b++){
					if(AccessDB[a][3][b] == ChaName){
						AccessDB[a][2] = ChaName;
						saveAccessDB(a);
						
						rply[1] = '角色切換完成，你目前使用的角色是:' + ChaName;
						return rply;
					}
				}
				rply[1] = '錯誤!你不持有此角色或是不存在此角色';
				return rply;
			}
		}
	}
	rply[1] = '你尚未持有CoC角色';
	return rply;
}

function GetOldChaStep(UserID,command){
	console.log(GetOldCha);
	
	rply[0] = 'rply';
	var workID = -1;
	var GOCL = GetOldCha.length;
	
	for(var a = 0;a<GetOldCha.length;a++){
		if(GetOldCha[a][0] == UserID){
			workID = a;
			break;
		}
	}
	if(workID == -1){
		GetOldCha[GOCL] = [];
		GetOldCha[GOCL][0] = UserID;
		GetOldCha[GOCL][1] = [0,0];
		workID = GOCL;
	}
	switch(GetOldCha[workID][1][0]){
		case 0:
			switch(GetOldCha[workID][1][1]){
				case 0:
					rply[1] = '【CoC資料寫入系統】\
						\n        歡迎使用本系統，接下來將由我引導你完成資料引入，以下過程請儘可能及早完成。\
						\n\n請輸入[資料寫入]繼續';
					break;
				case 1:
					rply[1] = '【CoC資料寫入系統】\
						\n接下來請輸入[資料寫入 此角色的名字]\
						\n\n[請不要輸入大寫英文以及空白鍵，會導致角色無法讀入]';
					break;
				case 2:
					if(command == null){
						rply[1] = '名字不可以空白!';
						return rply;
					}else{
						for(var a = 0;a<ChaIm.length;a++){
							if(command == ChaIm[a][1]){
								rply[1] = '此名字已經有人使用了，請換一個!';
								return rply;
							}
						}
						GetOldCha[workID][2] = [1,command,'','','','','','',0,0,0,0,0,0,0];
					
						rply[1] = '【CoC資料寫入系統】\
							\n接下來請輸入[資料寫入 玩家的名字]\
							\n\n[請不要輸入大寫英文以及空白鍵，會導致角色無法讀入]';
						break;	
					}
				case 3:
					GetOldCha[workID][2][2] = command;
					
					rply[1] = '【CoC資料寫入系統】\
						\n接下來請輸入[資料寫入 此角色的年齡]\
						\n\n[請不要輸入大寫英文以及空白鍵，會導致角色無法讀入]';
					break;
				case 4:
					GetOldCha[workID][2][3] = command;
					
					rply[1] = '【CoC資料寫入系統】\
						\n接下來請輸入[資料寫入 此角色的職業]\
						\n\n[請不要輸入大寫英文以及空白鍵，會導致角色無法讀入]';
					break;
				case 5:
					GetOldCha[workID][2][4] = command;
					
					rply[1] = '【CoC資料寫入系統】\
						\n接下來請輸入[資料寫入 此角色的性別]\
						\n\n[請不要輸入大寫英文以及空白鍵，會導致角色無法讀入]';
					break;
				case 6:
					GetOldCha[workID][2][5] = command;
					
					rply[1] = '【CoC資料寫入系統】\
						\n接下來請輸入[資料寫入 此角色的出生地]\
						\n\n[請不要輸入大寫英文以及空白鍵，會導致角色無法讀入]';
					break;
				case 7:
					GetOldCha[workID][2][6] = command;
					
					rply[1] = '【CoC資料寫入系統】\
						\n接下來請輸入[資料寫入 此角色的居住地]\
						\n\n[請不要輸入大寫英文以及空白鍵，會導致角色無法讀入]';
					break;
				case 8:
					GetOldCha[workID][2][7] = command;
					
					rply[1] = '【CoC資料寫入系統】\
						\n接下來請輸入[資料寫入 此角色最大Hp]\
						\n\n[請使用半形阿拉伯數字]';
					break;
				case 9:
					if(isNaN(command)){
						rply[1] = '錯誤!請輸入半形阿拉伯數字!';
						return rply;
					}else{
						GetOldCha[workID][2][8] = command;
					
						rply[1] = '【CoC資料寫入系統】\
							\n接下來請輸入[資料寫入 此角色當前Hp]\
							\n\n[請使用半形阿拉伯數字]';
						break;
					}
				case 10:
					if(isNaN(command)){
						rply[1] = '錯誤!請輸入半形阿拉伯數字!';
						return rply;
					}else{
						GetOldCha[workID][2][9] = command;
					
						rply[1] = '【CoC資料寫入系統】\
							\n接下來請輸入[資料寫入 此角色最大Mp]\
							\n\n[請使用半形阿拉伯數字]';
						break;
					}
				case 11:
					if(isNaN(command)){
						rply[1] = '錯誤!請輸入半形阿拉伯數字!';
						return rply;
					}else{
						GetOldCha[workID][2][10] = command;
					
						rply[1] = '【CoC資料寫入系統】\
							\n接下來請輸入[資料寫入 此角色當前Mp]\
							\n\n[請使用半形阿拉伯數字]';
						break;
					}
				case 12:
					if(isNaN(command)){
						rply[1] = '錯誤!請輸入半形阿拉伯數字!';
						return rply;
					}else{
						GetOldCha[workID][2][11] = command;
					
						rply[1] = '【CoC資料寫入系統】\
							\n接下來請輸入[資料寫入 此角色起始San]\
							\n\n[請使用半形阿拉伯數字]';
						break;
					}
				case 13:
					if(isNaN(command)){
						rply[1] = '錯誤!請輸入半形阿拉伯數字!';
						return rply;
					}else{
						GetOldCha[workID][2][12] = command;
					
						rply[1] = '【CoC資料寫入系統】\
							\n接下來請輸入[資料寫入 此角色當前San]\
							\n\n[請使用半形阿拉伯數字]';
						break;
					}
				case 14:
					if(isNaN(command)){
						rply[1] = '錯誤!請輸入半形阿拉伯數字!';
						return rply;
					}else{
						GetOldCha[workID][2][13] = command;
					
						rply[1] = '【CoC資料寫入系統】\
							\n角色基本資料寫入完成!\
							\n接下來請輸入[資料寫入]繼續';
						GetOldCha[workID][1][1] =0;
						GetOldCha[workID][1][0] =1;
						return rply;
					}
			}
			GetOldCha[workID][1][1]++;
			return rply;
			break;
	}
}

function AccountTrans(UserID,TransKey){
	rply[0] = 'rply';
	
	for(var a = 0;a<AccessDB.length;a++){
		if(AccessDB[a][0] == UserID){
			if(TransKey == null){
				if(AccessDB[a][5] == 0){
					rply[1] = '此帳號的轉移模式尚未啟動，要更換綁定的Line帳號的話請輸入[轉移帳號 轉移碼(自行設定)]';
					return rply;
				}else if(AccessDB[a][5] == 1){
					rply[1] = '此帳號的轉移模式已啟動，請在要綁定的Line帳號輸入[接收帳號 目前的使用角色 轉移碼(設定好的)]';
					return rply;
				}
			}else{
				if(AccessDB[a][5] == 0){
					AccessDB[a][5] = 1;
					AccessDB[a][4] = TransKey;
					saveAccessDB(a);
					
					rply[1] = '轉移模式啟動!請使用要綁定的Line帳號，並輸入[接收帳號 目前的使用角色 轉移碼(設定好的)]\
						\n\n如要關閉，請輸入[轉移帳號 轉移碼(設定好的)]';
					return rply;
				}else{
					if(TransKey == AccessDB[a][4]){
						AccessDB[a][5] = 0;
						AccessDB[a][4] = 'none';
						saveAccessDB(a);

						rply[1] = '關閉轉移模式，如要重新啟動，必須重新設定轉移碼';
						return rply;
					}else{
						rply[1] = '你輸入的轉移碼有誤，請再試一次';
						return rply;
					}
				}
			}
		}
	}
	rply[1] = '你尚未建立CoC資料';
	return rply;
	
}

function receiveAccount(UserID,playCha,TransKey){
	rply[0] = 'rply';
	
	for(var a = 0;a<AccessDB.length;a++){
		if(AccessDB[a][0] == UserID){
			rply[1] = '錯誤!此Line帳號已經有CoC資料，不能進行本操作';
			return rply;
		}
	}
	for(var a = 0;a<AccessDB.length;a++){
		if(AccessDB[a][2] == playCha && AccessDB[a][5] == 1 && TransKey == AccessDB[a][4]){
			AccessDB[a][0] = UserID;
			AccessDB[a][5] = 0;
			AccessDB[a][4] = 'none';
			saveAccessDB(a);

			rply[1] = '轉移成功!建議你輸入[角色更換]確認帳號狀態';
			return rply;
		}
	}
	
	rply[1] = '你提供的轉移資訊有誤，請再試一次';
	return rply;
	
}

function SearchCha(UserID){
	rply[0] = 'rply';
	
	var playCha = CheckCha(UserID);
	
	for(var a = 0;a<ChaIm.length;a++){
		if(ChaIm[a][1] == playCha){
			rply[1] = '【COC角色資料】\
				\n角色名:' + ChaIm[a][1] + '\
				\nHP(生命):' + ChaIm[a][8] + '/' + ChaIm[a][9] + '\
				\nMP(魔力):' + ChaIm[a][11] + '/' + ChaIm[a][10] + '\
				\nSan(理智):' + ChaIm[a][13] + '/' + ChaIm[a][12] + '\
				\n[基本資料]\
				\n年齡:' + ChaIm[a][3] + '\
				\n職業:' + ChaIm[a][4] + '\
				\n性別:' + ChaIm[a][5] + '\
				\n出生地:' + ChaIm[a][6] + '\
				\n現居地:' + ChaIm[a][7]+ '\
				\n完成副本數:' + ChaIm[a][14];
			
			return rply;
		}
	}
	rply[1] = '你尚未持有CoC角色';
	return rply;
}

function ChaQuaCheck(UserID){
	rply[0] = 'rply';
	
	var playCha = CheckCha(UserID);
	
	for(var a = 0;a<ChaIm.length;a++){
		if(ChaIm[a][1] == playCha){
			for(var b = 0;b<ChaQua.length;b++){
				if(ChaQua[b][0] == ChaIm[a][1]){
					rply[1] = '【COC素質資料】\
						\n角色名:' + ChaQua[b][0] + '\
						\n力量(STR):' + ChaQua[b][1] + '\
						\n敏捷(DEX):' + ChaQua[b][2] + '\
						\n體質(CON):' + ChaQua[b][3] + '\
						\n外貌(APP):' + ChaQua[b][4] + '\
						\n意志(POW):' + ChaQua[b][5] + '\
						\n智力(INT):' + ChaQua[b][6] + '\
						\n教育(EDU):' + ChaQua[b][7] + '\
						\n體型(SIZ):' + ChaQua[b][8] + '\
						\n機動力(MOV):' + ChaQua[b][9] + '\
						\n靈感(IDEA):' + ChaQua[b][10] + '\
						\n知識(KNOW):' + ChaQua[b][11] + '\
						\n幸運(LUK):' + ChaQua[b][12];

					return rply;
				}
			}
			rply[1] = '嚴重錯誤!!!你的角色沒有能力資料，請向開發人員報告';
			return rply;
		}
	}
	rply[1] = '你尚未持有CoC角色';
	return rply;
}

function ChaSkiCheck(UserID){
	rply[0] = 'rply';
	
	var playCha = CheckCha(UserID);
	
	for(var a = 0;a<ChaIm.length;a++){
		if(ChaIm[a][1] == playCha){
			for(var b = 0;b<ChaSki.length;b++){
				if(ChaSki[b][0] == ChaIm[a][1]){
					rply[1] = '【COC技能資料】\
						\n角色名:' + ChaSki[b][0] + '\
						\n克蘇魯神話:' + ChaSki[b][16] + '\
						\n職業技能點數:' + ChaSki[b][11] + '/' + ChaSki[b][10] + '\
						\n興趣技能點數:' + ChaSki[b][13] + '/' + ChaSki[b][12] + '\
						\n\n〈職業技能〉';
					
					for(var c = 0;c<ChaSki[b][14].length;c++){
						for(var d = 0;d<skilllist.length;d++){
							if(skilllist[d] == ChaSki[b][14][c]){
								var skillLV = ChaSki[b][1][d] + ChaSki[b][2][d] + ChaSki[b][3][d] + ChaSki[b][4][d];
								rply[1] += '\n' + skilllist[d];
								
								rply[1] += ':' + skillLV;
								if(skillLV >= 85) rply[1] += '(LV MAX)';
								rply[1] += '\n(' + ChaSki[b][1][d] + '/' + ChaSki[b][2][d] + '/' + ChaSki[b][3][d] + '/' + ChaSki[b][4][d] + ')';
							}
						}
						for(var d = 0;d<ChaSki[b][5].length;d++){
							if(ChaSki[b][5][d] == ChaSki[b][14][c]){
								var skillLV = ChaSki[b][6][d] + ChaSki[b][7][d] + ChaSki[b][8][d] + ChaSki[b][9][d];
								rply[1] += '\n' + ChaSki[b][5][d];
								
								rply[1] += ':' + skillLV;
								if(skillLV >= 85) rply[1] += '(LV MAX)';
								rply[1] += '\n(' + ChaSki[b][6][d] + '/' + ChaSki[b][7][d] + '/' + ChaSki[b][8][d] + '/' + ChaSki[b][9][d] + ')';
							}
						}
					}
					rply[1] += '\n《特技》';
					
					for(var c = 0;c<ChaSki[b][15].length;c++){
						for(var d = 0;d<skilllist.length;d++){
							if(skilllist[d] == ChaSki[b][15][c]){
								var skillLV = ChaSki[b][1][d] + ChaSki[b][2][d] + ChaSki[b][3][d] + ChaSki[b][4][d];
								rply[1] += '\n' + skilllist[d];
								
								rply[1] += ':' + skillLV;
								if(skillLV >= 85) rply[1] += '(LV MAX)';
								rply[1] += '\n(' + ChaSki[b][1][d] + '/' + ChaSki[b][2][d] + '/' + ChaSki[b][3][d] + '/' + ChaSki[b][4][d] + ')';
							}
						}
						for(var d = 0;d<ChaSki[b][5].length;d++){
							if(ChaSki[b][5][d] == ChaSki[b][15][c]){
								var skillLV = ChaSki[b][6][d] + ChaSki[b][7][d] + ChaSki[b][8][d] + ChaSki[b][9][d];
								rply[1] += '\n' + ChaSki[b][5][d];
								
								rply[1] += ':' + skillLV;
								if(skillLV >= 85) rply[1] += '(LV MAX)';
								rply[1] += '\n(' + ChaSki[b][6][d] + '/' + ChaSki[b][7][d] + '/' + ChaSki[b][8][d] + '/' + ChaSki[b][9][d] + ')';
							}
						}
					}
					
					
					rply[1] += '\n想要搜尋非職業技能，請輸入[技能查詢 技能名]進行確認';
					//console.log(rply[1]);
					return rply;
				}
			}
			rply[1] = '嚴重錯誤!!!你的角色沒有技能資料，請向開發人員報告';
			return rply;
		}
	}
	rply[1] = '你尚未持有CoC角色';
	return rply;
}

function ChaSkiSearch(UserID,skillName){
	rply[0] = 'rply';
	
	var playCha = CheckCha(UserID);
	
	for(var a = 0;a<ChaIm.length;a++){
		if(ChaIm[a][1] == playCha){
			for(var b = 0;b<ChaSki.length;b++){
				if(ChaSki[b][0] == ChaIm[a][1]){
					rply[1] = '【CoC技能查詢】\
						\n角色名:' + ChaIm[a][1];
					
					if(skillName == null){
						rply[1] += '\n你所持有的技能:\
							\n\n【職業技能】\n';
						for(var c = 0;c<ChaSki[b][14].length;c++){
							rply[1] += ChaSki[b][14][c] + '\n';
						}
						rply[1] += '\n【特技】\n';
						for(var c = 0;c<ChaSki[b][15].length;c++){
							rply[1] += ChaSki[b][15][c] + '\n';
						}
						rply[1] += '\n【通常通用技能】\n';
						for(var c = 0;c<skilllist.length;c++){
							var check = 0;
							for(var d = 0;d<ChaSki[b][14].length;d++){
								if(ChaSki[b][14][d] == skilllist[c]){
									check = 1;
									break;
								}
							}
							for(var d = 0;d<ChaSki[b][15].length;d++){
								if(ChaSki[b][15][d] == skilllist[c] || check == 1){
									check = 1;
									break;
								}
							}
							if(check == 0)rply[1] += skilllist[c] + '\n';
						}
						rply[1] += '\n【通常自訂技能】\n';
						for(var c = 0;c<ChaSki[b][5].length;c++){
							var check = 0;
							for(var d = 0;d<ChaSki[b][14].length;d++){
								if(ChaSki[b][14][d] == ChaSki[b][5][c]){
									check = 1;
									break;
								}
							}
							for(var d = 0;d<ChaSki[b][15].length;d++){
								if(ChaSki[b][15][d] == ChaSki[b][5][c] || check == 1){
									check = 1;
									break;
								}
							}
							if(check == 0)rply[1] += ChaSki[b][5][c] + '\n';
						}
						
						rply[1] += '\n想要確認技能，請輸入[技能查詢 技能名]進行確認';
						return rply;
					}else{
						rply[1] += '\n查詢的技能名:' + skillName + '\
							\n類型:';

						for(var c = 0;c<skilllist.length;c++){
							if(skilllist[c] == skillName){
								var check =0;

								for(var d = 0;d<ChaSki[b][14].length;d++){
									if(ChaSki[b][14][d] == skillName && check == 0){
										rply[1] += '(職業技能)\n';
										check = 1;
										break;
									}
								}
								for(var d = 0;d<ChaSki[b][15].length;d++){
									if(ChaSki[b][15][d] == skillName && check == 0){
										rply[1] += '《特技》\n';
										check = 1;
										break;
									}
								}
								if(check == 0){
									rply[1] += '通常通用技能\n';
								}
								var skillLV = ChaSki[b][1][c] + ChaSki[b][2][c] + ChaSki[b][3][c] + ChaSki[b][4][c];

								rply[1] += '技能等級:' + skillLV + '\
								\n(' + ChaSki[b][1][c] + '/' + ChaSki[b][2][c] + '/' + ChaSki[b][3][c] + '/' + ChaSki[b][4][c] + ')';

								return rply;

							}
						}

						for(var c = 0;c<ChaSki[b][5].length;c++){
							if(ChaSki[b][5][c] == skillName){
								var check =0;

								for(var d = 0;d<ChaSki[b][14].length;d++){
									if(ChaSki[b][14][d] == skillName && check == 0){
										rply[1] += '(職業技能)\n';
										check = 1;
										break;
									}
								}
								for(var d = 0;d<ChaSki[b][15].length;d++){
									if(ChaSki[b][15][d] == skillName && check == 0){
										rply[1] += '《特技》\n';
										check = 1;
										break;
									}
								}
								if(check == 0){
									rply[1] += '通常自訂技能\n';
								}
								var skillLV = ChaSki[b][6][c] + ChaSki[b][7][c] + ChaSki[b][8][c] + ChaSki[b][9][c];

								rply[1] += '技能等級:' + skillLV + '\
								\n(' + ChaSki[b][6][c] + '/' + ChaSki[b][7][c] + '/' + ChaSki[b][8][c] + '/' + ChaSki[b][9][c] + ')';

								return rply;

							}
						}
						rply[1] = '錯誤!你不持有此技能或是不存在此技能';
						return rply;
					}
				}
			}
			rply[1] = '嚴重錯誤!!!你的角色沒有技能資料，請向開發人員報告';
			return rply;
		}
	}
	rply[1] = '你尚未持有CoC角色';
	return rply;
}

function ChaWeapon(UserID){
	rply[0] = 'rply';
	
	var playCha = CheckCha(UserID);

	for(var a = 0;a<ChaIm.length;a++){
		if(ChaIm[a][1] == playCha){
			for(var b = 0;b<ChaWea.length;b++){
				if(ChaWea[b][0] == ChaIm[a][1]){
					rply[1] = '【CoC角色武器】\
						\n你使用的角色:' + ChaWea[b][0] + '\
						\n傷害加成:' + ChaWea[b][1] + '\
						\n你目前持有的武器:\n';

					for(var c = 0;c<ChaWea[b][2].length;c++){
						rply[1] +='\n===============\
							\n武器名:' + ChaWea[b][2][c] + '\
							\n傷害:' + ChaWea[b][3][c];
						if(ChaWea[b][4][c] == 1){
							rply[1] += '+' + ChaWea[b][1] + '(傷害加成)';
						}
						if(ChaWea[b][5][c] != '無'){
							rply[1] += '+' + ChaWea[b][5][c] + '(' + ChaWea[b][6][c] + ')';
						}
						rply[1] += '\n射程:' + ChaWea[b][7][c] + '\
							 \n次數/輪:' + ChaWea[b][8][c] + '\
							 \n彈藥:' + ChaWea[b][9][c] + '\
							 \n故障值:' + ChaWea[b][10][c];

					}
					return rply;
				}
			}
			rply[1] = '嚴重錯誤!!!你的角色沒有武器資料，請向開發人員報告';
			return rply;
		}
	}
	rply[1] = '你尚未持有CoC角色';
	return rply;
}

function ChaItemCheck(UserID){
	rply[0] = 'rply';
	
	var playCha = CheckCha(UserID);

	for(var a = 0;a<ChaIm.length;a++){
		if(ChaIm[a][1] == playCha){
			for(var b = 0;b<ChaItem.length;b++){
				if(ChaItem[b][0] == ChaIm[a][1]){
					rply[1] = '【CoC角色持有物】\
						\n你使用的角色:' + ChaItem[b][0] + '\
						\n持有金錢(美金):' + ChaItem[b][1] + '\
						\n===============\
						\n你目前持有的物品:\n';
					for(var c = 0;c<ChaItem[b][2].length;c++){
						rply[1] += ChaItem[b][2][c] + '\n';
					}
					
					rply[1] +='\n===============\
						\n你目前擁有的特殊能力:\n';
					for(var c = 0;c<ChaItem[b][3].length;c++){
						rply[1] += ChaItem[b][3][c] + '\n';
					}
					rply[1] +='\n===============\
						\n你目前擁有的創傷與疤痕:\n';
					for(var c = 0;c<ChaItem[b][4].length;c++){
						rply[1] += ChaItem[b][4][c] + '\n';
					}
					rply[1] +='\n===============\
						\n你目前擁有的恐懼與狂熱:\n';
					for(var c = 0;c<ChaItem[b][5].length;c++){
						rply[1] += ChaItem[b][5][c] + '\n';
					}
					rply[1] +='\n===============\
						\n你目前擁有的咒術:\n';
					for(var c = 0;c<ChaItem[b][6].length;c++){
						rply[1] += ChaItem[b][6][c] + '\n';
					}
					rply[1] +='\n===============\
						\n你目前可進行的第三類接觸:\n';
					for(var c = 0;c<ChaItem[b][7].length;c++){
						rply[1] += ChaItem[b][7][c] + '\n';
					}

					return rply;
				}
			}
			rply[1] = '嚴重錯誤!!!你的角色沒有道具資料，請向開發人員報告';
			return rply;
		}
	}
	rply[1] = '你尚未持有CoC角色';
	return rply;
}

function CoCmenu(UserID,UserN){
	rply[0] = 'rply';
	
	var playCha = CheckCha(UserID);
	if(playCha == 0){
		rply[1] = '你尚未持有CoC角色';
		return rply;
	}else{
		rply[1] = {
		  "type": "template",
		  "altText": "很抱歉，你的Line版本不支援此系統，建議輸入help查看可使用的指令",
		  "template": {
		  	"type": "buttons",
		  		"text":UserN + "目前使用的角色是:" + playCha,
		  		"actions": [{
					"type": "message",
					"label": "查看角色資料",
					"text": "CoC角色資料"},
					{
					"type": "message",
					"label": "技能查詢",
					"text": "技能查詢"
					},
		      			{
					"type": "message",
					"label": "察看持有物資料",
					"text": "CoC持有物資料"
					},
					{
					"type": "message",
					"label": "其他選項",
					"text": "其他CoC選項"
					}
				]
		}
	}
	return rply;
	
	}
}

function Chamenu(UserID){
	rply[0] = 'rply';
	
	var playCha = CheckCha(UserID);
	if(playCha == 0){
		rply[1] = '你尚未持有CoC角色';
		return rply;
	}else{
		rply[1] = {
		  "type": "template",
		  "altText": "很抱歉，你的Line版本不支援此系統，建議輸入help查看可使用的指令",
		  "template": {
		  	"type": "buttons",
		  		"text":"目前查詢的角色是:" + playCha,
		  		"actions": [{
					"type": "message",
					"label": "查看角色資料",
					"text": "角色基本資料"},
					{
					"type": "message",
					"label": "查看素質資料",
					"text": "角色素質資料"
					},
		      			{
					"type": "message",
					"label": "查看技能資料",
					"text": "角色技能資料"
					}
				]
		}
	}
	return rply;
	
	}
}
function Itemmenu(UserID){
	rply[0] = 'rply';
	
	var playCha = CheckCha(UserID);
	if(playCha == 0){
		rply[1] = '你尚未持有CoC角色';
		return rply;
	}else{
		rply[1] = {
		  "type": "template",
		  "altText": "很抱歉，你的Line版本不支援此系統，建議輸入help查看可使用的指令",
		  "template": {
		  	"type": "buttons",
		  		"text":"目前查詢的角色是:" + playCha,
		  		"actions": [{
					"type": "message",
					"label": "查看武器資料",
					"text": "角色武器資料"},
					{
					"type": "message",
					"label": "查看持有物",
					"text": "角色道具資料"
					}
				]
		}
	}
	return rply;
	
	}
}


function saveAccessDB(Target){
	DB.useServiceAccountAuth(creds, function (err) {
		DB.getRows(7 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{


					rows[Target].userid = AccessDB[Target][0];
					rows[Target].playern = AccessDB[Target][1];
					rows[Target].playcha = AccessDB[Target][2];
					
					var havchaS = AccessDB[Target][3][0];
					for(var a = 1;a<AccessDB[Target][3].length;a++){
						havchaS += ',' + AccessDB[Target][3][a];
					}
					rows[Target].havecha = havchaS;
					
					rows[Target].transkey = AccessDB[Target][4];
					rows[Target].transio = AccessDB[Target][5];
					
					rows[Target].save();
					console.log('帳號連結資料 更新完成');
				}	
			});
	});
}

module.exports = {
	SwitchCha,
	SearchCha,
	ChaQuaCheck,
	ChaSkiCheck,
	ChaSkiSearch,
	ChaWeapon,
	ChaItemCheck,
	CoCmenu,
	Chamenu,
	Itemmenu,
	AccountTrans,
	receiveAccount,
	GetOldChaStep
};
