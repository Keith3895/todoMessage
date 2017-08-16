var express 		= 		require('express');
var app 			= 		express();
var http			=		require('http').Server(app);
var io 				= 		require('socket.io')(http);
var mongoose		=		require('mongoose');
var passport        = 		require("passport");
var LocalStrategy   = 		require("passport-local");
var bodyParser      = 		require("body-parser");
var cookieParser    = 		require('cookie-parser');
var session         = 		require('express-session');


// ============================= Routes ===============================================
var middleware      = 		require("./middleware");
var authRoutes 		=		require('./routes/auth');
var messaging 		= 		require('./routes/messaging');
var todo			=		require('./routes/todo');
// ========================== Mongo Models ============================================
var User 			=		require('./models/users');
var Message 		=		require('./models/message');




mongoose.connect("mongodb://localhost/Space");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "Space secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/auth",authRoutes);
app.use("/todo",todo);
messaging(app,io);

app.get('/authorList',function(req,res){
	User.find({},function(err,user){
		if(err)
			console.log(err);
		res.send(user);
	});
});

// app.listen(Process.env.port||Process.env.Port,function(){
http.listen(3000, '127.0.0.1',function(a){
	console.log("==========================================================");
	console.log("server Started");
});