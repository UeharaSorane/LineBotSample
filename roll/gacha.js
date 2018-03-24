var rollbase = require('./rollbase.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

//////////////// 角色招募
	function main(DrawPool,GachaTimes) {
		
		///基本變數
		let GachaResult = [];//抽獎結果
		let CharacterResult = [];//總計獲得同伴
		var characterShardResult = 0;//總計獲得同伴碎片
		let CharacterList = [];//腳色清單
		let CharacterListSP = [];//限定腳色清單
		let CharacterListSecret = [];//超稀有腳色清單
 
		var times = 0;//抽獎次數
		var characterChance = 0;//夥伴獲得率
		var characterChanceSP = 0;//限定夥伴獲得率
		var characterChanceSecret =0;//超稀有夥伴獲得率
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
				
				rply.text = '【首次限定！】新手招募-絕對獲得攻擊型夥伴一名喔！ \
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
					\n 想要招募的話，請輸入 [招募 0 招募方式] ';
				
				return rply;
				
			  }else{
				rply.text = '本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 [招募 ' + DrawPool + ']';
				return rply;	
			  	}
		}else if(DrawPool == 1){
			CharacterList.length = 5;
			CharacterList = ['義熊','尤克特','克雷特','路卡','露'];
			CharacterListSP.length = 3;
			CharacterListSP = ['路卡(回憶ver)','克雷特(回憶ver)','義熊(回憶ver)'];
			CharacterListSecret.length = 1;
			CharacterListSecret = ['瑟雷娜'];
			
			//機率皆相同
			characterChance = 10;
			characterChanceSP = 8;
			characterChanceSecret =2;
			//

			if(GachaTimes =='首單抽'){
				times = 1;
				CharacterShard = 10;
				CharacterShardBonus = 0;
				
			}else if(GachaTimes =='單抽'){
				times = 1;
				CharacterShard = 10;
				CharacterShardBonus = 0;
						
			}else if(GachaTimes =='五連加一'||GachaTimes =='五連'){
				times = 6;
				CharacterShard = 16;
				CharacterShardBonus = 4;
				characterST = 0;

			}else if(GachaTimes =='十連加三'||GachaTimes =='十連'){
				times = 13;
				CharacterShard = 21;
				CharacterShardBonus = 9;
				characterST = 1;

			}else if(GachaTimes == null){
				
				rply.text = '【限定招募】過往回憶的夥伴們(前篇) \
					\n 透過特別招募，結交回憶中可靠的夥伴們吧！\
					\n 開催時間:3/10 00:00 ~ 3/31 23:59\
					\n\
					\n 期間限定登場:\
					\n Sp2-1 路卡的梅里歐斯系列(前篇):\
					\n <黃金之泉的追求者>路卡\
					\n <傳說蘿莉的追求者>克雷特\
					\n <興趣的追求者>義熊\
					\n\
					\n !!!超稀有限定登場:!!!\
					\n {鋒芒盡藏}瑟蕾娜\
					\n\
					\n 還可以招募到以下夥伴系列:\
					\n\
					\n 001起始英雄系列(共五名) \
					\n\
					\n 命中機率(不論用何種招募，機率都相同):\
					\n 夥伴碎片:80%\
					\n 通常夥伴:10%\
					\n 限定夥伴:8%\
					\n 超稀有:2%\
					\n\
					\n 保底夥伴命中機率(當招募內容有保底時，該保底夥伴出現機率):\
					\n 通常夥伴:50%\
					\n 限定夥伴:40%\
					\n 超稀有:10%\
					\n\
					\n 提供招募方式：\
					\n [首次限定] 首單抽 無需奇蹟石(夥伴碎片量:1~10)[每名玩家限定一次]\
					\n\
					\n 單抽 5顆奇蹟石(夥伴碎片量:1~10)\
					\n\
					\n 五連加一(五連) 25顆奇蹟石(夥伴碎片量:5~20)\
					\n\
					\n 十連加三(十連) 50顆奇蹟石(保底一名夥伴，夥伴碎片量:10~40)\
					\n\
					\n 想要招募的話，請輸入 [招募 1 招募方式] ';
					return rply;
			  }else{
				rply.text = '本招募無法使用' + GachaTimes +'招募喔';
				return rply;
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

				rply.text = '【通常招募】通常奇蹟石招募 \
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
					\n 想要招募的話，請輸入 [招募 2 招募方式]';
					return rply;
			  }else{
				rply.text = '本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 [招募 ' + DrawPool + ']';
				return rply;
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
			
				rply.text = '【票券招募】事前登錄卷限定招募 \
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
					\n 想要招募的話，請輸入 [招募 2 招募方式] ';
					return rply;
				
			  }else{
				rply.text = '本招募無法使用' + GachaTimes +'招募喔\n 如果想看本招募詳細內容，請輸入 [招募 ' + DrawPool + ']';
				return rply;
				}
		}*/else if(DrawPool == 1101211){
			CharacterList.length = 5;
			CharacterList = ['義熊','尤克特','克雷特','路卡','露'];
			CharacterListSP.length = 3;
			CharacterListSP = ['路卡(回憶ver)','克雷特(回憶ver)','義熊(回憶ver)'];
			CharacterListSecret.length = 1;
			CharacterListSecret = ['瑟雷娜'];
			
			//機率皆相同
			characterChance = 10;
			characterChanceSP = 8;
			characterChanceSecret =2;
			//

			if(GachaTimes =='首單抽'){
				times = 1;
				CharacterShard = 10;
				CharacterShardBonus = 0;
				
			}else if(GachaTimes =='單抽'){
				times = 1;
				CharacterShard = 10;
				CharacterShardBonus = 0;
						
			}else if(GachaTimes =='五連加一'||GachaTimes =='五連'){
				times = 6;
				CharacterShard = 16;
				CharacterShardBonus = 4;
				characterST = 0;

			}else if(GachaTimes =='十連加三'||GachaTimes =='十連'){
				times = 13;
				CharacterShard = 21;
				CharacterShardBonus = 9;
				characterST = 1;

			}else if(GachaTimes == null){
				
				rply.text = '【測試招募】GM系統測試專用招募';
				return rply;
			  }else{
				rply.text = '本招募無法使用' + GachaTimes +'招募喔';
				return rply;
				}
		}else if(DrawPool == null){
			
			rply.text = '【招募目錄】目前的招募一覽表 \
				\n\
				\n  0 【新手招募(首抽)】 \
				\n  1 【限定招募】過往回憶的夥伴們(前篇)(NEW) \
				\n  2 【通常奇蹟石招募】 \
				\n\
				\n 如果想看詳細招募內容，請輸入 [招募 招募編號]';
				return rply;
			
		}else{
			
			rply.text = '找不到招募編號['+ DrawPool+ ']的招募喔\
				\n\
				\n【招募目錄】目前的招募一覽表 \
				\n\
				\n  0 【新手招募(首抽)】 \
				\n  1 【限定招募】過往回憶的夥伴們(前篇)(NEW) \
				\n  2 【通常奇蹟石招募】 \
				\n\
				\n 如果想看詳細招募內容，請輸入 [招募 招募編號]';
				return rply;
			
		}
		
		///
		
		///抽獎
		
		var temp = 0;
		GachaResult.length = times;
		
		for(var i = 0; i< times;i++){
			
			GachaResult[i] = '\n';
			
		}
		
		for(var i = 0;i < characterST; i++){
			temp = rollbase.Dice(characterChance+characterChanceSP+characterChanceSecret);
			if(temp <= characterChanceSP+characterChanceSecret){
				if(temp <= characterChanceSecret){
					CharacterResult[times-characterST+i] = CharacterListSecret[Math.floor((Math.random() * (CharacterListSecret.length)) + 0)];
					GachaResult[times-characterST+i] = '\[保底]超稀有夥伴:{' +  CharacterResult[times-characterST+i]+ '}\n';//超稀有夥伴
				}else{
					CharacterResult[times-characterST+i] = CharacterListSP[Math.floor((Math.random() * (CharacterListSP.length)) + 0)];
					GachaResult[times-characterST+i] = '\[保底]限定夥伴:' +  CharacterResult[times-characterST+i]+ '\n'; //限定夥伴
				}
			}else{
				CharacterResult[times-characterST+i] = CharacterList[Math.floor((Math.random() * (CharacterList.length)) + 0)];
				GachaResult[times-characterST+i] = '\[保底]夥伴:' +  CharacterResult[times-characterST+i]+ '\n';
			}
		}//保底腳色處理
		
				
		for(var i=0; i<times-characterST;i++){
			temp = rollbase.Dice(100);

			let Shard = rollbase.Dice(CharacterShard)+CharacterShardBonus;
			if (temp > characterChance+characterChanceSP+characterChanceSecret){
				characterShardResult = characterShardResult + Shard;
				GachaResult[i] = '\夥伴碎片X' +  Shard + '片\n';
			}//是否抽到夥伴
			if (temp <= characterChance+characterChanceSP+characterChanceSecret) {
					
				if(temp <= characterChanceSP+characterChanceSecret){
					
					if(temp <= characterChanceSecret){
						CharacterResult[i] = CharacterListSecret[Math.floor((Math.random() * (CharacterListSecret.length)) + 0)];
						GachaResult[i] = '\超稀有夥伴:{' +  CharacterResult[i]+ '}\n';//超稀有夥伴
					}else{
						CharacterResult[i] = CharacterListSP[Math.floor((Math.random() * (CharacterListSP.length)) + 0)];
						GachaResult[i] = '\限定夥伴:' +  CharacterResult[i]+ '\n'; //限定夥伴
					}
				}else{
					CharacterResult[i] = CharacterList[Math.floor((Math.random() * (CharacterList.length)) + 0)];
					GachaResult[i] = '\夥伴:' +  CharacterResult[i]+ '\n';
				}
			}//確定夥伴
		}//通常腳色處理	
		
		///
		
		///判定重複腳色換成100角色碎片
		for(var i = 0;i<times;i++){
			for(var j = i+1;j<times;j++){
				if(CharacterResult[i]!= null && CharacterResult[i] == CharacterResult[j] && CharacterResult[j] != null){
					CharacterResult[j] = null;
					characterShardResult = characterShardResult +100;
				}
			   }
		}
		
		let GResult =GachaTimes + '招募結果:\n'
		for(var i = 0;i<times;i++){
			GResult = GResult + GachaResult[i];
		}
		
		GResult = GResult + '\n--------------------\n總計獲得夥伴:';
		
		for(var i = 0;i<times;i++){
			if(CharacterResult[i] != null ) GResult = GResult + CharacterResult[i] + ',' ;
		}
		
		GResult = GResult + '\n總計獲得夥伴碎片(連同重複夥伴):' + characterShardResult + '片';
		
		rply.text = GResult;
		
		return rply;
		
		
		
	}
////////////////

module.exports = {
	main
};
