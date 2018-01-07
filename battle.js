
//////////////// 戰鬥系統
var battle = {
	
	//////////////// ccb功能   
	ccb: function(chack,text){
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
	},
	////////////////

	ArrMax: function(Arr){
	  	var max = this[0];
	  	this.forEach (function(ele,index,arr){
	  	  	if(ele > max) {
	     			max = ele;
	    		}
	  	})
		return max;
	},

	//////////////// 普通ROLL
	nomalDiceRoller: function(inputStr,text0,text1,text2){

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


	},
	////////////////

	//////////////// 擲骰子運算
	sortNumber: function(a,b)
	{
	return a - b
	},
	////////////////

	//////////////// 取隨機值專用
	Dice: function(diceSided){
		return Math.floor((Math.random() * diceSided) + 1)
	},
	////////////////

	RollDice: function(inputStr){
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
	},

	FunnyDice: function(diceSided) {
		return Math.floor((Math.random() * diceSided)) //猜拳，從0開始
	},

	BuildDiceCal: function(inputStr){

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

	},

	BuildRollDice: function(inputStr){
	  //先把inputStr變成字串（不知道為什麼非這樣不可）
	  let comStr=inputStr.toString().toLowerCase();
	  let finalStr = '(';

	  for (let i = 1; i <= comStr.split('d')[0]; i++) {
	    finalStr = finalStr + Dice(comStr.split('d')[1]) + '+';
	     }

	  finalStr = finalStr.substring(0, finalStr.length - 1) + ')';
	  return finalStr;
	},


	////////////////////////////////////////
	//////////////// xBy
	////////////////////////////////////////
	xBy: function(triggermsg ,text01, text02) {

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
	},

	////////////////////////////////////////
	//////////////// xUy
	////////////////  (5U10[8]) → 17[10,7],4,5,7,4 → 17/37(最大/合計)
	////////////////  (5U10[8]>8) → 1,30[9,8,8,5],1,3,4 → 成功数1
	////////////////////////////////////////

	xUy: function(triggermsg ,text01, text02, text03) {
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

		for (var i = 0; i < Number(match[1]); i++){
			varcou[i] =  Dice(match[3]);
			varcounew[i] = varcou[i];
			varcouloop[i] = varcounew[i];
			for(;varcounew[i]>=text01;){
				varcounew[i] =Dice(match[3]);
				varcouloop[i] += ', ' +varcounew[i];
				varcou[i] += varcounew[i];
				}

		}

	    	for(var i = 0; i < varcouloop.length; i++){
			if(varcouloop[i]==varcou[i]) returnStr += varcou[i]+', ';
	    		else returnStr += varcou[i]+'['+varcouloop[i]+ '], '; 

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

		}else{
	  ////////////////  (5U10[8]) → 17[10,7],4,5,7,4 → 17/37(最大/合計)

			returnStr  +=' → ' + Math.max.apply(null, varcou)
			returnStr  += '/' + varcou.reduce(function(previousValue,currentValue){
			return previousValue + currentValue;} ) +'(最大/合計)';

		}
		
		return returnStr;

	},



	////////////////////////////////////////
	//////////////// 占卜&其他
	////////////////////////////////////////

	//////////////// 插旗
		BStyleFlagSCRIPTS: function() {
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
		},
	////////////////

	//////////////// 空音閒談
		randomReply: function() {
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
		},
	////////////////

	//////////////// 空音閒談(裏)
		randomReplyShin: function() {
			let rplyArr = [

				'\在抽獎之前，先把火力燒成灰吧', 
				'\FYK=Fuck You Komnami', 
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
		},
	////////////////

	//////////////// 寶箱狩獵
		BoxOpen: function() {
		  let temp = Dice(100);

		  if (temp >= 68) return '\恭喜，是普通獎勵。';
		  if (temp <=67 && temp >= 39) return '\恭喜，是中等獎勵。';
		  if (temp <=38 && temp >= 16) return '\喔喔！是高等獎勵诶，恭喜！';
		  if (temp <=15) return '\太棒了！！！是頂級獎勵！恭喜！';
		},
	////////////////

	//////////////// 角色招募
		gacha: function(DrawPool,GachaTimes) {

			///基本變數
			let GachaResult = ['\n','\n','\n','\n','\n','\n','\n','\n','\n','\n','\n'];
			let CharacterResult = [];
			var characterShardResult = 0;
			let CharacterList = [null,null,null,null,null,null,null,null,null,null,null];

			var times = 0;//抽獎次數
			var characterChance = 0;//夥伴獲得率
			var CharacterShard = 0;//夥伴碎片獲得數量
			var CharacterShardBonus = 0;//夥伴碎片保底數量
			///

			///確定抽獎狀態
			if(DrawPool == 0){
				let Character = ['克雷特','路卡','露'];
				CharacterList.length = Character.length;
				CharacterList = Character;

				if(GachaTimes =='單抽'){
					times = 1;
					characterChance = 100;
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
					return '\本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 [招募 0]';
				}

			}else if(DrawPool == 1){
				let Character = ['義熊','尤克特','克雷特','路卡','露'];
				CharacterList.length = Character.length;
				CharacterList = Character;

				if(GachaTimes =='單抽'){
					times = 1;
					characterChance = 20;
					CharacterShard = 10;
					CharacterShardBonus = 0;


				}else if(GachaTimes =='十連加一'||GachaTimes =='十連'){
					times = 10;
					characterChance = 20;
					CharacterShard = 20;
					CharacterShardBonus = 10;
					CharacterResult[10] = CharacterList[Math.floor((Math.random() * (CharacterList.length)) + 0)];
					GachaResult[10] = '\[保底]夥伴:' +  CharacterResult[10];

				}else if(GachaTimes == null){

					return '\【通常招募】通常奇蹟石招募 \
					\n 出現夥伴一覽： \
					\n\
					\n 001起始英雄系列 \
					\n  義熊\
					\n  尤克特\
					\n  克雷特\
					\n  路卡\
					\n  露\
					\n  (五名夥伴獲得機率相同)\
					\n\
					\n 提供招募方式：\
					\n 單抽 5顆奇蹟石(20%出現夥伴，80%獲得1~10個夥伴碎片)\
					\n\
					\n 十連加一(十連) 50顆奇蹟石(必定出現一名夥伴，其餘有10%出現夥伴，90%獲得10~30個夥伴碎片)\
					\n\
					\n 想要招募的話，請輸入 [招募 1 招募方式] \
					';
				  }else{
					return '\本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 [招募 1]';
					}
			}else if(DrawPool == 2){
				let Character = ['劍士-露','長槍手-路卡','路人-克雷特','廚師-義熊','武士-薰','冰法師-艾斯'];
				CharacterList.length = Character.length;
				CharacterList = Character;

				if(GachaTimes =='單抽'){
					times = 1;
					characterChance = 100;
					CharacterShard = 00;
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
					return '\本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 招募 2';
					}
			}else if(DrawPool == null){

				return '\【招募目錄】目前的招募一覽表 \
					\n\
					\n  0 【新手招募(首抽)】 \
					\n  1 【通常奇蹟石招募】 \
					\n  2 【票券招募-「事前登錄卷限定招募」】 \
					\n\
					\n 如果想看詳細招募內容，請輸入 [招募 招募編號] \
					';

			}else{

				return '\找不到招募編號['+ DrawPool+ ']的招募喔\
					\n\
					\n【招募目錄】目前的招募一覽表 \
					\n\
					\n  0 【新手招募(首抽)】 \
					\n  1 【通常奇蹟石招募】 \
					\n  2 【票券招募-「事前登錄卷限定招募」】 \
					\n\
					\n 如果想看詳細招募內容，請輸入 [招募 招募編號] \
					';

			}

			///

			///抽獎
			for(var i=0; i<times;i++){
				let temp = Dice(100);
				let Shard = Dice(CharacterShard)+CharacterShardBonus;
				if (temp > characterChance){
					characterShardResult = characterShardResult + Shard;
					GachaResult[i] = '\夥伴碎片X' +  Shard + '片\n';
				}
				if (temp <= characterChance) {
					CharacterResult[i] = CharacterList[Math.floor((Math.random() * (CharacterList.length)) + 0)];
					GachaResult[i] = '\夥伴:' +  CharacterResult[i] + '\n';
				}
			}

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
			for(var i = 0;i<11;i++){
				GResult = GResult + GachaResult[i];
			}

			GResult = GResult + '\n--------------------\n總計獲得夥伴:';

			for(var i = 0;i<11;i++){
				if(CharacterResult[i] != null) GResult = GResult + CharacterResult[i] + ',' ;
			}

			GResult = GResult +    '\n總計獲得夥伴碎片(連同重複夥伴):' + characterShardResult + '片';


			return GResult;
		},
	////////////////

	//////////////// 遊戲公告
		GameInformation: function(InformationN) {

			///基本變數
			///

			///確定公告狀態
			if(InformationN == 0){

					return '\【重要】 先行測試一 刪擋封測中 \
					\n\
					\n感謝各位參加 Line文遊-梅里歐斯的冒現者 的先行測試 \
					\n還沒完成教學的測試玩家請盡速找GM進行教學\
					\n已經完成的玩家將暫時可以使用全部的遊戲物品\
					\n詳細內容請至[重要文件區->遊戲圖鑑]進行確認\
					\n\
					\n        GM團祝各位遊玩愉快\
					';

			}else if(InformationN == 1){

				return '【首次限定！】新手招募-絕對獲得攻擊型夥伴一名喔！ \
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

			}else if(InformationN == 2){

				return '\【通常招募】通常奇蹟石招募 \
					\n 出現夥伴一覽： \
					\n\
					\n 001起始英雄系列 \
					\n  義熊\
					\n  尤克特\
					\n  克雷特\
					\n  路卡\
					\n  露\
					\n  (五名夥伴獲得機率相同)\
					\n\
					\n 提供招募方式：\
					\n 單抽 5顆奇蹟石(20%出現夥伴，80%獲得1~10個夥伴碎片)\
					\n\
					\n 十連加一(十連) 50顆奇蹟石(必定出現一名夥伴，其餘有10%出現夥伴，90%獲得10~30個夥伴碎片)\
					\n\
					\n 想要招募的話，請輸入 [招募 1 招募方式] \
					';

			}else if(InformationN == 3){

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

			}else if(InformationN == 4){

				return '\【進度】 目前更新紀錄 \
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

			}else if(InformationN == 5){

				return '\【重要】 請加空音好友以取得最新消息 \
					\n\
					\n 建議各位玩家加入空音為朋友 以便快速獲得情報及取得協助，感謝配合\
					';

			}else if(InformationN == 6){

				return '【重要】新手教學獎勵追加 \
					\n\
					\n 未來只要完成「新手教學」全部流程的玩家，將可獲得 火球、治癒、斬擊 三本技能書中尚未獲得的技能書\
					\n 已經完成的玩家將自動追加技能書，請至玩家存檔確認\
					\n        GM團祝各位遊玩愉快\
					';

			}else if(InformationN == null){

				return '\【公告目錄】目前遊戲中的公告一覽表 \
					\n\
					\n  6 【重要】 新手教學獎勵追加\
					\n  0 【重要】 先行測試一 刪擋封測中\
					\n  1 【招募】 新手招募(首抽)\
					\n  2 【招募】 通常奇蹟石招募\
					\n  3 【招募】 票券招募-「事前登錄卷限定招募」 \
					\n  4 【進度】 目前更新紀錄 \
					\n  5 【重要】 請加空音好友以取得最新消息\
					\n\
					\n 如果想看詳細公告內容，請輸入 [公告 公告編號] \
					';

			}else{

				return '\找不到公告編號['+ InformationN + ']的公告喔\
					\n\
					\n【公告目錄】目前遊戲中的公告一覽表 \
					\n\
					\n  6 【重要】 新手教學獎勵追加\
					\n  0 【重要】 先行測試一 刪擋封測中\
					\n  1 【招募】 新手招募(首抽)\
					\n  2 【招募】 通常奇蹟石招募\
					\n  3 【招募】 票券招募-「事前登錄卷限定招募」 \
					\n  4 【進度】 目前更新紀錄 \
					\n  5 【重要】 請加空音好友以取得最新消息\
					\n\
					\n 如果想看詳細公告內容，請輸入 [公告 公告編號] \
					';

			}

			///

		},
	////////////////

	//////////////// 遊戲主線
		MainStory: function(StoryPart,StoryN) {

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
					\n 故事:，活的風之劍聖-露在歷經許多事件後，終於回到了湖之村，可是她得到的只有無情的對待...\
					\n\
					\n 第一章突破獎勵: 技能書「祈願」\
					\n\
					\n 關卡情報:\
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
					\n 1 第一章-劍聖再臨\
					\n 2 第二章-風之夥伴(未開放)\
					\n\
					\n 如果想看詳細活動內容，請輸入 [主線 第一部(part1,1) 第幾章(章節編號) ] \
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
					\n 1 第一章-劍聖再臨\
					\n 2 第二章-風之夥伴(未開放)\
					\n\
					\n 如果想看詳細活動內容，請輸入 [主線 第一部(part1,1) 第幾章(章節編號) ] \
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

		},
	////////////////

	//////////////// 遊戲活動
		GameEvent: function(EventN) {

			///基本變數
			///

			///確定公告狀態
			if(EventN == 0){

					return '\【重要】 先行測試一 刪擋封測中 \
					\n\
					\n感謝各位參加 Line文遊-梅里歐斯的冒現者 的先行測試 \
					\n還沒完成教學的測試玩家請盡速找GM進行教學\
					\n已經完成的玩家將暫時可以使用全部的遊戲物品\
					\n詳細內容請至[重要文件區->遊戲圖鑑]進行確認\
					\n\
					\n        GM團祝各位遊玩愉快\
					';

			}else if(EventN == null){

				return '\【活動目錄】目前開催中的活動一覽表 \
					\n\
					\n  0 【重要】 先行測試一 刪擋封測中\
					\n\
					\n 如果想看詳細活動內容，請輸入 [活動 活動編號] \
					';

			}else{

				return '\找不到活動編號['+ EventN + ']的活動喔\
					\n\
					\n【活動目錄】目前開催中的活動一覽表 \
					\n\
					\n  0 【重要】 先行測試一 刪擋封測中\
					\n\
					\n 如果想看詳細活動內容，請輸入 [活動 活動編號] \
					';

			}

			///

		},
	////////////////



	       randomLuck: function(TEXT) {
		   let rplyArr = ['超吉','超級上吉','大吉','吉','中吉','小吉','吉','小吉','吉','吉','中吉','吉','中吉','吉','中吉','小吉','末吉','吉','中吉','小吉','末吉','中吉','小吉','小吉','吉','小吉','末吉','中吉','小吉','凶','小凶','沒凶','大凶','很凶'];
		   return TEXT[0] + ' ： ' + rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
		},


	////////////////////////////////////////
	//////////////// Funny
	////////////////////////////////////////




	////////////////////////////////////////
	//////////////// Tarot塔羅牌
	////////////////////////////////////////
	MultiDrawTarot: function(CardToCal, text, type) {
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
	},

	NomalDrawTarot: function(CardToCal, text) {
		let returnStr = '';

		if (text == null)
			returnStr = tarotCardReply(FunnyDice(22)) + ' ' + tarotRevReply(FunnyDice(2));
		else
			returnStr = tarotCardReply(FunnyDice(22)) + ' ' + tarotRevReply(FunnyDice(2)) + ' ; ' + text;
		return returnStr;
	},


	tarotRevReply: function(count) {
		let returnStr = '';

		if (count == 0) returnStr = '＋';
		if (count == 1) returnStr = '－';

		return returnStr;
	},

	choice: function(input,str) {
		let a = input.replace(str[0], '').match(/\S+/ig);
		return str[0] + '['+ a + '] → ' + a[Dice(a.length)-1];
	},

	tarotCardReply: function(count) {
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

	},


	Help: function () {
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
		\n輸入 活動，就能確認當前的公告目錄\
		\n輸入 主線，就能確認目前開放的主線任務\
		\n輸入 寶箱/開寶箱，就能確認你剛獲得的寶箱內容喔\
		\n--Bot娛樂功能--\
		\n 占卜運氣功能 字句中包括運氣即可\
		\n 塔羅牌占卜 塔羅/大十字塔羅/每日塔羅牌/時間tarot 等關键字可啓動\
		\n 死亡FLAG：句子裡出現 Flag/flag 就能讓你輕鬆插旗\
		\n 如果呼叫空音的名子...好像會有事情發生？\
		';		
	}

}

module.exports = battle;

