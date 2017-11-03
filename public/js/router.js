var app = angular.module('TodoApp',['ngRoute','ngCookies']);
app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl : '/html/login.html',
	})
    .when('/signup',{
        templateUrl : '/html/signup.html',
        controller  : 'SignupController'
    })
    .when('/home',{
        templateUrl : '/html/index.html',
        controller  : 'HomeController',
        resolve: {
                    factory: checkRouting
                }
    })
    .when('/addProject',{
        templateUrl : '/html/addProject.html',
        controller  : 'addProjectController',
        resolve: {
                    factory: checkRouting
                }
    })
    .when('/project',{
        templateUrl : '/html/project.html',
        controller  : 'ProjectController',
        resolve: {
                    factory: checkRouting
                }
    })
    .when('/messages',{
        templateUrl : '/html/message.html',
        controller  : 'MessageController',
        resolve: {
                    factory: checkRouting
                }
    })
	.otherwise({
		template:"<h1>I'm still working on this, I'll send you the update soon.</h1>"
        // resolve: {
        //             factory: checkRouting
        //         }
	});
});

var checkRouting= function ($rootScope, $location,$cookies,$http) {
    $rootScope.userProfile = $cookies.getObject('userProfile');
    console.log($cookies.getAll());
    if ($rootScope.userProfile && $rootScope.userProfile!='err' ) {
        isLoggedIn=false;
        $http({
          method: 'post',
          url: '/auth/check',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {id:$rootScope.userProfile._id},
        }).then(function successCallback(response) {
            console.log("router:"+$rootScope.userProfile.username);
            if(response.data==='yes')
                return isLoggedIn= true;
            else
                return isLoggedIn= false;
          }, function errorCallback(response) {
            console.log('sent err: '+response);
            isLoggedIn= false;
          });
        return isLoggedIn;
    } else {
        $location.path("/");
        return false;
    }
};

