var rply ={type : 'text'}; //type是必需的,但可以更改

function main() {
			
	///確認系統沒有問題用
      
	rply.text =  '系統連結沒有問題';
				
	return rply;
	
	///

}

function UID(UserID) {
			
	///確認是否能接收玩家UID用
      
	rply.text =  '您的UserID是:' + UserID;
				
	return rply;
	
	///

}


module.exports = {
	main,
	UID
};
