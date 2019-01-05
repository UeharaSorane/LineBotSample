var rply = [];

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('1hwFlTrJ7JHeWMLbHmfg7LP7f13OfAoMebF6HIkHpHPs');
var ChaIm= [];

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
				console.log('角色基本資料 讀取完成');
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
function exportDB(){
	return ChaIm;
}

function saveDB(DB){
	ChaIm = DB;
}

module.exports = {
	SearchCha,
	exportDB,
	saveDB
};
