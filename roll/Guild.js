var rply ={type : 'text'}; //type是必需的,但可以更改

var PlayerData = require('./PlayerData.js');
var PD = PlayerData.GetArray();

DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(21 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].guildid;
					CharArr[i][1] = rows[i].guildname;
					CharArr[i][2] = rows[i].memberid.split(',');
					CharArr[i][3] = rows[i].membername.split(',');
					CharArr[i][4] = rows[i].membertitle.split(',');
					CharArr[i][5] = Number(rows[i].membern);
					CharArr[i][6] = rows[i].jointype;
					
				}
				//console.log(CharArr);
				console.log('公會基本資料 讀取完成');
				//console.log();
			}
		

			
			});
	
		
		
	});

function ArrayUpdate() {

	DB.useServiceAccountAuth(creds, function (err) {



	 // Get all of the rows from the spreadsheet.
		DB.getRows(21 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{

					for(var i=0; i< CharArr.length; i++){

						rows[i].guildid = CharArr[i][0];
						rows[i].guildname = CharArr[i][1];
						rows[i].memberid = CharArr[i][2].join(',');
						rows[i].membername = CharArr[i][3].join(',');
						rows[i].membertitle = CharArr[i][4].join(',');
						rows[i].membern = CharArr[i][5];
						rows[i].jointype = CharArr[i][6];

					}

					}
					console.log('公會基本資料 更新完成');


				});



		});
	
}

function guildView(){
	rply.text = '【公會一覽】';
	
	for(var i  =0; i<CharArr.length;i++){
		rply.text+= '\n [' + CharArr[i][0] + '] ' + CharArr[i][1] + ' (' + CharArr[i][5] + '人) [' + CharArr[i][6] + ']';
	}
	
	rply.text += '\n 如果想要確認公會詳細內容，請輸入 公會 公會名(公會編號) 進行查詢';
	
	return rply;
}

module.exports = {
	guildView
};
