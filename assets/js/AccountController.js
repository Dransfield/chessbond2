angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	
	$scope.AccountService=AccountService;
	$scope.AccountService.downloadAccounts();
	Promise.all($scope.AccountService.getPromises).then(values => { 
  console.log(values); 
  $scope.$apply(function(){});
});
	
}]);
