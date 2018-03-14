// Load `*.js` under roll directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync('./roll/').forEach(function(file) {
	if (file.match(/\.js$/) !== null && file !== 'index.js') {
	  var name = file.replace('.js', '');
	  exports[name] = require('../roll/' + file);
	}
  });

//用來呼叫骰組,新增骰組的話,要寫條件式到下面呼叫 
//格式是 exports.骰組檔案名字.function名
function parseInput(rplyToken, inputStr) {
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
        if (inputStr.match(/\w/)!=null && inputStr.toLowerCase().match(/\d+d+\d/)!=null) {
          return exports.rollbase.nomalDiceRoller(inputStr,mainMsg[0],mainMsg[1],mainMsg[2]);
        }
	
	////////////////////////////情報相關
	if (trigger.match(/^公告$/) != null) return exports.GameInformation.main(mainMsg[1]);	//遊戲公告指令
	if (trigger.match(/^活動$/) != null) return exports.GameEvent.main(mainMsg[1],mainMsg[2]);	//遊戲活動指令
	
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
	if (trigger.match(/^寶箱$|^開寶箱$/) != null) return exports.BoxOpen.main() ;//寶箱狩獵指令
	if (trigger.match(/^祈願$/) != null) return exports.LoginBonus.LoginBonus() ;//每日登入指令
	if (trigger.match(/^help$|^幫助$/)!= null ) return exports.Help.Help();//幫助頁面
	if (trigger.match(/^教學$|^新手教學$/)!= null ) return exports.tutorial.main(mainMsg[1]);//新手教學頁面
	if (trigger.match(/^重要資訊處$/)!= null ) return exports.Important.ImportantInformation();//重要資訊處
	if (trigger.match(/^遊戲存檔$/)!= null ) return exports.Important.GameSave();//遊戲存檔
	if (trigger.match(/^公會$/)!= null ) return exports.Important.Guild();//公會專區
	if (trigger.match(/^招募$/) != null) return exports.gacha.main(mainMsg[1],mainMsg[2]);	//角色招募指令
	if (trigger.match(/^更新紀錄$/) != null) return exports.Update.UpdateLog();//更新紀錄指令
	//if (trigger.match(/^主線$/) != null) return exports.Story.mainStory(mainMsg[1],mainMsg[2]);	//遊戲主線指令
	
	////////////////////////////娛樂相關
        if (trigger.match(/空音/) != null) return exports.funny.randomReply() ;//空音閒談指令
	if (trigger.match(/空空/) != null) return exports.funny.randomReplyShin() ;//空音閒談指令(裏)
	if (trigger.match(/運氣|運勢/) != null) return exports.funny.randomLuck(mainMsg) ; //占卜運氣        
        if (trigger.match(/flag/) != null) return exports.funny.BStyleFlagSCRIPTS() ;//插旗用指令
	//塔羅牌
	if (trigger.match(/tarot|塔羅牌|塔羅/) != null) {
			if (trigger.match(/每日|daily/)!= null) {
				return exports.tarot.NomalDrawTarot(mainMsg[1], mainMsg[2]);
			}
			if (trigger.match(/時間|time/)!= null) {
				return exports.tarot.MultiDrawTarot(mainMsg[1], mainMsg[2], 1);
			}
			if (trigger.match(/大十字|cross/)!= null) {
				return exports.tarot.MultiDrawTarot(mainMsg[1], mainMsg[2], 2);
			}
			return exports.tarot.MultiDrawTarot(mainMsg[1], mainMsg[2], 3); //預設抽 79 張
	}
}


module.exports = {
	parseInput:parseInput
};
