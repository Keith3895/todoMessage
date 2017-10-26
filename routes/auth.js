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
    // console.log(req.body);
    var newUser = new User({
    	firstName: req.body.firstName,
    	lastName: req.body.lastName,
    	username: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.send('err');//res.render("signup");
        }
        console.log("new user added");
        passport.authenticate("local")(req, res, function(){
           console.log("new user added message 1");
           res.send(user);
        });
        // res.redirect('/auth/login');
        // res.send('err');
    });
});

//show login form
router.get("/login",middleware.notLoggedIn, function(req, res){
   res.render("login");
});

//handling login logic
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // console.log(req.user);
    res.send(req.user);
  });
router.post('/check',function(req,res){
  if(req.user && req.body.id == req.user._id)
    res.send('yes');
  else
    res.send('no');
});

// logout route
router.get("/logout",middleware.isLoggedIn, function(req, res){
   req.logout();
   res.redirect("/");
});


module.exports = router;
