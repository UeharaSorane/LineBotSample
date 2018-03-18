// Load `*.js` under roll directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync('./roll/').forEach(function(file) {
	if (file.match(/\.js$/) !== null && file !== 'index.js') {
	  var name = file.replace('.js', '');
	  exports[name] = require('../roll/' + file);
	}
  });
/*var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var CharDB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');

var CharArr = new Array(5);

*/


//用來呼叫骰組,新增骰組的話,要寫條件式到下面呼叫 
//格式是 exports.骰組檔案名字.function名
function parseInput(rplyToken, inputStr,UserID,Dname) {
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
	
	///////////////////////////普通ROLL擲骰
	if (inputStr.match(/\w/)!=null && inputStr.toLowerCase().match(/\d+d+\d/)!=null) {
          return exports.rollbase.nomalDiceRoller(inputStr,mainMsg[0],mainMsg[1],mainMsg[2]);
        }
	////////////////////////////情報相關

	////////////////////////////戰鬥相關
	//ccb指令
	if (trigger.match(/^ccb$/)!= null && mainMsg[1]<=1000 ){
		if (trigger == 'ccb'&& mainMsg[1]<=99) return exports.battle.ccb(mainMsg[1],mainMsg[2]);
        }
	
	//速度判定指令
	if (trigger.match(/^速度判定$|^速度$/)!= null && mainMsg[1]<=1000 && mainMsg[2]<=1000 ){
		if (trigger == '速度判定'&& mainMsg[1]<=99 && mainMsg[2]<=99) return exports.battle.spd(mainMsg[1],mainMsg[2]);
        }
	
	//xBy>A 指令開始於此
	if (trigger.match(/^(\d+)(b)(\d+)$/i)!= null)
	{        
		return exports.battle.xBy(trigger,mainMsg[1],mainMsg[2]);
	}
	//xUy 指令開始於此	
	if (trigger.match(/^(\d+)(u)(\d+)$/i)!= null && isNaN(mainMsg[1])== false)
	{        
		return exports.battle.xUy(trigger,mainMsg[1],mainMsg[2],mainMsg[3]);
	}
	
	

	////////////////////////////服務相關
	if (trigger.match(/^寶箱$|^開寶箱$/) != null) return exports.PlayerData.BoxOpen(UserID ,mainMsg[1] ) ;//寶箱狩獵指令

	////////////////////////////娛樂相關

	////////////////////////////系統測試
	if (trigger.match(/^測試$/)!= null ) return exports.Test.main();//連結測試
	
	if (trigger.match(/^uid$/)!= null ) return exports.Test.UserID(UserID);//資料庫連結測試
	
	////////////////////////////資料儲存相關
	if (trigger.match(/^玩家情報$/)!= null ) return exports.PlayerData.main(UserID);//資料庫連結測試
	if (trigger.match(/^玩家建立$/)!= null ) return exports.PlayerData.CreatNewPlayer(UserID, mainMsg[1], mainMsg[2]);//建立新玩家
	if (trigger.match(/^資料庫更新$/)!= null ) return exports.PlayerData.ArrayUpdate();//資料庫外部更動更新
	if (trigger.match(/^繼承模式開啟$/)!= null ) return exports.PlayerData.InheritModeOn(UserID,mainMsg[1], mainMsg[2]);//[GM專用]開啟繼承權限
	if (trigger.match(/^繼承$/)!= null ) return exports.PlayerData.InheritChatacter(UserID, mainMsg[1], mainMsg[2]);//繼承角色


}


module.exports = {
	parseInput:parseInput
};
