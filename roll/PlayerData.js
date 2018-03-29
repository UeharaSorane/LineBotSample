var rply ={type : 'text'}; //type是必需的,但可以更改
var BoxOpen = require('./BoxOpen.js');
var BattleStates = require('./BattleStates.js');
var WB = require('./WeaponBox.js');
var BB = require('./BadgeBox.js');
var MB = require('./MateBox.js');
var SB = require('./SkillBox.js');
var IB = require('./ItemBox.js');
var Guild = require('./Guild.js');

var GB = Guild.GetArray();

var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var CharArr= [];
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					CharArr[i][2] = Number(rows[i].gold);
					CharArr[i][3] = Number(rows[i].mirastone);
					CharArr[i][4] = rows[i].title;
					CharArr[i][5] = rows[i].inheritio;
					CharArr[i][6] = rows[i].inheritpassword;
					CharArr[i][7] = Number(rows[i].wmaterials);
					CharArr[i][8] = Number(rows[i].wmaterialm);
					CharArr[i][9] = Number(rows[i].wmateriall);
					CharArr[i][10] = Number(rows[i].gmaterials);
					CharArr[i][11] = Number(rows[i].gmaterialm);
					CharArr[i][12] = Number(rows[i].gmateriall);
					CharArr[i][13] = Number(rows[i].mateshards);
					CharArr[i][14] = rows[i].guild;
					CharArr[i][15] = rows[i].guildtitle;
					CharArr[i][16] = rows[i].waitingg;
					CharArr[i][17] = rows[i].waitinggname;
					
				}
				//console.log(CharArr);
				console.log('玩家基本資料 讀取完成');
				//console.log();
			}
		

			
			});
	
		
		
	});

function ArrayUpdate() {

	DB.useServiceAccountAuth(creds, function (err) {



	 // Get all of the rows from the spreadsheet.
		DB.getRows(1 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{

					for(var i=0; i< CharArr.length; i++){

						rows[i].UserID = CharArr[i][0];
						rows[i].Cname = CharArr[i][1];
						rows[i].Gold = CharArr[i][2];
						rows[i].MiraStone = CharArr[i][3];
						rows[i].Title = CharArr[i][4];
						rows[i].InheritIO = CharArr[i][5];
						rows[i].InheritPassword = CharArr[i][6];
						rows[i].WmaterialS = CharArr[i][7];
						rows[i].WmaterialM = CharArr[i][8];
						rows[i].WmaterialL = CharArr[i][9];
						rows[i].GmaterialS = CharArr[i][10];
						rows[i].GmaterialM = CharArr[i][11];
						rows[i].GmaterialL = CharArr[i][12];
						rows[i].MateShards = CharArr[i][13];
						rows[i].guild = CharArr[i][14];
						rows[i].guildtitle = CharArr[i][15];
						rows[i].waitingg = CharArr[i][16];
						rows[i].waitinggname = CharArr[i][17];
						rows[i].save();

					}

					}
					console.log('玩家基本資料 更新完成');


				});



		});
	
}
	

function main(UserID) {
	///確認玩家資料
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text ='你的基本資料:\
				\n你的角色名:' + CharArr[i][1] + '\
				\n持有金幣: '+CharArr[i][2] + 'G\
				\n持有奇蹟石: '+CharArr[i][3] + '顆\
				\n當前稱號: '+CharArr[i][4] + '\
				\n-----持有素材-----\
				\n 武器素材(小):' + CharArr[i][7]+'\
				\n 武器素材(中):' + CharArr[i][8]+'\
				\n 武器素材(大):' + CharArr[i][9]+'\
				\n 公會素材(小):' + CharArr[i][10]+'\
				\n 公會素材(中):' + CharArr[i][11]+'\
				\n 公會素材(大):' + CharArr[i][12]+'\
				\n 夥伴碎片:' + CharArr[i][13] + '\
				\n-----公會相關-----\
				\n 所屬公會: ' + CharArr[i][14] + '\
				\n 公會職位: ' + CharArr[i][15] + '\
				\n--------------------------------';
			
			if(CharArr[i][5] == 1) rply.text += '\n!!!警告 繼承模式開啟中，請盡速繼承!!!';
			
			ArrayUpdate();
			BattleStates.ArrayUpdate();
			WB.UpdateArray();
			require('./AccessoryBox.js').UpdateArray();
			BB.UpdateArray();
			MB.UpdateArray();
			SB.UpdateArray();

			return rply;

		}
	}
	
	rply.text = '你的Line帳號尚未建立角色，請輸入 玩家建立 角色名 稱號(隨意) 初始武器(木劍、木弓、木短杖、木長杖、普通筆記本) 以建立角色';

	return rply;

	
	
  
	
	///

}

function SearchPlayer(Name) {
	///確認玩家資料
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][1] == Name) {
			rply.text ='查詢結果:\
				\n角色名:' + CharArr[i][1] + '\
				\n持有金幣: '+CharArr[i][2] + 'G\
				\n持有奇蹟石: '+CharArr[i][3] + '顆\
				\n當前稱號: '+CharArr[i][4] + '\
				\n-----持有素材-----\
				\n 武器素材(小):' + CharArr[i][7]+'\
				\n 武器素材(中):' + CharArr[i][8]+'\
				\n 武器素材(大):' + CharArr[i][9]+'\
				\n 公會素材(小):' + CharArr[i][10]+'\
				\n 公會素材(中):' + CharArr[i][11]+'\
				\n 公會素材(大):' + CharArr[i][12]+'\
				\n 夥伴碎片:' + CharArr[i][13]+ '\
				\n-----公會相關-----\
				\n 所屬公會: ' + CharArr[i][14] + '\
				\n 公會職位: ' + CharArr[i][15] + '\
				\n--------------------------------';

			return rply;

		}
	}
	
	if(Name == null){
		rply.text = '請輸入要查詢的角色名！';

		return rply;
		
	}
	
	rply.text = '找不到角色名為 ' + Name + ' 的角色喔！';

	return rply;

	
	
  
	
	///

}

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

function InheritModeOn(userID,Cname,password){
	if(Cname == null){
		rply.text = '請輸入要開啟繼承模式的角色名！';

		return rply;
		
	}else{
		for(var i=0; i< CharArr.length; i++){
			if(CharArr[i][1] == Cname && CharArr[i][0] !=userID){
				rply.text = '此角色不是屬於你的喔!';

				return rply;
			}
		
		}
		
		if(password == null){
			rply.text = '請輸入要用來繼承的專用密碼！(一旦建立就不能修改，請勿必記下)';

			return rply;
	
		}else{
			for(var i=0; i< CharArr.length; i++){
				if (CharArr[i][1] == Cname) {
					if (CharArr[i][5] == 1) {
						rply.text = '此角色已經開啟繼承模式了！如果忘記密碼，請找GM處理';

						return rply;
					}
					CharArr[i][5] = 1;
					CharArr[i][6] = password;
					DB.useServiceAccountAuth(creds, function (err) {
		
						DB.getRows(1 , 
							function (err, rows) {
								if (err) {
									console.log( err );
								}else{
									rows[i].inheritio = 1;
									rows[i].inheritpassword = password;
									rows[i].save();
								}
							});
					});
					rply.text = '角色' + Cname + '開啟繼承模式！請輸入 繼承 角色名 繼承密碼 進行繼承';
					
					ArrayUpdate();
			
					return rply;
					
				}
				
			}
			rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';
			
			return rply;
		}
	}
}

function InheritChatacter(UserID,Cname,password){
	for(var i=0; i< CharArr.length; i++){
		if(CharArr[i][0] == UserID && CharArr[i][1] != Cname){
			rply.text = '你的Line帳號已經有角色了，請輸入 玩家情報 確認';
			return rply;
		
		}
	}
	
	
	if(Cname == null){
		rply.text = '請輸入要繼承的角色名！';

		return rply;
		
	}else{

		for(var i=0; i< CharArr.length; i++){
			if (CharArr[i][1] == Cname) {
				if (CharArr[i][5] == 0) {
					rply.text = '此角色尚未開啟繼承模式！';

					return rply;
				}else if (password != CharArr[i][6] ) {
					rply.text = '繼承密碼有誤，請重新嘗試！';

					return rply;
					
				}else if(CharArr[i][0] == UserID){
					rply.text = '此角色是屬於你目前使用的Line帳號喔！關閉繼承模式';
					CharArr[i][5] = 0;
					DB.useServiceAccountAuth(creds, function (err) {
						DB.getRows(1 , 
							function (err, rows) {
								if (err) {
									console.log( err );
								}else{
									rows[i].inheritio = 0;
									rows[i].save();
								}
							});
					});

					return rply;
				}
				CharArr[i][5] = 0;
				CharArr[i][0] = UserID;
				CharArr[i][6] = '';
				
				BattleStates.InheritPlayer(UserID,Cname);
				WB.InheritPlayer(UserID,Cname);
				require('./AccessoryBox.js').InheritPlayer(UserID,Cname);
				BB.InheritPlayer(UserID,Cname);
				MB.InheritPlayer(UserID,Cname);
				SB.InheritPlayer(UserID,Cname);
				IB.InheritPlayer(UserID,Cname);
				Guild.InheritPlayer(UserID,CharArr[i][14],Cname);
				DB.useServiceAccountAuth(creds, function (err) {
					DB.getRows(1 , 
						function (err, rows) {
							if (err) {
								console.log( err );
							}else{
								rows[i].inheritio = 0;
								rows[i].userID = UserID;
								rows[i].inheritPassword = password;
								rows[i].save();
							}
						});
				});
				rply.text = '角色' + Cname + '繼承完成！請輸入 玩家情報以進行確認';
				
				ArrayUpdate();

				return rply;

			}

		}
		rply.text = '找不到角色名為 ' + Cname + ' 的角色喔！';

		return rply;
		
	}
}

function box(UserID,test){
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][0] == UserID) {
			rply.text ='玩家 ' + CharArr[i][1] + '開啟寶箱！';
			
			var OpenedBox = BoxOpen.main();
			
			rply.text += '\n' + OpenedBox[9];
			
			if(test == '測試'){
				rply.text+= '\n 注意，這只是測試，不具有實際效果(攤';
				return rply;
				
				
			}
			
			CharArr[i][2] += Number(OpenedBox[0]);
			CharArr[i][3] += Number(OpenedBox[1]);
			CharArr[i][7] += Number(OpenedBox[3]);
			CharArr[i][8] += Number(OpenedBox[4]);
			CharArr[i][9] += Number(OpenedBox[5]);
			CharArr[i][10] += Number(OpenedBox[6]);
			CharArr[i][11] += Number(OpenedBox[7]);
			CharArr[i][12] += Number(OpenedBox[8]);
			
			if(typeof(OpenedBox[2]) != 'undefined'){
				let tempS = SB.getSkill(UserID,OpenedBox[2]);
				
				rply.text += tempS[0];
				CharArr[i][2] += tempS[1];
				
			
			}
			
			ArrayUpdate();

			return rply;

		}
	}
	
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;

}

function GetArray(){
	return CharArr;

}

function switchName(UserID,Name){
	for(var i=0; i< CharArr.length; i++){

		if (CharArr[i][1] == Name &&CharArr[i][0]!=UserID) {
			rply.text = '已經有人取這個名字了！請改取其它名字';

			return rply;
		}
	}
	
	for(var i=0; i< CharArr.length; i++){
		if(CharArr[i][0] == UserID){
			if(Name == null){
			
				rply.text = '請輸入想更換的名字';
				return rply;
			}
			
			CharArr[i][1] = Name;
			ArrayUpdate();
			BattleStates.switchName(UserID,Name);
			WB.switchName(UserID,Name);
			require('./AccessoryBox.js').switchName(UserID,Name);
			BB.switchName(UserID,Name);
			MB.switchName(UserID,Name);
			SB.switchName(UserID,Name);
			IB.switchName(UserID,Name);
			
			if(CharArr[i][16] == 1){
				for(var j = 0;j<GB.length;j++){
					if(CharArr[i][17] == GB[j][0]){
						for(var k = 0; k<GB[j][7].length;k++){
							if(GB[j][7][k] == CharArr[i][1]){
								//console.log(GB[j][7][k]);


								GB[j][7].splice(k, 1);
								console.log(GB[j][7]);

								CharArr[i][16] = 0;
								CharArr[i][17] = '無';

								Guild.saveArray(GB);

								rply.text += '\n警告！因為更名，將取消申請加入公會 ' + GB[j][1] + '\n\n';
							}
						}

					}

				}
			}
			
			Guild.switchName(UserID,CharArr[i][14],Name);
			
			
			rply.text = '更名成功！你現在的名字為' + Name;
			return rply;
		
		}
	}
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;
}

function switchTitle(UserID,Name){
	for(var i=0; i< CharArr.length; i++){
		if(CharArr[i][0] == UserID){
			if(Name == null){
			
				rply.text = '請輸入想更換的名字';
				return rply;
			}
			
			CharArr[i][4] = Name;
			ArrayUpdate();
			
			rply.text = '更換稱號成功！你現在的稱號為' + Name;
			return rply;
		
		}
	}
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;
}

function saveArray(ReturnF){
	CharArr = ReturnF;
	ArrayUpdate();
}

function GuildInformation(UserID,command,guild){
	for(var i =0; i<CharArr.length;i++){
		if(UserID == CharArr[i][0]){
			if(command == null){
				rply.text =  Guild.guildView();
				return rply;
			}else if(command == '查詢'){
				rply.text =  Guild.guildSearch(guild);
				return rply;
			}else if(command == '加入'){
				if(CharArr[i][14] != '輔導公會'){
					rply.text = '錯誤！你已經有所屬公會了';
					return rply;
				}
				
				for(var j = 0;j<GB.length;j++){
					if(guild == GB[j][0]||guild == GB[j][1]){
						if(GB[j][6] == '自由加入'){
							if(GB[j][5]<10){
								CharArr[i][14] = GB[j][1];
								CharArr[i][15] = GB[j][4][GB[j][5]];
								
								GB[j][2][GB[j][5]] = UserID;
								GB[j][3][GB[j][5]] = CharArr[i][1];
								GB[j][5]++;
								
								Guild.saveArray(GB);
								ArrayUpdate();
								
								rply.text = '你成功加入該公會了！請輸入 公會確認 進行確認';
								
								return rply;
							}else{
								rply.text = '錯誤！此公會人數已滿！';
								
								return rply;
							}
						}if(GB[j][6] == '審核'){
							if(GB[j][5]<10){
								if(CharArr[i][16] == 1){
									rply.text = '錯誤！你已經提出申請了，不能一次申請多個公會！\
											\n 如果想終止申請，請輸入 公會 取消申請 即可';
									return rply;
								
								}
								CharArr[i][16] = 1;
								CharArr[i][17] = GB[j][0];
								let temp = GB[j][7].length;
								GB[j][7][temp] = CharArr[i][1];
								
								Guild.saveArray(GB);
								ArrayUpdate();
								
								rply.text = '你成功申請加入該公會了！請等待公會會長的同意\
										\n 如果想終止申請，請輸入 公會 取消申請 即可';
								
								return rply;
							}
						}
					}
				}
				
				rply.text = '錯誤！找不到該公會';
				return rply;
			}else if(command == '取消申請'){
				if(CharArr[i][16] == 1){
					for(var j = 0;j<GB.length;j++){
						if(CharArr[i][17] == GB[j][0]){
							for(var k = 0; k<GB[j][7].length;k++){
								if(GB[j][7][k] == CharArr[i][1]){
									//console.log(GB[j][7][k]);
									
									
									GB[j][7].splice(k, 1);
									console.log(GB[j][7]);
									
									CharArr[i][16] = 0;
									CharArr[i][17] = '無';
									
									Guild.saveArray(GB);
									ArrayUpdate();
									
									rply.text = '你取消申請加入公會 ' + GB[j][1] + ' 了！';
									return rply;
								}
							}
							
						}
						
					}
					
					
				}else{
					rply.text = '錯誤！你並沒有申請加入任何公會';
					return rply;
					
					
				}
			}else{
				rply.text = '錯誤！沒有 ' + command + '的指令';
				return rply;
				
			}
		}
	}
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;
	
}

function GuildManage(UserID,command,Name){
	for(var i =0; i<CharArr.length;i++){
		if(UserID == CharArr[i][0]){
			for(var j =0;j<GB.length;j++){
				if(GB[j][2][0] == UserID){
					if(command == null){
						rply.text = '歡迎' + GB[j][1] + '的' + GB[j][4][0] +'！\n-------------\n';
						rply.text += Guild.InGuildView(CharArr[i][14]);

						if(GB[j][7].length>0){
							rply.text += '\n!!!你有' + GB[j][7].length + '名玩家需要審核喔!!!\
									\n 請輸入 公會管理 審核 進行確認';
						}

						return rply;

					}else if(command == '審核'){
						rply.text = '歡迎' + GB[j][1] + '的' + GB[j][4][0] +'！\n-------------\n';

						if(GB[j][7].length == 0){
							rply.text += '沒有任何申請喔！';
							return rply;
						}else{
							rply.text += '這是待審核玩家清單:'
							
							for(var k =0; k<GB[j][7].length;k++){
								rply.text += '\n' + GB[j][7][k];
							}
							
							rply.text += '\n------------------\n要通過的話，請輸入 公會管理 通過審核 玩家名\
									\n\n 反之，則輸入 公會管理 拒絕審核 玩家名';
						}

						return rply;

					}else if(command == '通過審核'){
						if(GB[j][5]>=10){
							rply.text = '錯誤！你的公會人數已滿！';
								
							return rply;
						}else{
							if(Name == null){
								rply.text = '錯誤！請輸入想要通過審核的玩家名！';
								
								return rply;
							}else{
								for(var k =0; k<GB[j][7].length;k++){
									if(Name == GB[j][7][k]){
										
										for(var l = 0;l<CharArr.length;l++){
											if(Name == CharArr[l][1]){
												if(CharArr[l][14] != '輔導公會'){
													rply.text = '錯誤！此玩家已經有所屬公會了';
													return rply;
												}
												
												CharArr[l][14] = GB[j][1];
												CharArr[l][15] = GB[j][4][GB[j][5]];
												GB[j][7].splice(k, 1);

												CharArr[l][16] = 0;
												CharArr[l][17] = '無';

												GB[j][2][GB[j][5]] = CharArr[l][0];
												GB[j][3][GB[j][5]] = CharArr[l][1];
												GB[j][5]++;

												Guild.saveArray(GB);
												ArrayUpdate();

												rply.text = '玩家 '+ Name +'成功加入你的公會了！請主動通知他！';

												return rply;
												
											}
										}
									}
									
									rply.text = '嚴重錯誤！發現無資料的玩家名，請立刻通知GM！';
								
									return rply;
								}
							}
							rply.text = '錯誤！這名玩家沒有申請加入你的公會喔！';
								
							return rply;
						}	
					}else{
						rply.text = '錯誤！沒有 ' + command + '的指令';
						return rply;
					}
				}
			}
			rply.text = '錯誤！你並不具有會長權限';
			return rply;
		}
	}
	rply.text = '錯誤！此Line帳號尚未擁有角色';
	return rply;
}


module.exports = {
	main,
	SearchPlayer,
	CreatNewPlayer,
	ArrayUpdate,
	InheritModeOn,
	InheritChatacter,
	box,
	GetArray,
	switchName,
	switchTitle,
	saveArray,
	GuildInformation,
	GuildManage
};
