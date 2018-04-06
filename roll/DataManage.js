var rply ={type : 'text'}; //type是必需的,但可以更改

var PlayerData = require('./PlayerData.js');
var BattleStates = require('./BattleStates.js');
var WeaponBox = require('./WeaponBox.js');
var BadgeBox = require('./BadgeBox.js');
var MateBox = require('./MateBox.js');
var SkillBox = require('./SkillBox.js');
var ItemBox = require('./ItemBox.js');
var AccessoryBox = require('./AccessoryBox.js');
var Guild = require('./Guild.js');
var GuildFacility = require('./GuildFacility.js');

var PD = PlayerData.GetArray();
var BS = BattleStates.GetArray();
var WB = WeaponBox.GetArray();
var BB = BadgeBox.GetArray();
var MB = MateBox.GetArray();
var SB = SkillBox.GetArray();
var IB = ItemBox.GetArray();
var AB = AccessoryBox.GetArray();
var GD = Guild.GetArray();
var GF = GuildFacility.GetArray();


function CreatNewPlayer(UserID,CName,Title,weapon) {
	var CTitle;
	var CharArrleng = CharArr.length;
	
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text = '你的Line帳號已經有角色了，請輸入 玩家情報 確認';

			return rply;
		}
	}
	
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][1] == CName) {
			rply.text = '已經有人取這個名字了！請改取其它名字';

			return rply;
		}
	}
	
	
	if(CName == null||weapon == null) {
		
		rply.text = '有資料沒有填進去喔!';
				
		return rply;
        }
	
	if(Title == null) {
		
		CTitle = '冒險者';

        }else if(Title != null){
		CTitle = Title;
	}
	
	if(weapon == '木劍' || weapon == '木短杖' || weapon == '木長杖' ||weapon == '木弓' ||weapon == '普通筆記本'){
		BattleStates.CreatNewPlayer(UserID,CName,weapon);
		WB.CreatNewPlayer(UserID,CName,weapon);
		require('./AccessoryBox.js').CreatNewPlayer(UserID,CName);
		BB.CreatNewPlayer(UserID,CName);
		MB.CreatNewPlayer(UserID,CName);
		SB.CreatNewPlayer(UserID,CName);
		IB.CreatNewPlayer(UserID,CName);
		
	}else{
		rply.text = '請不要輸入起始武器以外的武器喔...';

		return rply;
	}
	
	CharArr[CharArrleng] = [];
	
	console.log(CharArrleng);
	
	CharArr[CharArrleng][0] = UserID;
	CharArr[CharArrleng][1] = CName;
	CharArr[CharArrleng][2] = 1000;
	CharArr[CharArrleng][3] = 5;
	CharArr[CharArrleng][4] = CTitle;
	CharArr[CharArrleng][5] = 0;
	CharArr[CharArrleng][7] = 0;
	CharArr[CharArrleng][8] = 0;
	CharArr[CharArrleng][9] = 0;
	CharArr[CharArrleng][10] = 0;
	CharArr[CharArrleng][11] = 0;
	CharArr[CharArrleng][12] = 0;
	CharArr[CharArrleng][13] = 0;
	CharArr[CharArrleng][14] = '輔導公會';
	CharArr[CharArrleng][15] = '會員';
	CharArr[CharArrleng][16] = 0;
	///確認玩家資料
	
	DB.useServiceAccountAuth(creds, function (err) {
 
	  // Get all of the rows from the spreadsheet.
	  DB.addRow(1, { Userid: UserID}, function(err) {
		  if(err) {
		    console.log(err);
		  }
		  
		});
	});
	
      
	rply.text = '玩家資料 ' + CName + ' 建立完成！請輸入 玩家情報 進行確認';
				
	return rply;
	
	///

}
