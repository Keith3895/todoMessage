
app.controller('MessageController',function($scope,$rootScope,$http,$location,$route){
	$scope.$watch('$viewContentLoaded', function() {
     console.log($rootScope.userProfile +"%" + $rootScope.todoId);
		if(!$rootScope.todoId || !$rootScope.userProfile)
			$location.path('/project');

		// ========
	  	var socket = io();
	  	socket.emit('logged on',$rootScope.todoId);
	  	socket.on('add messages',function(msg){
	  		console.log("add");
	    	
	    	$scope.$apply(function () {
	    		$scope.Messages = msg;
	    	});
	    	scroll_id = msg[msg.length-1]['_id'];
	    	$('html,body').animate({scrollTop: $('#'+scroll_id).offset().top }, "slow");
	    });
		var date = new Date();
	    socket.on('after chat message', function(msg1){
	    	$scope.$apply(function () {
	      		$scope.Messages.push(msg1);
	      	});
	      	scroll_id = msg1._id;
	      	console.log(scroll_id);
	    	$('html,body').animate({scrollTop: $('#'+scroll_id).offset().top }, "slow");
	    });

	    // ========
		$scope.isSender = function(msg){
			if(msg.author._id == $rootScope.userProfile._id){
				return true;
			}
			return false;
		}
		$scope.sendMsg = function(){
		    	msg= {
		    		message: $scope.messageContent,
		    		type: 'text',
		    		time: date,
		    		author:{
		    			id: $rootScope.userProfile._id,
		    			username: $rootScope.userProfile.username
		    		},
		    		task : $rootScope.todoId
		    	};
		    	// console.log(msg);
		      socket.emit('chat message',msg);
		      delete $scope.messageContent;
		  	}
  });
		

});
