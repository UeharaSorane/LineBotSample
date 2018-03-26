var rply ={type : 'text'}; //type是必需的,但可以更改

var PlayerData = require('./PlayerData.js');
var PD = PlayerData.GetArray();

DB.useServiceAccountAuth(creds, function (err) {
		
 
	
 // 是先將資料讀進陣列
	DB.getRows(1 , 
		function (err, rows) {
			if (err) {
				console.log( err );
			}else{

				for(var i=0; i< rows.length; i++){
					CharArr[i] = [];
					
					CharArr[i][0] = rows[i].userid;
					CharArr[i][1] = rows[i].cname;
					CharArr[i][2] = Number(rows[i].gold);
					CharArr[i][3] = Number(rows[i].mirastone);
					CharArr[i][4] = rows[i].title;
					CharArr[i][5] = rows[i].inheritio;
					CharArr[i][6] = rows[i].inheritpassword;
					CharArr[i][7] = Number(rows[i].wmaterials);
					CharArr[i][8] = Number(rows[i].wmaterialm);
					CharArr[i][9] = Number(rows[i].wmateriall);
					CharArr[i][10] = Number(rows[i].gmaterials);
					CharArr[i][11] = Number(rows[i].gmaterialm);
					CharArr[i][12] = Number(rows[i].gmateriall);
					CharArr[i][13] = Number(rows[i].mateshards);
					CharArr[i][14] = rows[i].guild;
					CharArr[i][15] = rows[i].guildtitle;
					
				}
				//console.log(CharArr);
				console.log('玩家基本資料 讀取完成');
				//console.log();
			}
		

			
			});
	
		
		
	});

function ArrayUpdate() {

	DB.useServiceAccountAuth(creds, function (err) {



	 // Get all of the rows from the spreadsheet.
		DB.getRows(1 , 
			function (err, rows) {
				if (err) {
					console.log( err );
				}else{

					for(var i=0; i< CharArr.length; i++){

						rows[i].UserID = CharArr[i][0];
						rows[i].Cname = CharArr[i][1];
						rows[i].Gold = CharArr[i][2];
						rows[i].MiraStone = CharArr[i][3];
						rows[i].Title = CharArr[i][4];
						rows[i].InheritIO = CharArr[i][5];
						rows[i].InheritPassword = CharArr[i][6];
						rows[i].WmaterialS = CharArr[i][7];
						rows[i].WmaterialM = CharArr[i][8];
						rows[i].WmaterialL = CharArr[i][9];
						rows[i].GmaterialS = CharArr[i][10];
						rows[i].GmaterialM = CharArr[i][11];
						rows[i].GmaterialL = CharArr[i][12];
						rows[i].MateShards = CharArr[i][13];
						rows[i].guild = CharArr[i][14];
						rows[i].guildtitle = CharArr[i][15];
						rows[i].save();

					}

					}
					console.log('玩家基本資料 更新完成');


				});



		});
	
}
