var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var mongoose = require('mongoose');

var todo = require('../models/todo');


router.get('/',middleware.isLoggedIn,function(req,res){
	todo.find({},function(err,tasks){
		if(err)
			console.log(err);
		res.render('todoMain',{tasks:tasks});	
	});
	
});
router.get('/check',function(req,res){
	todo.find({},function(err,tasks){
		if(err)
			console.log(err);
		res.send(tasks);	
	});
	
});


router.get('/moreinfo/:id',function(req,res){
	todo.find({'_id':req.params.id},function(err,task){
		if(err)
			console.log(err);
		console.log(task);
		res.render('chat',{authToken:req.user});
	});
});

router.post('/addtask',function(req,res){
	req.body.done=false;
	req.body.author = req.user._id;
	if(req.body.assign)
		req.body.assign= mongoose.Types.ObjectId(req.body.assign);
	todo.create(req.body,function(err,task){
		if(err)
			console.log(err);
		res.send(task);	
	});
});
router.post('/done',function(req,res){	
	idCheck= Object.keys(req.body); 
	todo.findOne({'_id':idCheck},function(err,task){
		if(err)
			console.log(err);
		// console.log(task);
		task.done=true;
		task.save();
			res.send(task);
	});
});

router.post('/undone',function(req,res){	
	idCheck= Object.keys(req.body); 
	todo.findOne({'_id':idCheck},function(err,task){
		if(err)
			console.log(err);
		// console.log(task);
		task.done=false;
		task.save();
			res.send(task);
	});
});

module.exports= router;