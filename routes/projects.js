var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var mongoose = require('mongoose');
var User  = require('../models/users');
var Todo = require('../models/todo');
var Project  = require('../models/projects');
var Section  = require('../models/section');
var has = function(container, value) {
	var returnValue = false;
	var pos = container.indexOf(value);
	if (pos >= 0) {
		returnValue = true;
	}
	return returnValue;
}
router.get('/',function(req,res){
	// res.render('project');
	User.findOne({_id:req.user._id},['Projects']).populate([{
		path:'Projects',
		model:'Project'
	},{
		path:'members',
		model:'User'
	}]).exec(function(err,projects){
		res.send(projects.Projects);
	});
});

router.get('/get/:id',function(req,res){
	Project.findOne({_id:req.params.id}).populate([{
		path:'Section',
		model:'Section',
		populate:{
			path:'todolist',
			model:'Todo'
		}
	},{
		path:'members',
		model:'User'
	}]).exec(function(err,project){
		if(err)
			console.log(err);
		res.send(project);
	});
});
router.post('/add',function(req,res){
	var newProject={
		Name : req.body.Name,
		Cdate: req.body.Cdate,
		EndDate:req.body.EndDate,
		author: req.user._id	
	};
	Project.create(newProject,function(err,project){
		if(err)console.log(err);
		else{
			User.findOne({_id:req.user._id},function(err,user){
				if(err)
					console.log(err);
				user.Projects.push(project._id);
				user.save();
				res.send(project);
			});
			
		}
		
	});
});

router.post('/addSection',function(req,res){
	console.log(req.body);
	Section.create({Name:req.body.SectionName},function(err,section){
		Project.findOne({'_id':req.body.projectId}).populate({
			path:'Section',
			model:'Section'
		}).exec(function(err,project){
			
			if(!project.Section && project.Section.Name===req.body.SectionName)
				res.send('err');
			else{
				project.Section.push(section._id);
				project.save();
				res.send("done");
			}
		});
	});
});
router.post('/done',function(req,res){	
	// idCheck= Object.keys(req.body); 
	Project.findOne({'_id':req.body._id},function(err,project){
		if(err)
			console.log(err);
		// console.log(task);
		project.done=req.body.done;
		project.save();
			res.send(project);
	});
});

router.post('/assign',function(req,res){
	console.log(req.body);
	Project.findOne({_id:req.body.projectId},function(err,project){
		req.body.addUser.forEach(function(add){
			User.findOne({_id:add},function(err,user){
				if(!has(user.Projects,req.body.projectId)){
					user.Projects.push(req.body.projectId);
					user.save();
				}	
			});
			if(!has(project.members,add)){
				project.members.push(add);
				project.save();
			}	
		});
	});
	res.send('sent');
});
module.exports = router;