var rply = [];
var linebot = require('linebot');
var express = require('express');
var bot = linebot({
	channelId: "1635505649",
  channelSecret: "b59dc842309386b494bb05541e10dfb3",
  channelAccessToken: "jCV9Fe8nB3+G91MXq2eWCz5v2w+jGsE8A+kVdln0CF3E53aW5nZnzNfnlzkmVgZkf2OAxNahvylD0Z0VJ+wGDrDkfoyMQMvm525qu2T1c3h9FeL8VMMEwbTRXTEtUYO8Bfu5x0xYMwX/aoKJSHYrEAdB04t89/1O/w1cDnyilFU="
});

var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var ChannalDB = new GoogleSpreadsheet('1hwFlTrJ7JHeWMLbHmfg7LP7f13OfAoMebF6HIkHpHPs');
var talkChannal= [];

ChannalDB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	ChannalDB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					talkChannal[i] = [];
					
					talkChannal[i][0] = rows[i].ChannalName;
					talkChannal[i][1] = rows[i].ChannalID;
					talkChannal[i][2] = rows[i].Descripition;
					
				}
				//console.log(AccessArr);
				console.log('頻道資料 讀取完成');
			}
		

			
		});
	
		
		
});


function ReplyTest(UserN,myText) {
	///確認系統reply功能沒問題用
	rply[0] = 'rply';
      
	if(myText == null){
		rply[1] = UserN + '\n你啥都沒說啊...';
	}else{
		rply[1] = UserN + '你剛剛說了：' + myText;
	}		
	return rply;
	
	///

}


function SecretTalk(UserID,Channal,myText) {
	///匿名淦話
	if(Channal == null){
		rply[0] = 'rply';
		rply[1] = '這是目前有登錄的頻道清單：';
		for(var a = 0;a< talkChannal.length;a++){
			rply[1] += '\n'+(a+1) +'\.'+talkChannal[a][0];
		}
		rply[1] += '\n\n 想要進行匿名對話，請輸入[淦話 頻道編號 對話內容]';
		        return rply;
	}else if(talkChannal[Channal] == null){
		rply[0] = 'rply';
		rply[1] = '找不到該頻道喔';
		return rply;
		
	}else{
		if(myText == null){
			rply[0] = 'rply';
		        rply[1] = '頻道名稱:'+ talkChannal[Channal][0]+'\
                                \n 描述:'+ talkChannal[Channal][2]+'\
                                \n\n 想要進行匿名對話，請輸入[淦話 頻道編號 對話內容]';
		        return rply;
		}else{
			rply[0] = 'push';
		        bot.push(talkChannal[Channal-1],myText);
		        return rply;
		}
	}
}

function PushTest(UserID,GroupID) {
	///確認系統push功能沒問題
	rply[0] = 'push';
	
	if(GroupID != null){
		bot.push(GroupID,'你在大聲什麼啦？');
	}else{
		bot.push(UserID,'你在大聲什麼啦？');
	}
	///
	
	return rply;

}



module.exports = {
	ReplyTest,
	PushTest,
	SecretTalk
};
