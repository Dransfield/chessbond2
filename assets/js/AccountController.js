angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	
	$scope.AccountService=AccountService;
	
	Promise.all($scope.AccountService.Promises).then(values => { 
  console.log(values); 
  $scope.$apply(function(){});
});
	
}]);
