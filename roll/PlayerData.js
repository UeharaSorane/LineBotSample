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

DB.useServiceAccountAuth(creds, function (err) {
		DB.addRow(1, { Userid: '測試用'}, function(err) {
			if(err) {
				console.log(err);
		 	}else{
				//ArrayUpdate();
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

function CreatNewPlayer(userID,CName,Title,weapon) {
	var CharArrleng = CharArr.length;

	CharArr[CharArrleng] = [];
	
	CharArr[CharArrleng][0] = userID;
	CharArr[CharArrleng][1] = CName;
	CharArr[CharArrleng][2] = 1000;
	CharArr[CharArrleng][3] = 5;
	CharArr[CharArrleng][4] = Title;
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
		DB.addRow(1, { Userid: userID}, function(err) {
			if(err) {
				console.log(err);
		 	}else{
				//ArrayUpdate();
			}
		  
		});
	});
	
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
								CheckTitle(GB[j][1]);
								
								Guild.saveArray(GB);
								ArrayUpdate();
								
								rply.text = '你成功加入該公會了！請輸入 公會確認 進行確認';
								
								return rply;
							}else{
								rply.text = '錯誤！此公會人數已滿！';
								
								return rply;
							}
						}else if(GB[j][6] == '審核'){
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
						}else if(GB[j][6] == 'GM限定'){
							rply.text = '錯誤！你無法主動加入此公會！';
								
							return rply;
						}else if(GB[j][6] == '暫停招生'){
							rply.text = '錯誤！此公會暫時不開放招生！';
								
							return rply;
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
			}else if(command == '退出'){
				if(CharArr[i][14] == '輔導公會'){
					rply.text = '錯誤！你尚未加入任何公會';
					return rply;
				}
				
				if(guild !='確定'){
					rply.text = '你確定要退出公會 ' + CharArr[i][14] + ' 嗎？\
							\n 一旦退出將無法取回你已經投入公會的任何東西\
							\n 確定要退出的話，請輸入:\
							\n\n 公會 退出 確定';
					return rply;
				}
				
				for(var j = 0;j<GB.length;j++){
					if(CharArr[i][14] == GB[j][1]){
						if(CharArr[i][0] == GB[j][2][0]){
							rply.text = '錯誤！會長是不能退出公會的';
							return rply;
						}
						
						for(var k = 0; k<GB[j][2].length;k++){
							if(GB[j][2][k] == CharArr[i][0]){
								//console.log(GB[j][7][k]);


								GB[j][2].splice(k, 1);
								GB[j][3].splice(k, 1);
								GB[j][2][9] = '無';
								GB[j][3][9] = '無';

								CharArr[i][14] = '輔導公會';
								CharArr[i][15] = '會員';
								
								GB[j][5]--;
								CheckTitle(GB[j][1]);

								Guild.saveArray(GB);
								ArrayUpdate();

								rply.text = '你已退出公會 ' + GB[j][1] + ' 了！';
								return rply;
							}
						}
					}
				}
				
				rply.text = '嚴重錯誤！找不到你所屬的公會';
				return rply;
			}else if(command == '建立'){
				if(CharArr[i][14] != '輔導公會'){
					rply.text = '錯誤！你已經有所屬公會了';
					return rply;
				}else{
					if(guild == null ){
						rply.text = '請輸入想要創立的公會名';
						return rply;
					}else{
						for(var j = 0; j<GB.length;j++){
							if(guild == GB[j][1] ){
								rply.text = '已經有公會取這個名字了，請輸入其他名字';
								return rply;
							}else{
								let temp = 0;
								let leng = GB.length;
								for(var k = 0; k<GB.length ; k++){
									if(temp <= Number(GB[k][0])) temp = Number(GB[k][0]);
								}
								temp++;
								GB[leng] = [];
								GB[leng][0] = temp;
								GB[leng][1] = guild;
								GB[leng][2] = [UserID,'無','無','無','無','無','無','無','無','無'];
								GB[leng][3] = [CharArr[i][1],'無','無','無','無','無','無','無','無','無'];
								GB[leng][4] = ['會長','會員1','會員2','會員3','會員4','會員5','會員6','會員7','會員8','會員9'];
								GB[leng][5] = 1;
								GB[leng][6] = '自由加入';
								GB[leng][7] = [];
								
								CharArr[i][14] = GB[leng][1];
								CharArr[i][15] = GB[leng][4][0];
								
								Guild.creatGuild(GB[leng][0]);
								ArrayUpdate();
								
								rply.text = '你已創立公會 ' + guild + ' 了！\
								\n 請輸入 公會管理 完成創立';
								return rply;
								
							}
						}
					}
				}
				
				rply.text =  Guild.guildSearch(guild);
				return rply;
			}else if(command == '確認'){
				if(CharArr[i][14] == '輔導公會'){
					rply.text = '你目前尚未加入任何公會，將只能使用等級一的設施。';
					
					return rply;
				}else{
					for(var j =0;j<GB.length;j++){
						for(var k = 0;k<GB[j][2].length;k++){
							if(GB[j][2][k] == UserID){
								rply.text = '歡迎' + GB[j][1] + '的' + GB[j][4][k] +'！\n-------------\n';
								rply.text += Guild.InGuildView(CharArr[i][14]) + '\n想確認公會設施的狀態，請輸入\
															\n 公會設施 進行確認';
								
								return rply;
							}
						}
					}
					
					rply.text = '嚴重錯誤！發現無資料的公會，請立刻通知GM！';
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

function GuildManage(UserID,command,Name, title){
	for(var i =0; i<CharArr.length;i++){
		if(UserID == CharArr[i][0]){
			for(var j =0;j<GB.length;j++){
				if(GB[j][2][0] == UserID){
					if(command == null){
						rply.text = '歡迎' + GB[j][1] + '的' + GB[j][4][0] +'！\n-------------\n';
						rply.text += Guild.InGuildView(CharArr[i][14]);

						if(GB[j][7].length>1){
							rply.text += '\n!!!你有' + (GB[j][7].length-1) + '名玩家需要審核喔!!!\
									\n 請輸入 公會管理 審核 進行確認';
						}

						return rply;

					}else if(command == '審核'){
						rply.text = '歡迎' + GB[j][1] + '的' + GB[j][4][0] +'！\n-------------\n';

						if(GB[j][7].length == 1){
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
												CheckTitle(GB[j][1]);
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
										rply.text = '嚴重錯誤！發現無資料的玩家名，請立刻通知GM！';
								
										return rply;
									}
								}
								rply.text = '錯誤！這名玩家沒有申請加入你的公會喔！';
								
								return rply;
							}
						}	
					}else if(command == '拒絕審核'){
						if(Name == null){
							rply.text = '錯誤！請輸入想要拒絕審核的玩家名！';

							return rply;
						}else{
							for(var k =0; k<GB[j][7].length;k++){
								if(Name == GB[j][7][k]){

									for(var l = 0;l<CharArr.length;l++){
										if(Name == CharArr[l][1]){
											
											GB[j][7].splice(k, 1);

											CharArr[l][16] = 0;
											CharArr[l][17] = '無';

											Guild.saveArray(GB);
											ArrayUpdate();

											rply.text = '已經拒絕玩家 '+ Name +'的申請了！請主動通知他！';

											return rply;

										}
									}
									rply.text = '嚴重錯誤！發現無資料的玩家名，請立刻通知GM！';

									return rply;
								}
							}
							rply.text = '錯誤！這名玩家沒有申請加入你的公會喔！';

							return rply;
						}
					}else if(command == '招生模式'){
						if(Name == null){
							rply.text = '請輸入想要更換的招生模式(自由加入、審核、暫停招生)！';

							return rply;
						}else{
							if(Name != '自由加入' && Name != '審核' && Name != '暫停招生'){
								rply.text = '錯誤！沒有' + Name + '這種招生模式';

								return rply;
							}
							
							GB[j][6] = Name;
							Guild.saveArray(GB);
							
							rply.text = '招生模式變更完成！';

							return rply;
						}
					}else if(command == '職稱更換'){
						if(Name == null && title == null){
							rply.text = '請輸入\
									\n公會管理 職稱更換 想要更換的成員編號(1~10) 職稱！';

							return rply;
						}else{
							if(Name >10 || Name <1||isNaN(Name)){
								rply.text = '錯誤！編號只有1~10喔';

								return rply;
							}
							
							if(title == null){
								rply.text = '錯誤！請輸入想要更換的職稱名';

								return rply;
							}
							
							GB[j][4][Name-1] = title;
							CheckTitle(GB[j][1]);
							Guild.saveArray(GB);
							
							rply.text = '職稱變更完成！';

							return rply;
						}
					}else if(command == '驅逐' ){
						if(Name == null){
							rply.text = '請輸入想要驅逐的會員！';

							return rply;
						}else{
							if(Name == GB[j][3][0]){
								rply.text = '錯誤！你不能驅逐你自己';
								return rply;
							}
							
							for(var k = 0; k<GB[j][3].length;k++){
								if(GB[j][3][k] == Name){
									if(title != '確定'){
										rply.text = '你確定要驅逐會員 ' + GB[j][3][k] + ' 嗎？\
												\n 一旦確認後將無法反悔\
												\n 確定要驅逐他的話，請輸入:\
												\n\n 公會管理 驅逐 玩家名 確定';
										return rply;
									}else{
										for(var l = 0;l<CharArr.length;l++){
											if(Name == CharArr[l][1]){
												
												GB[j][2].splice(k, 1);
												GB[j][3].splice(k, 1);
												GB[j][2][9] = '無';
												GB[j][3][9] = '無';

												CharArr[l][14] = '輔導公會';
												CharArr[l][15] = '會員';

												GB[j][5]--;
												CheckTitle(GB[j][1]);

												Guild.saveArray(GB);
												ArrayUpdate();

												rply.text = '你成功驅逐玩家 ' + Name + ' 了！';
												return rply;
												
											}
										}
										rply.text = '嚴重錯誤！發現無資料的玩家名，請立刻通知GM！';
								
										return rply;
										
									}
								}
								
							}
							
							rply.text = '錯誤！這名玩家不屬於你的公會喔！';

							return rply;
						}
					}else if(command == '會長交換' ){
						if(Name == null){
							rply.text = '請輸入想要給予會長權限的會員！';

							return rply;
						}else{
							if(Name == GB[j][3][0]){
								rply.text = '錯誤！和自己交換會長權限一點意義都沒有啊';
								return rply;
							}
							
							for(var k = 0; k<GB[j][3].length;k++){
								if(GB[j][3][k] == Name){
									if(title != '確定'){
										rply.text = '你確定要把會長權限交給 ' + GB[j][3][k] + ' 嗎？\
												\n 一旦確認後將無法反悔\
												\n 確定要交換的話，請輸入:\
												\n\n 公會管理 會長交換 玩家名 確定';
										return rply;
									}else{
										for(var l = 0;l<CharArr.length;l++){
											if(Name == CharArr[l][1]){
												let temp1 = UserID;
												let temp2 = GB[j][3][0];
												
												
												GB[j][3][0] = GB[j][3][k];
												GB[j][2][0] = GB[j][2][k];
												
												GB[j][2][k] = temp1;
												GB[j][3][k] = temp2;
		
												CheckTitle(GB[j][1]);

												Guild.saveArray(GB);
												ArrayUpdate();

												rply.text = '你成功把會長權力交給玩家 ' + Name + ' 了！';
												return rply;
												
											}
										}
										rply.text = '嚴重錯誤！發現無資料的玩家名，請立刻通知GM！';
								
										return rply;
										
									}
								}
							}
							
							rply.text = '錯誤！這名玩家不屬於你的公會喔！';

							return rply;
						}
					}else if(command == '解散'){
						if(Name != '確定'){
							rply.text = '你確定要解散公會 ' + GB[j][1] + ' 嗎？\
									\n 一旦確認後將無法拿回已經投入公會的全部素材，而且所有成員將全數退出公會\
									\n 確定要解散的話，請輸入:\
									\n\n 公會管理 解散 確定';
							return rply;
						}else{
							if(title != '非常確定'&&title != '完全確定'){
								rply.text = '你真的確定要解散公會 ' + GB[j][1] + ' 嗎？\
										\n 一旦確認後將無法拿回已經投入公會的全部素材，而且所有成員將全數退出公會\
										\n 真的確定要解散的話，請輸入:\
										\n\n 公會管理 解散 確定 非常確定';
								return rply;
							}else if(title != '完全確定'){
								rply.text = '!!!!!最終警告!!!!! \
								\n!!!!!下一步將正式動作，請三思而後行!!!!!\
								\n\
								\n你真的完全確定要解散公會 ' + GB[j][1] + ' 嗎？\
										\n 一旦確認後將無法拿回已經投入公會的全部素材，而且所有成員將全數退出公會\
										\n 真的確定要解散的話，請輸入:\
										\n\n 公會管理 解散 確定 完全確定';
								return rply;
							}else{
								for(var k = 0; k<GB[j][3].length; k++){
									for(var l = 0; l<CharArr.length; l++){
										if(GB[j][3][k] == CharArr[l][1]){

											CharArr[l][14] = '輔導公會';
											CharArr[l][15] = '會員';

										}
										
									}
									
									
								}
								
								GB.splice(j, 1);
								Guild.DelGuild(GB);
								rply.text = '公會成功解散了！';
								return rply;
								
							}
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

function CheckTitle(guild){
	for(var i=0;i<GB.length;i++){
		if(GB[i][1] == guild){
			for(var j = 0; j<GB[i][5]; j++){
				for(var k = 0; k<CharArr.length;k++){
					if(GB[i][2][j] == CharArr[k][0]){
						CharArr[k][15] = GB[i][4][j];
						ArrayUpdate();
					}
				}
			}
		}
	}
	
}


module.exports = {
	main,
	SearchPlayer,
	ArrayUpdate,
	InheritModeOn,
	InheritChatacter,
	box,
	GetArray,
	switchName,
	switchTitle,
	saveArray,
	GuildInformation,
	GuildManage,
	CreatNewPlayer
};
