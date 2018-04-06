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

					return rply;
					
				}
				
			}
			rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';
			
			return rply;
		}
	}
}

function InheritChatacter(UserID,Cname,password){
	for(var i=0; i< PD.length; i++){
		if(PD[i][0] == UserID && PD[i][1] != Cname){
			rply.text = '你的Line帳號已經有角色了，請輸入 玩家情報 確認';
			return rply;
		
		}
	}
	
	
	if(Cname == null){
		rply.text = '請輸入要繼承的角色名！';

		return rply;
		
	}else{

		for(var i=0; i< PD.length; i++){
			if (PD[i][1] == Cname) {
				if (PD[i][5] == 0) {
					rply.text = '此角色尚未開啟繼承模式！';

					return rply;
				}else if (password != PD[i][6] ) {
					rply.text = '繼承密碼有誤，請重新嘗試！';

					return rply;
					
				}else if(PD[i][0] == UserID){
					rply.text = '此角色是屬於你目前使用的Line帳號喔！關閉繼承模式';
					PD[i][5] = 0;
					PlayerData.saveArray(PD);

					return rply;
				}
				PD[i][5] = 0;
				PD[i][0] = UserID;
				PD[i][6] = '';
				PlayerData.saveArray(PD);
				
				BattleStates.InheritPlayer(UserID,Cname);
				WeaponBox.InheritPlayer(UserID,Cname);
				AccessoryBox.InheritPlayer(UserID,Cname);
				BadgeBox.InheritPlayer(UserID,Cname);
				MateBox.InheritPlayer(UserID,Cname);
				SkillBox.InheritPlayer(UserID,Cname);
				ItemBox.InheritPlayer(UserID,Cname);
				Guild.InheritPlayer(UserID,PD[i][14],Cname);

				rply.text = '角色' + Cname + '繼承完成！請輸入 玩家情報以進行確認';
				
				return rply;

			}

		}
		rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';

		return rply;
		
	}
}

function switchName(UserID,Name){
	for(var i=0; i< PD.length; i++){

		if (PD[i][1] == Name &&PD[i][0]!=UserID) {
			rply.text = '已經有人取這個名字了！請改取其它名字';

			return rply;
		}
	}
	
	for(var i=0; i< PD.length; i++){
		if(PD[i][0] == UserID){
			if(Name == null){
			
				rply.text = '請輸入想更換的名字';
				return rply;
			}
			
			if(PD[i][16] == 1){
				Guild.switchNameWL(PD[i][1],PD[i][17],Name);
				
			}
			
			PD[i][1] = Name;
			PlayerData.saveArray(PD);
			BattleStates.switchName(UserID,Name);
			WeaponBox.switchName(UserID,Name);
			AccessoryBox.switchName(UserID,Name);
			BadgeBox.switchName(UserID,Name);
			MateBox.switchName(UserID,Name);
			SkillBox.switchName(UserID,Name);
			ItemBox.switchName(UserID,Name);
			Guild.switchName(UserID,PD[i][14],Name);
			
			rply.text = '更名成功！你現在的名字為' + Name;
			return rply;
		
		}
	}
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;
}

function switchTitle(UserID,Name){
	for(var i=0; i< PD.length; i++){
		if(PD[i][0] == UserID){
			if(Name == null){
			
				rply.text = '請輸入想更換的稱號';
				return rply;
			}
			
			PD[i][4] = Name;
			PlayerData.saveArray(PD);
			
			rply.text = '更換稱號成功！你現在的稱號為' + Name;
			return rply;
		
		}
	}
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;
}


module.exports = {
	CreatNewPlayer,
	InheritModeOn,
	InheritChatacter,
	switchName,
	switchTitle
};
