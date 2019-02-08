function Sample(SendText) {
	//本函數為教學用函數，可以直接將使用者傳來的訊息顯示在後台且原封不動地丟給使用者
	//SendText 為使用本函數必須提供的資料
	console.log(SendText);//讓後臺顯示使用者的訊息
	
	return SendText;//把訊息原封不動丟回分析區，讓他丟回去

}

function Hello(){
	
	var rply = '你好!';//定義機器人要說啥
	
	return rply;//把要說的送回分析區
	
}

module.exports = {
	Sample,
	Hello
};//這個部分是為了讓使用這個.js的程式知道哪些函數能用
