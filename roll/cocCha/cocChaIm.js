//////////mongo系統
var mongoose = require('mongoose');
var mongoDB = 'mongodb://b88009005:b09050905@ds229312.mlab.com:29312/linetest';

//連線測試
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

///////////

var ChaImSchema = new Schema({
	id:{type:Number},
	cha_name:{type:String,require:true},
	cha_class:{type:String,require:true},
	age:{type:String,require:true},
	sex:{type:String,require:true},
	born:{type:String,require:true},
	live:{type:String,require:true}
});

var ChaIm = mongoose.model('ChaIm',ChaImSchema);

var CIArr = [];

ChaIm.find(function(err,ChaIms){
	for(var a = 0;a<ChaIms;a++){
		CIArr[a] = ChaIms[a];
	}
	
	console.log("coc角色基本資料，讀取完成");
});

function findChaIm(chaName){
	for(var a =0;a<CIArr.length;a++){
		if(CIArr[a].cha_name == chaName) return CIArr[a];
	}
	return 'NotFound';
}

module.exports = {
	findChaIm
};
