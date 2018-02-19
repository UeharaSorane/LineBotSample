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
   'Authorization': 'Bearer 8rtszyv+Dp8LiAgqC55rYl8psSt09/oq5OOKc0UT1ulyEr9s0T2TbREREBS++n895oGC44JIR2ZZHMM6j3yir1gSIliV1a7VqkWFN+7GW0sk5HK3WhQbBNSfN9dPpHqYgUHdhWzkFUG/JxxEUL0bGQdB04t89/1O/w1cDnyilFU='
  }
}
app.set('port', (process.env.PORT || 5000));

// views is directory for all template files

app.get('/', function(req, res) {
//  res.send(parseInput(req.query.input));
  res.send('看來系統沒有出錯呢...(攤');
});

app.post('/', jsonParser, function(req, res) {
  let event = req.body.events[0];
  let type = event.type;
  let msgType = event.message.type;
  let msg = event.message.text;
  let rplyToken = event.replyToken;

  let rplyVal = null;
  //console.log(msg);
  if (type == 'message' && msgType == 'text') {
    try {
      rplyVal = parseInput(rplyToken, msg); 
    } 
    catch(e) {
      console.log('catch error');
    }
  }

  if (rplyVal) {
    replyMsgToLine(rplyToken, rplyVal); 
  } else {
  //  console.log('Do not trigger'); 
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
    //  console.log(body); 
    });
  });
  request.on('error', function(e) {
    console.log('Request error: ' + e.message);
  })
  request.end(rplyJson);
}

////////////////////////////////////////
//////////////// 分析開始
////////////////////////////////////////
function parseInput(rplyToken, inputStr) {
	
          
	//	console.log('InputStr: ' + inputStr);
	_isNaN = function(obj) {
		return isNaN(parseInt(obj));
        }
		
        let msgSplitor = (/\S+/ig);	
	let mainMsg = inputStr.match(msgSplitor); //定義輸入字串
	let trigger = mainMsg[0].toString().toLowerCase(); //指定啟動詞在第一個詞&把大階強制轉成細階
	
	////////////////////////////情報相關
	if (trigger.match(/^公告$/) != null) return GameInformation(mainMsg[1]);	//遊戲公告指令
	if (trigger.match(/^活動$/) != null) return GameEvent(mainMsg[1]);	//遊戲活動指令
	
	////////////////////////////戰鬥相關
	//ccb指令
	if (trigger.match(/^ccb$/)!= null && mainMsg[1]<=1000 ){
		if (trigger == 'ccb'&& mainMsg[1]<=99) return ccb(mainMsg[1],mainMsg[2]);
        }
	//xBy>A 指令開始於此
	if (trigger.match(/^(\d+)(b)(\d+)$/i)!= null)
	{        
		return xBy(trigger,mainMsg[1],mainMsg[2]);
	}
	//xUy 指令開始於此	
	if (trigger.match(/^(\d+)(u)(\d+)$/i)!= null && isNaN(mainMsg[1])== false)
	{        
		return xUy(trigger,mainMsg[1],mainMsg[2],mainMsg[3]);
	}
	
	        //普通ROLL擲骰判定在此        
        if (inputStr.match(/\w/)!=null && inputStr.toLowerCase().match(/\d+d+\d/)!=null) {
          return nomalDiceRoller(inputStr,mainMsg[0],mainMsg[1],mainMsg[2]);
        }
	
	////////////////////////////服務相關
	if (trigger.match(/^寶箱$|^開寶箱$/) != null) return BoxOpen() ;//寶箱狩獵指令
	if (trigger.match(/^祈願$/) != null) return LoginBonus() ;//每日登入指令
	if (trigger.match(/^help$|^幫助$/)!= null ) return Help();//幫助頁面
	if (trigger.match(/^教學$|^新手教學$/)!= null ) return tutorial(mainMsg[1]);//幫助頁面
	if (trigger.match(/^重要資訊處$/)!= null ) return ImportantInformation();//重要資訊處
	if (trigger.match(/^遊戲存檔$/)!= null ) return GameSave();//遊戲存檔
	if (trigger.match(/^招募$/) != null) return gacha(mainMsg[1],mainMsg[2]);	//角色招募指令
	if (trigger.match(/^更新紀錄$/) != null) return UpdateLog();//更新紀錄指令
	//if (trigger.match(/^主線$/) != null) return MainStory(mainMsg[1],mainMsg[2]);	//遊戲主線指令
	
	////////////////////////////娛樂相關
        if (trigger.match(/空音/) != null) return randomReply() ;//空音閒談指令
	if (trigger.match(/空空/) != null) return randomReplyShin() ;//空音閒談指令(裏)
	if (trigger.match(/^賀歲抽籤$/) != null) return randomReplyNewYear() ;//賀歲抽籤
	if (trigger.match(/運氣|運勢/) != null) return randomLuck(mainMsg) ; //占卜運氣        
        if (trigger.match(/flag/) != null) return BStyleFlagSCRIPTS() ;//插旗用指令
	//塔羅牌
	if (trigger.match(/tarot|塔羅牌|塔羅/) != null) {
			if (trigger.match(/每日|daily/)!= null) {
				return NomalDrawTarot(mainMsg[1], mainMsg[2]);
			}
			if (trigger.match(/時間|time/)!= null) {
				return MultiDrawTarot(mainMsg[1], mainMsg[2], 1);
			}
			if (trigger.match(/大十字|cross/)!= null) {
				return MultiDrawTarot(mainMsg[1], mainMsg[2], 2);
			}
			return MultiDrawTarot(mainMsg[1], mainMsg[2], 3); //預設抽 79 張
	}


}
////////////////////////////////////////
//////////////// 骰組開始
////////////////////////////////////////      

//////////////// ccb功能   
function ccb(chack,text){
          let temp = Dice(100);
          if (text == null ) {
            if (temp == 100) return 'ccb<=' + chack  + ' ' + temp + ' → 啊！大失敗！';
	    if (temp == 1) return 'ccb<=' + chack  + ' ' + temp + ' → 太棒了！大成功！';
            if (temp <= chack) return 'ccb<=' + chack + ' '  + temp + ' → 成功';
            else return 'ccb<=' + chack  + ' ' + temp + ' → 失敗' ;
          }
          else
    {
            if (temp == 100) return 'ccb<=' + chack + ' ' + temp + ' → 啊！大失敗！；' + text;
	    if (temp == 1) return 'ccb<=' + chack + ' ' + temp + ' → 太棒了！大成功！；' + text;
            if (temp <= chack) return 'ccb<=' + chack +  ' ' + temp + ' → 成功；' + text;
            else return 'ccb<=' + chack  + ' ' +  temp + ' → 失敗；' + text;
    }
}
////////////////
        
function ArrMax (Arr){
  var max = this[0];
  this.forEach (function(ele,index,arr){
    if(ele > max) {
      max = ele;
    }
  })
  return max;
}

//////////////// 普通ROLL
 function nomalDiceRoller(inputStr,text0,text1,text2){
  
  //首先判斷是否是誤啟動（檢查是否有符合骰子格式）
 // if (inputStr.toLowerCase().match(/\d+d\d+/) == null) return undefined;
  
  //再來先把第一個分段拆出來，待會判斷是否是複數擲骰
  let mutiOrNot = text0.toLowerCase();
  
  //排除小數點
  if (mutiOrNot.toString().match(/\./)!=null)return undefined;

  //先定義要輸出的Str
  let finalStr = '' ;  
  
  
  //是複數擲骰喔
  if(mutiOrNot.toString().match(/\D/)==null ) {
	  if(text2 != null){
	  finalStr= text0 + '次擲骰：\n' + text1 +' ' + text2 + '\n';
    	  }
		  else{
		  finalStr= text0 + '次擲骰：\n' + text1 +'\n';
    		  }
    if(mutiOrNot>30) return '不支援30次以上的複數擲骰。';
    
    for (i=1 ; i<=mutiOrNot ;i++){
    let DiceToRoll = text1.toLowerCase();
    if (DiceToRoll.match('d') == null) return undefined;

    //寫出算式
    let equation = DiceToRoll;
    while(equation.match(/\d+d\d+/)!=null) {
      let tempMatch = equation.match(/\d+d\d+/);
      equation = equation.replace(/\d+d\d+/, RollDice(tempMatch));
    }

    //計算算式
    let aaa = equation;
	aaa = aaa.replace(/\d+[[]/ig, '(' );
	aaa = aaa.replace(/]/ig, ')' );
	//aaa = aaa.replace(/[[]\d+|]/ig, "");
	let answer = eval(aaa.toString());
	
    finalStr = finalStr + i + '# ' + equation + ' = ' + answer + '\n';
    }
        
  }
  
  else
  {
  //一般單次擲骰
  let DiceToRoll = mutiOrNot.toString().toLowerCase();
  DiceToRoll = DiceToRoll.toLowerCase();
  if (DiceToRoll.match('d') == null) return undefined;
  
  //寫出算式
  let equation = DiceToRoll;
  while(equation.match(/\d+d\d+/)!=null) {
	let totally = 0;
    let tempMatch = equation.match(/\d+d\d+/);    
    if (tempMatch.toString().split('d')[0]>300) return undefined;
    if (tempMatch.toString().split('d')[1]==1 || tempMatch.toString().split('d')[1]>1000000) return undefined;
    equation = equation.replace(/\d+d\d+/, RollDice(tempMatch));
	
  }
  
  //計算算式
	let aaa = equation;
	aaa = aaa.replace(/\d+[[]/ig, '(' );
	aaa = aaa.replace(/]/ig, ')' );
	let answer = eval(aaa.toString());
      
  if(text1 != null){
	  finalStr= text0 + '：' + text1 + '\n' + equation + ' = ' + answer;
    	  }
		  else{
		  finalStr= text0 + '：\n' + equation + ' = ' + answer;
    		  }

  }
  
  return finalStr;


}
////////////////

//////////////// 擲骰子運算
function sortNumber(a,b)
{
return a - b
}
////////////////

//////////////// 取隨機值專用
function Dice(diceSided){
	return Math.floor((Math.random() * diceSided) + 1)
}
////////////////
		
	function RollDice(inputStr){
  //先把inputStr變成字串（不知道為什麼非這樣不可）
  let comStr=inputStr.toString();
  let finalStr = '[';
  let temp = 0;
  var totally = 0;
  for (let i = 1; i <= comStr.split('d')[0]; i++) {
	temp = Dice(comStr.split('d')[1]);
	totally +=temp;
    finalStr = finalStr + temp + '+';
     }

  finalStr = finalStr.substring(0, finalStr.length - 1) + ']';
  finalStr = finalStr.replace('[', totally +'[');
  return finalStr;
}

function FunnyDice(diceSided) {
	return Math.floor((Math.random() * diceSided)) //猜拳，從0開始
}

function BuildDiceCal(inputStr){
  
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
    equation = equation.replace(/\d+d\d+/, BuildRollDice(tempMatch));
  }
  
  //計算算式
  let answer = eval(equation.toString());
    finalStr= equation + ' = ' + answer;
  
  return finalStr;

}        

function BuildRollDice(inputStr){
  //先把inputStr變成字串（不知道為什麼非這樣不可）
  let comStr=inputStr.toString().toLowerCase();
  let finalStr = '(';

  for (let i = 1; i <= comStr.split('d')[0]; i++) {
    finalStr = finalStr + Dice(comStr.split('d')[1]) + '+';
     }

  finalStr = finalStr.substring(0, finalStr.length - 1) + ')';
  return finalStr;
}


////////////////////////////////////////
//////////////// xBy
////////////////////////////////////////
function xBy(triggermsg ,text01, text02) {

let returnStr = '(' + triggermsg +')';
let match = /^(\d+)(B)(\d+)$/i.exec(triggermsg);  //判斷式  [0]3B8,[1]3,[2]B,[3]8
let varcou =  new Array();
let varsu = 0;
for (var i = 0; i < Number(match[1]); i++)	
	{
             varcou[i] =  Dice(match[3]);
	}
varcou.sort(sortNumber);
//(5B7>6) → 7,5,6,4,4 → 成功数1

if(isNaN(text01) ==false &&Number(text01) <= Number(match[3]))
{
for (let i = 0; i < Number(match[1]); i++)	
	{
             if(Number(varcou[i])>=Number(text01)) varsu++;        
	}
	if (text02 ==undefined) text02 ='';

    returnStr+= ' → ' + varcou + ' → 成功數'+varsu + ' ' +text02 ;
	
}
else{
	if (text01 ==undefined) text01 ='';
	returnStr+=  ' → ' + varcou + ' ' +text01 ;

	}
	

return returnStr;
}

////////////////////////////////////////
//////////////// xUy
////////////////  (5U10[8]) → 17[10,7],4,5,7,4 → 17/37(最大/合計)
////////////////  (5U10[8]>8) → 1,30[9,8,8,5],1,3,4 → 成功数1
////////////////////////////////////////

function xUy(triggermsg ,text01, text02, text03) {
	var match = /^(\d+)(u)(\d+)/i.exec(triggermsg);   //判斷式  5u19,5,u,19, 
	var returnStr = '('+triggermsg+'['+text01+']';
	if(Number(text02) <= Number(match[3]) && text02 != undefined) 
	{
		returnStr+= '>'+text02+ ') → ';
		if(text03!=undefined) returnStr += text03 +' → ';
	}
	else{
	returnStr+= ') → ';
		if(text02!=undefined) returnStr += text02 +' → ';	
	}	
	let varcou =  new Array();
	let varcouloop =  new Array();
	let varcoufanl =  new Array();
	let varcounew =  new Array();
	var varsu = 0;
	if (text01<=2) { return  '加骰最少比2高'; }

for (var i = 0; i < Number(match[1]); i++)	
	{
			varcou[i] =  Dice(match[3]);
			varcounew[i] = varcou[i];
			varcouloop[i] = varcounew[i];
			for(;varcounew[i]>=text01;)
			{
				varcounew[i] =Dice(match[3]);
				varcouloop[i] += ', ' +varcounew[i];
				varcou[i] += varcounew[i];
			}

	}

    for(var i = 0; i < varcouloop.length; i++)	
  {
	if(varcouloop[i]==varcou[i])   {returnStr += varcou[i]+', ';}
    else     returnStr += varcou[i]+'['+varcouloop[i]+ '], '; 
    
  }
		returnStr = returnStr.replace(/, $/ig,'');
 
 
 
 if(Number(text02) <= Number(match[3]) ){
let suc =0;

////////////////  (5U10[8]>8) → 1,30[9,8,8,5],1,3,4 → 成功数1
for(var i=0;i<varcou.length;i++)
{
if(Number(varcou[i])>=Number(text02)) suc++;
}

returnStr  += ' → 成功数' +suc;

 }
 else
  ////////////////  (5U10[8]) → 17[10,7],4,5,7,4 → 17/37(最大/合計)

	 {
 returnStr  +=' → ' + Math.max.apply(null, varcou)
returnStr  += '/' + varcou.reduce(function(previousValue,currentValue){
        return previousValue + currentValue;} ) +'(最大/合計)';

	}
	return returnStr;
	
	}



////////////////////////////////////////
//////////////// 占卜&其他
////////////////////////////////////////

//////////////// 插旗
	function BStyleFlagSCRIPTS() {
		let rplyArr = ['\
		「打完這仗我就回老家結婚（この戦いが終わったら、故郷に帰って結婚するんだ）」', '\
		「打完這一仗後我請你喝酒」', '\
		「你、你要錢嗎！要什麼我都能給你！/我可以給你更多的錢！」', '\
		「做完這次任務，我就要結婚了。」', '\
		「幹完這一票我就金盆洗手了。」', '\
		「好想再XXX啊……」', '\
		「已經沒什麼好害怕的了（もう何も恐くない）」', '\
		「我一定會回來的（必ず帰る！）」', '\
		「差不多該走了」', '\
		「我只是希望你永遠不要忘記我。」', '\
		「我只是希望能永遠和你在一起。」', '\
		「啊啊…為什麼會在這種時候、想起了那些無聊的事呢？」', '\
		「能遇見你真是太好了。」', '\
		「我終於…為你們報仇了！」', '\
		「等到一切結束後，我有些話想跟妳說！」', '\
		「這段時間我過的很開心啊。」', '\
		把自己的寶物借給其他人，然後說「待一切結束後記得還給我。」', '\
		「真希望這份幸福可以永遠持續下去。」', '\
		「我們三個人要永永遠遠在一起！」', '\
		「這是我女兒的照片，很可愛吧？」', '\
		「請告訴他/她，我永遠愛他/她」', '\
		「聽好，在我回來之前絕不要亂走動哦（いいか、俺が帰ってくるまでここを動くんじゃないぞ）」', '\
		「要像一個乖孩子一樣等著我回來」', '\
		「我去去就來（先に行って、すぐ戻るから）」', '\
		「快逃！(逃げろう！/早く逃げろう！)」', '\
		「對方只有一個人，大家一起上啊」', '\
		「我就不信，這麼多人還殺不了他一個！」', '\
		「幹，幹掉了嗎？（やったのか？）」', '\
		「身體好輕」', '\
		「可惡！你給我看著！（逃跑）」', '\
		「躲在這裡就應該不會被發現了吧。」', '\
		「我不會讓任何人死的。」', '\
		「可惡！原來是這麼回事！」', '\
		「跑這麼遠應該就行了。」', '\
		「我已經甚麼都不怕了（もう何も恐くない）」', '\
		「這XXX是什麼，怎麼之前沒見過（なんだこのXXX、見たことないな）」', '\
		「什麽聲音……？就去看一下吧（:「何の音だ？ちょっと見てくる」', '\
		「是我的錯覺嗎？/果然是錯覺/錯覺吧/可能是我（看/聽）錯了」', '\
		「二十年後又是一條好漢！」', '\
		「大人/將軍武運昌隆」', '\
		「這次工作的報酬是以前無法比較的（:「今度の仕事でまとまったカネが入るんだ」', '\）」', '\
		「我才不要和罪犯呆在一起，我回自己的房間去了！（この中に殺人者がいるかもしれないのに、一緒に居られるか!俺は自分の部屋に戻るぞ!）」', '\
		「其實我知道事情的真相…（各種廢話）…犯人就是……」', '\
		「我已經天下無敵了~~」', '\
		「大人！這邊就交給小的吧，請快離開這邊吧」', '\
		「XX，這就是我們流派的最終奧義。這一招我只會演示一次，你看好了！」', '\
		「誰敢殺我？」', '\
		「從來沒有人能越過我的劍圍。」', '\
		「就算殺死也沒問題吧？」', '\
		「看我塔下強殺！」', '\
		「騙人的吧，我們不是朋友嗎？」', '\
		「我老爸是....你有種就....」', '\
		「我可以好好利用這件事」'];
		return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
////////////////

//////////////// 空音閒談
        function randomReply() {
        	let rplyArr = [
		  
		 	'\有什麼事嗎？', 
		 	'\如果沒有需要，我回去打街機喔。', 
		  	'\嗯....(專心打太鼓達人中)', 
		  	'\如果有不會的指令的話，輸入help吧！',
		  	'\Wryyyyyyyyyyyyyyyyyy!!!!!(DIO臉)。',
		  	'\攤',
		  	'\儘管我只是一個bot，也是有遊戲要玩的。',
		  	'\想要確認自己的手氣的話，試試輸入"運氣"如何？',
		  	'\不知道這裡有沒有單手接幽玄之亂的人呢？',
		  	'\除了音樂街機外，我也蠻喜歡玩甲蟲王者的...',
		  	'\我是擔當bot而不是教機率學的，如果妳臉黑，我只會叫你儲值(被巴。',
		  	'\痾...不予置評。',
			'\！',
		  	'\剛認識就直接叫名子，感覺好像有點奇怪？',
		  	'\我的喜好嗎...？當然是音樂遊戲啊！',
		  	'\我的製作人，施彥任內心有點脆弱，拜托沒事不要傷他的心喔。',
		  	'\比起一直找我聊天，不如試著找其他事做吧。',
		  	'\我最喜歡的角色嗎...？應該是露吧。不論何時都很可愛',
		  	'\稍微...讓我休息一下吧(攤',
			'\希望我成為你的同伴？看看夥伴商店吧！'];
        	return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
////////////////

//////////////// 空音閒談(裏)
        function randomReplyShin() {
        	let rplyArr = [
		  
		 	'\在抽獎之前，先把火力燒成灰吧', 
		 	'\FYK=Fuck You Konami', 
		  	'\NicoNico=垃圾', 
		  	'\海外太鼓沒廣場',
		  	'\海外maimia沒人權曲',
		  	'\海外GC沒日文語音',
		  	'\我不當一般的Bot了!JOJO!!!!!',
		  	'\你什麼時候產生了你有妹妹的錯覺？',
		  	'\乖，帽子戴正，都歪了',
		  	'\私',
		  	'\幫我撐十秒',
		  	'\整天妄想稱呼我暱稱？真是有夠噁心的'];
        	return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
////////////////

//////////////// 賀歲抽籤
        function randomReplyNewYear() {
        	let rplyArr = [
		  
		 	'\押金x1.5倍!!!', 
		 	'\押金x2倍!!!', 
		  	'\押金x2.5倍!!!', 
		  	'\押金x3倍!!!',
		  	'\我累了，你們慢慢打',
		  	'\GM今天心情好，這場直接給你們100壓歲錢',
		  	'\我不當抽籤Bot了!JOJO!!!!!',
		  	'\押金+10',
		  	'\押金+50',
		  	'\押金+100',
		  	'\莉莉艾好可愛喔莉莉艾'];
        	return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
////////////////


//////////////// 寶箱狩獵
	function BoxOpen() {
	  let temp = Dice(100);
		
	  if (temp >= 68) return '\恭喜，是普通獎勵。';
	  if (temp <=67 && temp >= 39) return '\恭喜，是中等獎勵。';
	  if (temp <=38 && temp >= 16) return '\喔喔！是高等獎勵欸，恭喜！';
	  if (temp <=15) return '\太棒了！！！是頂級獎勵！恭喜！';
	}
////////////////

//////////////// 登入獎勵
	function LoginBonus() {
	  let temp = Dice(100);
		
	  if (temp >= 80) return '\獲得10g...';
	  if (temp <=79 && temp >= 60) return '\恭喜獲得50g!';
	  if (temp <=59 && temp >= 30) return '\恭喜獲得100g!!';
	  if (temp <=29) return '\恭喜獲得200g!!!';
	}
////////////////

//////////////// 角色招募
	function gacha(DrawPool,GachaTimes) {
		
		///基本變數
		let GachaResult = [];//抽獎結果
		let CharacterResult = [];//總計獲得同伴
		var characterShardResult = 0;//總計獲得同伴碎片
		let CharacterList = [];//腳色清單
		let CharacterListSP = [];//限定腳色清單
 
		var times = 0;//抽獎次數
		var characterChance = 0;//夥伴獲得率
		var characterChanceSP = 0;//限定夥伴獲得率
		var CharacterShard = 0;//夥伴碎片獲得數量
		var CharacterShardBonus = 0;//夥伴碎片保底數量
		var characterST = 0;//確認保底夥伴數量
		///
		
		///確定抽獎狀態
		if(DrawPool == 0){
			CharacterList.length = 3;
			CharacterList = ['克雷特','路卡','露'];
			CharacterListSP.length = 0;
			CharacterListSP = [];

			if(GachaTimes =='單抽'){
				times = 1;
				characterChance = 100;
				characterChanceSP = 0;
				CharacterShard = 0;
				CharacterShardBonus = 0;
	
			}else if(GachaTimes == null){
				
				return '\【首次限定！】新手招募-絕對獲得攻擊型夥伴一名喔！ \
					\n\
					\n 出現夥伴一覽： \
					\n 001起始英雄系列 \
					\n  克雷特\
					\n  路卡\
					\n  露\
					\n  (三名夥伴獲得機率相同)\
					\n\
					\n 提供招募方式：\
					\n 單抽 無需奇蹟石(100%出現夥伴)[一名玩家限定一次] \
					\n\
					\n 想要招募的話，請輸入 [招募 0 招募方式] \
					';
				
			  }else{
				return '\本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 [招募 ' + DrawPool + ']';
				}
		}else if(DrawPool == 1){
			CharacterList.length = 5;
			CharacterList = ['義熊','尤克特','克雷特','路卡','露'];
			CharacterListSP.length = 6;
			CharacterListSP = ['露(新春ver)','路卡(新春ver)','克雷特(新春ver)','義熊(新春ver)','薰(新春ver)','艾斯(新春ver)'];

			if(GachaTimes =='單抽'){
				times = 1;
				characterChance = 25;
				characterChanceSP = 20;
				CharacterShard = 8;
				CharacterShardBonus = 6;
				
			
			}else if(GachaTimes =='五連加一'||GachaTimes =='五連'){
				times = 6;
				characterChance = 20;
				characterChanceSP = 25;
				CharacterShard = 15;
				CharacterShardBonus = 13;
				characterST = 0;

			}else if(GachaTimes =='十連加三'||GachaTimes =='十連'){
				times = 13;
				characterChance = 10;
				characterChanceSP = 20;
				CharacterShard = 25;
				CharacterShardBonus = 9;
				characterST = 1;

			}else if(GachaTimes == null){
				
				return '\【限定招募】新春賀歲的風之冒險團期間限定招募 \
					\n 趁現在入手新春限定夥伴吧!!!\
					\n 開催時間:2/17 00:00 ~ 3/2 23:59\
					\n\
					\n 期間限定登場:\
					\n Sp1-賀歲的風之冒險團:\
					\n <我不是年獸啊！>路卡\
					\n <翠花劍士>露\
					\n <春宴神廚>義熊\
					\n <引導盛宴的武者>薰\
					\n <賀歲路人>克雷特\
					\n <春之霜>艾斯\
					\n\
					\n 還可以招募到以下夥伴系列:\
					\n\
					\n 001起始英雄系列 \
					\n\
					\n 提供招募方式：\
					\n 單抽 5顆奇蹟石(20%出現夥伴，5%機率出現期間限定夥伴，75%獲得7~14個夥伴碎片)\
					\n\
					\n 五連加一(五連) 25顆奇蹟石(15%出現夥伴，5%機率出現期間限定夥伴，80%獲得14~28個夥伴碎片)\
					\n\
					\n 十連加三(十連) 50顆奇蹟石(必定出現一名夥伴，必定出現的夥伴有20%會是限定夥伴，其餘有8%出現夥伴，2%機率出現期間限定夥伴，90%獲得10~35個夥伴碎片)\
					\n\
					\n 想要招募的話，請輸入 [招募 1 招募方式] \
				';
			  }else{
				return '\本招募無法使用' + GachaTimes +'招募喔';
				}
		}else if(DrawPool == 2){
			CharacterList.length = 5;
			CharacterList = ['義熊','尤克特','克雷特','路卡','露'];
			CharacterListSP.length = 0;
			CharacterListSP = [];

			if(GachaTimes =='單抽'){
				times = 1;
				characterChance = 20;
				characterChanceSP = 0;
				CharacterShard = 10;
				CharacterShardBonus = 0;
	
			}else if(GachaTimes =='十連加一'||GachaTimes =='十連'){
				times = 11;
				characterChance = 10;
				characterChanceSP = 0;
				CharacterShard = 19;
				CharacterShardBonus = 10;
				
				characterST = 1;
					
			}else if(GachaTimes == null){

				return '\【通常招募】通常奇蹟石招募 \
					\n 出現夥伴系列一覽： \
					\n\
					\n 001起始英雄系列 \
					\n  (全部夥伴獲得機率相同)\
					\n\
					\n 提供招募方式：\
					\n 單抽 5顆奇蹟石(20%出現夥伴，80%獲得1~10個夥伴碎片)\
					\n\
					\n 十連加一(十連) 50顆奇蹟石(必定出現一名夥伴，其餘有10%出現夥伴，90%獲得10~30個夥伴碎片)\
					\n\
					\n 想要招募的話，請輸入 [招募 2 招募方式] \
					';
				
			  }else{
				return '\本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 [招募 ' + DrawPool + ']';
				}
		}else if(DrawPool == 3){
			CharacterList.length = 6;
			CharacterList = ['露(新春ver)','路卡(新春ver)','克雷特(新春ver)','義熊(新春ver)','薰(新春ver)','艾斯(新春ver)'];
			CharacterListSP.length = 0;
			CharacterListSP = [];

			if(GachaTimes =='單抽'){
				times = 1;
				characterChance = 100;
				characterChanceSP = 0;
				CharacterShard = 0;
				CharacterShardBonus = 0;
	
			}else if(GachaTimes == null){
			
				return '\【票卷招募】必中新春限定夥伴招募 \
					\n 使用專用招募卷入手新春限定夥伴吧!!!\
					\n 開催時間:2/17 00:00 ~ 3/2 23:59\
					\n\
					\n 期間限定登場:\
					\n Sp1-賀歲的風之冒險團:\
					\n <我不是年獸啊！>路卡\
					\n <翠花劍士>露\
					\n <春宴神廚>義熊\
					\n <引導盛宴的武者>薰\
					\n <賀歲路人>克雷特\
					\n <春之霜>艾斯\
					\n\
					\n  (六名夥伴獲得機率相同)\
					\n\
					\n 提供招募方式：\
					\n 單抽 必中新春限定夥伴招募招募卷x1(必定獲得夥伴)\
					\n\
					\n 想要招募的話，請輸入 [招募 3 招募方式] \
					';
				
			  }else{
				return '\本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 [招募 ' + DrawPool + ']';
				}
		}/*else if(DrawPool == 2){
			CharacterList.length = 6;
			CharacterList = ['劍士-露','長槍手-路卡','路人-克雷特','廚師-義熊','武士-薰','冰法師-艾斯'];
			CharacterListSP.length = 0;
			CharacterListSP = [];

			if(GachaTimes =='單抽'){
				times = 1;
				characterChance = 100;
				characterChanceSP = 0;
				CharacterShard = 0;
				CharacterShardBonus = 0;
	
			}else if(GachaTimes == null){
			
				return '\【票券招募】事前登錄卷限定招募 \
					\n\
					\n 出現夥伴一覽： \
					\n  SP1 風之冒險團！系列 \
					\n  劍士-露\
					\n  長槍手-路卡\
					\n  路人-克雷特\
					\n  廚師-義熊\
					\n  武士-薰\
					\n  冰法師-艾斯\
					\n  (六名夥伴獲得機率相同)\
					\n\
					\n 提供招募方式：\
					\n 單抽 事前登入專用招募卷x1(必定獲得夥伴)\
					\n\
					\n 想要招募的話，請輸入 [招募 2 招募方式] \
					';
				
			  }else{
				return '\本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 [招募 ' + DrawPool + ']';
				}
		}*/else if(DrawPool == 1101211){
			CharacterList.length = 5;
			CharacterList = ['義熊','尤克特','克雷特','路卡','露'];
			CharacterListSP.length = 6;
			CharacterListSP = ['劍士-露','長槍手-路卡','路人-克雷特','廚師-義熊','武士-薰','冰法師-艾斯'];

			if(GachaTimes =='單抽'){
				times = 1;
				characterChance = 20;
				characterChanceSP = 25;
				CharacterShard = 10;
				CharacterShardBonus = 0;
				
			
			}else if(GachaTimes =='十連加一'||GachaTimes =='十連'){
				times = 11;
				characterChance = 10;
				characterChanceSP = 50;
				CharacterShard = 20;
				CharacterShardBonus = 10;
				characterST = 1;

			}else if(GachaTimes == null){
				
				return '\【測試招募】GM系統測試專用招募 \
				';
			  }else{
				return '\本招募無法使用' + GachaTimes +'招募喔';
				}
		}else if(DrawPool == null){
			
			return '\【招募目錄】目前的招募一覽表 \
				\n\
				\n  0 【新手招募(首抽)】 \
				\n  1 【限定招募】新春賀歲的風之冒險團期間限定招募(NEW) \
				\n  2 【通常奇蹟石招募】 \
				\n  3 【票卷招募】必中新春限定夥伴招募(NEW) \
				\n\
				\n 如果想看詳細招募內容，請輸入 [招募 招募編號] \
				';
			
		}else{
			
			return '\找不到招募編號['+ DrawPool+ ']的招募喔\
				\n\
				\n【招募目錄】目前的招募一覽表 \
				\n\
				\n  0 【新手招募(首抽)】 \
				\n  1 【限定招募】新春賀歲的風之冒險團期間限定招募(NEW) \
				\n  2 【通常奇蹟石招募】 \
				\n  3 【票卷招募】必中新春限定夥伴招募(NEW) \
				\n\
				\n 如果想看詳細招募內容，請輸入 [招募 招募編號] \
				';
			
		}
		
		///
		
		///抽獎
		
		var temp = 0;
		GachaResult.length = times;
		
		for(var i = 0; i< times;i++){
			
			GachaResult[i] = '\n';
			
		}
		
		for(var i = 0;i < characterST; i++){
			temp = Dice(100);
			if(temp <= characterChanceSP){
				CharacterResult[times-characterST+i] = CharacterListSP[Math.floor((Math.random() * (CharacterListSP.length)) + 0)];
				GachaResult[times-characterST+i] = '\[保底]限定夥伴:' +  CharacterResult[times-characterST+i]+ '\n';
			}else{
				CharacterResult[times-characterST+i] = CharacterList[Math.floor((Math.random() * (CharacterList.length)) + 0)];
				GachaResult[times-characterST+i] = '\[保底]夥伴:' +  CharacterResult[times-characterST+i]+ '\n';
			}
		}//保底腳色處理
		
				
		for(var i=0; i<times-characterST;i++){
			temp = Dice(100);

			let Shard = Dice(CharacterShard)+CharacterShardBonus;
			if (temp > characterChance){
				characterShardResult = characterShardResult + Shard;
				GachaResult[i] = '\夥伴碎片X' +  Shard + '片\n';
			}//是否抽到夥伴
			if (temp <= characterChance) {
					
				temp = Dice(100);
				if(temp <= characterChanceSP){
					CharacterResult[i] = CharacterListSP[Math.floor((Math.random() * (CharacterListSP.length)) + 0)];
					GachaResult[i] = '\限定夥伴:' +  CharacterResult[i]+ '\n';
				}else{
					CharacterResult[i] = CharacterList[Math.floor((Math.random() * (CharacterList.length)) + 0)];
					GachaResult[i] = '\夥伴:' +  CharacterResult[i]+ '\n';
				}
			}//確定夥伴
		}//通常腳色處理	
		
		///
		
		///判定重複腳色換成100角色碎片
		for(var i = 0;i<11;i++){
			for(var j = i+1;j<11;j++){
				if(CharacterResult[i]!= null && CharacterResult[i] == CharacterResult[j] && CharacterResult[j] != null){
					CharacterResult[j] = null;
					characterShardResult = characterShardResult +100;
				}
			   }
		}
		
		let GResult ='招募結果:\n'
		for(var i = 0;i<times;i++){
			GResult = GResult + GachaResult[i];
		}
		
		GResult = GResult + '\n--------------------\n總計獲得夥伴:';
		
		for(var i = 0;i<times;i++){
			if(CharacterResult[i] != null ) GResult = GResult + CharacterResult[i] + ',' ;
		}
		
		GResult = GResult + '\n總計獲得夥伴碎片(連同重複夥伴):' + characterShardResult + '片';
		
		return GResult;
		
		
		
	}
////////////////

//////////////// 遊戲公告
	function GameInformation(InformationN) {
		
		///基本變數
		///
		
		///確定公告狀態
		if(InformationN == 0){
			
			return '\【重要】先行測試2(公開測試) 正式開始! \
				\n\
				\n 感謝各位遊玩本遊戲\
				\n 目前本遊戲終於來到正式向外發布的階段了\
				\n 儘管目前只是公開測試，但仍開放了許多功能\
				\n 目前開放使用的功能:\
				\n 1.新手教學\
				\n 3.單人公式對戰(可獲得寶箱)\
				\n先行測試二的開始時間為: 2018/1/28 00:00\
				\n先行測試二招募文發布時間為: 2018/1/28 12:00\
				\n 接下來的冒險，還請各位多關照\
				\n        GM團\
				';
			
		}else if(InformationN == 1){
			
			return '\【慶祝】 新春系列活動 \
				\n 詳細請確認:https://docs.google.com/document/d/10OZUIY5VzcSp7HMjrx8sIoDVTwnUOoWsNt2g7NVXXzY/edit?usp=sharing\
				';
			
		}else if(InformationN == 2){
			
			return '\【更新】 本次更新介紹 \
				\n 1.BOT維護:\
				\n   (1)追加「賀歲抽籤」功能\
				\n   (2)修正招募碎片數不符\
				';
			
		}else if(InformationN == 3){
			
			return '\【補償】 眾多補償 \
				\n\
				\n1.壓歲錢不夠補償:\
				\n  因個人有點窮準備的壓歲錢不夠，將贈與全體玩家「奇蹟石x1」作為補償\
				\n\
				\n\
				\n 以上補償將在2018/2/17 00:00 開始發放\
				';
			
		}else if(InformationN == 4){
			
			return '\【活動】恭喜發財紅包拿來!壓歲錢狩獵!? \
				\n\
				\n 開催時間:2/17 00:00~3/2 23:59\
				\n 說明:進行紅包對戰，奪取壓歲錢，換取大量獎勵吧!!!\
				\n 詳細請確認:https://docs.google.com/document/d/182LNmpAEGlz3c4I9aLphM35ckecIMCOtKXM7WXGLayY/edit?usp=sharing\
				\n\
				\n 壓歲錢紀錄區:https://docs.google.com/spreadsheets/d/1dJU7vXRUipNf-r4r2_I7C_emVwc7qtSn6qky_8L3jl4/edit?usp=sharing\
				';
			
		}else if(InformationN == null){
			
			return '\【公告目錄】目前遊戲中的公告一覽表 \
				\n\
				\n  0 【重要】 先行測試2(公開測試) 正式開始!\
				\n  1 【慶祝】 新春系列活動(NEW)\
				\n  2 【更新】 本次更新介紹(NEW)\
				\n  3 【補償】 眾多補償(NEW)\
				\n  4 【活動】恭喜發財紅包拿來!壓歲錢狩獵!?(NEW)\
				\n\
				\n 如果想看詳細公告內容，請輸入 [公告 公告編號] \
				';
			
		}else{
			
			return '\找不到公告編號['+ InformationN + ']的公告喔\
				\n\
				\n【公告目錄】目前遊戲中的公告一覽表 \
				\n\
				\n  0 【重要】 先行測試2(公開測試) 正式開始!\
				\n  1 【慶祝】 新春系列活動(NEW)\
				\n  2 【更新】 本次更新介紹(NEW)\
				\n  3 【補償】 眾多補償(NEW)\
				\n  4 【活動】恭喜發財紅包拿來!壓歲錢狩獵!?(NEW)\
				\n\
				\n 如果想看詳細公告內容，請輸入 [公告 公告編號] \
				';
			
		}
		
		///
		
	}
////////////////

//////////////// 新手教學
	function tutorial(tutorialN) {
		
		///基本變數
		///
		
		///確定教學狀態
		if(tutorialN == 1){
			
				return '\歡迎來到梅里歐斯的世界 \
				\n\
				\n我和GM會負責引導你適應這裡 \
				\n首先，請告訴我你在這個世界的名子吧\
				\n 再從以下武器中挑選一個自己喜歡的武器吧\
				\n\
				\n 木劍[劍],木短杖[短杖],木長杖[長杖],木弓[弓],普通筆記本[書]\
				\n 不同的武器在配合對應技能時會有額外加乘喔!\
				';
			
		}else if(tutorialN == 2){
			
			return '\每個一般人都會有三種基本素質 \
				\n\
				\n Hp mp atk\
				\n Hp 掌管你的生命力\
				\n Mp是施放技能所需的能量\
				\n Atk是你的通常攻擊力\
				\n 一般人都會有以下的基本能力值\
				\n hp20/mp20/atk5\
				\n目前你唯一的招式叫做通常攻擊:\
				\n通常攻擊\
				\n所需mp:0\
				\n速度:+0\
				\n給與敵方單體等同自身攻擊力值的傷害，恢復自身Mp最大值x0.1的Mp\
				\n\
				\n 那麼，請試著打倒新人訓練官看看\
				\n\
				\n 新人訓練官\
				\nHp:15\
				\nMp:30\
				\nAtk:2\
				\n裝備武器:木劍\
				\n裝備飾品:無\
				\n裝備紋章:無\
				\n同行夥伴:無\
				\n\
				\n技能書:\
				\n斬擊/治癒/火球\
				';
			
		}else if(tutorialN == 3){
			
			return '\技能說明\
				\n 斬擊:\
				\n  所需mp:10\
				\n  適性武器:劍\
				\n  速度:+0\
				\n  給與敵方單體自身攻擊力x(1d4)x0.5傷害\
				\n-----\
				\n 火球:\
				\n  所需mp:10\
				\n  適性武器:短杖、長杖、書\
				\n  速度:+0\
				\n  給與對手自身攻擊力+1d5點傷害，對象有20%機率燒傷3回合\
				\n-----\
				\n  治癒:\
				\n  所需mp:15\
				\n  適性武器:無\
				\n  速度:+0\
				\n  恢復自身隊友一名(或自己)1d10+自身最大HPx0.1\
				\n\
				\n  做好覺悟後開始戰鬥吧!\
				';
			
		}else if(tutorialN == 4){
			
			return '\流程說明\
				\n\
				\n (1)雙方「一起」回報Hp,Mp\
				\n  當前Hp/最大Hp\
				\n  當前Mp/最大Mp\
				\n \
				\n (2)先喊者先決定自己要做的行動(喊招式名即可)\
				\n (3)後喊者先決定自己要做的行動(喊招式名即可)\
				\n (4)計算速度差(先喊者速度-後喊者速度)\
				\n  先喊者還會獲得「先發制人」的加成:該次行動速度+10\
				\n (5)先喊者擲(ccb 50+速度差)決定出招先後，成功時先出招\
				\n (6)依照判定結果輪流按照自己的招式行動\
				\n  如果使用技能跟裝備武器對應的話，技能消耗會減半喔(適性技能)\
				\n\
				\n (7)回到(1)，開始進行下一回合\
				\n\
				\n持續戰鬥直到打倒訓練官吧!\
				';
			
		}else if(tutorialN == 5){
			
			return '\恭喜!你打倒了新人訓練官\
				\n\
				\n接下來，你可以從新手訓練官中，選擇一本你喜歡的技能書\
				\n 斬擊:\
				\n  所需mp:10\
				\n  適性武器:劍\
				\n  速度:+0\
				\n  給與敵方單體自身攻擊力x(1d4)x0.5傷害\
				\n-----\
				\n 火球:\
				\n所需mp:10\
				\n適性武器:短杖、長杖、書\
				\n速度:+0\
				\n給與對手自身攻擊力+1d5點傷害，對象有20%機率燒傷3回合\
				\n-----\
				\n  治癒:\
				\n所需mp:15\
				\n適性武器:無\
				\n速度:+0\
				\n恢復自身隊友一名(或自己)1d10+自身最大HPx0.1\
				';
			
		}else if(tutorialN == 6){
			
			return '\很好，現在你有第一個技能了\
				\n順帶一提，每名玩家最多裝備三個主動技能跟一個被動技能\
				\n隨著遊戲進度，慢慢組成自己的技能組吧\
				\n\
				\n接下來\
				\n試著打倒新人訓練官2吧\
				\n 新人訓練官2\
				\nHp:20\
				\nMp:30\
				\nAtk:2\
				\n裝備武器:木劍\
				\n裝備飾品:無\
				\n裝備紋章:無\
				\n同行夥伴:無\
				\n\
				\n技能書:\
				\n斬擊/治癒/火球\
				';
			
		}else if(tutorialN == 7){
			
			return '一般戰鬥中，先喊者要由擲骰決定\
				\n\
				\n 骰 [ccb 50 先喊]即可\
				\n 這次由GM判定\
				';
			
		}else if(tutorialN == 8){
			
			return '\施放技能所需要的Mp，只要透過通常攻擊，就能恢復Mp最大值的0.1被喔\
				\n  如果使用技能跟裝備武器對應的話，技能消耗會減半喔(適性技能)\
				';
			
		}else if(tutorialN == 9){
			
			return '\恭喜!你打倒了新人訓練官2\
				\n\
				\n現在的你想必對遊戲有一定認知了\
				\n那麼是時候該讓你強化自己\
				\n現在你有10點基本能力點數可以分配\
				\n Hp每分配1點增加10\
				\n Mp每分配1點增加10\
				\n Atk每分配1點增加1\
				\n 想好之後，告訴我即可\
				\n 仔細考慮自己該怎麼分配這十點吧，一旦確定就不能更改喔\
				';
			
		}else if(tutorialN == 10){
			
			return '\恭喜！你距離完成教學了只剩最後幾步了\
				\n\
				\n只是孤單一人冒險好像也不是滋味\
				\n那麼試著招募夥伴吧\
				\n\
				\n 進行夥伴招募的方法\
				\n 就是在這裡輸入[招募]即可\
				\n 試試看吧\
				';
			
		}else if(tutorialN == 11){
			
			return '\恭喜！你得到你的第一位夥伴了\
				\n\
				\n和同伴一起冒險時\
				\n除了能力會追加以外，還能使用強力的[夥伴技能]喔\
				\n\
				\n 現在就和新手考試官進行對戰，體驗夥伴的力量吧！\
				\n 新人考試官\
				\nHp:60\
				\nMp:30\
				\nAtk:2\
				\n裝備武器:木劍\
				\n裝備飾品:無\
				\n裝備紋章:無\
				\n同行夥伴:無\
				\n\
				\n技能書:\
				\n斬擊/治癒/火球\
				';
			
		}else if(tutorialN == 12){
			
			return '\恭喜你\
				\n\
				\n全部的新手教學都完成了\
				\n作為獎勵，將贈與你1000G金幣及5顆奇蹟石\
				\n\
				\n 而且\
				\n 再送你剩下的兩本技能書\
				\n 就用這些技能踏上旅途吧！\
				\n 記得不定時確認自己的存檔\
				\n 看看自己擁有的東西喔\
				\n\
				\n 想看現行公告的話，輸入[公告]看看\
				\n 如果想了解所有指令，輸入[Help]或[幫助]看看\
				\n 想看現行活動的話，輸入[活動]看看\
				\n 想看主線任務的話，輸入[主線]看看(公測期間不開放)\
				\n 以上\
				\n 祝旅行愉快\
				';
			
		}else if(tutorialN == null){
			
			return '\這個部分由GM代勞吧\
				';
			
		}else{
			
			return '\找不到教學編號['+ tutorialN + ']的教學喔\
				';
			
		}
		
		///
		
	}
////////////////


//////////////// 遊戲主線
	function MainStory(StoryPart,StoryN) {

			///基本變數

			///

			///確定主線狀態

			///第四部-碧綠之風
			if(StoryPart == '第一部'||StoryPart == 'part1'||StoryPart == '1'){

				///第一章
				if(StoryN == '1-1'){

					return '\第一部-1-1 不安的氣氛\
					\n\
					\n 對手:幸\
					\n 通關獎勵:(10d2)G金幣\
					\n 故事:\
					\n\在歷經一番波折後，露終於如願以償的回到了她的故鄉-「湖之村」。\
					\原以為會受到熱烈歡迎的她正昂首闊步的踏進村子裡時，得到卻是被刀刃指著的無情對待!? \
					';

				}else if(StoryN == '1-2'){

					return '\第一部-1-2 疑慮的氣氛\
					\n\
					\n 對手:塞恩\
					\n 通關獎勵:(10d2)G金幣\
					\n 故事:\
					\n儘管露再怎麼解釋，他們仍舊不相信她就是千年前戰死的英雄，究竟，該怎麼證明自己呢？ \
					';

				}else if(StoryN == '1-3'){

					return '\第一部-1-3 盜賊突襲\
					\n\
					\n 對手:盜賊\
					\n 通關獎勵:(10d3)G金幣\
					\n 故事:\
					\n當他們爭執不下時，突然出現一班盜賊要洗劫湖之村！面對來勢兇猛的盜賊，露認為這是證明自己的大好機會。 \
					';

				}else if(StoryN == '1-4'){

					return '\第一部-1-4 喜悅之風\
					\n\
					\n 對手:莎拉\
					\n 通關獎勵:(10d3)G金幣\
					\n 故事:\
					\n在親妹妹「聖風的祈願者」莎拉的確認下，露終於被村人認同，面對千年後的姊妹重逢，沙拉在高興之餘也希望能從姊姊那邊學習一點劍術，所以決定向露發起挑戰\
					';

				}else if(StoryN == '1-5'){

					return '\第一部-1-5 訣別之風\
					\n\
					\n 對手:莎拉\
					\n 通關獎勵:100G金幣\
					\n 5%機率獲得技能書「風刃」\
					\n\
					\n \
					\n故事:露想起三年前被下的詛咒，如果她不及早破除詛咒，莎拉就會死亡！為了避免悲劇發生，露決定再度離開湖之村，可是湖之村的入口卻被莎拉擋住了!?\
					';

				}else if(StoryN == '1'||StoryN == '第一章'){

					return '\第一部 第一章-劍聖再臨\
					\n\
					\n 故事:復活的風之劍聖-露在復活的三年後，終於回到了湖之村，可是她得到的只有無情的對待...\
					\n\
					\n 第一章突破獎勵: 技能書「祈願」\
					\n\
					\n 關卡情報:\
					\n     序章(觀賞完後會贈送1顆奇蹟石)[向GM確認]\
					\n 1-1 不安的氣氛\
					\n 1-2 疑慮的氣氛\
					\n 1-3 盜賊突襲\
					\n 1-4 喜悅之風\
					\n 1-5 訣別之風\
					\n\
					\n 如果想看詳細內容，請輸入 [主線 第一部 關卡編號] \
					';

				}
				///

				///第二章
				else if(StoryN == '2'||StoryN == '第二章'){

					return '\第一部 第二章-風之夥伴(未開放)\
					\n\
					\n 故事:???\
					\n\
					\n 關卡情報:\
					\n 2-1 ???\
					\n 2-2 ???\
					\n 2-3 ???\
					\n 2-4 ???\
					\n 2-5 ???\
					\n\
					\n 目前本章節尚未開放喔。敬請期待\
					';

				}
				///
				else if(StoryN == null){

				return '\第一部-碧綠之風 \
					\n\
					\n  故事:\
					\n 這是描述風之劍聖-露為了破除自身詛咒，組成風之冒險團前往打到「光之軍勢」的史詩故事\
					\n\
					\n  章節一覽:\
					\n   序言(觀賞完後會贈送1顆奇蹟石)[向GM確認]\
					\n 1 第一章-劍聖再臨\
					\n 2 第二章-風之夥伴(未開放)\
					\n\
					\n 如果想看詳細主線內容，請輸入 [主線 第一部(part1,1) 第幾章(章節編號) ] \
					';

				}
				///
				else{

				return '\找不到關卡['+ StoryN + ']的關卡喔\
					\n第一部-碧綠之風 \
					\n\
					\n  故事:\
					\n 這是描述風之劍聖-露為了破除自身詛咒，組成風之冒險團前往打到「光之軍勢」的史詩故事\
					\n\
					\n  章節一覽:\
					\n   序言(觀賞完後會贈送1顆奇蹟石)[向GM確認]\
					\n 1 第一章-劍聖再臨\
					\n 2 第二章-風之夥伴(未開放)\
					\n\
					\n 如果想看詳細主線內容，請輸入 [主線 第一部(part1,1) 第幾章(章節編號) ] \
					';

				}

			}else if(StoryPart == null){

				return '\【主線目錄】目前開放的部別一覽 \
					\n\
					\n 1 第一部-碧綠之風\
					\n\
					\n 如果想看詳細活動內容，請輸入 [主線 部別編號(例如:第一部,part1,1)] \
					';

				}else{

				return '\找不到部別['+ StoryPart + ']的故事喔\
					\n\
					\n【主線目錄】目前開放的部別一覽 \
					\n\
					\n 1 第一部-碧綠之風\
					\n\
					\n 如果想看詳細活動內容，請輸入 [主線 部別編號(例如:第一部,part1,1)] \
					';

			}

			///

		}
////////////////

//////////////// 遊戲活動
	function GameEvent(EventN) {
		
		///基本變數
		///
		
		///確定公告狀態
		if(EventN == 0){
			
				return '\【重要】 先行測試二 不刪擋公測中 \
				\n\
				\n感謝各位參加 Line文遊-梅里歐斯的冒現者 的先行測試 \
				\n還沒完成教學的測試玩家請盡速找GM進行教學\
				\n\
				\n        GM團祝各位遊玩愉快\
				';
			
		}else if(EventN == 1){
			
				return '\【活動】恭喜發財紅包拿來!壓歲錢狩獵!? \
				\n\
				\n 開催時間:2/17 00:00~3/2 23:59\
				\n 說明:進行紅包對戰，奪取壓歲錢，換取大量獎勵吧!!!\
				\n 詳細請確認:https://docs.google.com/document/d/182LNmpAEGlz3c4I9aLphM35ckecIMCOtKXM7WXGLayY/edit?usp=sharing\
				\n\
				\n 壓歲錢紀錄區:https://docs.google.com/spreadsheets/d/1dJU7vXRUipNf-r4r2_I7C_emVwc7qtSn6qky_8L3jl4/edit?usp=sharing\
				';
		}else if(EventN == null){
			
			return '\【活動目錄】目前開催中的活動一覽表 \
				\n\
				\n  0 【重要】 先行測試二 不刪擋公測中\
				\n  1 【活動】恭喜發財紅包拿來!壓歲錢狩獵!?\
				\n\
				\n 如果想看詳細活動內容，請輸入 [活動 活動編號] \
				';
			
		}else{
			
			return '\找不到活動編號['+ EventN + ']的活動喔\
				\n\
				\n【活動目錄】目前開催中的活動一覽表 \
				\n\
				\n  0 【重要】 先行測試二 不刪擋公測中\
				\n  1 【活動】恭喜發財紅包拿來!壓歲錢狩獵!?\
				\n\
				\n 如果想看詳細活動內容，請輸入 [活動 活動編號] \
				';
			
		}
		
		///
		
	}
////////////////
		
		
		
       function randomLuck(TEXT) {
           let rplyArr = ['超吉','超級上吉','大吉','吉','中吉','小吉','吉','小吉','吉','吉','中吉','吉','中吉','吉','中吉','小吉','末吉','吉','中吉','小吉','末吉','中吉','小吉','小吉','吉','小吉','末吉','中吉','小吉','凶','小凶','沒凶','大凶','很凶'];
           return TEXT[0] + ' ： ' + rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
		
		
////////////////////////////////////////
//////////////// Funny
////////////////////////////////////////




////////////////////////////////////////
//////////////// Tarot塔羅牌
////////////////////////////////////////
function MultiDrawTarot(CardToCal, text, type) {
	let returnStr = '';
	var tmpcard = 0;
	var cards = [];
	var revs = [];
	var i = 0;

	if (type == 1) //時間之流
	{
		cards[0] = FunnyDice(79); //先抽第0張
		revs[0] = FunnyDice(2);

		for (i = 1; i < 3; i++) {
			for (;;) {
				tmpcard = FunnyDice(79);
				if (cards.indexOf(tmpcard) === -1) //沒有重複，就這張了
				{
					cards.push(tmpcard);
					revs[i] = FunnyDice(2);
					break;
				}
			}
		}

		if (text != null)
			returnStr += text + ': \n';

		for (i = 0; i < 3; i++) {
			if (i == 0) returnStr += '過去: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			if (i == 1) returnStr += '現在: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			if (i == 2) returnStr += '未來: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]);
		}

	} else if (type == 2) //塞爾特大十字
	{
		cards[0] = FunnyDice(79); //先抽第0張
		revs[0] = FunnyDice(2);

		for (i = 1; i < 10; i++) {
			for (;;) {
				tmpcard = FunnyDice(79);
				if (cards.indexOf(tmpcard) === -1) //沒有重複，就這張了
				{
					cards.push(tmpcard);
					revs[i] = FunnyDice(2);
					break;
				}
			}
		}

		if (text != null)
			returnStr += text + ': \n';

		for (i = 0; i < 10; i++) {
			if (i == 0) returnStr += '現況: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			if (i == 1) {
				if (revs[i] == 0) //正位
					returnStr += '助力: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
				else
					returnStr += '阻力: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			}
			if (i == 2) returnStr += '目標: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			if (i == 3) returnStr += '基礎: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			if (i == 4) returnStr += '過去: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			if (i == 5) returnStr += '未來: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			if (i == 6) returnStr += '自我: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			if (i == 7) returnStr += '環境: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			if (i == 8) {
				if (revs[i] == 0) //正位
					returnStr += '希望: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
				else
					returnStr += '恐懼: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]) + '\n';
			}
			if (i == 9) returnStr += '結論: ' + tarotCardReply(cards[i]) + ' ' + tarotRevReply(revs[i]);

		}

	} else {

		if (text == null)
			returnStr = tarotCardReply(FunnyDice(79)) + ' ' + tarotRevReply(FunnyDice(2));
		else
			returnStr = tarotCardReply(FunnyDice(79)) + ' ' + tarotRevReply(FunnyDice(2)) + ' ; ' + text;
	}


	return returnStr;
}

function NomalDrawTarot(CardToCal, text) {
	let returnStr = '';

	if (text == null)
		returnStr = tarotCardReply(FunnyDice(22)) + ' ' + tarotRevReply(FunnyDice(2));
	else
		returnStr = tarotCardReply(FunnyDice(22)) + ' ' + tarotRevReply(FunnyDice(2)) + ' ; ' + text;
	return returnStr;
}


function tarotRevReply(count) {
	let returnStr = '';

	if (count == 0) returnStr = '＋';
	if (count == 1) returnStr = '－';

	return returnStr;
}

function choice(input,str) {
	let a = input.replace(str[0], '').match(/\S+/ig);
	return str[0] + '['+ a + '] → ' + a[Dice(a.length)-1];
}

function tarotCardReply(count) {
	let returnStr = '';
	// returnStr = count + '愚者';
	if (count == 0) returnStr = '愚者';
	if (count == 1) returnStr = '魔術師';
	if (count == 2) returnStr = '女祭司';
	if (count == 3) returnStr = '女皇';
	if (count == 4) returnStr = '皇帝';
	if (count == 5) returnStr = '教皇';
	if (count == 6) returnStr = '戀人';
	if (count == 7) returnStr = '戰車';
	if (count == 8) returnStr = '力量';
	if (count == 9) returnStr = '隱者';
	if (count == 10) returnStr = '命運之輪';
	if (count == 11) returnStr = '正義';
	if (count == 12) returnStr = '吊人';
	if (count == 13) returnStr = '死神';
	if (count == 14) returnStr = '節制';
	if (count == 15) returnStr = '惡魔';
	if (count == 16) returnStr = '高塔';
	if (count == 17) returnStr = '星星';
	if (count == 18) returnStr = '月亮';
	if (count == 19) returnStr = '太陽';
	if (count == 20) returnStr = '審判';
	if (count == 21) returnStr = '世界';
	if (count == 22) returnStr = '權杖一';
	if (count == 23) returnStr = '權杖二';
	if (count == 24) returnStr = '權杖三';
	if (count == 25) returnStr = '權杖四';
	if (count == 26) returnStr = '權杖五';
	if (count == 27) returnStr = '權杖六';
	if (count == 28) returnStr = '權杖七';
	if (count == 29) returnStr = '權杖八';
	if (count == 30) returnStr = '權杖九';
	if (count == 31) returnStr = '權杖十';
	if (count == 32) returnStr = '權杖侍者';
	if (count == 33) returnStr = '權杖騎士';
	if (count == 34) returnStr = '權杖皇后';
	if (count == 35) returnStr = '權杖國王';
	if (count == 36) returnStr = '聖杯一';
	if (count == 37) returnStr = '聖杯二';
	if (count == 38) returnStr = '聖杯三';
	if (count == 39) returnStr = '聖杯四';
	if (count == 40) returnStr = '聖杯五';
	if (count == 41) returnStr = '聖杯六';
	if (count == 42) returnStr = '聖杯七';
	if (count == 43) returnStr = '聖杯八';
	if (count == 44) returnStr = '聖杯九';
	if (count == 45) returnStr = '聖杯十';
	if (count == 46) returnStr = '聖杯侍者';
	if (count == 47) returnStr = '聖杯騎士';
	if (count == 48) returnStr = '聖杯皇后';
	if (count == 49) returnStr = '聖杯國王';
	if (count == 50) returnStr = '寶劍一';
	if (count == 51) returnStr = '寶劍二';
	if (count == 52) returnStr = '寶劍三';
	if (count == 53) returnStr = '寶劍四';
	if (count == 54) returnStr = '寶劍五';
	if (count == 55) returnStr = '寶劍六';
	if (count == 56) returnStr = '寶劍七';
	if (count == 57) returnStr = '寶劍八';
	if (count == 58) returnStr = '寶劍九';
	if (count == 59) returnStr = '寶劍十';
	if (count == 60) returnStr = '寶劍侍者';
	if (count == 61) returnStr = '寶劍騎士';
	if (count == 62) returnStr = '寶劍皇后';
	if (count == 63) returnStr = '寶劍國王';
	if (count == 64) returnStr = '錢幣一';
	if (count == 65) returnStr = '錢幣二';
	if (count == 66) returnStr = '錢幣三';
	if (count == 67) returnStr = '錢幣四';
	if (count == 68) returnStr = '錢幣五';
	if (count == 69) returnStr = '錢幣六';
	if (count == 70) returnStr = '錢幣七';
	if (count == 71) returnStr = '錢幣八';
	if (count == 72) returnStr = '錢幣九';
	if (count == 73) returnStr = '錢幣十';
	if (count == 74) returnStr = '錢幣侍者';
	if (count == 75) returnStr = '錢幣騎士';
	if (count == 76) returnStr = '錢幣皇后';
	if (count == 77) returnStr = '錢幣國王';
	if (count == 78) returnStr = '空白牌';

	return returnStr;

}
  
//////////////// 系統幫助
function Help() {
	return randomReply() + '\n' + '\
	【梅里歐斯的冒險者專用BOT】v1.00 \
	\n --傷害骰(a XdY+b)--\
	\n 如果輸入2d6+1　攻撃！\
	\n 就會輸出）2d6+1：攻撃  9[6+3]+1 = 10\
	\n 如上面一樣,在骰子數字後方隔空白位打字,可以進行發言。\
	\n 以下還有其他例子\
	\n 5 3D6 	：分別骰出5次3d6\
	\n 5B10：不加總的擲骰 會進行小至大排序 \
	\n 5B10 9：如上,另外計算其中有多少粒大過9 \
	\n 5U10 8：進行5D10 每骰出一粒8會有一粒獎勵骰 \
	\n 5U10 8 9：如上,另外計算其中有多少粒大過9 \
	\n--機率骰(ccb)--\
	\n CCb （目標値）：做出成功或失敗的判定\
	\n例）CCb 30　CCb 80\
	\n--Bot重要功能--\
	\n輸入 招募，就能確認當前的招募目錄\
	\n輸入 公告，就能確認當前的公告目錄\
	\n輸入 活動，就能確認當前的活動目錄\
	\n輸入 主線，就能確認目前開放的主線任務(暫不開放)\
	\n輸入 寶箱/開寶箱，就能確認你剛獲得的寶箱內容喔\
	\n輸入 祈願，就能進行每日祈願(尚未開放)\
	\n輸入 重要資訊處，就能確認重要資訊\
	\n輸入 遊戲存檔，就能確認遊戲存檔\
	\n--Bot娛樂功能--\
	\n 占卜運氣功能 字句中包括運氣即可\
	\n 塔羅牌占卜 塔羅/大十字塔羅/每日塔羅牌/時間tarot 等關键字可啓動\
	\n 死亡FLAG：句子裡出現 Flag/flag 就能讓你輕鬆插旗\
	\n 如果呼叫空音的名子...好像會有事情發生？\
	';		
}

//////////////// 


//////////////// 重要資訊處
function ImportantInformation() {
	return '\【重要資訊處】\
	\n 這裡是讓玩家迅速連結到許多重要文件的地方\
	\n 開始冒險吧！角色創造教學:\
	\n https://docs.google.com/document/d/1zSe_SLiGM07VhmC8m3vzy8RBu-gXV3wUK7wBhcdxhY8/edit?usp=drivesdk\
	\n\
	\n 遊戲規範及使用說明書:\
	\n https://docs.google.com/document/d/1J1cqWi7zhqalflyLZR-Ns2WRq0XMZ2t1mHS4xjh_gPE/edit?usp=drivesdk\
	\n\
	\n 遊戲圖鑑:\
	\n https://docs.google.com/spreadsheets/d/1YDM6zyP1Ht536HC-gg8mv54Yxe8Gdhdm-2SkTOdahas/edit?usp=drivesdk\
	\n\
	\n 異常狀態一覽表:\
	\n https://docs.google.com/document/d/1d01JETNej2X806eHojfkQCU-GmQ7IDztxgKVSLXVVI4/edit?usp=drivesdk\
	\n\
	\n 寶箱狩獵！對戰獎勵說明:\
	\n https://docs.google.com/document/d/1t9lGvqW5dZvgK54RZZ66xRfVQABvI0MYkSoe70mTtIk/edit?usp=sharing\
	\n\
	\n 特殊商店-夥伴商城:\
	\n https://docs.google.com/document/d/1pR0_PBwf-k6WtNJnpvIZBgrjKvMoTpHu1SH3PsuUYXk/edit?usp=sharing\
	\n\
	\n 武器適性一覽表:\
	\n https://docs.google.com/document/d/1_oUPgsk_bbkqVaYqARYdQ5pmSDYRvb4FTypZkjotJJY/edit?usp=sharing\
	\n\
	\n 以上內容皆能在 文章區確認\
	';		
}

//////////////// 


//////////////// 遊戲存檔
function GameSave() {
	return '\【遊戲存檔】\
	\n 這裡是確認玩家遊戲紀錄及公會資料的地方\
	\n\
	\n 玩家存檔1區:\
	\n https://docs.google.com/spreadsheets/d/1svWEwU2C7_DF80-x6gacD2QDfGsUVCA67t3T1eXPNGQ/edit?usp=drivesdk\
	\n\
	\n 公會一覽表1區:\
	\n https://docs.google.com/spreadsheets/d/1KNAHWzYI3CpfA4o9Cw88xxFeNkWMfgYVFmIM_nF2Afg/edit?usp=drivesdk\
	\n\
	\n 以上內容皆能在 文章區確認\
	';		
}

//////////////// 

//////////////// 系統幫助
function UpdateLog() {
	return '\【更新紀錄】 遊戲發展史(誤)\
		\n2018/2/9:\
		\n 1.技能變動\
		\n   (1)冰獄彈:冰寒標記改為60%賦予\
		\n   (2)轟炎彈:有冰寒標記時的命中率改為90%\
		\n\
		\n 2.追加新技能:劍聖的教誨,大賢者的知惠,箭神的心得,狂戰士的回憶,牧師的專業,不滅意志\
		\n\
		\n2018/2/3:\
		\n 1.Bot強化:\
		\n   (1)將更新紀錄從公告中分開，獨立建立「更新紀錄」，可輸入[更新紀錄]確認\
		\n   (2)重要資訊處追加「武器適性一覽表」\
		\n   (3)新手教學說明追加武器適性相關\
		\n\
		\n 2.技能變動\
		\n   (1)斬擊:傷害變更為自身攻擊力x(1d4)x0.5\
		\n   (2)火球:傷害變更為自身攻擊力+1d5\
		\n\
		\n 3.新系統「武器適性」追加:\
		\n   說明:當你使用技能對應到武器時，除了消耗mp-50%以外，還會對應武器發揮效果!\
		\n\
		\n2018/1/31:\
		\n 1.追加新技能:魔導劍擊,魔導穿槍,魔導狙擊,魔導彈,舉劍,隱藏術,怒吼,咒術筆記\
		\n\
		\n Bot強化:修正部分文字問題\
		\n2018/1/30:\
		\n 1.技能變動\
		\n (1)治癒:回復量變更為1d10+自身最大HPx0.1\
		\n\
		\n 2.新手教學變更\
		\n (1)新人考試官HP:80->60\
		\n\
		\n2018/1/9:\
		\n 1.Bot強化:\
		\n (1)追加每日祈願功能\
		\n (2)追加新手教學說明功能\
		\n (3)修正部分文字錯誤\
		\n 2.追加新技能:冰獄彈,冰牆,轟炎彈,麻痺箭,劇毒箭,燃燒箭,狙擊姿態,重劈,猛虎一式,獵龍一式,蒼藍利刃\
		\n 3.主線追加序言,序章\
		\n2018/1/2:\
		\n 1.Bot強化:\
		\n (1)改善招募結果，追加總計獲得的夥伴及伙伴碎片\
		\n 2.重要更新:\
		\n未來只要完成「新手教學」全部流程的玩家，將可獲得 火球、治癒、斬擊 三本技能書中尚未獲得的技能書\
		\n已經完成的玩家將自動追加技能書，請至玩家存檔確認\
		\n\
		\n 2018/1/1:\
		\n 1.Bot強化:\
		\n (1)Bot追加主線關卡確認功能，請輸入[主線]確認\
		\n (2)Bot追加公告確認功能，請輸入[公告]確認\
		\n (3)Bot追加當前活動確認功能，請輸入[活動]確認\
		\n\
		\n  2017/12/31: \
		\n  1.重要更新:\
		\n(1)本遊戲bot更換成專用bot 空音\
		\n(2)招募方式變更，詳細請輸入[招募]確認\
		\n 2017/12/30 之前的紀錄請至文章區->更新紀錄確認\
				';
}

//////////////// 


