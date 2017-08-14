var express 		= 		require('express');
var app 			= 		express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));




app.get('/',function(req,res){
	res.render('index');
});
// app.listen(Process.env.port||Process.env.Port,function(){
app.listen(3000, '127.0.0.1',function(a){
	console.log("server Started");
});