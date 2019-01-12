var rply = [];

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
	play_cha:{type:String,default:''},
	have_cha:{type:Array,default:[]},
	trans_key:{type:String,default:'none'},
	trans_io:{type:Boolean,default:false}
});

var Account = mongoose.model('AccountData',AccountSchema);
