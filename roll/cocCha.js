var rply = [];
var mongoose = require('mongoose');
var mongoDB = 'mongodb://b88009005:b09050905@ds229312.mlab.com:29312/linetest';

//連線到資料庫
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error',console.error.bind(console, 'MongoDB connection error:'));




module.exports = {

};
