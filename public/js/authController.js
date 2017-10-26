
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
            console.log(response);
            $rootScope.userProfile = response.data;
             var now = new Date();
        		now.setDate(now.getDate() + 1);
            $cookies.put('userProfile', $rootScope.userProfile,{ expires:now});
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
