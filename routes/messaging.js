
module.exports = function(app,io){

  var mongoose        =   require('mongoose');


  var middleware      =     require("../middleware");
  var User            =   require('../models/users');
  var Message         =   require('../models/message');
  var Todo            =   require('../models/todo');





  app.get('/chat',middleware.isLoggedIn,function(req,res){
    res.render('chat',{authToken:req.user});
  });
  io.emit('hi','everyone');
  io.on('connection',function(socket){
    // console.log("a User Connected");
    // socket.on('disconnect', function(){
   //     console.log('user disconnected');
   //   });

    socket.on('logged on',function(userID){
      Todo.findOne({'_id':userID}).populate({
        path:'conversation',
        model: 'Message',
        populate:{
          path:'author',
          model:'User'
        }
      }).exec(function(err,task){
        console.log(task.conversation);
        io.emit('add messages',task.conversation);  
      });
    });

      socket.on('chat message', function(msg){
        // msg.author=req.user;
      // console.log("here : "+ req.user);
        console.log(msg);
        var newMsg ={
          type    :msg.type,
          Content   :msg.message,
          Time    :msg.time,
          author    : mongoose.Types.ObjectId(msg.author.id)
        };
        // console.log(newMsg);
        Todo.findOne({'_id':msg.task},function(err,task){
          if(err)
            console.log(err);
          Message.create(newMsg,function(err,Cmsg){
            if(err)
              console.log(err);
            task.conversation.push(Cmsg);
            task.save();
          });
          io.emit('chat message', msg);   
        });
        
      });

  });
};

