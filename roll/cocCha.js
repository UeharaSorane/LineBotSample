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

DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(2 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					ChaIm[i] = [];
					
					ChaIm[i][0] = rows[i].userid;
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
					ChaIm[i][14] = rows[i].transkey;
					ChaIm[i][15] = Number(rows[i].transio);
					
					
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
				console.log(ChaQua);
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
					for(var De = 0;De<ChaSki[i][1].length;De++){
						//ChaSki[i][5][De] = ChaSki[i][1][De] + ChaSki[i][2][De] + ChaSki[i][3][De] + ChaSki[i][4][De];
					}
					
				}
				console.log(ChaSki);
				console.log('角色技能資料 讀取完成');
			}	
		});
});

function SearchCha(UserID){
	rply[0] = 'rply';
	
	for(var a = 0;a<ChaIm.length;a++){
		if(ChaIm[a][0] == UserID){
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
				\n現居地:' + ChaIm[a][7];
			
			return rply;
		}
	}
	rply[1] = '你尚未持有CoC角色';
	return rply;
}

function ChaQuaCheck(UserID){
	rply[0] = 'rply';
	
	for(var a = 0;a<ChaIm.length;a++){
		if(ChaIm[a][0] == UserID){
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
	
	for(var a = 0;a<ChaIm.length;a++){
		if(ChaIm[a][0] == UserID){
			for(var b = 0;b<ChaSki.length;b++){
				if(ChaSki[b][0] == ChaIm[a][1]){
					rply[1] = '【COC技能資料】\
						\n角色名:' + ChaSki[b][0] + '\n';
					
					for(var c = 0;c<skilllist.length;c++){
						rply[1] += '\n' + skilllist[c] + ':' /*+  ChaSki[b][c][5]*/ + '\
						\n(' + ChaSki[b][c][1] + '/' + ChaSki[b][c][2] + '/' + ChaSki[b][c][3] + '/' + ChaSki[b][c][4] + ')';
					}

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

module.exports = {
	SearchCha,
	ChaQuaCheck,
	ChaSkiCheck
};
