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
	var PDleng = PD.length;
	
	for(var i=0; i< PD.length; i++){

		if (PD[i][0] == UserID) {
			rply.text = '你的Line帳號已經有角色了，請輸入 玩家情報 確認';
			return rply;
		}
	}
	
	for(var i=0; i< PD.length; i++){

		if (PD[i][1] == CName) {
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
		PlayerData.CreatNewPlayer(UserID,CName,CTitle,weapon);
		BattleStates.CreatNewPlayer(UserID,CName,weapon);
		WeaponBox.CreatNewPlayer(UserID,CName,weapon);
		AccessoryBox.CreatNewPlayer(UserID,CName);
		BadgeBox.CreatNewPlayer(UserID,CName);
		MateBox.CreatNewPlayer(UserID,CName);
		SkillBox.CreatNewPlayer(UserID,CName);
		ItemBox.CreatNewPlayer(UserID,CName);
		rply.text = '玩家資料 ' + CName + ' 建立完成！';
				
		return rply;
	}else{
		rply.text = '請不要輸入起始武器以外的武器喔...';
		return rply;
	}
	
	///

}

function InheritModeOn(userID,Cname,password){
	if(Cname == null){
		rply.text = '請輸入要開啟繼承模式的角色名！';

		return rply;
		
	}else{
		for(var i=0; i< PD.length; i++){
			if(PD[i][1] == Cname && PD[i][0] !=userID){
				rply.text = '此角色不是屬於你的喔!';

				return rply;
			}
		
		}
		
		if(password == null){
			rply.text = '請輸入要用來繼承的專用密碼！(一旦建立就不能修改，請勿必記下)';

			return rply;
	
		}else{
			for(var i=0; i< PD.length; i++){
				if (PD[i][1] == Cname) {
					if (PD[i][5] == 1) {
						rply.text = '此角色已經開啟繼承模式了！如果忘記密碼，請找GM處理';

						return rply;
					}
					PD[i][5] = 1;
					PD[i][6] = password;
					
					PlayerData.saveArray(PD);

					rply.text = '角色' + Cname + '開啟繼承模式！請輸入 繼承 角色名 繼承密碼 進行繼承';
					
					ArrayUpdate();
			
					return rply;
					
				}
				
			}
			rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';
			
			return rply;
		}
}


module.exports = {
	CreatNewPlayer,
	InheritModeOn
};
