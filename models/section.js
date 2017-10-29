var mongoose = require("mongoose");
var SectionSchema = new mongoose.Schema({
	Name	: 		String,
	todolist: 	[{
		type: mongoose.Schema.Types.ObjectId,
     	ref: "Todo"                                                     
	}]
});
module.exports = mongoose.model("Section", SectionSchema);