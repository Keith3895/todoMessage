var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: { type: String,  unique: true },
    // email:  String,
    password:  String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
    // name    : String
    // type    : String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);