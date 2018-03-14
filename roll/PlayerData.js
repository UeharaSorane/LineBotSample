var rply ={type : 'text'}; //type是必需的,但可以更改
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var DB = new GoogleSpreadsheet('12y_EgRKvjO7a1xEc5wbM5ERofFfXW-csoR4_R0H0HfA/edit#gid=0');

function main() {
			
	///確認玩家資料
      
	rply.text =  '系統連結沒有問題';
				
	return rply;
	
	///

}


module.exports = {
	main
};
