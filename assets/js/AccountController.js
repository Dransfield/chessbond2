angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	
	$scope.AccountService=AccountService;
	$scope.AccountService.getAccounts();
	Promise.all($scope.AccountService.Promises).then(values => { 
  console.log(values); 
  $scope.$apply(function(){});
});
	
}]);
