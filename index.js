var linebot = require('linebot');
var express = require('express');
require('fs').readdirSync(__dirname + '/modules/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    exports[name] = require('./modules/' + file);
  }
});

var bot = linebot({
	channelId: "1635505649",
  channelSecret: "b59dc842309386b494bb05541e10dfb3",
  channelAccessToken: "jCV9Fe8nB3+G91MXq2eWCz5v2w+jGsE8A+kVdln0CF3E53aW5nZnzNfnlzkmVgZkf2OAxNahvylD0Z0VJ+wGDrDkfoyMQMvm525qu2T1c3h9FeL8VMMEwbTRXTEtUYO8Bfu5x0xYMwX/aoKJSHYrEAdB04t89/1O/w1cDnyilFU="
});

var app = express();

app.post('/', bot.parser());

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
	var port = server.address().port;
	console.log("App now running on port", port);
	console.log("好，沒事");
});

bot.on('message', function(event) {
	event.source.profile().then(function (profile) {
		console.log(event);
		var src = event.source;
		var msg = event.message;
		
		if(event.message.type == 'text'){
			if(event.source.userId != 'U7b7830437667bf4b7b54eaf02e762690'){
				var say = profile.displayName+'說:'+event.message.text;
				if(event.source.groupId != null)say+= '(群組)';
				bot.push('U7b7830437667bf4b7b54eaf02e762690',say);
			}
		}else if(msg.type == 'sticker'){
			//if(event.source.userId != 'U7b7830437667bf4b7b54eaf02e762690'){
				var say = profile.displayName+'傳送了一張貼圖';
				if(event.source.groupId != null)say+= '(群組)';
				bot.push('U7b7830437667bf4b7b54eaf02e762690',msg);
				/*var Stk = {
						type: 'sticker',
						packageId: '2591664',
						stickerId: '1062629'}
				
				bot.push('U7b7830437667bf4b7b54eaf02e762690',Stk);*/
			//}
		}
	});
	
	if(event.message.type == 'text'){
		event.source.profile().then(function (profile) {
			/*if(event.source.userId != 'U7b7830437667bf4b7b54eaf02e762690'){
				var say = profile.displayName+'說:'+event.message.text
				if(event.source.groupId != null)say+= '(群組)';
				bot.push('U7b7830437667bf4b7b54eaf02e762690',say);
			}*/
			rply = exports.analytics.parseInput(msg.text, event.source.userId, profile.displayName, event.source.groupId);
			if(rply[0] == 'none'){
			}else if(rply[0] == 'groupRply'){
				bot.push('Ca06e35d5eefc0162348764ce8bdb52b5',rply[1]);
			}else if(rply[0] == 'rply'){
				event.reply(rply[1]).then(function (data) {
				  // success
				}).catch(function (error) {
				  // error
			});
			}

		});

	}
});
