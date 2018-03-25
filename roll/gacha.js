var rollbase = require('./rollbase.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

var PlayerData = require('./PlayerData.js');

var MateBox = require('./MateBox.js');

var fs = require('fs');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA');
var WeaponBoxArr= [];

DB.useServiceAccountAuth(creds, function (err) {
	var PlayerNumber = 0;
	
 // 是先將資料讀進陣列
	DB.getRows(17 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{
				for(var i=0; i< rows.length; i++){
					WeaponBoxArr[i] = [];
					
					WeaponBoxArr[i][0] = rows[i].gachaid;
					WeaponBoxArr[i][1] = rows[i].gachatype;
					WeaponBoxArr[i][2] = rows[i].gachaname;
					WeaponBoxArr[i][3] = rows[i].aname;
					WeaponBoxArr[i][4] = Number(rows[i].atimes);
					WeaponBoxArr[i][5] = Number(rows[i].astones);
					WeaponBoxArr[i][6] = Number(rows[i].asave);
					WeaponBoxArr[i][7] = rows[i].bname;
					WeaponBoxArr[i][8] = Number(rows[i].btimes);
					WeaponBoxArr[i][9] = Number(rows[i].bstones);
					WeaponBoxArr[i][10] = Number(rows[i].bsave);
					WeaponBoxArr[i][11] = rows[i].cname;
					WeaponBoxArr[i][12] = Number(rows[i].ctimes);
					WeaponBoxArr[i][13] = Number(rows[i].cstones);
					WeaponBoxArr[i][14] = Number(rows[i].csave);
					WeaponBoxArr[i][15] = Number(rows[i].shard);
					WeaponBoxArr[i][16] = Number(rows[i].chancen);
					WeaponBoxArr[i][17] = Number(rows[i].chancer);
					WeaponBoxArr[i][18] = Number(rows[i].chances);
					WeaponBoxArr[i][19] = rows[i].nlist.split(',');
					WeaponBoxArr[i][20] = rows[i].rlist.split(',');
					WeaponBoxArr[i][21] = rows[i].slist.split(',');
					WeaponBoxArr[i][22] = rows[i].gdescription;
					
				}
				//console.log(BadgeArr);
				console.log('招募情報 讀取完成');
			}
		

			
			});
	
		
		
	});

//////////////// 角色招募
	function main(UesrID,DrawPool,GachaTimes,test) {
		var PData =  PlayerData.GetArray();
		var MB = MateBox.GetArray();
		
		///基本變數
		let GachaResult = [];//抽獎結果
		let CharacterResult = [];//總計獲得同伴
		var characterShardResult = 0;//總計獲得同伴碎片
		let CharacterList = [];//腳色清單
		let CharacterListSP = [];//限定腳色清單
		let CharacterListSecret = [];//超稀有腳色清單
		
		let stoneNeed = 0;
 
		var times = 0;//抽獎次數
		var characterChance = 0;//夥伴獲得率
		var characterChanceSP = 0;//限定夥伴獲得率
		var characterChanceSecret =0;//超稀有夥伴獲得率
		var CharacterShard = 0;//夥伴碎片獲得數量
		var characterST = 0;//確認保底夥伴數量
		///
		
		for(var a = 0; a< PData.length;a++){
			
			if(PData[a][0] == UesrID){
				for(var i = 0; i<WeaponBoxArr.length;i++){
					if(DrawPool == WeaponBoxArr[i][0]){
						CharacterList.length = WeaponBoxArr[i][19].length;
						CharacterList = WeaponBoxArr[i][19];
						CharacterListSP.length = WeaponBoxArr[i][20].length;
						CharacterListSP = WeaponBoxArr[i][12];
						CharacterListSecret.length = WeaponBoxArr[i][21].length;
						CharacterListSecret = WeaponBoxArr[i][21];

						characterChance = WeaponBoxArr[i][16];
						characterChanceSP = WeaponBoxArr[i][17];
						characterChanceSecret =WeaponBoxArr[i][18];

						CharacterShard = WeaponBoxArr[i][15];

						if(GachaTimes == WeaponBoxArr[i][3] && WeaponBoxArr[i][3] !='無'){
							times = WeaponBoxArr[i][4];
							stoneNeed = WeaponBoxArr[i][5];
							characterST = WeaponBoxArr[i][5];

						}else if(GachaTimes == WeaponBoxArr[i][7] && WeaponBoxArr[i][7] !='無'){
							times = WeaponBoxArr[i][8];
							stoneNeed = WeaponBoxArr[i][9];
							characterST = WeaponBoxArr[i][10];

						}else if(GachaTimes == WeaponBoxArr[i][11] && WeaponBoxArr[i][11] !='無'){
							times = WeaponBoxArr[i][12];
							stoneNeed = WeaponBoxArr[i][13];
							characterST = WeaponBoxArr[i][14];

						}else if(GachaTimes == null || GachaTimes == '無'){

							rply.text =WeaponBoxArr[i][22] + '\n\n 你目前持有的奇蹟石數量: ' + PData[a][3] + '\n\
								\n 想要招募的話，請輸入 招募 招募編號 招募方式';
							return rply;
						}else{
							rply.text = '本招募無法使用' + GachaTimes +'招募喔';
							return rply;
						}
					}
				}
				
				if(DrawPool == null){
					
					rply.text = '【招募目錄】目前的招募一覽表 \n';
					
					for(var b = 0;b<WeaponBoxArr.length; b++){
						
						rply.text+= '\n   ' + WeaponBoxArr[b][0] + ' 【' + WeaponBoxArr[b][1] + '】' + WeaponBoxArr[b][2] + '\
								\n 如果想看詳細招募內容，請輸入 招募 招募編號';
						
						return rply;
					}

				}else{

					rply.text = '找不到招募編號['+ DrawPool+ ']的招募喔\n';
					rply.text += '【招募目錄】目前的招募一覽表 \n';
					
					for(var b = 0;b<WeaponBoxArr.length; b++){
						
						rply.text+= '\n   ' + WeaponBoxArr[b][0] + ' 【' + WeaponBoxArr[b][1] + '】' + WeaponBoxArr[b][2] + '\
								\n 如果想看詳細招募內容，請輸入 招募 招募編號';
						
						return rply;
					}
				}
				
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

					let Shard = rollbase.Dice(CharacterShard);
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
		}
	}
////////////////

module.exports = {
	main
};
