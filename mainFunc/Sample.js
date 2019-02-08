function Hello(){
	
	var rply = '你好!';//定義機器人要說啥
	
	return rply;//把要說的送回分析區
	
}

module.exports = {
	Hello
};//這個部分是為了讓使用這個.js的程式知道哪些函數能用
