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
	
////////////////////////通用
	if (trigger.match(/^鸚鵡測試$/) != null) return exports.Testing.ReplyTest(UserN,mainMsg[1]);//測試reply功能用
	else if (trigger.match(/^大聲測試$/) != null) return exports.Testing.PushTest(UserID,GroupID);//測試push功能用
	else if (trigger.match(/^淦話$/) != null) return exports.Testing.SecretTalk(UserN,mainMsg[1],mainMsg[2]);//匿名對話
	else if (trigger.match(/空音/) != null) return exports.funny.randomReply(UserN) ;//空音閒談指令
	else if (trigger.match(/運氣|運勢/) != null) return exports.funny.randomLuck(mainMsg) ; //占卜運氣
	else if (trigger.match(/flag|插旗/) != null) return exports.funny.BStyleFlagSCRIPTS() ;//插旗用指令
	else if (trigger.match(/^help$|^幫助$/)!= null ) return exports.Help.Help(UserN);//幫助頁面
	
	else if (trigger.match(/^coc建立帳號$/) != null) return exports.cocCha.CreateAccount(UserID,UserN) ;//CoC選單
	
////////////////////////目錄
	//else if (trigger.match(/^目錄|menu$/) != null) return exports.Testing.menu(UserN) ;//目錄
	//else if (trigger.match(/^coc選單$/) != null) return exports.cocCha.CoCmenu(UserID,UserN) ;//CoC選單
	//else if (trigger.match(/^娛樂選單$/) != null) return exports.Testing.funnymenu(UserN) ;//娛樂選單
	
////////////////////////CoC選單
	//else if (trigger.match(/^coc角色資料$/) != null) return exports.cocCha.Chamenu(UserID) ;//角色資料
	//else if (trigger.match(/^技能查詢$/) != null) return exports.cocCha.ChaSkiSearch(UserID,mainMsg[1]) ;//技能查詢
	//else if (trigger.match(/^coc持有物資料$/) != null) return exports.cocCha.Itemmenu(UserID) ;//持有物資料
	//else if (trigger.match(/^其他CoC選項$/) != null) return exports.cocCha.OtherCoC(UserID) ;//切換角色
	
////////////////////////CoC角色資料
	//else if (trigger.match(/^角色基本資料$/) != null) return exports.cocCha.SearchCha(UserID) ;//角色基本資料
	//else if (trigger.match(/^角色素質資料$/) != null) return exports.cocCha.ChaQuaCheck(UserID) ;//角色素質資料
	//else if (trigger.match(/^角色技能資料$/) != null) return exports.cocCha.ChaSkiCheck(UserID) ;//角色技能資料

////////////////////////CoC持有物資料
	//else if (trigger.match(/^角色武器資料$/) != null) return exports.cocCha.ChaWeapon(UserID) ;//角色武器資料
	//else if (trigger.match(/^角色道具資料$/) != null) return exports.cocCha.ChaItemCheck(UserID) ;//角色道具資料

	
////////////////////////其他CoC選項
	else if (trigger.match(/^角色更換|帳號確認$/) != null) return exports.cocCha.SwitchCha(UserID,mainMsg[1]) ;//切換角色
	//else if (trigger.match(/^轉移帳號$/) != null) return exports.cocCha.AccountTrans(UserID,mainMsg[1]) ;//轉移帳號
	
////////////////////////轉移帳號相關
	else if (trigger.match(/^接收帳號$/) != null) return exports.cocCha.receiveAccount(UserID,mainMsg[1],mainMsg[2]) ;//接收帳號

////////////////////////普通ROLL擲骰判定
        else if (inputStr.match(/\w/)!=null && inputStr.toLowerCase().match(/\d+d+\d/)!=null) {
          return ['rply',exports.rollbase.nomalDiceRoller(inputStr,mainMsg[0],mainMsg[1],mainMsg[2])];
        }
	
	//ccb指令
	else if (trigger.match(/^ccb$/)!= null && mainMsg[1]<=1000 ){
		if (trigger == 'ccb'&& mainMsg[1]<=99) return ['rply',exports.battle.ccb(mainMsg[1],mainMsg[2])];
        }
	else if (trigger.match(/^ccrt$/) != null) return exports.crazy.ccrt();//短期瘋狂
	else if (trigger.match(/^ccsu$/) != null) return exports.crazy.ccsu();//長期瘋狂
	//xBy>A 指令開始於此
	else if (trigger.match(/^(\d+)(b)(\d+)$/i)!= null)
	{        
		return ['rply',exports.battle.xBy(trigger,mainMsg[1],mainMsg[2])];
	}
	//xUy 指令開始於此	
	else if (trigger.match(/^(\d+)(u)(\d+)$/i)!= null && isNaN(mainMsg[1])== false)
	{        
		return ['rply',exports.battle.xUy(trigger,mainMsg[1],mainMsg[2],mainMsg[3])];
	}
	
	
	else return ['none',''];


}


module.exports = {
	parseInput:parseInput
};
