var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');  
var app = express();

var jsonParser = bodyParser.json();

var options = {
  host: 'api.line.me',
  port: 443,
  path: '/v2/bot/message/reply',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer [LineAuthorization]'
  
  }
}
app.set('port', (process.env.PORT || 5000));

// views is directory for all template files

app.get('/', function(req, res) {
//  res.send(parseInput(req.query.input));
  res.send('Hello');
});

app.post('/', jsonParser, function(req, res) {
  let event = req.body.events[0];
  let type = event.type;
  let msgType = event.message.type;
  let msg = event.message.text;
  let rplyToken = event.replyToken;

  let rplyVal = null;
  console.log(msg);
  if (type == 'message' && msgType == 'text') {
    try {
      rplyVal = parseInput(rplyToken, msg); 
    } 
    catch(e) {
      rplyVal = randomReply();
    }
  }

  if (rplyVal) {
    replyMsgToLine(rplyToken, rplyVal); 
  } else {
    console.log('Do not trigger'); 
  }

  res.send('ok');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function replyMsgToLine(rplyToken, rplyVal) {
  let rplyObj = {
    replyToken: rplyToken,
    messages: [
      {
        type: "text",
        text: rplyVal
      }
    ]
  }

  let rplyJson = JSON.stringify(rplyObj); 
  
  var request = https.request(options, function(response) {
    console.log('Status: ' + response.statusCode);
    console.log('Headers: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function(body) {
      console.log(body); 
    });
  });
  request.on('error', function(e) {
    console.log('Request error: ' + e.message);
  })
  request.end(rplyJson);
}

function parseInput(rplyToken, inputStr) {
        console.log('InputStr: ' + inputStr);
        let msgSplitor = ' ';

        let mainMsg = inputStr.split(msgSplitor); //定義輸入字串，以空格切開
        let trigger = mainMsg[0]; //指定啟動詞在第一個詞
        
        

        

        _isNaN = function(obj) {
          return isNaN(parseInt(obj));
        }                   
        //鴨霸獸指令開始於此
        if (inputStr.match('鴨霸獸') != null && inputStr.match('說明') != null) return randomReply() + '\n' + '\
總之你要擲骰前就先打roll，後面接像是2d6，1d6+3，2d6+1d3之類的就好。  \
\n要多筆輸出就是先空一格再打像是 *5 之類的。  \
\n不要打成大寫D，不要逼我嗆你 \
\n如果是CoC系的話，有初步支援cc擲骰了，獎懲骰也支援了。 \
';
        if (inputStr.match('鴨霸獸') != null) return randomReply() ;
        
        //cc判定在此
        if (inputStr.toLowerCase().match(/^cc/)!= null) return CoC7th(inputStr.toLowerCase()) ;      
          
        //roll 指令開始於此
        if (trigger == 'roll'){        
                  
          if (inputStr.split(msgSplitor).length == 1) return '\
總之你要擲骰前就先打roll，後面接像是2d6，1d6+3，2d6+1d3之類的就好。  \
\n要多筆輸出就是先空一格再打像是 *5 之類的。  \
\n不要打成大寫D，不要逼我嗆你';
          if (inputStr.split(msgSplitor).length >= 3){
            
            if (mainMsg[2].split('*').length == 2) {
              let tempArr = mainMsg[2].split('*');
              let text = inputStr.split(msgSplitor)[3];
              //secCommand = parseInt(tempArr[1]);
              return MutiRollDice(mainMsg[1],parseInt(tempArr[1]),text);
            }
            return NomalRollDice(mainMsg[1],mainMsg[2]);
          }
          if (inputStr.split(msgSplitor).length == 2){
            return NomalRollDice(mainMsg[1],mainMsg[2]);
          }
          
          
        }
        
        
        else return undefined;
        
      }
        
function CoC7th(inputStr){
  //記錄檢定要求值
  let chack = parseInt(inputStr.split('=',2)[1]) ;
  //設定回傳訊息
  let ReStr = '(1D100<=' + chack + ') → ';
  
  //先骰兩次十面骰作為起始值
  let OneRoll = Dice(10) - 1;
  let TenRoll = Dice(10);
  let firstRoll = TenRoll*10 + OneRoll;
  if (firstRoll > 100) firstRoll = firstRoll - 100;  

  //先設定最終結果等於第一次擲骰
  let finalRoll = firstRoll;
  
  //判斷是否為獎懲骰
  let BPDice = 0;
  if(inputStr.match(/^cc\(-?[12]\)/)!=null) BPDice = parseInt(inputStr.split('(',2)[1]) ;
  //如果是獎勵骰
  if(BPDice != 0){
    let tempStr = firstRoll;
    for (let i = 1; i <= Math.abs(BPDice); i++ ){
      let OtherTenRoll = Dice(10);
      let OtherRoll = OtherTenRoll.toString() + OneRoll.toString();
      if (OtherRoll > 100) OtherRoll = parseInt(OtherRoll) - 100;  
      tempStr = tempStr + '、' + OtherRoll;
      }
      let countArr = tempStr.split('、');       
      if (BPDice>0) finalRoll = Math.min(...countArr);
      if (BPDice<0) finalRoll = Math.max(...countArr);
      
      ReStr = ReStr + tempStr + ' → ';
      
    }
  

  
  
  //結果判定
  if (finalRoll == 1) ReStr = ReStr + finalRoll + ' → 恭喜！大成功！';
  else
  if (finalRoll == 100) ReStr = ReStr + finalRoll + ' → 啊！大失敗！';
  else
  if (finalRoll <= 99 && finalRoll >= 95 && chack < 50) ReStr = ReStr + finalRoll + ' → 啊！大失敗！';
  else
  if (finalRoll <= chack/5) ReStr = ReStr + finalRoll + ' → 極限成功';
  else
  if (finalRoll <= chack/2) ReStr = ReStr + finalRoll + ' → 困難成功';
  else
  if (finalRoll <= chack) ReStr = ReStr + finalRoll + ' → 通常成功';
  else ReStr = ReStr + finalRoll + ' → 失敗' ;

  //浮動大失敗運算
  if (finalRoll <= 99 && finalRoll >= 95 ){
    if(chack/2 < 50) ReStr = ReStr + '\n（若要求困難成功則為大失敗）';
    else
    if(chack/5 < 50) ReStr = ReStr + '\n（若要求極限成功則為大失敗）';
  }  
  return ReStr;
}
 

        function MutiRollDice(DiceToCal,timesNum,text){
          let cuntSplitor = '+';
          let comSplitor = 'd';
          let CuntArr = DiceToCal.toLowerCase().split(cuntSplitor);
          let numMax = CuntArr.length - 1 ; //設定要做的加法的大次數

          var count = 0;
          let countStr = '';
         // if (DiceToCal.match('D') != null) return randomReply() + '\n格式錯啦，d要小寫！';

          if (text == null) {
            for (let j = 1 ; j <= timesNum ; j++){
              count = 0;
              for (let i = 0; i <= numMax; i++) {

                let commandArr = CuntArr[i].split(comSplitor);
                let countOfNum = commandArr[0];
                let randomRange = commandArr[1];
                if (randomRange == null) {
                  let temp = parseInt(countOfNum);
                  //countStr = countStr + temp + '+';
                  count += temp; 
                }
                else{

                  for (let idx = 1; idx <= countOfNum; idx ++) {
                    let temp = Dice(randomRange);
                    //countStr = countStr + temp + '+';
                    count += temp; 
                  }
                }
              }
              countStr = countStr + count + '、';
            }
            countStr = countStr.substring(0, countStr.length - 1) ;
            return countStr;
          }

          if (text != null) {
            for (let j = 1 ; j <= timesNum ; j++){
              count = 0;
              for (let i = 0; i <= numMax; i++) {

                let commandArr = CuntArr[i].split(comSplitor);
                let countOfNum = commandArr[0];
                let randomRange = commandArr[1];
                if (randomRange == null) {
                  let temp = parseInt(countOfNum);
                  //countStr = countStr + temp + '+';
                  count += temp; 
                }
                else{

                  for (let idx = 1; idx <= countOfNum; idx ++) {
                    let temp = Dice(randomRange);
                    //countStr = countStr + temp + '+';
                    count += temp; 
                  }
                }
              }
              countStr = countStr + count + '、';
            }
            countStr = countStr.substring(0, countStr.length - 1) + '；' + text;
            return countStr;
          }
        }
        
        
function NomalRollDice(DiceToCal,text){
    let cuntSplitor = '+';
    let comSplitor = 'd';
    let CuntArr = DiceToCal.toLowerCase().split(cuntSplitor);
    let numMax = CuntArr.length - 1 ; //設定要做的加法的大次數

    var count = 0;
    let countStr = '';
  //if (DiceToCal.match('D') != null) return randomReply() + '\n格式錯啦，d要小寫！';
    for (let i = 0; i <= numMax; i++) {
      
      let commandArr = CuntArr[i].split(comSplitor);
      let countOfNum = commandArr[0];
      let randomRange = commandArr[1];
      if (randomRange == null) {
        let temp = parseInt(countOfNum);
        countStr = countStr + temp + '+';
        count += temp; 
       }
       else{
          
        for (let idx = 1; idx <= countOfNum; idx ++) {
          let temp = Dice(randomRange);
          countStr = countStr + temp + '+';
          count += temp; 
        }      }
    }
  
    
  if (countStr.split(cuntSplitor).length == 2) {
    if (text == null ) countStr = count;
    else countStr = count + '；' + text;
  } 
  else {
    if (text == null ) countStr = countStr.substring(0, countStr.length - 1) + '=' + count;
    else countStr = countStr.substring(0, countStr.length - 1) + '=' + count + '；' + text;
  }
return countStr;
          
}


        function Dice(diceSided){          
          return Math.floor((Math.random() * diceSided) + 1)
        }              


        function randomReply() {
          let rplyArr = ['你們死定了呃呃呃不要糾結這些……所以是在糾結哪些？', '在澳洲，每過一分鐘就有一隻鴨嘴獸被拔嘴。 \n我到底在共三小。', '嗚噁噁噁噁噁噁，不要隨便叫我。', '幹，你這學不會的豬！', '嘎嘎嘎。', 'wwwwwwwwwwwwwwwww', '為什麼你們每天都可以一直玩；玩就算了還玩我。', '好棒，整點了！咦？不是嗎？', '不要打擾我挖坑！', '好棒，誤點了！', '在南半球，一隻鴨嘴獸拍打他的鰭，他的嘴就會掉下來。 \n我到底在共三小。', '什麼東西你共三小。', '哈哈哈哈哈哈哈哈！', '一直叫，你4不4想拔嘴人家？', '一直叫，你想被淨灘嗎？', '幫主你也敢嘴？', '拔嘴的話，我的嘴巴會長出觸手，然後開花成四個花瓣哦 (´×`)', '看看我！！我體內的怪物已經這麼大了！！', '看看我！！我體內的怪物已經這麼大了！！', '傳說中，凡是拔嘴過鴨嘴獸的人，有高機率在100年內死去。 \n我到底在共三小。', '人類每花60秒拔嘴，就減少一分鐘的壽命。 \n我到底在共三小。', '嘴被拔，就會掉。'];
          return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
