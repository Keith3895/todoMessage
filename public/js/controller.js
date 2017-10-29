
app.controller('ProjectController',function($scope,$rootScope,$http,$location,$route){
    $('.tooltipped').tooltip({delay: 50});
    $(document).ready(function(){
		$('.collapsible').collapsible();
	});
	$('.modal').modal();
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15, // Creates a dropdown of 15 years to control year,
	    today: 'Today',
	    clear: 'Clear',
	    close: 'Ok',
	    closeOnSelect: true // Close upon selecting a date,
	  });
    $scope.formatDate = function(date){
          var dateOut = new Date(date).toDateString();
          return dateOut;
    };
    $http({
          method: 'get',
          url: '/projects/get/'+$rootScope.projectid,
        }).then(function successCallback(response) {
            console.log(response);
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
    	$scope.addtoSectionName = sec;
    	$('#modalTodo').modal('open');
		$('select').material_select();
    	
    }
    $scope.addTask	=	function(){

    	dataSend={
    		Content : $scope.Content,
    		Cdate	: new Date(),
    		EndDate : new Date($scope.EndDate),
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
            console.log(response);
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
            console.log(response);
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



app.controller('HomeController',function($scope,$rootScope,$http,$location){
    $('.tooltipped').tooltip({delay: 50});
    $scope.formatDate = function(date){
          var dateOut = new Date(date).toDateString();

          return dateOut;
    };
    $scope.openProject=function(id){
    	console.log(id);
    	$rootScope.projectid = id;
    	$location.path('/project');
    };
    $http({
          method: 'get',
          url: '/projects/',
          // data: dataSend,
        }).then(function successCallback(response) {
            console.log(response);
            $scope.projects=response.data;
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          });
});


app.controller('addProjectController',function($scope,$rootScope,$http,$location){
    $('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15, // Creates a dropdown of 15 years to control year,
	    today: 'Today',
	    clear: 'Clear',
	    close: 'Ok',
	    closeOnSelect: true // Close upon selecting a date,
	  });
    $scope.addProject = function(){

    	dataSend = {
    		Name: $scope.projectName,
    		Cdate: new Date(),
    		EndDate:new Date($scope.EndDate)
    	};
    	console.log(dataSend);
    	// $http.post('/auth/login');
        $http({
          method: 'post',
          url: '/projects/add',
          headers: {
			'Content-Type': 'application/json'
		  },
          data: dataSend,
        }).then(function successCallback(response) {
            console.log(response);
            if(response.data.Name==dataSend.Name)
            	$location.path('/home');
            Materialize.toast('Invalid details!', 4000);
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          });
    }  
});



