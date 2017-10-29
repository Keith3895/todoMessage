var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var mongoose = require('mongoose');
var Todo = require('../models/todo');
var Project  = require('../models/projects');
var Section  = require('../models/section');

router.get('/',function(req,res){
	// res.render('project');
	Project.find({author:req.user._id},function(err,projects){
		res.send(projects);
	});
});

router.get('/get/:id',function(req,res){
	Project.findOne({_id:req.params.id}).populate({
		path:'Section',
		model:'Section',
		populate:{
			path:'todolist',
			model:'Todo'
		}
	}).exec(function(err,project){
		if(err)
			console.log(err);
		console.log('here');
		console.log(project);
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
		else
		res.send(project);
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
				console.log(project);
				res.send("done");
			}
		});
	});
});
module.exports = router;