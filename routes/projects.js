var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var mongoose = require('mongoose');
var Project  = require('../models/projects');

router.get('/',function(req,res){
	// res.render('project');
	Project.find({author:req.user._id},function(err,projects){
		res.send(projects);
	});
});

router.get('/get/:id',function(req,res){
	Project.findOne({_id:req.params.id},function(err,project){
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

module.exports = router;