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
	user_id:{type:String,require:true},
	cha_name:{type:String,require:true},
	cha_class:{type:String,default'未設定'},
	age:{type:String,default'未設定'},
	sex:{type:String,default'未設定'},
	born:{type:String,default'未設定'},
	live:{type:String,default'未設定'}
});

var ChaIm = mongoose.model('ChaIm',ChaImSchema);

var CIArr = [];

ChaIm.find(function(err,ChaIms){
	for(var a = 0;a<ChaIms;a++){
		CIArr[a] = ChaIms[a];
	}
	
	console.log("coc角色基本資料，讀取完成");
});

function CreateCha(UserID,chaName){
	var CIAL = CIArr.length;
	CIArr[CIAL] = {
		id:CIAL,
		user_id:UserID,
		cha_name:chaName,
		cha_class:'未設定',
		age:'未設定',
		sex:'未設定',
		born:'未設定',
		live:'未設定'
	}
	
	saveChaIm(CIArr[CIAL]);
}

function findChaIm(chaName){
	for(var a =0;a<CIArr.length;a++){
		if(CIArr[a].cha_name == chaName) return CIArr[a];
	}
	return 'NotFound';
}

function saveChaIm(ChaImT){
	CIArr.findOneAndUpdate({id: ChaImT.id},ChaImT,{
		upsert:true
	},function(err){
		if(err) throw err;
		else{
			console.log("角色基本資料 更新完成");
		}
	});
}

module.exports = {
	findChaIm,
	CreateCha
};
