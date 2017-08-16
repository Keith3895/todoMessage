var mongoose = require("mongoose");


var TodoSchema = new mongoose.Schema({
    Content		:String,
    Cdate		:String,
    EndDate		:String,
    done 		:Boolean,
    author: {
	     type: mongoose.Schema.Types.ObjectId,
	     ref: "User"
	},
	assign:[{author: {
	     type: mongoose.Schema.Types.ObjectId,
	     ref: "User"
	}}],
	follow:[
	{
	     type: mongoose.Schema.Types.ObjectId,
	     ref: "User"
	}],
	conversation:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Message"
	}]
});

module.exports = mongoose.model("Todo", TodoSchema);