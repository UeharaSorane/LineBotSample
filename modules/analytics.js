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
function parseInput(inputStr,UserID,UserN,GroupID) {
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
	
////////////////////////測試用
	if (trigger.match(/^鸚鵡測試$/) != null) return exports.Testing.ReplyTest(UserN,mainMsg[1]);//測試reply功能用
	else if (trigger.match(/^大聲測試$/) != null) return exports.Testing.PushTest(UserID,GroupID);//測試push功能用
	else if (trigger.match(/^淦話$/) != null) return exports.Testing.SecretTalk(UserN,mainMsg[1]);//匿名對話
	else return ['none',''];
	
}


module.exports = {
	parseInput:parseInput
};
