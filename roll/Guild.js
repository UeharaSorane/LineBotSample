var rply ={type : 'text'}; //type是必需的,但可以更改
var returnRply;
var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var GuildFacility = require('./GuildFacility.js');
var PlayerData = require('./PlayerData.js');
var PD = PlayerData.GetArray();
var GF = GuildFacility.GetArray();

var CharArr= [];

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(21 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].guildid;
					CharArr[i][1] = rows[i].guildname;
					CharArr[i][2] = rows[i].memberid.split(',');
					CharArr[i][3] = rows[i].membername.split(',');
					CharArr[i][4] = rows[i].membertitle.split(',');
					CharArr[i][5] = Number(rows[i].membern);
					CharArr[i][6] = rows[i].jointype;
					CharArr[i][7] = rows[i].waitlist.split(',');
					
				}
				//console.log(CharArr);
				console.log('公會基本資料 讀取完成');
				//console.log();
			}
		

			
			});
	
		
		
	});

function ArrayUpdate() {

	DB.useServiceAccountAuth(creds, function (err) {



	 // Get all of the rows from the spreadsheet.
		DB.getRows(21 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{

					for(var i=0; i< CharArr.length; i++){

						rows[i].guildid = CharArr[i][0];
						rows[i].guildname = CharArr[i][1];
						rows[i].memberid = CharArr[i][2].join(',');
						rows[i].membername = CharArr[i][3].join(',');
						rows[i].membertitle = CharArr[i][4].join(',');
						rows[i].membern = CharArr[i][5];
						rows[i].jointype = CharArr[i][6];
						rows[i].waitlist = CharArr[i][7].join(',');
						rows[i].save();
						

					}

					}
					console.log('公會基本資料 更新完成');


				});



		});
	
}

function guildView(){
	returnRply = '【公會一覽】';
	
	for(var i  =0; i<CharArr.length;i++){
		returnRply+= '\n [' + CharArr[i][0] + '] ' + CharArr[i][1] + ' (' + CharArr[i][5] + '人) [' + CharArr[i][6] + ']';
	}
	
	returnRply += '\n 如果想要確認公會詳細內容，請輸入 公會 公會名(公會編號) 進行查詢';
	
	ArrayUpdate();
	
	return returnRply;
}

function guildSearch(GuildName){
	for(var i =0; i<CharArr.length;i++){
		if(CharArr[i][1] == '輔導公會'){
			returnRply = '【輔導公會】 無公會玩家的歸宿\
					\n 只要你沒有加入公會，就會來到這裡！';
			return returnRply;
			
		}else if(CharArr[i][1] == GuildName || CharArr[i][0] == GuildName){
			returnRply = '【公會情報】\
					\n 公會編號: ' + CharArr[i][0] + '\
					\n 公會名: ' + CharArr[i][1] + '\
					\n 公會會長: ' + CharArr[i][3][0] + '\
					\n 公會人數: ' + CharArr[i][5] + '\
					\n 公會加入模式: ' + CharArr[i][6] + '\
					\n-----公會成員-----';
			
			for(var j = 0;j<CharArr[i][3].length; j++){
				returnRply += '\n' + CharArr[i][4][j] + ': ' + CharArr[i][3][j];
			}
			
			if(CharArr[i][6] == 'GM限定'){
				returnRply += '\n\n這是GM限定公會，一般人是加不進來的';
			}else if(CharArr[i][6] == '自由加入'){
				returnRply += '\n\n這是可以自由加入的公會，請輸入 公會 加入 公會名 就能直接加入公會了';
			}else if(CharArr[i][6] == '審核'){
				returnRply += '\n\n這是必須審核才能加入的公會，請輸入 公會 加入 公會名 並等待公會會長同意';
			}else if(CharArr[i][6] == '暫停招生'){
				returnRply += '\n\n目前這個公會暫時停止招募新人了';
			}
			
			return returnRply;
			
		}
	}
	
	return guildView();
	
}

function GetArray(){
	return CharArr;
}

function InheritPlayer(UserID,Guild,Name){
	for(var i =0; i<CharArr.length;i++){
		if(CharArr[i][1] == Guild && CharArr[i][1] != '輔導公會'){
			for(var j = 0;j<CharArr[i][3].length;j++){
				if(CharArr[i][3][j] == Name){
					CharArr[i][2][j] = UserID;
					ArrayUpdate();
				}
			}
		}
	}
}

function switchName(UserID,Guild,Name){
	for(var i =0; i<CharArr.length;i++){
		if(CharArr[i][1] == Guild && CharArr[i][1] != '輔導公會'){
			for(var j = 0;j<CharArr[i][2].length;j++){
				if(CharArr[i][2][j] == UserID){
					CharArr[i][3][j] = Name;
					
					ArrayUpdate();
				}
			}
		}
	}
}

function switchNameWL(NameB,Guild,Name){
	for(var i =0; i<CharArr.length;i++){
		if(CharArr[i][1] == Guild){
			for(var j = 0;j<CharArr[i][7].length;j++){
				if(CharArr[i][7][j] == NameB){
					CharArr[i][7][j] = Name;
					
					ArrayUpdate();
				}
			}
		}
	}
}

function saveArray(ReturnF){
	
	CharArr = ReturnF;
	console.log(CharArr[0][3].join(','));
	ArrayUpdate();
}

function InGuildView(GuildName){
	for(var i =0; i<CharArr.length;i++){
		if(CharArr[i][1] == '輔導公會'){
			returnRply = '【輔導公會】 無公會玩家的歸宿\
					\n 只要你沒有加入公會，就會來到這裡！';
			return returnRply;
			
		}else if(CharArr[i][1] == GuildName || CharArr[i][0] == GuildName){
			returnRply = '【公會情報】\
					\n 公會編號: ' + CharArr[i][0] + '\
					\n 公會名: ' + CharArr[i][1] + '\
					\n 公會會長: ' + CharArr[i][3][0] + '\
					\n 公會人數: ' + CharArr[i][5] + '\
					\n 公會加入模式: ' + CharArr[i][6] + '\
					\n-----公會成員-----';
			
			for(var j = 0;j<CharArr[i][3].length; j++){
				returnRply += '\n' + CharArr[i][4][j] + ': ' + CharArr[i][3][j];
			}
			
			return returnRply;
			
		}
	}
}


function GuildInformation(UserID,command,guild){
	for(var i =0; i<PD.length;i++){
		if(UserID == PD[i][0]){
			if(command == null){
				rply.text =  guildView();
				return rply;
			}else if(command == '查詢'){
				rply.text =  guildSearch(guild);
				return rply;
			}else if(command == '加入'){
				if(PD[i][14] != '輔導公會'){
					rply.text = '錯誤！你已經有所屬公會了';
					return rply;
				}
				
				for(var j = 0;j<CharArr.length;j++){
					if(guild == CharArr[j][0]||guild == CharArr[j][1]){
						if(CharArr[j][6] == '自由加入'){
							if(CharArr[j][5]<10){
								PD[i][14] = CharArr[j][1];
								PD[i][15] = CharArr[j][4][CharArr[j][5]];
								
								CharArr[j][2][CharArr[j][5]] = UserID;
								CharArr[j][3][CharArr[j][5]] = PD[i][1];
								CharArr[j][5]++;
								CheckTitle(CharArr[j][1]);
								
								PlayerData.saveArray(PD);
								ArrayUpdate();
								
								rply.text = '你成功加入該公會了！請輸入 公會確認 進行確認';
								
								return rply;
							}else{
								rply.text = '錯誤！此公會人數已滿！';
								
								return rply;
							}
						}else if(CharArr[j][6] == '審核'){
							if(CharArr[j][5]<10){
								if(PD[i][16] == 1){
									rply.text = '錯誤！你已經提出申請了，不能一次申請多個公會！\
											\n 如果想終止申請，請輸入 公會 取消申請 即可';
									return rply;
								
								}
								PD[i][16] = 1;
								PD[i][17] = CharArr[j][0];
								let temp = CharArr[j][7].length;
								CharArr[j][7][temp] = PD[i][1];
								
								PlayerData.saveArray(PD);
								ArrayUpdate();
								
								rply.text = '你成功申請加入該公會了！請等待公會會長的同意\
										\n 如果想終止申請，請輸入 公會 取消申請 即可';
								
								return rply;
							}
						}else if(CharArr[j][6] == 'GM限定'){
							rply.text = '錯誤！你無法主動加入此公會！';
								
							return rply;
						}else if(CharArr[j][6] == '暫停招生'){
							rply.text = '錯誤！此公會暫時不開放招生！';
								
							return rply;
						}
					}
				}
				
				rply.text = '錯誤！找不到該公會';
				return rply;
			}else if(command == '取消申請'){
				if(PD[i][16] == 1){
					for(var j = 0;j<CharArr.length;j++){
						if(PD[i][17] == CharArr[j][0]){
							for(var k = 0; k<CharArr[j][7].length;k++){
								if(CharArr[j][7][k] == PD[i][1]){
									//console.log(CharArr[j][7][k]);
									
									
									CharArr[j][7].splice(k, 1);
									console.log(CharArr[j][7]);
									
									PD[i][16] = 0;
									PD[i][17] = '無';
									
									PlayerData.saveArray(PD);
									ArrayUpdate();
									
									rply.text = '你取消申請加入公會 ' + CharArr[j][1] + ' 了！';
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
				if(PD[i][14] == '輔導公會'){
					rply.text = '錯誤！你尚未加入任何公會';
					return rply;
				}
				
				if(PD[i][0] == CharArr[j][2][0]){
					rply.text = '錯誤！會長是不能退出公會的';
					return rply;
				}
				
				if(guild !='確定'){
					rply.text = '你確定要退出公會 ' + PD[i][14] + ' 嗎？\
							\n 一旦退出將無法取回你已經投入公會的任何東西\
							\n 確定要退出的話，請輸入:\
							\n\n 公會 退出 確定';
					return rply;
				}
				
				for(var j = 0;j<CharArr.length;j++){
					if(PD[i][14] == CharArr[j][1]){
						
						for(var k = 0; k<CharArr[j][2].length;k++){
							if(CharArr[j][2][k] == PD[i][0]){
								//console.log(CharArr[j][7][k]);


								CharArr[j][2].splice(k, 1);
								CharArr[j][3].splice(k, 1);
								CharArr[j][2][9] = '無';
								CharArr[j][3][9] = '無';

								PD[i][14] = '輔導公會';
								PD[i][15] = '會員';
								
								CharArr[j][5]--;
								CheckTitle(CharArr[j][1]);

								PlayerData.saveArray(PD);
								ArrayUpdate();

								rply.text = '你已退出公會 ' + CharArr[j][1] + ' 了！';
								return rply;
							}
						}
					}
				}
				
				rply.text = '嚴重錯誤！找不到你所屬的公會';
				return rply;
			}else if(command == '建立'){
				if(PD[i][14] != '輔導公會'){
					rply.text = '錯誤！你已經有所屬公會了';
					return rply;
				}else{
					if(guild == null ){
						rply.text = '請輸入想要創立的公會名';
						return rply;
					}else{
						for(var j = 0; j<CharArr.length;j++){
							if(guild == CharArr[j][1] ){
								rply.text = '已經有公會取這個名字了，請輸入其他名字';
								return rply;
							}else{
								let temp = 0;
								let leng = CharArr.length;
								for(var k = 0; k<CharArr.length ; k++){
									if(temp <= Number(CharArr[k][0])) temp = Number(CharArr[k][0]);
								}
								temp++;
								CharArr[leng] = [];
								CharArr[leng][0] = temp;
								CharArr[leng][1] = guild;
								CharArr[leng][2] = [UserID,'無','無','無','無','無','無','無','無','無'];
								CharArr[leng][3] = [PD[i][1],'無','無','無','無','無','無','無','無','無'];
								CharArr[leng][4] = ['會長','會員1','會員2','會員3','會員4','會員5','會員6','會員7','會員8','會員9'];
								CharArr[leng][5] = 1;
								CharArr[leng][6] = '自由加入';
								CharArr[leng][7] = [];
								
								PD[i][14] = CharArr[leng][1];
								PD[i][15] = CharArr[leng][4][0];
								
								GuildFacility.CreatNewGuild(UserID,PD[i][1],temp,guild);
								
								DB.useServiceAccountAuth(creds, function (err) {
 
									  // Get all of the rows from the spreadsheet.
									  DB.addRow(21, { Guildid: temp}, function(err) {
										  if(err) {
											console.log(err);
										  }else{
											  ArrayUpdate();
										  }
										  
										});
									});
								
								rply.text = '你成功創立公會 ' + guild + ' 了！';
								return rply;
								
							}
						}
					}
				}
			}else if(command == '確認'){
				if(PD[i][14] == '輔導公會'){
					rply.text = '你目前尚未加入任何公會，將只能使用等級一的設施。';
					
					return rply;
				}else{
					for(var j =0;j<CharArr.length;j++){
						for(var k = 0;k<CharArr[j][2].length;k++){
							if(CharArr[j][2][k] == UserID){
								rply.text = '歡迎' + CharArr[j][1] + '的' + CharArr[j][4][k] +'！\n-------------\n';
								rply.text += InGuildView(PD[i][14]) + '\n想確認公會設施的狀態，請輸入\
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
	for(var i =0; i<PD.length;i++){
		if(UserID == PD[i][0]){
			for(var j =0;j<CharArr.length;j++){
				if(CharArr[j][2][0] == UserID){
					if(command == null){
						rply.text = '歡迎' + CharArr[j][1] + '的' + CharArr[j][4][0] +'！\n-------------\n';
						rply.text += InGuildView(PD[i][14]);

						if(CharArr[j][7].length>1){
							rply.text += '\n!!!你有' + (CharArr[j][7].length-1) + '名玩家需要審核喔!!!\
									\n 請輸入 公會管理 審核 進行確認';
						}

						return rply;

					}else if(command == '審核'){
						rply.text = '歡迎' + CharArr[j][1] + '的' + CharArr[j][4][0] +'！\n-------------\n';

						if(CharArr[j][7].length == 1){
							rply.text += '沒有任何申請喔！';
							return rply;
						}else{
							rply.text += '這是待審核玩家清單:'
							
							for(var k =0; k<CharArr[j][7].length;k++){
								rply.text += '\n' + CharArr[j][7][k];
							}
							
							rply.text += '\n------------------\n要通過的話，請輸入 公會管理 通過審核 玩家名\
									\n\n 反之，則輸入 公會管理 拒絕審核 玩家名';
						}

						return rply;

					}else if(command == '通過審核'){
						if(CharArr[j][5]>=10){
							rply.text = '錯誤！你的公會人數已滿！';
								
							return rply;
						}else{
							if(Name == null){
								rply.text = '錯誤！請輸入想要通過審核的玩家名！';
								
								return rply;
							}else{
								for(var k =0; k<CharArr[j][7].length;k++){
									if(Name == CharArr[j][7][k]){
										
										for(var l = 0;l<PD.length;l++){
											if(Name == PD[l][1]){
												if(PD[l][14] != '輔導公會'){
													rply.text = '錯誤！此玩家已經有所屬公會了';
													return rply;
												}
												
												PD[l][14] = CharArr[j][1];
												CheckTitle(CharArr[j][1]);
												CharArr[j][7].splice(k, 1);

												PD[l][16] = 0;
												PD[l][17] = '無';

												CharArr[j][2][CharArr[j][5]] = PD[l][0];
												CharArr[j][3][CharArr[j][5]] = PD[l][1];
												CharArr[j][5]++;

												PlayerData.saveArray(PD);
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
							for(var k =0; k<CharArr[j][7].length;k++){
								if(Name == CharArr[j][7][k]){

									for(var l = 0;l<PD.length;l++){
										if(Name == PD[l][1]){
											
											CharArr[j][7].splice(k, 1);

											PD[l][16] = 0;
											PD[l][17] = '無';

											PlayerData.saveArray(PD);
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
							
							CharArr[j][6] = Name;
							PlayerData.saveArray(PD);
							
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
							
							CharArr[j][4][Name-1] = title;
							CheckTitle(CharArr[j][1]);
							PlayerData.saveArray(PD);
							
							rply.text = '職稱變更完成！';

							return rply;
						}
					}else if(command == '驅逐' ){
						if(Name == null){
							rply.text = '請輸入想要驅逐的會員！';

							return rply;
						}else{
							if(Name == CharArr[j][3][0]){
								rply.text = '錯誤！你不能驅逐你自己';
								return rply;
							}
							
							for(var k = 0; k<CharArr[j][3].length;k++){
								if(CharArr[j][3][k] == Name){
									if(title != '確定'){
										rply.text = '你確定要驅逐會員 ' + CharArr[j][3][k] + ' 嗎？\
												\n 一旦確認後將無法反悔\
												\n 確定要驅逐他的話，請輸入:\
												\n\n 公會管理 驅逐 玩家名 確定';
										return rply;
									}else{
										for(var l = 0;l<PD.length;l++){
											if(Name == PD[l][1]){
												
												CharArr[j][2].splice(k, 1);
												CharArr[j][3].splice(k, 1);
												CharArr[j][2][9] = '無';
												CharArr[j][3][9] = '無';

												PD[l][14] = '輔導公會';
												PD[l][15] = '會員';

												CharArr[j][5]--;
												CheckTitle(CharArr[j][1]);

												PlayerData.saveArray(PD);
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
							if(Name == CharArr[j][3][0]){
								rply.text = '錯誤！和自己交換會長權限一點意義都沒有啊';
								return rply;
							}
							
							for(var k = 0; k<CharArr[j][3].length;k++){
								if(CharArr[j][3][k] == Name){
									if(title != '確定'){
										rply.text = '你確定要把會長權限交給 ' + CharArr[j][3][k] + ' 嗎？\
												\n 一旦確認後將無法反悔\
												\n 確定要交換的話，請輸入:\
												\n\n 公會管理 會長交換 玩家名 確定';
										return rply;
									}else{
										for(var l = 0;l<PD.length;l++){
											if(Name == PD[l][1]){
												let temp1 = UserID;
												let temp2 = CharArr[j][3][0];
												
												
												CharArr[j][3][0] = CharArr[j][3][k];
												CharArr[j][2][0] = CharArr[j][2][k];
												
												for(var m = 0; m<GF.length;m++){
													if(CharArr[j][1] == GF[m][1]){
														GF[m][16] = CharArr[j][3][k];
														GF[m][15] = CharArr[j][2][k];
														
														GuildFacility.saveArray(GF);
													}
												}
												
												CharArr[j][2][k] = temp1;
												CharArr[j][3][k] = temp2;
		
												CheckTitle(CharArr[j][1]);

												PlayerData.saveArray(PD);
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
							rply.text = '你確定要解散公會 ' + CharArr[j][1] + ' 嗎？\
									\n 一旦確認後將無法拿回已經投入公會的全部素材，而且所有成員將全數退出公會\
									\n 確定要解散的話，請輸入:\
									\n\n 公會管理 解散 確定';
							return rply;
						}else{
							if(title != '非常確定'&&title != '完全確定'){
								rply.text = '你真的確定要解散公會 ' + CharArr[j][1] + ' 嗎？\
										\n 一旦確認後將無法拿回已經投入公會的全部素材，而且所有成員將全數退出公會\
										\n 真的確定要解散的話，請輸入:\
										\n\n 公會管理 解散 確定 非常確定';
								return rply;
							}else if(title != '完全確定'){
								rply.text = '!!!!!最終警告!!!!! \
								\n!!!!!下一步將正式動作，請三思而後行!!!!!\
								\n\
								\n你真的完全確定要解散公會 ' + CharArr[j][1] + ' 嗎？\
										\n 一旦確認後將無法拿回已經投入公會的全部素材，而且所有成員將全數退出公會\
										\n 真的確定要解散的話，請輸入:\
										\n\n 公會管理 解散 確定 完全確定';
								return rply;
							}else{
								for(var k = 0; k<CharArr[j][3].length; k++){
									for(var l = 0; l<PD.length; l++){
										if(CharArr[j][3][k] == PD[l][1]){

											PD[l][14] = '輔導公會';
											PD[l][15] = '會員';

										}
										
									}
									
									
								}
								
								CharArr.splice(j, 1);
								DB.useServiceAccountAuth(creds, function (err) {
 
								  // Get all of the rows from the spreadsheet.
									 DB.getRows(21 , function (err, rows) {
												if (err) {
													console.log( err );
												}else{
													rows[rows.length-1].del();
													ArrayUpdate();
												}
									 });
								});
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
	for(var i=0;i<CharArr.length;i++){
		if(CharArr[i][1] == guild){
			for(var j = 0; j<CharArr[i][5]; j++){
				for(var k = 0; k<PD.length;k++){
					if(CharArr[i][2][j] == PD[k][0]){
						PD[k][15] = CharArr[i][4][j];
						PlayerData.saveArray(PD);
					}
				}
			}
		}
	}
	
}


module.exports = {
	guildView,
	guildSearch,
	GetArray,
	InheritPlayer,
	switchName,
	saveArray,
	InGuildView,
	switchNameWL,
	GuildInformation,
	GuildManage,
	CheckTitle
};
