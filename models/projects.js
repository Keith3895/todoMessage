var mongoose = require("mongoose");
var ProjectSchema = new mongoose.Schema({
	Name	: 		String,
	Cdate 	: 		Date,
	EndDate : 		Date,
	done	: 		Boolean,
	author: {
	     type: mongoose.Schema.Types.ObjectId,
	     ref: "User"
	},
	lead    : {
	     type: mongoose.Schema.Types.ObjectId,
	     ref: "User"
	},
	members : [{
	     type: mongoose.Schema.Types.ObjectId,
	     ref: "User"
	}],
	Section:[{
		type: mongoose.Schema.Types.ObjectId,
     	ref: "Section"                                                     
	}]
});
module.exports = mongoose.model("Project", ProjectSchema);