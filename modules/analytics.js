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
	if (trigger.match(/^寶箱$|^開寶箱$/) != null) return exports.PlayerData.box(UserID,mainMsg[1]) ;//寶箱狩獵指令
	if (trigger.match(/^武器圖鑑$/)!= null ) return exports.WeaponIllustration.WeapIllustration(mainMsg[1]);//武器圖鑑
	if (trigger.match(/^飾品圖鑑$/)!= null ) return exports.AccessoriesIllustration.AccessoriesIllustration(mainMsg[1]);//飾品圖鑑
	if (trigger.match(/^紋章圖鑑$/)!= null ) return exports.BadgeIllustration.BadgeIllustration(mainMsg[1]);//紋章圖鑑
	if (trigger.match(/^技能圖鑑$/)!= null ) return exports.SkillIllustration.SkillIllustration(mainMsg[1]);//技能圖鑑
	if (trigger.match(/^夥伴圖鑑$/)!= null ) return exports.TeammateIllustration.TMIllustration(mainMsg[1]);//夥伴圖鑑
	if (trigger.match(/^道具圖鑑$/)!= null ) return exports.itemIllustration.itemIllustration(mainMsg[1]);//夥伴圖鑑
	if (trigger.match(/^招募$/) != null) return exports.gacha.main(UserID, mainMsg[1],mainMsg[2],mainMsg[3]);//角色招募指令
	if (trigger.match(/^夥伴商店$/) != null) return exports.MateShop.MateShop(UserID, mainMsg[1],mainMsg[2]);//夥伴商店指令
	if (trigger.match(/^奇蹟石$/) != null) return exports.Mira.MiraShop(UserID, mainMsg[1],mainMsg[2]);//奇蹟石商店指令
	
	////////////////////////////娛樂相關

	////////////////////////////系統測試
	if (trigger.match(/^測試$/)!= null ) return exports.Test.main();//連結測試
	if (trigger.match(/^武器庫儲存$/)!= null ) return exports.WeaponBox.UpdateArray();//連結測試
	if (trigger.match(/^uid$/)!= null ) return exports.Test.UserID(UserID);//uid查詢測試
	
	if (trigger.match(/^testa$/)!= null ) return exports.AccessoryBox.testA();//所持飾品一覽
	
	////////////////////////////玩家資料相關
	if (trigger.match(/^玩家情報$/)!= null ) return exports.PlayerData.main(UserID);//玩家情報
	if (trigger.match(/^角色查詢$/)!= null ) return exports.PlayerData.SearchPlayer(mainMsg[1]);//查詢角色
	if (trigger.match(/^玩家建立$/)!= null ) return exports.PlayerData.CreatNewPlayer(UserID, mainMsg[1], mainMsg[2], mainMsg[3]);//建立新玩家
	if (trigger.match(/^資料庫更新$/)!= null ) return exports.PlayerData.ArrayUpdate();//資料庫外部更動更新
	if (trigger.match(/^繼承模式開啟$/)!= null ) return exports.PlayerData.InheritModeOn(UserID,mainMsg[1], mainMsg[2]);//開啟繼承權限
	if (trigger.match(/^繼承$/)!= null ) return exports.PlayerData.InheritChatacter(UserID, mainMsg[1], mainMsg[2]);//繼承角色
	if (trigger.match(/^更名$/)!= null ) return exports.PlayerData.switchName(UserID, mainMsg[1]);//更名
	if (trigger.match(/^更換稱號$/)!= null ) return exports.PlayerData.switchTitle(UserID, mainMsg[1]);//更換稱號
	if (trigger.match(/^公會$/)!= null ) return exports.PlayerData.GuildInformation(UserID, mainMsg[1], mainMsg[2]);//公會功能
	if (trigger.match(/^公會管理$/)!= null ){
		if(mainMsg[1] == '解散' && mainMsg[2] == '確定' && mainMsg[3] == '非常確定'){
			exports.GuildFacility.delGuild(UserID);
		}
		
		return exports.PlayerData.GuildManage(UserID, mainMsg[1], mainMsg[2], mainMsg[3]);//公會管理功能(會長限定)
	}
	
	
	if (trigger.match(/^公會設施$/)!= null ) return exports.GuildFacility.GuildCheck(UserID, mainMsg[1], mainMsg[2], mainMsg[3]);//確認公會設施
	
	////////////////////////////公會設施相關
	if (trigger.match(/^公會倉庫$/)!= null ) return exports.GuildFacility.Warehouse(UserID, mainMsg[1], mainMsg[2], mainMsg[3]);//公會倉庫
	if (trigger.match(/^訓練房$/)!= null ) return exports.GuildFacility.trainhouse(UserID, mainMsg[1], mainMsg[2], mainMsg[3]);//訓練房
	////////////////////////////戰鬥資料相關
	if (trigger.match(/^戰鬥能力$/)!= null ) return exports.BattleStates.BattleStates(UserID);//玩家情報
	if (trigger.match(/^角色能力查詢$/)!= null ) return exports.BattleStates.BattleStatesSearch(mainMsg[1]);//查詢角色能力
	
	///////////////////////////能力相關
	if (trigger.match(/^武器一覽$/)!= null ) return exports.WeaponBox.SearchWeapon(UserID);//所持武器一覽
	if (trigger.match(/^武器更換$/)!= null ) return exports.WeaponBox.SwitchWeapon(UserID,mainMsg[1]);//更換武器
	if (trigger.match(/^飾品一覽$/)!= null ) return exports.AccessoryBox.SearchAccessory(UserID);//所持飾品一覽
	if (trigger.match(/^飾品更換$/)!= null ) return exports.AccessoryBox.SwitchAccess(UserID,mainMsg[1]);//更換飾品
	if (trigger.match(/^紋章一覽$/)!= null ) return exports.BadgeBox.SearchBadge(UserID);//所持紋章一覽
	if (trigger.match(/^紋章更換$/)!= null ) return exports.BadgeBox.SwitchBadge(UserID,mainMsg[1]);//更換紋章
	if (trigger.match(/^夥伴一覽$/)!= null ) return exports.MateBox.SearchMate(UserID);//所持夥伴一覽
	if (trigger.match(/^夥伴更換$/)!= null ) return exports.MateBox.SwitchMate(UserID,mainMsg[1]);//更換夥伴
	if (trigger.match(/^技能一覽$/)!= null ) return exports.SkillBox.SearchSkill(UserID);//所持技能一覽
	if (trigger.match(/^技能更換$/)!= null ) return exports.SkillBox.switchSkill(UserID,mainMsg[1],mainMsg[2]);//更換技能
	if (trigger.match(/^訓練情報$/)!= null ) return exports.Training.TrainingStates(UserID);//確認訓練狀態
	if (trigger.match(/^訓練點數分配$/)!= null ) return exports.Training.setTrain(UserID,mainMsg[1],mainMsg[2],mainMsg[3]);//分配訓練點數
	if (trigger.match(/^基本能力分配$/)!= null ) return exports.Training.StandardPoint(UserID,mainMsg[1],mainMsg[2],mainMsg[3]);//分配基本能力點數
	if (trigger.match(/^道具一覽$/)!= null ) return exports.ItemBox.SearchItem(UserID);//所持道具一覽
	if (trigger.match(/^使用道具$/)!= null ) return exports.ItemBox.useItem(UserID,mainMsg[1],mainMsg[2]);//使用道具
	
}


module.exports = {
	parseInput:parseInput
};
