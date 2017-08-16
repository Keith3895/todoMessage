var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
var mongoose = require('mongoose');

router.get('/',function(req,res){
	res.render('project');
});
router.get('/add',function(req,res){
	res.render('projectForm');
});
router.get('/list',function(req,res){
	res.send("lists");
});
router.post('/add',function(req,res){
	res.send(req.body);
});

module.exports = router;