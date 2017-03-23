angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	

	$scope.addAccount=function(accID) {
			AccountService.addAccount(accID);
			console.log(accID+" was requested");
			
			};
	
	AccountService.downloadAccounts();
	console.log(JSON.stringify(AccountService.getRequestedAccounts()));
	Promise.all(AccountService.getPromises()).then(values => { 
  console.log(values); 
  $scope.$apply(function(){});
});
}]);
