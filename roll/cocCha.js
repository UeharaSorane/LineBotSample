var rply = [];

//////////mongo系統
var mongoose = require('mongoose');
var mongoDB = 'mongodb://b88009005:b09050905@ds229312.mlab.com:29312/linetest';

//連線測試
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

mongoose.connect(mongoDB, function (err) {
	if(err) throw err;
	else console.log('連線成功，可以正常吃芒果!');
});
///////////

var AccountSchema = new Schema({
	id:{type:Number},
	user_id:{type:String,require:true},
	have_cha:{type:Array,default:[]},
	trans_key:{type:String,default:'none'},
	trans_io:{type:bool,default:false}
});

var Account = mongoose.model('AccountData',AccountSchema);
var AccountArr = [];

Account.find(function(err,Accounts){
	if(err)throw err;
	else{
		for(var a = 0;a<Accounts.length;a++){
			AccountArr[a] = {
				id: Accounts[a].id,
				user_id: Accounts[a].user_id,
				have_cha: Accounts[a].have_cha,
				trans_key: Accounts[a].trans_key,
				trans_io: Accounts[a].trans_io
			};
		}
		console.log("AccountArr = " + AccountArr);
		console.log("coc帳號資料，讀取完成");
	}
});

function CreateAccount(UserID){
	rply[0] = 'rply';
	
	if(UserID == null){
		rply[1] = '注意!讀取你的Line UserID失敗，請通報給系統人員';
		return rply;
	}else{
		var AAL = AccountArr.length;
		AccountArr[AAL] = {
			id: AAL,
			user_id: UserID,
			have_cha: [],
			trans_key: 'none',
			trans_io: false
		};
		
		saveAccounts(AccountArr[AAL]);
	}
}

function saveAccounts(AccountT){
	Account.find({id: AccountT.id},function(err,Accounts){
		if(err) throw err;
		else{
			Account.create(AccountT,function(err){
				if(err) throw err;
			});
			
			console.log("帳號資料 更新完成");
		}
	});
}

module.exports = {
	CreateAccount
};
