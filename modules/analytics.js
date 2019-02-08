var Sample = require("../mainFunc/Sample.js");

function parseInput(inputStr,UserID,UserN,GroupID) {
	if (inputStr.match(/^嗨$/) != null) return Sample.Hello();//哈喽
	else return '';
}


module.exports = {
	parseInput,
};
