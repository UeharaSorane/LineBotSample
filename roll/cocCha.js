var rply = [];

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('1hwFlTrJ7JHeWMLbHmfg7LP7f13OfAoMebF6HIkHpHPs');
var AccessDB= [];


DB.useServiceAccountAuth(creds, function (err) {
 // 先將資料讀進陣列
	
	DB.getRows(2 , function (err, rows) {
		if (err) {
			console.log( err );
		}else{
			for(var i=0; i< rows.length; i++){
				AccessDB[i] = [];

				AccessDB[i][0] = rows[i].userid;
				AccessDB[i][1] = rows[i].playcha;
				AccessDB[i][2] = rows[i].havecha.split(',');
				AccessDB[i][3] = rows[i].transkey;
				AccessDB[i][4] = Number(rows[i].transio);
			}
			console.log(AccessDB);
			console.log('帳號連結資料 讀取完成');
		}	
	});
	
	DB.getRows(3 , function (err, rows) {
		
	});
});

function CreateAccount(UserID,PlayerN){
	rply[0] = 'rply';
	
	var AccountCheck = CheckCha(UserID);
	
	if(AccountCheck != 'NoAccount'){
		rply[1] = '錯誤!此Line帳號已經有CoC資料，不能進行本操作';
		return rply;
	}else{
		var i = AccessDB.length;
		AccessDB[i] = [UserID,'','','none',0];
		
		DB.useServiceAccountAuth(creds, function (err) {
			if(err) console.log(err);
			else{
				DB.addRow(1,{
					userid: UserID,
					playcha: '',
					havecha: '',
					transkey: "none",
					transio: 0
				},function(err,row){
					if(err){
						console.log(err);
						rply[1] = '錯誤!資料寫入失敗';
						return rply;
					}
				});
			}
			
		});

		rply[1] = '帳號登記成功！';
		return rply;
		
	}
}

function CheckCha(UserID){
	for(var a = 0;a<AccessDB.length;a++){
		if(AccessDB[a][0] == UserID){
			if(AccessDB[a][1] != null)return a;
			else return 'NoCha';
		}
	}
	return 'NoAccount';
}

function SwitchCha(UserID,ChaName){
	rply[0] = 'rply';
	
	var AccountCheck = CheckCha(UserID);
	console.log(AccountCheck)
	
	if(AccountCheck == 'NoAccount'){
		rply[1] = '你尚未建立CoC帳號';
		return rply;
	}else if(AccountCheck == 'NoCha'){
		rply[1] = '你尚未持有CoC角色';
		return rply;
	}else{
		var a = AccountCheck;
		
		if(ChaName == null){
			rply[1] = '【COC帳號情報】\
				\n你目前使用的角色:' + AccessDB[a][1] + '\
				\n=====你目前持有的角色=====';

			for(var b = 0;b<AccessDB[a][2].length;b++){
				rply[1] += '\n' + AccessDB[a][2][b];
			}
			rply[1] += '\n若想要更換角色，請輸入[角色更換 角色名]即可';
			return rply;
		}else{
			for(var b = 0;b<AccessDB[a][2].length;b++){
				if(AccessDB[a][2][b] == ChaName){
					AccessDB[a][1] = ChaName;
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

function AccountTrans(UserID,TransKey){
	rply[0] = 'rply';
	
	var AccountCheck = CheckCha(UserID);
	
	if(AccountCheck == 'NoAccount'){
		rply[1] = '你尚未建立CoC帳號';
		return rply;
	}else if(AccountCheck == 'NoCha'){
		rply[1] = '你尚未持有CoC角色';
		return rply;
	}else{
		var a = AccountCheck;
		
		if(TransKey == null){
			if(AccessDB[a][4] == 0){
				rply[1] = '此帳號的轉移模式尚未啟動，要更換綁定的Line帳號的話請輸入[轉移帳號 轉移碼(自行設定)]';
				return rply;
			}else if(AccessDB[a][4] == 1){
				rply[1] = '此帳號的轉移模式已啟動，請在要綁定的Line帳號輸入[接收帳號 目前的使用角色 轉移碼(設定好的)]';
				return rply;
			}
		}else{
			if(AccessDB[a][4] == 0){
				AccessDB[a][4] = 1;
				AccessDB[a][3] = TransKey;
				saveAccessDB(a);

				rply[1] = '轉移模式啟動!請使用要綁定的Line帳號，並輸入[接收帳號 目前的使用角色 轉移碼(設定好的)]\
					\n\n如要關閉，請輸入[轉移帳號 轉移碼(設定好的)]';
				return rply;
			}else{
				if(TransKey == AccessDB[a][3]){
					AccessDB[a][4] = 0;
					AccessDB[a][3] = 'none';
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

function receiveAccount(UserID,playCha,TransKey){
	rply[0] = 'rply';
	
	var AccountCheck = CheckCha(UserID);
	
	if(AccountCheck != 'NoAccount'){
		rply[1] = '錯誤!此Line帳號已經有CoC資料，不能進行本操作';
		return rply;
	}else{
		for(var a = 0;a<AccessDB.length;a++){
			if(AccessDB[a][1] == playCha && AccessDB[a][4] == 1 && TransKey == AccessDB[a][3]){
				AccessDB[a][0] = UserID;
				AccessDB[a][4] = 0;
				AccessDB[a][3] = 'none';
				saveAccessDB(a);

				rply[1] = '轉移成功!建議你輸入[角色更換]確認帳號狀態';
				return rply;
			}
		}

		rply[1] = '你提供的轉移資訊有誤，請再試一次';
		return rply;
	}
}

function SaveAccessDB(Target){
	DB.useServiceAccountAuth(creds, function (err) {
		DB.getRows(1 , function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				rows[Target].userid = AccessDB[Target][0];
				rows[Target].playcha = AccessDB[Target][1];

				var havchaS = AccessDB[Target][2][0];
				for(var a = 1;a<AccessDB[Target][2].length;a++){
					havchaS += ',' + AccessDB[Target][2][a];
				}
				rows[Target].havecha = havchaS;

				rows[Target].transkey = AccessDB[Target][3];
				rows[Target].transio = AccessDB[Target][4];

				rows[Target].save();
				console.log('帳號連結資料 更新完成');
			}	
		});
	});
}



module.exports = {
	CreateAccount,
	SwitchCha,
	AccountTrans,
	receiveAccount
};
