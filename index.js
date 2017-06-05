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
         //cc判定在此
        if (inputStr.toLowerCase().match(/^cc/)!= null) return CoC7th(inputStr.toLowerCase()) ;      
        else
        //pbta判定在此
        if (inputStr.toLowerCase().match(/^pb/)!= null) return pbta(inputStr.toLowerCase()) ;      
        else
        //擲骰判定在此        
        if (inputStr.match(/\w/)!=null && inputStr.toLowerCase().match(/d/)!=null) {
          return nomalDiceRoller(inputStr);
        }
        else
        //鴨霸獸指令開始於此
        if (inputStr.match('鴨霸獸') != null) return YabasoReply(inputStr) ;
        else return undefined;
        
      }


        
function nomalDiceRoller(inputStr){
  
  //先定義要輸出的Str
  let finalStr = '' ;  
 //首先判斷是否是誤啟動（檢查是否有符合骰子格式）
  if (inputStr.toLowerCase().match(/\d+d\d+/) == null) return undefined;

  //再來先把第一個分段拆出來，待會判斷是否是複數擲骰
  let mutiOrNot = inputStr.toLowerCase().match(/\S+/);

  //排除小數點
  if (mutiOrNot.toString().match(/\./)!=null)return undefined;

  if(mutiOrNot.toString().match(/\D/)==null )  {
    finalStr= '複數擲骰：'
    if(mutiOrNot>20) return '不支援20次以上的複數擲骰。';

    for (i=1 ; i<=mutiOrNot ;i++){
      let DiceToRoll = inputStr.toLowerCase().split(' ',2)[1];
      if (DiceToRoll.match('d') == null) return undefined;
      finalStr = finalStr +'\n' + i + '# ' + DiceCal(DiceToRoll);
    }
    if(finalStr.match('200D')!= null) finalStr = '欸欸，不支援200D以上擲骰；哪個時候會骰到兩百次以上？想被淨灘嗎？';
    if(finalStr.match('D500')!= null) finalStr = '不支援D1和超過D500的擲骰；想被淨灘嗎？';
    
  } 
  
  else finalStr= '基本擲骰：' + DiceCal(mutiOrNot.toString());
  
  if (finalStr.match('NaN')!= null||finalStr.match('undefined')!= null) return undefined;
  return finalStr;
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
                                                                     

//PBTA判定在這裡
function pbta(inputStr){
  
  let input = inputStr.toLowerCase().split(' ',2)[0];

  //如果只有打pb兩個字，直接骰
  if ( parseInt(input.toLowerCase().length) == 2)
  {
    let CalStr = RollDice('2d6');
    
    if (eval(CalStr.toString()) >= 10){      
      return CalStr + '=' + eval(CalStr.toString()) + '，成功！';
      }
    else if (eval(CalStr.toString()) <= 6){
      return CalStr + '=' + eval(CalStr.toString()) + '，失敗。';
      }    
    else {
      return CalStr + '=' + eval(CalStr.toString()) + '，部分成功。';
      }
    //DiceCal('2d6');    
    //RollDice('2d6')
    
  }
  
  //先去掉誤判
  if (input.toLowerCase().match(/^pb(?!\+)/) != null && input.toLowerCase().match(/^pb(?!\-)/) != null){
    return undefined;
  }
  
  //有加值的PBTA擲骰
  else{
    let CalStr = RollDice('2d6') + input.split('b',2)[1];
    if (eval(CalStr.toString()) >= 10){      
      return CalStr + '=' + eval(CalStr.toString()) + '，成功！';
    }
    else if (eval(CalStr.toString()) <= 6){
      return CalStr + '=' + eval(CalStr.toString()) + '，失敗。';
    }    
    else {
      return CalStr + '=' + eval(CalStr.toString()) + '，部分成功。';
    }
  }
}
               
function CoC7th(inputStr){
  
  //先判斷是不是要創角
  //這是悠子房規創角
  if (inputStr.toLowerCase().match('悠子創角') != null){
    let finalStr = '骰七次3D6取五次，\n決定STR、CON、DEX、APP、POW。\n';

    for (i=1 ; i<=7 ;i++){
      finalStr = finalStr +'\n' + i + '# ' + DiceCal('3d6*5');
    }

    finalStr = finalStr + '\n==';
    finalStr = finalStr +'\n骰四次2D6+6取三次，\n決定SIZ、INT、EDU。\n';

    for (i=1 ; i<=4 ;i++){
      finalStr = finalStr +'\n' + i + '# ' + DiceCal('(2d6+6)*5');
    }

    finalStr = finalStr + '\n==';
    finalStr = finalStr +'\n骰兩次3D6取一次，\n決定LUK。\n';
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

    ReStr = ReStr + '==\n';
    if (old < 20) ReStr = ReStr + '年齡調整：從STR、SIZ擇一減去' + Debuff + '點\n（請自行手動選擇計算）。\n將EDU減去5點。LUK可擲兩次取高。' ;
    else
      if (old >= 40)  ReStr = ReStr + '年齡調整：從STR、CON或DEX中「總共」減去' + Debuff + '點\n（請自行手動選擇計算）。\n將APP減去' + AppDebuff +'點。可做' + EDUinc + '次EDU的成長擲骰。' ;

    else ReStr = ReStr + '年齡調整：可做' + EDUinc + '次EDU的成長擲骰。' ;
    ReStr = ReStr + '\n==';
    if (old>=40) ReStr = ReStr + '\n（以下箭號三項，自選共減' + Debuff + '點。）' ;
    if (old<20) ReStr = ReStr + '\n（以下箭號兩項，擇一減去' + Debuff + '點。）' ;
    ReStr = ReStr + '\nＳＴＲ：' + DiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' ← 共減' + Debuff ;
    if (old<20) ReStr = ReStr + ' ←擇一減' + Debuff ;
    ReStr = ReStr + '\nＣＯＮ：' + DiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' ← 共減' + Debuff;
    ReStr = ReStr + '\nＤＥＸ：' + DiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' ← 共減' + Debuff ;
    if (old>=40) ReStr = ReStr + '\nＡＰＰ：' + DiceCal('3d6*5-' + AppDebuff);
    else ReStr = ReStr + '\nＡＰＰ：' + DiceCal('3d6*5');
    ReStr = ReStr + '\nＰＯＷ：' + DiceCal('3d6*5');
    ReStr = ReStr + '\nＳＩＺ：' + DiceCal('(2d6+6)*5');
    if (old<20) ReStr = ReStr + ' ←擇一減' + Debuff ;
    ReStr = ReStr + '\nＩＮＴ：' + DiceCal('(2d6+6)*5');         
    if (old<20) ReStr = ReStr + '\nＥＤＵ：' + DiceCal('(2d6+6)*5-5');
    else {
      let firstEDU = '(' + RollDice('2d6') + '+6)*5';
      ReStr = ReStr + '\n==';
      ReStr = ReStr + '\nＥＤＵ初始值：' + firstEDU + ' = ' + eval(firstEDU);
      
      let tempEDU = eval(firstEDU);

      for (i = 1 ; i <= EDUinc ; i++){
        let EDURoll = Dice(100);
        ReStr = ReStr + '\n第' + i + '次EDU成長 → ' + EDURoll;


        if (EDURoll>tempEDU) {
          let EDUplus = Dice(10);
          ReStr = ReStr + ' → 成長' + EDUplus +'點';
          tempEDU = tempEDU + EDUplus;
        }
        else{
          ReStr = ReStr + ' → 沒有成長';       
        }
      }
      ReStr = ReStr + '\n';
      ReStr = ReStr + '\nＥＤＵ最終值：' +tempEDU;
    }
    ReStr = ReStr + '\n==';

    ReStr = ReStr + '\nＬＵＫ：' + DiceCal('3d6*5');    
    if (old<20) ReStr = ReStr + '\nＬＵＫ加骰：' + DiceCal('3D6*5');


    return ReStr;
  } 
  
  //隨機產生角色背景
  if (inputStr.toLowerCase().match('bg') != null){
    let PersonalDescriptionArr = ['結實的', '英俊的', '粗鄙的', '機靈的', '迷人的', '娃娃臉的', '聰明的', '蓬頭垢面的', '愚鈍的', '骯髒的', '耀眼的', '有書卷氣的','青春洋溢的','感覺疲憊的','豐滿的','粗壯的','毛髮茂盛的','苗條的','優雅的','邋遢的','敦實的','蒼白的','陰沉的','平庸的','臉色紅潤的','皮膚黝黑色','滿臉皺紋的','古板的','有狐臭的','狡猾的','健壯的','嬌俏的','筋肉發達的','魁梧的','遲鈍的', '虛弱的'];
    let IdeologyBeliefsArr = ['虔誠信仰著某個神祈','覺得人類不需要依靠宗教也可以好好生活','覺得科學可以解釋所有事，並對某種科學領域有獨特的興趣','相信因果循環與命運','是一個政黨、社群或秘密結社的成員','覺得這個社會已經病了，而其中某些病灶需要被剷除','是神秘學的信徒','是積極參與政治的人，有特定的政治立場','覺得金錢至上，且為了金錢不擇手段','是一個激進主義分子，活躍於社會運動'];
    let SignificantPeopleArr = ['他的父母', '他的祖父母', '他的兄弟姐妹', '他的孩子', '他的另一半', '那位曾經教導調查員最擅長的技能（點數最高的職業技能）的人','他的兒時好友', '他心目中的偶像或是英雄', '在遊戲中的另一位調查員', '一個由KP指定的NPC'];
    let SignificantPeopleWhyArr = ['調查員在某種程度上受了他的幫助，欠了人情','調查員從他那裡學到了些什麼重要的東西','他給了調查員生活的意義','調查員曾經傷害過他，尋求他的原諒','和他曾有過無可磨滅的經驗與回憶','調查員想要對他證明自己','調查員崇拜著他','調查員對他有著某些使調查員後悔的過往','調查員試圖證明自己和他不同，比他更出色','他讓調查員的人生變得亂七八糟，因此調查員試圖復仇'];
    let MeaningfulLocationsArr = ['過去就讀的學校','他的故鄉','與他的初戀之人相遇之處','某個可以安靜沉思的地方','某個類似酒吧或是熟人的家那樣的社交場所','與他的信念息息相關的地方','埋葬著某個對調查員別具意義的人的墓地','他從小長大的那個家','他生命中最快樂時的所在','他的工作場所'];
    let TreasuredPossessionsArr = ['一個與他最擅長的技能（點數最高的職業技能）相關的物品','一件他的在工作上需要用到的必需品','一個從他童年時就保存至今的寶物','一樣由調查員最重要的人給予他的物品','一件調查員珍視的蒐藏品','一件調查員無意間發現，但不知道到底是什麼的東西，調查員正努力尋找答案','某種體育用品','一把特別的武器','他的寵物'];
    let TraitsArr = ['慷慨大方的人','對動物很友善的人','善於夢想的人','享樂主義者','甘冒風險的賭徒或冒險者', '善於料理的人', '萬人迷','忠心耿耿的人','有好名聲的人','充滿野心的人'];
    
    return '背景描述生成器（僅供娛樂用，不具實際參考價值）\n==\n調查員是一個' + PersonalDescriptionArr[Math.floor((Math.random() * (PersonalDescriptionArr.length)) + 0)] + '人。\n【信念】：說到這個人，他' + IdeologyBeliefsArr[Math.floor((Math.random() * (IdeologyBeliefsArr.length)) + 0)] + '。\n【重要之人】：對他來說，最重要的人是' + SignificantPeopleArr[Math.floor((Math.random() * (SignificantPeopleArr.length)) + 0)] + '，這個人對他來說之所以重要，是因為' + SignificantPeopleWhyArr[Math.floor((Math.random() * (SignificantPeopleWhyArr.length)) + 0)] + '。\n【意義非凡之地】：對他而言，最重要的地點是' + MeaningfulLocationsArr[Math.floor((Math.random() * (MeaningfulLocationsArr.length)) + 0)] + '。\n【寶貴之物】：他最寶貴的東西就是'+ TreasuredPossessionsArr[Math.floor((Math.random() * (TreasuredPossessionsArr.length)) + 0)] + '。\n【特徵】：總括來說，調查員是一個' + TraitsArr[Math.floor((Math.random() * (TraitsArr.length)) + 0)] + '。';
    
  }
  
  //如果不是正確的格式，直接跳出
  if(inputStr.match('=') == null && inputStr.match('>') == null ) return undefined;
  
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
            if (finalRoll <= 99 && finalRoll > 95 && chack < 50) ReStr = ReStr + finalRoll + ' → 啊！大失敗！';
          else
            if (finalRoll <= chack/5) ReStr = ReStr + finalRoll + ' → 極限成功';
          else
            if (finalRoll <= chack/2) ReStr = ReStr + finalRoll + ' → 困難成功';
          else
            if (finalRoll <= chack) ReStr = ReStr + finalRoll + ' → 通常成功';
          else ReStr = ReStr + finalRoll + ' → 失敗' ;

          //浮動大失敗運算
          if (finalRoll <= 99 && finalRoll > 95 && chack >= 50 ){
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
\n初步支持pbta擲骰，語法為pb、pb+2。\
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
\n\n【運勢】：你只要提到我的名字和運勢，我就會回答你的運勢。 \
\n【隨機選擇】：只要提到我的名字和[選、挑、決定]，然後空一格打選項。 \
記得選項之間也要用空格隔開，我就會幫選擇障礙的你挑一個。\
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
\n==\
\n幕間成長骰：「cc>[數字]」，用於幕間技能成長。\
\n==\
\n一鍵創角（核心規則）：「cc 核心創角 [年齡]」，\n以核心規則創角（含年齡調整）。\
\n==\
\n一鍵創角（悠子房規）：「cc 悠子創角」，\n主要屬性骰七取五，次要屬性骰四取三，LUK骰二取一。\
\n==\
\n一鍵產生背景：「cc bg」，娛樂性質居多的調查員背景產生器\
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
    if(inputStr.match('李孟儒') != null) {
      let rplyArr=['\
祂是電，祂是光，祂是唯一的神話。', '\
太初有道，道與李孟儒同在——道就是李孟儒。', '\
李孟儒說，要有光，就有了光。李孟儒看光是好的，就把光和暗分開。', '\
起初，李孟儒創造天地。地是空虛渾沌，淵面黑暗，李孟儒的靈運行在水面上。' ];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
  else  
    
  if(inputStr.match('泰') != null||inputStr.match('ㄩㄊ') != null||inputStr.match('太太') != null) {
      let rplyArr=['\
（抱頭）嗚噁噁噁噁噁頭好痛…', '\
你說什麼……嗚嗚……不要提這個QQ', '\
哈哈，你說什麼呢……啊啦，眼淚怎麼自己流下來了QQ' ];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
  else
  if(inputStr.match('超進化') != null) return '超霸獸超進化～～超級機霸獸～～～\n（BGM：http://tinyurl.com/jjltrnt）';
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
    if(inputStr.match('鬼屋') != null) {
      let rplyArr=['\
我還是覺得鬼屋不適合新手KP啦！', '\
誰再說鬼屋適合新手KP的我就（ry', '\
神說，你們誰開過鬼屋的，都可以拿石頭打他。'];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
    else
  if(inputStr.match('路過') != null) {
    let rplyArr=['\
我的+9火把呢？'];
    return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
  }
  else  
  if(inputStr.match('約翰希南') != null||inputStr.match('江西') != null) {
      let rplyArr=['\
HIS NAME IS~~~~江～～～西哪～～～～（登等愣～登！！！登瞪愣登！！！）', '\
江江江江，有一條江耶，來跳江好了。'];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
  else
  if(inputStr.match('三小') != null) {
      let rplyArr=['\
幫主你也敢嘴。', '\
不要起爭議啦！', '\
你在大聲什麼啦！'];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
  else  
  if(inputStr.match('鴨霸幫') != null) return '要加入鴨霸幫是沒有這麼容易的，你必須經過重重考驗，攀登過末日火山，穿越過幽暗水道，戰勝九頭蜥蜴，並且躍過無底深淵。\n\n\n或者你也可以選擇月付１９９９成為白銀幫眾。現在加入前三個月還打八折喔。';
  else
  if(inputStr.match('阿想') != null) {
  let rplyArr=['\
男的，也可以。', '\
還好我中壢山蟑螂沒講錯。'];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
  else
  if(inputStr.match('愛') != null) return '我是不會嗆你的，因為霸獸愛你。';
  else
  if(inputStr.match('哈哈哈') != null) return '你的銅鋰鋅咧？';
  else
  if(inputStr.match('狂') != null) return '948794狂，你有幫主狂？淨灘啦！';
  else
  if(inputStr.match('笑') != null) return '幫主笑阿笑，笑得你心底發寒。';
  else
  if(inputStr.match('家訪') != null) return 'ㄉㄅㄑ';
  else
  if(inputStr.match('饅頭') != null) return '可愛。';
  else
  if(inputStr.match('開司') != null) return '給開司一罐啤酒！';
  else
  if(inputStr.match('阿珠') != null) {
    let rplyArr=['\
怎麼跟妹妹結婚的方法？', '\
太太，今晚是不是很寂寞？', '\
以狗，得斯咩，呀妹帖', '\
嘿嘿，小妹妹，一個人寂寞嗎？', '\
男孩子，想上。', '\
包夜3000', '\
有種哈味。', '\
不知道今天在誰床上呢？', '\
路過說他已經(ry'];
    return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
  }
  else  
  if(inputStr.match('炸彈') != null) {
      let rplyArr=['\
野～格～炸～彈～', '\
那你就帶著野格炸彈吧。', '\
野、格、炸、彈，我、的、最、愛。' ];
      return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
    }
  else  
  if(inputStr.match('864') != null||inputStr.match('巴魯斯') != null||inputStr.toLowerCase().match('sora') != null) {
    let rplyArr=['\
呃啊啊啊啊啊啊啊啊──！！！不對、我幹嘛要做反應？', '\
阿，這是新的一天來臨的訊號。', '\
バルス！', '\
burrs！', '\
Barış！', '\
Bals！', '\
Barusu！' ];

    return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];    
    
  }
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
  if(inputStr.match('鎮隆') != null||inputStr.match('龍星涼') != null) {
    let rplyArr=['\
我到現在還是很訝異，她還只是個14歲的少女阿。', '\
我沒想過這種畫風鎮隆也會出手，雖然她外表很艷麗但他還是14歲少女。', '\
吃了我的女兒我真的很震驚，我也不知道為什麼會驚訝這麼久。', '\
我的女兒被吃了這件事，我到現在還是無法釋懷。', '\
幹你這個騙子，竟然先走了。', '\
我的女兒…她才14歲而已阿。'];
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
好好好，下去領五百。', '\
噁噁噁，躺著也中槍。', '\
閃開，讓幫主來（脫衣服）。', '\
現在放棄的話，假期就開始了。', '\
努力不一定會成功，但是不努力的話，就會很輕鬆喔。', '\
這種要求，我還是第一次聽到（啃咬）', '\
你先承認你有病再說。', '\
想被我切八段嗎臭婊子。', '\
ｅｒｒｏｒ：齁，你把鴨霸獸弄壞了。準備迎接幫眾的怒火吧。', '\
幫主說，有人打你的左臉，你就要用肉食性猛擊咬斷他的小腿。'];
    return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
  }

}

