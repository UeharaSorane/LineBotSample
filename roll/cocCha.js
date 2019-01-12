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
	play_cha:{type:String,default:''},
	have_cha:{type:Array,default:[]},
	trans_key:{type:String,default:'none'},
	trans_io:{type:Boolean,default:false}
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
				play_cha: Accounts[a].play_cha,
				have_cha: Accounts[a].have_cha,
				trans_key: Accounts[a].trans_key,
				trans_io: Accounts[a].trans_io
			};
		}
		console.log("AccountArr = " + AccountArr);
		console.log("coc帳號資料，讀取完成");
	}
});

function CheckAccount(UserID){
	for(var a = 0;a<AccountArr.length;a++){
		var T = AccountArr[a];
		if(T.user_id == UserID){
			return a;
		}
	}
	return 'NoAccount';
}

function CreateAccount(UserID){
	rply[0] = 'rply';
	
	var Check = CheckAccount(UserID);
	
	if(Check != 'NoAccount'){
		rply[1] = '錯誤!這個Line帳號已經有資料了，無法使用本操作';
		return rply;
	}else{
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
			rply[1] = '帳號登記完成!';
			return rply;
		}
	}
}

function SwitchCha(UserID,cha){
	rply[0] = 'rply';
	var Check = CheckAccount(UserID);
	if(Check == 'NoAccount'){
		rply[1] = '你尚未登記帳號喔！請輸入[coc建立帳號]來登記帳號';
		return rply;
	}else{
		var T = AccountArr[Check]; 
		
		console.log(T);
			
		rply[1] = '【CoC帳號確認】';
		if(T.have_cha == []){
			rply[1] += '\n[注意！你目前尚未持有角色]';
		}else{
			rply[1] += '\n你目前遊玩的角色是:' + T.play_cha + '\
				\n你目前持有的角色:' + T.have_cha;
		}

		rply[1] += '\n繼承模式:';

		if(T.trans_io == false){
			rply[1] += '關閉中';
		}else{
			rply[1] += '開啟中';
		}
		return rply;
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
	CreateAccount,
	SwitchCha
};
