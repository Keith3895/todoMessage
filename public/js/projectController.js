
app.controller('ProjectController',function($scope,$rootScope,$http,$location,$route){
  $('.tooltipped').tooltip({delay: 50});
	$('.collapsible').collapsible();
	$('.modal').modal();
	if(!$rootScope.projectid)
		$location.path('/home');
    $scope.formatDate = function(date){
          var dateOut = new Date(date).toDateString();
          return dateOut;
    };
    $http({
          method: 'get',
          url: '/projects/get/'+$rootScope.projectid,
        }).then(function successCallback(response) {
            $scope.project=response.data;
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          });

    $http({
          method: 'get',
          url: '/todo',
          // data: dataSend,
        }).then(function successCallback(response) {
            $scope.todo=response.data;
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          });

    $scope.addTaskModal=function(sec){
    	$('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    selectYears: 15, // Creates a dropdown of 15 years to control year,
		    today: 'Today',
		    clear: 'Clear',
		    close: 'Ok',
		    closeOnSelect: false // Close upon selecting a date,
		  });
    	// $('#modalTodo').modal('open');
      // $scope.$apply(function () {
    	 $scope.addtoSectionName = sec;
      // });
      $scope.$watch('$scope.addtoSectionName', function() {
        $('#modalTodo').modal('open');
        $('.select-dropdown').val($scope.addtoSectionName.Name);
        // console.log($scope.addtoSectionName);
      });
    	$('select').material_select();
    }
    $scope.cls=function(){
    	$scope.add_EndDate=$('#EndDate').val();
    }
    $scope.addTask	=	function(){
    	dataSend={
    		Content : $scope.Content,
    		Cdate	: new Date(),
    		EndDate : new Date($scope.add_EndDate),
    		SectionId: $scope.addtoSectionName._id,
    		// SectionId:$scope.addtoSectionId
    	};
    	$http({
          method: 'post',
          url: '/todo/addtask',
          headers: {
			'Content-Type': 'application/json'
		  },
          data: dataSend,
        }).then(function successCallback(response) {
            // if(response.data.Name==dataSend.Name)
            	$route.reload();
            // Materialize.toast('Invalid details!', 4000);
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          });
    }
    $scope.addSection	=	function(){
    	dataSend={
    		SectionName : $scope.Name,
    		projectId : $scope.project._id
    	};
    	$http({
          method: 'post',
          url: '/projects/addSection',
          headers: {
			'Content-Type': 'application/json'
		  },
          data: dataSend,
        }).then(function successCallback(response) {
            if(response.data=='err')
            	Materialize.toast('Section already exists!', 4000);
            else	
            	$route.reload();
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          });
    }
    $scope.checkedTask= function(task){
    	console.log(task.done);
    	if(task.done)
    		task.done=false;
    	else
    		task.done=true;
    	$http({
          method: 'post',
          url: '/todo/done',
          headers: {
			'Content-Type': 'application/json'
		  },
          data: task,
        }).then(function successCallback(response) {
            console.log(response);
            if(response.data=='err')
            	Materialize.toast('Section already exists!', 4000);
            else{
            	// $route.reload();
            	$location.path('/project');
            }	
            	
            	
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          });	
    }
    $scope.openMessages = function(todo){
    	$rootScope.todoId = todo._id;
    	$location.path('/messages');
    }
    $scope.AddUser=function(){
      $http({
          method: 'get',
          url: '/auth/list',
          // data: dataSend,
        }).then(function successCallback(response) {
            // $scope.$apply(function(){
              $scope.userList=response.data;
            // });
            $scope.$watch('$scope.userList',function(){
              $('select').material_select();
              $('#modalAddUser').modal('open');            
            });
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          });  
    }
    $scope.AddUserForm=function(){
      $.unique($scope.addUserTo);
      $scope.addUserTo = $scope.addUserTo.map(function(map){
        return map._id;
      });
      dataSend={
        addUser: $scope.addUserTo,
        projectId:$rootScope.projectid
      }
      $http({
          method: 'post',
          url: '/projects/Assign',
          headers: {
      'Content-Type': 'application/json'
      },
          data: dataSend,
        }).then(function successCallback(response) {
            if(response.data=='err')
              Materialize.toast('Section already exists!', 4000);
            else  
              $route.reload();
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          });      
    }
});
