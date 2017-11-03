var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var mongoose = require('mongoose');
var User  = require('../models/users');
var todo = require('../models/todo');
var Project  = require('../models/projects');
var Section  = require('../models/section');
router.get('/',middleware.isLoggedIn,function(req,res){
	todo.find({},function(err,tasks){
		if(err)
			console.log(err);
		res.send(tasks);	
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
	console.log(req.body);
	req.body.done=false;
	req.body.author = req.user._id;
	if(req.body.assign)
		req.body.assign= mongoose.Types.ObjectId(req.body.assign);
	todo.create(req.body,function(err,task){
		if(err)
			console.log(err);
		console.log(req.body);
		Section.findOne({'_id':req.body.SectionId},function(err,section){
			section.todolist.push(task._id);
			section.save();
			User.findOne({_id:req.user._id},function(err,user){
				if(err)console.log(err);
				console.log(user);
				user.todolist.push(task._id);
				user.save();
				res.send(task);
			});
			
		});
	});
});
router.post('/done',function(req,res){	
	// idCheck= Object.keys(req.body); 
	todo.findOne({'_id':req.body._id},function(err,task){
		if(err)
			console.log(err);
		// console.log(task);
		task.done=req.body.done;
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