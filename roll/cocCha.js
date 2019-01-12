var rply = [];

var CocChaIm = require("./cocCha/cocChaIm.js");

//////////mongo系統
var mongoose = require('mongoose');
var mongoDB = 'mongodb://b88009005:b09050905@ds229312.mlab.com:29312/linetest';

//連線測試
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

///////////

var AccountSchema = new Schema({
	id:{type:Number},
	user_id:{type:String,require:true},
	play_cha:{type:String,default:null},
	have_cha:{type:Array,default:[]},
	trans_key:{type:String,default:'none'},
	trans_io:{type:Boolean,default:false}
});

var NameSchema = new Schema({
	id:{type:Number},
	name:{type:String,require:true}
});

var Account = mongoose.model('AccountData',AccountSchema);
var NameA = mongoose.model('NameData',NameSchema);
var AccountArr = [];
var NameArr = [];

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
		//console.log("AccountArr = " + AccountArr);
		console.log("coc帳號資料，讀取完成");
	}
});

NameA.find(function(err,Names){
	if(err)throw err;
	else{
		for(var a = 0;a<Names.length;a++){
			NameArr[a] = Names[a];
		}
		console.log("NameArr = " + NameArr);
		console.log("coc名字資料，讀取完成");
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
		if(T.have_cha.length == 0){
			rply[1] += '\n[注意！你目前尚未持有角色]';
		}else{
			rply[1] += '\n你目前遊玩的角色是:' + T.play_cha + '\
				\n你目前持有的角色:';
			
			for(var a = 0;a<T.have_cha.length;a++){
				rply[1] += '\n' + (a+1) + '.' + T.have_cha[a];
			}
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

function createCha(UserID,chaName){
	rply[0] = 'rply';
	var Check = CheckAccount(UserID);
	if(Check == 'NoAccount'){
		rply[1] = '你尚未登記帳號喔！請輸入[coc建立帳號]來登記帳號';
		return rply;
	}else{
		if(chaName == null){
			rply[1] = '【CoC角色登記】\
				\n請注意，這動作只是讓角色登記在你的名下，如果要更進一步地設定角色，請輸入[help]求助。\
				\n\n一旦登記角色，就只有管理員可以刪除，請小心\
				\n\n不能使用跟已登記角色一樣的名字\
				\n\n如果這是你第一位登記的角色，他便會成為你目前的使用角色\
				\n\n確認以上事項後，請輸入[角色登記 角色名]完成登記';
			return rply;
		}else{
			for(var a = 0;a<NameArr.length;a++){
				if(NameArr[a].name == chaName){
					rply[1] = '這個名字有人使用喽，請換一個試試看';
					return rply;
				}
			}
			
			var T = AccountArr[Check];
			var AAHCL = T.have_cha.length;
			T.have_cha[AAHCL] = chaName;
			if(T.play_cha === null){
				T.play_cha = chaName;
			}
			saveAccounts(T);
			
			var NAL = NameArr.length;
			NameArr[NAL] = {
				id: NAL,
				name: chaName
			}
			
			saveNames(NameArr[NAL]);
			
			rply[1] = '登記完成！請輸入[帳號確認]進行確認';
			return rply;
		}
	}
}

function SearchCha(UserID){
	rply[0] = 'rply';
	var Check = CheckAccount(UserID);
	if(Check == 'NoAccount'){
		rply[1] = '你尚未登記帳號喔！請輸入[coc建立帳號]來登記帳號';
		return rply;
	}else if(AccountArr[Check].play_cha == null){
		rply[1] = '你尚未登記角色喔！';
		return rply;
	}else{
		var T = CocChaIm.findChaIm(AccountArr[Check].play_cha);
		
		if(T == 'NotFound'){
			rply[1] = '此角色尚未登記基本資料';
			return rply;
		}else{
			rply[1] = '【CoC角色基本情報】\
				\n角色名:' + T.cha_name + '\
				\n職業:' + T.cha_class + '\
				\n年齡:' + T.age + '\
				\n性別:' + T.sex + '\
				\n出生地:' + T.born + '\
				\n現居地:' + T.live;

			return rply;
		}
	}
}

function saveAccounts(AccountT){
	Account.findOneAndUpdate({id: AccountT.id},AccountT,{
		upsert:true
	},function(err){
		if(err) throw err;
		else{
			console.log("帳號資料 更新完成");
		}
	});
}

function saveNames(NameArr){
	NameA.findOneAndUpdate({id: NameArr.id},NameArr,{
		upsert:true
	},function(err){
		if(err) throw err;
		else{
			console.log("名字資料 更新完成");
		}
	});
}

module.exports = {
	CreateAccount,
	SwitchCha,
	createCha,
	SearchCha
};
