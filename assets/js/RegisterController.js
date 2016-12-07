angular.module('HomepageModule').controller('RegisterController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// set-up loginForm loading state
	
	$scope.LevelForm = {
		loading: false
	}
$scope.register=function()
{
console.log($scope.vm.user.password);
$http.post("/register",{email: $scope.vm.user.email,password:$scope.vm.user.password})
			.then(function onSuccess (){
			
			}
			);
	
}
	
	
	
	
	
}]);