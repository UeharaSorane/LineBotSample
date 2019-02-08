//引用外部函數庫
var linebot = require('linebot');//LineBot 的主要功能
var express = require('express');//express 用來架網站以和bot溝通
//引用自己的函數庫
var analytics = require("./modules/analytics.js");//這個是分析訊息的函庫
//

var bot = linebot({
  	channelSecret: process.env.LINE_CHANNEL_SECRET, //這裡是讓系統抓在Heroku設定的數據
  	channelAccessToken: process.env.LINE_CHANNEL_ACCESSTOKEN // 同上
});

///以下是用來控制網頁與Bot的關係
var app = express();
app.post('/', bot.parser());
//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
	var port = server.address().port;
	console.log("App now running on port", port);
	console.log("...好，系統正常啟動");
});
app.get('/', function (req, res) {
	res.send('<h1>恭喜，程式沒有錯誤!記得複製這個網頁的網址然後貼到「Webhook URL」的地方喔!</h1>');
});
///

var rply = '';//建立一個裝要回覆的訊息的變數

bot.on('message', function(event) {
	if(event.message.type == 'text'){
		rply = analytics.parseInput(event.message.text);
		//如果只是文字訊息，就丟到分析區去分析
		
		event.reply(rply).then(function (data) {
		  //成功就沒事
		}).catch(function (error) {
		  // 失敗就丟錯誤訊息
		});
		
		//之後，把分析區丟回來的東西傳給使用者
	}
});//當Bot接收到訊息時，就會被啟動
