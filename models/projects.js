var mongoose = require("mongoose");
var ProjectSchema = new mongoose.Schema({
	Name	: 		String,
	Cdate 	: 		String,
	EndDate : 		String,
	author: {
	     type: mongoose.Schema.Types.ObjectId,
	     ref: "User"
	},
	lead    : {
	     type: mongoose.Schema.Types.ObjectId,
	     ref: "User"
	},
	Section:[{
		Name	: 	String,
		todolist: 	[{
			type: mongoose.Schema.Types.ObjectId,
	     	ref: "Todo"
		}]
	}]
});
module.exports = mongoose.model("Project", ProjectSchema);