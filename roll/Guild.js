var rply ={type : 'text'}; //type是必需的,但可以更改
var returnRply;
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var CharArr= [];

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
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
					CharArr[i][7] = rows[i].waitlist.split(',');
					
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
						rows[i].waitlist = CharArr[i][7].join(',');
						rows[i].save();
						

					}

					}
					console.log('公會基本資料 更新完成');


				});



		});
	
}

function guildView(){
	returnRply = '【公會一覽】';
	
	for(var i  =0; i<CharArr.length;i++){
		returnRply+= '\n [' + CharArr[i][0] + '] ' + CharArr[i][1] + ' (' + CharArr[i][5] + '人) [' + CharArr[i][6] + ']';
	}
	
	returnRply += '\n 如果想要確認公會詳細內容，請輸入 公會 公會名(公會編號) 進行查詢';
	
	ArrayUpdate();
	
	return returnRply;
}

function guildSearch(GuildName){
	for(var i =0; i<CharArr.length;i++){
		if(CharArr[i][1] == '輔導公會'){
			returnRply = '【輔導公會】 無公會玩家的歸宿\
					\n 只要你沒有加入公會，就會來到這裡！';
			return returnRply;
			
		}else if(CharArr[i][1] == GuildName || CharArr[i][0] == GuildName){
			returnRply = '【公會情報】\
					\n 公會編號: ' + CharArr[i][0] + '\
					\n 公會名: ' + CharArr[i][1] + '\
					\n 公會會長: ' + CharArr[i][3][0] + '\
					\n 公會人數: ' + CharArr[i][5] + '\
					\n 公會加入模式: ' + CharArr[i][6] + '\
					\n-----公會成員-----';
			
			for(var j = 0;j<CharArr[i][3].length; j++){
				returnRply += '\n' + CharArr[i][4][j] + ': ' + CharArr[i][3][j];
			}
			
			if(CharArr[i][6] == 'GM限定'){
				returnRply += '\n\n這是GM限定公會，一般人是加不進來的';
			}else if(CharArr[i][6] == '自由加入'){
				returnRply += '\n\n這是可以自由加入的公會，請輸入 公會 加入 公會名 就能直接加入公會了';
			}else if(CharArr[i][6] == '審核'){
				returnRply += '\n\n這是必須審核才能加入的公會，請輸入 公會 加入 公會名 並等待公會會長同意';
			}else if(CharArr[i][6] == '暫停招生'){
				returnRply += '\n\n目前這個公會暫時停止招募新人了';
			}
			
			return returnRply;
			
		}
	}
	
	return guildView();
	
}

function GetArray(){
	return CharArr;
}

function InheritPlayer(UserID,Guild,Name){
	for(var i =0; i<CharArr.length;i++){
		if(CharArr[i][1] == Guild && CharArr[i][1] != '輔導公會'){
			for(var j = 0;j<CharArr[i][3].length;j++){
				if(CharArr[i][3][j] == Name){
					CharArr[i][2][j] = UserID;
					ArrayUpdate();
				}
			}
		}
	}
}

function switchName(UserID,Guild,Name){
	for(var i =0; i<CharArr.length;i++){
		if(CharArr[i][1] == Guild && CharArr[i][1] != '輔導公會'){
			for(var j = 0;j<CharArr[i][2].length;j++){
				if(CharArr[i][2][j] == UserID){
					CharArr[i][3][j] = Name;
					
					ArrayUpdate();
				}
			}
		}
	}
}

function saveArray(ReturnF){
	
	CharArr = ReturnF;
	console.log(CharArr[0][3].join(','));
	ArrayUpdate();
}

function InGuildView(GuildName){
	for(var i =0; i<CharArr.length;i++){
		if(CharArr[i][1] == '輔導公會'){
			returnRply = '【輔導公會】 無公會玩家的歸宿\
					\n 只要你沒有加入公會，就會來到這裡！';
			return returnRply;
			
		}else if(CharArr[i][1] == GuildName || CharArr[i][0] == GuildName){
			returnRply = '【公會情報】\
					\n 公會編號: ' + CharArr[i][0] + '\
					\n 公會名: ' + CharArr[i][1] + '\
					\n 公會會長: ' + CharArr[i][3][0] + '\
					\n 公會人數: ' + CharArr[i][5] + '\
					\n 公會加入模式: ' + CharArr[i][6] + '\
					\n-----公會成員-----';
			
			for(var j = 0;j<CharArr[i][3].length; j++){
				returnRply += '\n' + CharArr[i][4][j] + ': ' + CharArr[i][3][j];
			}
			
			return returnRply;
			
		}
	}
}

module.exports = {
	guildView,
	guildSearch,
	GetArray,
	InheritPlayer,
	switchName,
	saveArray,
	InGuildView
};
