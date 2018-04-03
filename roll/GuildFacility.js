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

function GuildCheck(UserID){
	for(var i = 0;i <PB.length;i++){
		if(PB[i][0] == UserID){
			if(PB[i][14] == '輔導公會'){
				rply.text = '這是輔導公會的設施情報:\
						\n 公會名: ' + CharArr[j][1] + '\
						\n-----設施等級一覽-----\
						\n 訓練房: 1等\
						\n 煉金工坊: 1等\
						\n 公會商店: 1等\
						\n 公會餐廳: 1等\
						\n 公會倉庫: 1等\
						\n-----倉庫素材一覽-----\
						\n 無法使用公會倉庫\
						\n\
						\n 想要使用設施，請輸入 公會設施 設施名';
				return rply;
			}
			
			for(var j = 0; j<CharArr.length;j++){
				if(PB[i][14] == CharArr[j][1]){
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
					return rply;
					
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
	GuildCheck
};
