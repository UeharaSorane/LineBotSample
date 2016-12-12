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
      //rplyVal = randomReply();
      console.log('總之先隨便擺個跑到這邊的訊息，catch error');
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
        if (inputStr.match('鴨霸獸') != null && inputStr.match('說明') != null) return YabasoReply('0') + '\
\n \
\n總之現在應該支援直接的四則運算了，直接打：2d4+1、2D10+1d2\
\n要多筆輸出就是先打你要的次數，再空一格打骰數：7 3d6、5 2d6+6  \
\n現在打成大寫D，我也不會嗆你了哈哈哈。 \
\n \
\n如果是CoC系的話，有支援cc擲骰和獎懲骰， \
\n打 cc> 的話，可以用來骰幕間成長，像：cc>40 偵查。 \
\n \
\n其他骰組我都用不到，所以不會去更新哈哈哈哈哈！ \
\n以上功能靈感來源全部來自悠子桑的Hastur，那隻的功能超完整快加他： @fmc9490c \
\n這隻的BUG超多，顆顆。\
';
        else
          if (inputStr.match('鴨霸獸') != null) return YabasoReply(inputStr) ;
        else
        //cc判定在此
        if (inputStr.toLowerCase().match(/^cc/)!= null) return CoC7th(inputStr.toLowerCase()) ;      
        else
        //擲骰判定在此        
        if (inputStr.match(/\w/)!=null && inputStr.toLowerCase().match(/d/)!=null) {
          return nomalDiceRoller(inputStr);
        }
                      
        
        else return undefined;
        
      }


function nomalDiceRoller(inputStr){
  
  //首先判斷是否是誤啟動（檢查是否有符合骰子格式）
  if (inputStr.toLowerCase().match(/\d+d\d+/) == null) return undefined;
  
  //再來先把第一個分段拆出來，待會判斷是否是複數擲骰
  let mutiOrNot = inputStr.toLowerCase().match(/\S+/);
  
  //排除小數點
  if (mutiOrNot.toString().match(/\./)!=null)return undefined;

  //先定義要輸出的Str
  let finalStr = '' ;  
  
  //是複數擲骰喔
  if(mutiOrNot.toString().match(/\D/)==null ) {
    finalStr= '複數擲骰：\n'
    if(mutiOrNot>20) return '不支援20次以上的複數擲骰。';
    
    for (i=1 ; i<=mutiOrNot ;i++){
    let DiceToRoll = inputStr.toLowerCase().split(' ',2)[1];
    if (DiceToRoll.match('d') == null) return undefined;

    //寫出算式
    let equation = DiceToRoll;
    while(equation.match(/\d+d\d+/)!=null) {
      let tempMatch = equation.match(/\d+d\d+/);
      equation = equation.replace(/\d+d\d+/, RollDice(tempMatch));
    }

    //計算算式
    let answer = eval(equation.toString());
    finalStr = finalStr + i + '# ' + equation + ' = ' + answer + '\n';
    }
        
  }
  
  else
  {
  //一般單次擲骰
  let DiceToRoll = mutiOrNot.toString();
  
  if (DiceToRoll.match('d') == null) return undefined;
  
  //寫出算式
  let equation = DiceToRoll;
  while(equation.match(/\d+d\d+/)!=null) {
    let tempMatch = equation.match(/\d+d\d+/);    
    if (tempMatch.toString().split('d')[0]>200) return '欸欸，不支援200D以上擲骰；哪個時候會骰到兩百次以上？想被淨灘嗎？';
    if (tempMatch.toString().split('d')[1]==1 || tempMatch.toString().split('d')[1]>500) return '不支援D1和超過D500的擲骰；想被淨灘嗎？';
    equation = equation.replace(/\d+d\d+/, RollDice(tempMatch));
  }
  
  //計算算式
  let answer = eval(equation.toString());
    finalStr= '基本擲骰：' + equation + ' = ' + answer;
  }
  return finalStr;


}        

function RollDice(inputStr){
  //先把inputStr變成字串（不知道為什麼非這樣不可）
  let comStr=inputStr.toString();
  let finalStr = '(';

  for (let i = 1; i <= comStr.split('d')[0]; i++) {
    finalStr = finalStr + Dice(comStr.split('d')[1]) + '+';
     }

  finalStr = finalStr.substring(0, finalStr.length - 1) + ')';
  return finalStr;
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
  
  
  //判斷是否為成長骰
  if(inputStr.match(/^cc>\d+/)!=null){
    chack = parseInt(inputStr.split('>',2)[1]) ;
    if (finalRoll>chack) {
      
      ReStr = '(1D100>' + chack + ') → ' + finalRoll + ' → 成功成長' + Dice(10) +'點';
      return ReStr;
    }
    if (finalRoll<chack) {
      ReStr = '(1D100>' + chack + ') → ' + finalRoll + ' → 沒有成長';
      return ReStr;
    }
    return undefined;
  }
  
  
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
 
  


function Dice(diceSided){          
          return Math.floor((Math.random() * diceSided) + 1)
        }              


        function YabasoReply(inputStr) {
          let rplyArr = ['你們死定了呃呃呃不要糾結這些……所以是在糾結哪些？', '在澳洲，每過一分鐘就有一隻鴨嘴獸被拔嘴。 \n我到底在共三小。', '嗚噁噁噁噁噁噁，不要隨便叫我。', '幹，你這學不會的豬！', '嘎嘎嘎。', 'wwwwwwwwwwwwwwwww', '為什麼你們每天都可以一直玩；玩就算了還玩我。', '好棒，整點了！咦？不是嗎？', '不要打擾我挖坑！', '好棒，誤點了！', '在南半球，一隻鴨嘴獸拍打他的鰭，他的嘴就會掉下來。 \n我到底在共三小。', '什麼東西你共三小。', '哈哈哈哈哈哈哈哈！', '一直叫，你4不4想拔嘴人家？', '一直叫，你想被淨灘嗎？', '幫主你也敢嘴？', '拔嘴的話，我的嘴巴會長出觸手，然後開花成四個花瓣哦 (´×`)', '看看我！！我體內的怪物已經這麼大了！！', '看看我！！我體內的怪物已經這麼大了！！', '傳說中，凡是拔嘴過鴨嘴獸的人，有高機率在100年內死去。 \n我到底在共三小。', '人類每花60秒拔嘴，就減少一分鐘的壽命。 \n我到底在共三小。', '嘴被拔，就會掉。', '你在大聲什麼啦！！！！', '公道價，八萬一（伸手）。', '你的嘴裡有異音', '幫主說，有人打你的左臉，你就要用肉食性猛擊咬斷他的小腿。'];
          
          
          if(inputStr.match('家訪') != null) return 'ㄉㄅㄑ';
          else
          if(inputStr.match('饅頭') != null) return '可愛。';
          else
          if(inputStr.match('泰') != null||inputStr.match('ㄩㄊ') != null||inputStr.match('太太') != null) return '（抱頭）嗚噁噁噁噁噁頭好痛…';
          else
          if(inputStr.match('包子') != null) return '幹你娘我最討厭的就是包子你還一直提一直提';
          else
            if(inputStr.match('蘿蔔') != null) return '我說蘿蔔又白又正又嬌小好像可以抱起來轉；照片我有存，意者請私訊yabaso。';
          else
          if(inputStr.match('運勢') != null){
            let LuckArr=['超大吉','大吉','大吉','中吉','中吉','中吉','小吉','小吉','小吉','小吉','凶','凶','凶','大凶','大凶','你還是，不要知道比較好','這應該不關我的事'];
            return '運勢喔…我覺得，' + LuckArr[Math.floor((Math.random() * (LuckArr.length)) + 0)] + '吧。';
            
          } 
          
          return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
