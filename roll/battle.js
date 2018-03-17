var rollbase = require('./rollbase.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

//////////////// ccb功能(機率計算)   
function ccb(chack,text){
	let temp = rollbase.Dice(100);

	if (text == null ) {
		if (temp == 100) rply.text = 'ccb<=' + chack  + ' ' + temp + ' → 糟了！大失敗！';
		if (temp == 1) rply.text = 'ccb<=' + chack  + ' ' + temp + ' → 太棒了！大成功！';
		if (temp <= chack) rply.text = 'ccb<=' + chack + ' '  + temp + ' → 很好！成功了！';
		else rply.text = 'ccb<=' + chack  + ' ' + temp + ' → 可惜！失敗了！' ;
	}else{
		if (temp == 100) rply.text = text + ': ccb<=' + chack + ' ' + temp + ' → 糟了！大失敗！';
		if (temp == 1) rply.text = text + ': ccb>=' + chack + ' ' + temp + ' → 太棒了！大成功！';
		if (temp <= chack) rply.text = text + ': ccb>=' + chack + ' ' + temp + ' → 很好！成功了！';
		else rply.text = text + ': ccb>=' + chack + ' ' + temp + ' → 可惜！失敗了！';
	}
	
	return rply;
	
}
////////////////

//////////////// 速度判定
function spd(spd1p,spd2p){
	let temp = rollbase.Dice(100);
	
	var spdmus = spd1p - spd2p;

	if (spdmus+50 > temp) {
		rply.text = '速度差:'+spdmus+'>='+(temp-50)+'→ 你先攻！';
	}else{
		rply.text = '速度差:'+spdmus+'<'+(temp-50)+'→ 對手先攻！';
	}
	return rply;
	
}
////////////////

//////////////// xBy
function xBy(triggermsg ,text01, text02) {

	let returnStr = '(' + triggermsg +')';
	let match = /^(\d+)(B)(\d+)$/i.exec(triggermsg);  //判斷式  [0]3B8,[1]3,[2]B,[3]8
	let varcou =  new Array();
	let varsu = 0;
	for (var i = 0; i < Number(match[1]); i++){
		varcou[i] =  rollbase.Dice(match[3]);
	}
	varcou.sort(rollbase.sortNumber);
	//(5B7>6) → 7,5,6,4,4 → 成功数1

	if(isNaN(text01) ==false &&Number(text01) <= Number(match[3])){
		for (let i = 0; i < Number(match[1]); i++){
			
			if(Number(varcou[i])>=Number(text01)) varsu++; 
			
		}
		
		if (text02 ==undefined) text02 ='';

		returnStr+= ' → ' + varcou + ' → 成功數'+varsu + ' ' +text02 ;

	}else{
		if (text01 ==undefined) text01 ='';
		returnStr+=  ' → ' + varcou + ' ' +text01 ;

	}

	rply.text = returnStr;
	return rply;
}
////////////////

//////////////// xUy

function xUy(triggermsg ,text01, text02, text03) {
	var match = /^(\d+)(u)(\d+)/i.exec(triggermsg);   //判斷式  5u19,5,u,19, 
	var returnStr = '('+triggermsg+'['+text01+']';
	if(Number(text02) <= Number(match[3]) && text02 != undefined) {
		returnStr+= '>'+text02+ ') → ';
		if(text03!=undefined) returnStr += text03 +' → ';
	}else{
		returnStr+= ') → ';
		if(text02!=undefined) returnStr += text02 +' → ';	
	}	
	let varcou =  new Array();
	let varcouloop =  new Array();
	let varcoufanl =  new Array();
	let varcounew =  new Array();
	var varsu = 0;
	if (text01<=2){
		rply.text = '加骰最少比2高';
		return rply;
	}

	for (var i = 0; i < Number(match[1]); i++){
		varcou[i] =  rollbase.Dice(match[3]);
		varcounew[i] = varcou[i];
		varcouloop[i] = varcounew[i];
		
		for(;varcounew[i]>=text01;){
			varcounew[i] =rollbase.Dice(match[3]);
			varcouloop[i] += ', ' +varcounew[i];
			varcou[i] += varcounew[i];
		}

	}

	for(var i = 0; i < varcouloop.length; i++){
		
		if(varcouloop[i]==varcou[i]){
			returnStr += varcou[i]+', ';
		}else returnStr += varcou[i]+'['+varcouloop[i]+ '], '; 
    
	}
	
	returnStr = returnStr.replace(/, $/ig,'');
 
	if(Number(text02) <= Number(match[3]) ){
		let suc =0;

		////////////////  (5U10[8]>8) → 1,30[9,8,8,5],1,3,4 → 成功数1
		for(var i=0;i<varcou.length;i++){
			
			if(Number(varcou[i])>=Number(text02)) suc++;
			
		}

		returnStr  += ' → 成功数' +suc;

	}else
	////////////////  (5U10[8]) → 17[10,7],4,5,7,4 → 17/37(最大/合計)
	{
		returnStr  +=' → ' + Math.max.apply(null, varcou)
		returnStr  += '/' + varcou.reduce(function(previousValue,currentValue){
		return previousValue + currentValue;} ) +'(最大/合計)';
	}
	
	rply.text = returnStr;
	return rply;
	
}
////////////////


module.exports = {
	ccb,
	spd,
	xBy,
	xUy
};
