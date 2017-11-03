var mongoose = require("mongoose");


var MessageSchema = new mongoose.Schema({
    type		:String,
    Content		:String,
    Time		:Date,
    author: {
	     type: mongoose.Schema.Types.ObjectId,
	     ref: "User"
	}
});

module.exports = mongoose.model("Message", MessageSchema);