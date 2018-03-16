// Load `*.js` under roll directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync('./roll/').forEach(function(file) {
	if (file.match(/\.js$/) !== null && file !== 'index.js') {
	  var name = file.replace('.js', '');
	  exports[name] = require('../roll/' + file);
	}
  });
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var CharDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');

var CharArr[];

DB.useServiceAccountAuth(creds, function (err) {
		
 
 // Get all of the rows from the spreadsheet.
	DB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i][0] = rows[i].usedid;
					CharArr[i][1] = rows[i].cname;
					CharArr[i][2] = rows[i].gold;
					CharArr[i][3] = rows[i].mirastone;
					CharArr[i][4] = rows[i].title;
				}
			}
		}

			console.log('玩家基本資料 讀取完成');
			});
	
		
		
	});

console.log(CharArr);

//用來呼叫骰組,新增骰組的話,要寫條件式到下面呼叫 
//格式是 exports.骰組檔案名字.function名
function parseInput(rplyToken, inputStr,UserID) {
	//console.log('InputStr: ' + inputStr);
	_isNaN = function(obj) 	{
	return isNaN(parseInt(obj));  
	}
	
	let msgSplitor = (/\S+/ig);	
	let mainMsg = inputStr.match(msgSplitor); //定義輸入字串
	let trigger = mainMsg[0].toString().toLowerCase(); //指定啟動詞在第一個詞&把大階強制轉成細階
	

///////////////////////////////////////////////////////
////////////////////////開始分析////////////////////////
///////////////////////////////////////////////////////
	
	///////////////////////////普通ROLL擲骰判定在此
	
	////////////////////////////情報相關

	////////////////////////////戰鬥相關

	////////////////////////////服務相關

	////////////////////////////娛樂相關

	////////////////////////////系統測試
	if (trigger.match(/^測試$/)!= null ) return exports.Test.main();//連結測試
	if (trigger.match(/^玩家情報$/)!= null ) return exports.PlayerData.main(UserID);//資料庫連結測試
	if (trigger.match(/^uid$/)!= null ) return exports.Test.UserID(UserID);//資料庫連結測試
	
	////////////////////////////資料儲存相關
	if (trigger.match(/^玩家建立$/)!= null ) return exports.PlayerData.CreatNewPlayer(UserID, mainMsg[1], mainMsg[2], mainMsg[3], mainMsg[4]);//資料庫連結測試

}


module.exports = {
	parseInput:parseInput
};
