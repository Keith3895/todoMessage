var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/users");
var middleware = require("../middleware");


// show register form
router.get("/register",middleware.notLoggedIn,function(req, res) {
    res.render("signup");    
}); 


//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
    	firstName: req.body.firstName,
    	lastName: req.body.lastName,
    	username: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("signup");
        }
        console.log("new user added");
        passport.authenticate("local")(req, res, function(){
           console.log("new user added message 1");
        });
        res.redirect('/auth/login');
    });
});

//show login form
router.get("/login",middleware.notLoggedIn, function(req, res){
   res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/auth/login"
    }), function(req, res){
});

// logout route
router.get("/logout",middleware.isLoggedIn, function(req, res){
   req.logout();
   res.redirect("/");
});


module.exports = router;
