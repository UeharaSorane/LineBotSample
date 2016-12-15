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
        _isNaN = function(obj) {
          return isNaN(parseInt(obj));
        }                   
        //鴨霸獸指令開始於此

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

  if(mutiOrNot.toString().match(/\D/)==null )  {
    let finalStr= '複數擲骰：'
    if(mutiOrNot>20) return '不支援20次以上的複數擲骰。';

    for (i=1 ; i<=mutiOrNot ;i++){
      let DiceToRoll = inputStr.toLowerCase().split(' ',2)[1];
      if (DiceToRoll.match('d') == null) return undefined;
      finalStr = finalStr +'\n' + i + '# ' + DiceCal(DiceToRoll);
    }
    if(finalStr.match('200D')!= null) return '欸欸，不支援200D以上擲骰；哪個時候會骰到兩百次以上？想被淨灘嗎？';
    if(finalStr.match('D500')!= null) return '不支援D1和超過D500的擲骰；想被淨灘嗎？';
    return finalStr;
  } 
  
  else return '基本擲骰：' + DiceCal(mutiOrNot.toString());
}

        
//作計算的函數
function DiceCal(inputStr){
  
  //首先判斷是否是誤啟動（檢查是否有符合骰子格式）
  if (inputStr.toLowerCase().match(/\d+d\d+/) == null) return undefined;
    
  //排除小數點
  if (inputStr.toString().match(/\./)!=null)return undefined;

  //先定義要輸出的Str
  let finalStr = '' ;  
  
  //一般單次擲骰
  let DiceToRoll = inputStr.toString().toLowerCase();  
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
    finalStr= equation + ' = ' + answer;
  
  return finalStr;


}        

//用來把d給展開成算式的函數
function RollDice(inputStr){
  //先把inputStr變成字串（不知道為什麼非這樣不可）
  let comStr=inputStr.toString().toLowerCase();
  let finalStr = '(';

  for (let i = 1; i <= comStr.split('d')[0]; i++) {
    finalStr = finalStr + Dice(comStr.split('d')[1]) + '+';
     }

  finalStr = finalStr.substring(0, finalStr.length - 1) + ')';
  return finalStr;
}
                                                                     
      
        
function CoC7th(inputStr){
  
  //先判斷是不是要創角
  //這是悠子房規創角
  if (inputStr.toLowerCase().match('悠子創角') != null){
    let finalStr = '七次3D6決定於STR、CON、DEX、APP、POW。';
    
    for (i=1 ; i<=7 ;i++){
      finalStr = finalStr +'\n' + i + '# ' + DiceCal('3d6*5');
    }
    finalStr = finalStr +'\n\n四次2D6+6決定SIZ、INT、EDU。';
    
    for (i=1 ; i<=4 ;i++){
      finalStr = finalStr +'\n' + i + '# ' + DiceCal('(2d6+6)*5');
    }
    
    finalStr = finalStr +'\n\n兩次3D6決定LUK。';
    for (i=1 ; i<=2 ;i++){
      finalStr = finalStr +'\n' + i + '# ' + DiceCal('3d6*5');
    } 

    return finalStr;
  }

  //這是傳統創角
  if (inputStr.toLowerCase().match('核心創角') != null){
    
    if (inputStr.split(' ' ).length != 3) return undefined;
    
    //讀取年齡
    let old = parseInt(inputStr.split(' ',3)[2]);
    if (old == NaN) return undefined;
    let ReStr = '調查員年齡設為：' + old + '\n';
    //設定 因年齡減少的點數 和 EDU加骰次數
    let Debuff = 0;
    let AppDebuff = 0;
    let EDUinc = 0;
    
    
    let oldArr = [15,20,40,50,60,70,80]
    let DebuffArr = [5,0,5,10,20,40,80]
    let AppDebuffArr = [0,0,5,10,15,20,25]
    let EDUincArr = [0,1,2,3,4,4,4]
    
    if (old < 15) return ReStr + '等等，核心規則不允許小於15歲的人物哦。';    
    if (old >= 90) return ReStr + '等等，核心規則不允許90歲以上的人物哦。'; 
        
    for ( i=0 ; old >= oldArr[i] ; i ++){
         Debuff = DebuffArr[i];
        AppDebuff = AppDebuffArr[i];
        EDUinc = EDUincArr[i];
    }

    
    if (old < 20) ReStr = ReStr + '年齡調整：從STR、SIZ中減去' + Debuff + '點\n（請自行手動選擇計算）。\n將EDU減去5點。LUK可擲兩次取高。' ;
    else
      if (old >= 40)  ReStr = ReStr + '年齡調整：從STR、CON或DEX中「總共」減去' + Debuff + '點\n（請自行手動選擇計算）。\n將APP減去' + AppDebuff +'點。可做' + EDUinc + '次EDU的成長擲骰。' ;
    
    else ReStr = ReStr + '年齡調整：可做' + EDUinc + '次EDU的成長擲骰。' ;

    ReStr = ReStr + '\n\nSTR：' + DiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' ← 這三項自選共減' + Debuff + '點';
    if (old<20) ReStr = ReStr + ' ← 這兩項擇一減' + Debuff + '點';
    ReStr = ReStr + '\nCON：' + DiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' ← 這三項自選共減' + Debuff + '點';
    ReStr = ReStr + '\nDEX：' + DiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' ← 這三項自選共減' + Debuff + '點';
    if (old>=40) ReStr = ReStr + '\nAPP：' + DiceCal('3d6*5-' + AppDebuff);
    else ReStr = ReStr + '\nAPP：' + DiceCal('3d6*5');
    ReStr = ReStr + '\nPOW：' + DiceCal('3d6*5');
    ReStr = ReStr + '\nSIZ：' + DiceCal('(2d6+6)*5');
    if (old<20) ReStr = ReStr + ' ← 這兩項擇一減' + Debuff + '點';
    ReStr = ReStr + '\nINT：' + DiceCal('(2d6+6)*5');         
    if (old<20) ReStr = ReStr + '\nEDU：' + DiceCal('3d6*5-5');
    else {
      let firstEDU = RollDice('3d6') + '*5';
      ReStr = ReStr + '\n\nEDU初始值：' + firstEDU + ' = ' + eval(firstEDU);
      
      let tempEDU = eval(firstEDU);
      
      for (i = 1 ; i <= EDUinc ; i++){
        let EDURoll = Dice(100);
        ReStr = ReStr + '\n第' + i + '次EDU成長 → ' + EDURoll;
        
        
        if (EDURoll>tempEDU) {
          let EDUplus = Dice(10);
          ReStr = ReStr + ' → 成功成長' + EDUplus +'點';
          tempEDU = tempEDU + EDUplus;
        }
        else{
        ReStr = ReStr + ' → 沒有成長';       
        }
      }
      ReStr = ReStr + '\nEDU最終值：' +tempEDU;
    }
    
    
    ReStr = ReStr + '\n\nLUK：' + DiceCal('3d6*5');    
    if (old<20) ReStr = ReStr + '\nLUK額外加骰：' + DiceCal('3D6*5');
    
    
    return ReStr;
  } 
  
  
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
            if (finalRoll<=chack) {
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
          if (finalRoll <= 99 && finalRoll >= 95 && chack >= 50 ){
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
  //一般功能說明
  if (inputStr.match('說明') != null) return YabasoReply('0') + '\
\n \
\n總之現在應該支援直接的四則運算了，直接打：2d4+1、2D10+1d2\
\n要多筆輸出就是先打你要的次數，再空一格打骰數：7 3d6、5 2d6+6  \
\n現在打成大寫D，我也不會嗆你了哈哈哈。 \
\n \
\n目前支援多數CoC 7th指令，可打「鴨霸獸 cc」取得更多說明。 \
\n \
\n其他骰組我都用不到，所以不會去更新哈哈哈哈哈！ \
\n以上功能靈感來源全部來自悠子桑的Hastur，那隻的功能超完整快加他： @fmc9490c \
\n這隻的BUG超多，只會說垃圾話；可以問我垃圾話相關指令哦～\
';
  else
  //垃圾話功能說明
  if (inputStr.match('垃圾話') != null) return '\
嗚呵呵呵呵，我就知道你們人類沒辦法抗拒垃圾話的。\
\n目前實裝的垃圾話功能是以下這些：\
\n「運勢：你只要提到我的名字和運勢，我就會回答你的運勢。」 \
\n「隨機選擇：只要提到我的名字和「選、挑、決定」，然後空一格打選項。 \
\n記得選項之間也要用空格隔開，我就會幫選擇障礙的你挑一個。」\
\n \
\n看起來很實用對不對～那為什麼會叫做垃圾話呢？\
\n因為不管哪個功能都有可能會被嗆啊哈哈哈哈哈！\
';
  else    

  //CC功能說明
  if (inputStr.match('cc') != null) return '\
【CC功能說明】\
\n \
\n和凍豆腐一樣，最常用的是「cc<=[數字]」的一般檢定。\
\n還有「cc([-2~2])<=[數字]」的獎懲骰。\
\n \
\n和凍豆腐不同的新增功能如下： \
\n幕間成長骰：「cc>[數字]」，用於幕間技能成長。\
\n一鍵創角（核心規則）：\n「cc 核心創角 [年齡]」，以核心規則創角（含年齡調整）。\
\n一鍵創角（悠子房規）：\n「cc 悠子創角」，主要屬性骰七取五，次要屬性骰四取三，LUK骰二取一。\
';
  else        
    
  //鴨霸獸幫我選～～
  if(inputStr.match('選') != null||inputStr.match('決定') != null||inputStr.match('挑') != null) {
    let rplyArr = inputStr.split(' ');
    
    if (rplyArr.length == 1) return '靠腰喔要我選也把選項格式打好好不好，真的想被淨灘嗎？';
    
    let Answer = rplyArr[Math.floor((Math.random() * (rplyArr.length-1))+ 1)];
    if(Answer.match('選') != null||Answer.match('決定') != null||Answer.match('挑') != null||Answer.match('鴨霸獸') != null) {
      rplyArr = ['幹，你不會自己決定嗎', '人生是掌握在自己手裡的', '隨便哪個都好啦', '連這種東西都不能決定，是不是不太應該啊', '沒事別叫我選東西好嗎，難道你們都是天秤座嗎（戰）', '不要把這種東西交給機器人決定比較好吧'];
      Answer = rplyArr[Math.floor((Math.random() * (rplyArr.length))+ 0)];
    }
    return '我想想喔……我覺得，' + Answer + '。';
  }
  else  
  //以下是幫眾限定的垃圾話
  if(inputStr.match('泰') != null||inputStr.match('ㄩㄊ') != null||inputStr.match('太太') != null) {
      let rplyArr=['\
（抱頭）嗚噁噁噁噁噁頭好痛…', '\
你說什麼……嗚嗚……不要提這個QQ', '\
哈哈，你說什麼呢……啊啦，眼淚怎麼自己流下來了QQ' ];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
  else
  if(inputStr.match('進化') != null) return '鴨霸獸進化～～超霸獸～～～\n（BGM：http://tinyurl.com/jjltrnt）';
  else  
  if(inputStr.match('拔嘴') != null) {
    let rplyArr=['\
傳說中，凡是拔嘴過鴨嘴獸的人，有高機率在100年內死去。', '\
拔嘴的話，我的嘴巴會長出觸手，然後開花成四個花瓣哦 (´×`)', '\
在澳洲，每過一分鐘就有一隻鴨嘴獸被拔嘴。', '\
可以的可以的，隨意隨意；反正機械鴨霸獸的嘴是拋棄式的。', '\
人類每花60秒拔嘴，就減少一分鐘的壽命。'];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
  else  
  if(inputStr.match('愛') != null) return '我是不會嗆你的，因為霸獸愛你。';
  else
  if(inputStr.match('家訪') != null) return 'ㄉㄅㄑ';
  else
  if(inputStr.match('饅頭') != null) return '可愛。';
  else
  if(inputStr.match('炸彈') != null) {
      let rplyArr=['\
野～格～炸～彈～', '\
那你就帶著野格炸彈吧。', '\
野、格、炸、彈，我、的、最、愛。' ];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
  else  
  if(inputStr.match('864') != null||inputStr.match('巴魯斯') != null||inputStr.toLowerCase().match('sora') != null) return '巴魯斯';
  else
  if(inputStr.match('康青龍') != null) return '淨灘之力與康青龍同在。';
  else
  if(inputStr.match('軒') != null) return '這我一定吉。';
  else
  if(inputStr.match('肉食性猛擊') != null) return '想試試嗎？（張嘴）';
  else
  if(inputStr.match('俊豪') != null) return '錯誤導入，誤你一生。';
  else
  if(inputStr.match('豆腐') != null) return '鴨霸獸不吃。';
  else
  if(inputStr.match('包子') != null) return '幹你娘我最討厭的就是包子你還一直提一直提';
  else
  if(inputStr.match('鍋貼') != null||inputStr.match('煎餃') != null) return '十二顆一盒，鴨霸獸也不吃，而且無比憎恨它。';
  else
  if(inputStr.match('水餃') != null) return '噁噁噁噁噁噁噁噁噁';
  else
  if(inputStr.match('蘿蔔') != null) return '我說蘿蔔又白又正又嬌小好像可以抱起來轉；照片我有存，意者請私訊yabaso。';
  else
  if(inputStr.match('爪黃') != null) return '痾痾痾你們死定了啦，不用在意那麼多。';
  else
  if(inputStr.match('私訊') != null) return '噁噁噁幹好恐怖';
  else
  if(inputStr.match('黑熊') != null) {
    let rplyArr=['\
中壢李性閃亮的黑熊熊穿浴衣👘～混亂善娘的黑熊熊穿浴衣👘～耶嘿～\n黑熊醬這樣可愛的女孩，沒男朋友真是太不可思議了！', '\
中壢，李性，閃亮（燦笑）', '\
混亂善娘（燦笑）', '\
黑熊熊穿浴衣👘～黑熊熊穿浴衣👘～耶嘿～', '\
黑熊醬這樣可愛的女孩，沒男朋友真是太不可思議了'];
    return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
  }
  else
    
  //以下是運勢功能
  if(inputStr.match('運勢') != null){
    let rplyArr=['超大吉','大吉','大吉','中吉','中吉','中吉','小吉','小吉','小吉','小吉','凶','凶','凶','大凶','大凶','你還是，不要知道比較好','這應該不關我的事'];
    return '運勢喔…我覺得，' + rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)] + '吧。';
  } 
  
  //沒有觸發關鍵字則是這個
  else{
    let rplyArr = ['\
你們死定了呃呃呃不要糾結這些……所以是在糾結哪些？', '\
在澳洲，每過一分鐘就有一隻鴨嘴獸被拔嘴。 \n我到底在共三小。', '\
嗚噁噁噁噁噁噁，不要隨便叫我。', '\
幹，你這學不會的豬！', '\
嘎嘎嘎。', '\
wwwwwwwwwwwwwwwww', '\
為什麼你們每天都可以一直玩；玩就算了還玩我。', '\
好棒，整點了！咦？不是嗎？', '\
不要打擾我挖坑！', '好棒，誤點了！', '\
在南半球，一隻鴨嘴獸拍打他的鰭，他的嘴就會掉下來。 \n我到底在共三小。', '\
什麼東西你共三小。', '\
哈哈哈哈哈哈哈哈！', '\
一直叫，你4不4想拔嘴人家？', '\
一直叫，你想被淨灘嗎？', '\
幫主你也敢嘴？', '\
拔嘴的話，我的嘴巴會長出觸手，然後開花成四個花瓣哦 (´×`)', '\
看看我！！我體內的怪物已經這麼大了！！', '\
傳說中，凡是拔嘴過鴨嘴獸的人，有高機率在100年內死去。 \n我到底在共三小。', '\
人類每花60秒拔嘴，就減少一分鐘的壽命。 \n我到底在共三小。', '\
嘴被拔，就會掉。', '\
你在大聲什麼啦！！！！', '\
公道價，八萬一（伸手）。', '\
你的嘴裡有異音（指）', '\
噓，安靜跑個團，很難？', '\
斷！', '\
在場沒有一個比我帥。', '\
我不是針對你，我是說在場各位，都是垃圾。', '\
你知道你很機掰嗎？', '\
快 …扶我去喝酒 ……', '\
幫主說，有人打你的左臉，你就要用肉食性猛擊咬斷他的小腿。'];
    return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
  }

}
