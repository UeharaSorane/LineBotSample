var rply ={type : 'text'}; //type是必需的,但可以更改
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var AccessDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var AccessArr= [];

AccessDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	AccessDB.getRows(20 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					AccessArr[i] = [];
					
					AccessArr[i][0] = rows[i].iid;
					AccessArr[i][1] = rows[i].name;
					AccessArr[i][2] = rows[i].effect;
					AccessArr[i][3] = rows[i].range;
					AccessArr[i][4] = Number(rows[i].maxuseturn);
					AccessArr[i][5] = Number(rows[i].game);
					AccessArr[i][6] = rows[i].htgi;
					
				}
				//console.log(AccessArr);
				console.log('道具資料 讀取完成');
			}
		

			
			});
	
		
		
	});


function itemIllustration(Name){
	for(var i = 0 ;i<AccessArr.length; i++){
		if(AccessArr[i][0] == Name || AccessArr[i][1] == Name){
			rply.text = '道具情報:\
					\n-----基本資料-----\
					\n 道具編號: ' + AccessArr[i][0] + '\
					\n 道具名稱: ' + AccessArr[i][1] + '\
					\n 效果: ' + AccessArr[i][2] + '\
					\n 有效範圍: ' + AccessArr[i][3] + '\
					\n 回合使用上限: ' + AccessArr[i][4] + '\
					\n 戰鬥使用上限: ' + AccessArr[i][5] + '\
					\n-----取得途徑-----\n' + AccessArr[i][6] + '\
					\n--------------------';
			
			return rply;
		
		}
	}
	if(Name == null){
		rply.text = '-----道具圖鑑-----\n\n';
		
		for(var i = 0; i<AccessArr.length; i++){
			rply.text += '[' + AccessArr[i][0] + '] ' + AccessArr[i][1] + '\n';
		}
		
		rply.text += '\n\n想要查詢特定道具的話，請輸入 道具圖鑑 道具編號(道具名字)';
		
		return rply;
	}
		
		rply.text = '找不到編號或名稱為' + Name +'的道具喔！\
				\n\n-----道具圖鑑-----\n\n';
		
		for(var i = 0; i<AccessArr.length; i++){
			rply.text += '[' + AccessArr[i][0] + '] ' + AccessArr[i][1] + '\n';
		}
		
		rply.text += '\n\n想要查詢特定道具的話，請輸入 道具圖鑑 道具編號(道具名字)';
		
		return rply;
	}

function GetArray(){
	return AccessArr;
}

module.exports = {
	itemIllustration,
	GetArray
};
