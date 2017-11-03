var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName:  String,
    ab		:  String,
    username: { type: String,  unique: true },
    password:  String,
    Projects:[{
		type: mongoose.Schema.Types.ObjectId,
     	ref: "Project"
	}],
    todolist: 	[{
		type: mongoose.Schema.Types.ObjectId,
     	ref: "Todo"                                                     
	}]                                
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);