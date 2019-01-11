var rply = [];
var linebot = require('linebot');
var express = require('express');
var bot = linebot({
	channelId: "1635505649",
  channelSecret: "b59dc842309386b494bb05541e10dfb3",
  channelAccessToken: "jCV9Fe8nB3+G91MXq2eWCz5v2w+jGsE8A+kVdln0CF3E53aW5nZnzNfnlzkmVgZkf2OAxNahvylD0Z0VJ+wGDrDkfoyMQMvm525qu2T1c3h9FeL8VMMEwbTRXTEtUYO8Bfu5x0xYMwX/aoKJSHYrEAdB04t89/1O/w1cDnyilFU="
});

var fs = require('fs');
var talkChannal= [];

//////////mongo系統
var mongoose = require('mongoose');
var mongoDB = 'mongodb://b88009005:b09050905@ds229312.mlab.com:29312/linetest';

//連線測試
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

mongoose.connect(mongoDB, function (err) {
	if(err) throw err;
	else console.log('連線測試成功，可以正常吃芒果!');
});
///

var ChannalSchema = new Schema({
	channal_id : {type: Number, required: true},
	channal_line_id : {type: String, required: true},
	channal_name : {type: String, required: true}
});

var Channal = mongoose.model('Channal',ChannalSchema);

Channal.find(function(err,Channals){
	if(err) throw err;
	else{
		for(var a = 0;a<Channals.length;a++){
			talkChannal[a] = {
				"channal_id" : Channals[a].channal_id,
				"channal_line_id" : Channals[a].channal_line_id,
				"channal_name" : Channals[a].channal_name
			};
		}
		
		console.log(talkChannal);
		console.log("頻道資料，更新完成");
	}
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
			rply[1] += '\n'+(a+1) +'\.'+talkChannal[a].channal_name;
		}
		rply[1] += '\n\n 想要進行匿名對話，請輸入[淦話 頻道編號 對話內容]';
		        return rply;
	}else if(talkChannal[Channal-1] == null){
		rply[0] = 'rply';
		rply[1] = '找不到該頻道喔';
		return rply;
		
	}else{
		if(myText == null){
			rply[0] = 'rply';
		        rply[1] = '頻道名稱:'+ talkChannal[Channal-1].channal_name+'\
                                \n\n 想要進行匿名對話，請輸入[淦話 頻道編號 對話內容]';
		        return rply;
		}else{
			rply[0] = 'push';
		        bot.push(talkChannal[Channal-1].channal_line_id,myText);
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

function menu(UserN){
	rply[0] = 'rply';
	rply[1] = {
		  "type": "template",
		  "altText": "很抱歉，你的Line版本不支援此系統，建議輸入help查看可使用的指令",
		  "template": {
		  	"type": "buttons",
		  		"text":"嗨！" + UserN + "，請問要做什麼？",
		  		"actions": [{
					"type": "message",
					"label": "開啟CoC選單",
					"text": "CoC選單"},
					{
					"type": "message",
					"label": "開啟娛樂選單",
					"text": "娛樂選單"
					},
		      			{
					"type": "message",
					"label": "打開幫助",
					"text": "help"
					},
					{
					"type": "message",
					"label": "閒聊",
					"text": "嘿空音"
					}
				]
		}
	}
	return rply;
}

function funnymenu(UserN){
	rply[0] = 'rply';
	rply[1] = {
		  "type": "template",
		  "altText": "很抱歉，你的Line版本不支援此系統，建議輸入help查看可使用的指令",
		  "template": {
		  	"type": "buttons",
		  		"text":"嗨！" + UserN + "，想要做什麼？",
		  		"actions": [{
					"type": "message",
					"label": "今日運氣",
					"text": "今天的運氣"},
					{
					"type": "message",
					"label": "立死旗",
					"text": "插旗"
					}
				]
		}
	}
	return rply;
}

module.exports = {
	ReplyTest,
	PushTest,
	SecretTalk,
	menu,
	funnymenu
};
