


app.controller('HomeController',function($scope,$rootScope,$http,$location){
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
    $scope.checkedProject= function(project){
      if(project.done)
        project.done=false;
      else
        project.done=true;
      $http({
          method: 'post',
          url: '/projects/done',
          headers: {
      'Content-Type': 'application/json'
      },
          data: project,
        }).then(function successCallback(response) {
            console.log(response);
            if(response.data=='err')
              Materialize.toast('Section already exists!', 4000);
            else{
              // $route.reload();
              $location.path('/home');
            } 
              
              
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid details!', 4000);
          }); 
    }
});


app.controller('addProjectController',function($scope,$rootScope,$http,$location){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
    $scope.cls=function(){
      $scope.EndDate=$('#EndDate').val();
    }
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






 
app.controller('LoginController',function($scope,$rootScope,$http,$location,$cookies){
    
    $scope.login = function(){
    	dataSend = {
    		username:$scope.username,
    		password:$scope.password
    	};
    	console.log(dataSend);
    	// $http.post('/auth/login');
        $http({
          method: 'post',
          url: '/auth/login',
          headers: {
			'Content-Type': 'application/json'
		  },
          data: dataSend,
        }).then(function successCallback(response) {
            
            $rootScope.userProfile = response.data;
            
             var now = new Date();
        		now.setDate(now.getDate() + 1);
            $cookies.putObject('userProfile', $rootScope.userProfile,{ expires:now});
            console.log("while login : ");
            console.log($rootScope.userProfile.username);
            $location.path('/home');

          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Invalid Credentials!', 4000);
          });
    }

    
});

app.controller('SignupController',function($scope,$rootScope,$http,$location,$cookies){
    
    $scope.SignUp = function(){
    	dataSend = {
    		firstName:$scope.firstName,
    		lastName:$scope.lastName,
    		username:$scope.username,
    		password:$scope.password
    	};
    	// $http.post('/auth/login');
        $http({
          method: 'post',
          url: '/auth/register',
          headers: {
			'Content-Type': 'application/json'
		  },
          data: dataSend,
        }).then(function successCallback(response) {
            console.log(response);
            if(response.data=='err')
            	Materialize.toast('Error in signing Up!', 4000);
            else{
            	$rootScope.userProfile = response.data;
            	 var now = new Date();
        		now.setDate(now.getDate() + 1);
            	$cookies.put('userProfile', $rootScope.userProfile,{expires:now});
            	$location.path('/');
            }
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            Materialize.toast('Error in signing Up!', 4000) 
          });
    }

    
});
