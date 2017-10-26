var express 		= 		require('express');
var app 			= 		express();
var http			=		require('http').Server(app);
var io 				= 		require('socket.io')(http);
var mongoose		=		require('mongoose');
var passport        = 		require("passport");
var LocalStrategy   = 		require("passport-local").Strategy;
var bodyParser      = 		require("body-parser");
var cookieParser    = 		require('cookie-parser');
var session         = 		require('express-session');


// ============================= Routes ===============================================
var middleware      = 		require("./middleware");
var authRoutes 		=		require('./routes/auth');
var messaging 		= 		require('./routes/messaging');
var todo			=		require('./routes/todo');
var projectsRoute	=		require('./routes/projects');
// ========================== Mongo Models ============================================
var User 			=		require('./models/users');
var Message 		=		require('./models/message');


require('dotenv').config();


mongoose.connect("mongodb://localhost/Space");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
app.use("/projects",projectsRoute);
messaging(app,io);
app.get('/',function(req,res){
	res.sendFile('views/main.html', {root: __dirname });
});
app.get('/authorList',function(req,res){
	User.find({},function(err,user){
		if(err)
			console.log(err);
		res.send(user);
	});
});

// app.listen(Process.env.port||Process.env.Port,function(){
http.listen(8080,function(a){
	console.log("==========================================================");
	console.log("server Started");
});