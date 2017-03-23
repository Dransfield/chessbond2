angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	

	$scope.addAccount=function(accID) {
			AccountService.AccountsRequested[accID]=accID;
			console.log(accID+" was requested");
			
			};
	
	AccountService.downloadAccounts();
	console.log(JSON.stringify($scope.AccountService.getRequestedAccounts()));
	Promise.all($scope.AccountService.getPromises()).then(values => { 
  console.log(values); 
  $scope.$apply(function(){});
});
}]);
