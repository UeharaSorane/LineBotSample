var rollbase = require('./rollbase.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

//////////////// 插旗
	function BStyleFlagSCRIPTS(userN) {
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
			rply.text =  rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
		
			return rply;
        }
////////////////

//////////////// 空音閒談
        function randomReply(userName) {
        	let rplyArr = [
		  
			userName+'，感覺你很閒呢…能一直找我聊天...'/*,
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
		  	'\我的父親(?)，施彥任內心有點脆弱，拜托沒事不要傷他的心喔。',
		  	'\比起一直找我聊天，不如試著找其他事做吧。',
		  	'\稍微...讓我休息一下吧(攤',
			'\希望我成為你的同伴？看看夥伴商店吧！'/*];
        	rply.text =  rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
					
			return rply;
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
        	rply.text =  rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
					
			return rply;
        }
////////////////

////////////////運勢抽籤
function randomLuck(TEXT) {
	let rplyArr = ['超吉','超級上吉','大吉','吉','中吉','小吉','吉','小吉','吉','吉','中吉','吉','中吉','吉','中吉','小吉','末吉','吉','中吉','小吉','末吉','中吉','小吉','小吉','吉','小吉','末吉','中吉','小吉','凶','小凶','沒凶','大凶','很凶','你不要知道比較好呢','命運在手中,何必問我'];
	rply.text = TEXT[0] + ' ： ' + rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
	return rply;
}
////////////////

////////////////////////////////////////
//////////////// choice 及SORT
////////////////////////////////////////
function choice(input,str) {
	let a = input.replace(str[0], '').match(/\S+/ig);
	rply.text = str[0] + '['+ a + '] → ' + a[rollbase.Dice(a.length)-1];
	return rply;
}

 function SortIt(input,mainMsg) {	
 
 	let a = input.replace(mainMsg[0], '').match(/\S+/ig);
	for (var i = a.length-1; i >=0; i--) {
 
	var randomIndex = Math.floor(Math.random()*(i+1));
	var itemAtIndex = a[randomIndex];
	a[randomIndex] = a[i];
	a[i] = itemAtIndex;
	}
	rply.text = mainMsg[0] + ' → ['+ a + ']' ;
	return rply;
 }


module.exports = {
	BStyleFlagSCRIPTS,
	randomReply,
	randomReplyShin,
	randomLuck,
	SortIt,
	choice
	
};
