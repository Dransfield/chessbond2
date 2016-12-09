angular.module('HomepageModule').controller('RegisterController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	// set-up loginForm loading state
	
	$scope.LevelForm = {
		loading: false
	}
$scope.register=function()
{
console.log($scope.vm.user.password);
io.socket.post("/register",{name:$scope.vm.user.username,email: $scope.vm.user.email,password:$scope.vm.user.password},function(resData,jwres)

{
		console.log(resData);
			console.log(jwres.error);
			if(jwres.error)
			{
			toastr.info(jwres.error.details);
			}
			else
			{
			$window.location.href = '/';
			}
			}
			);
	
}
	
	
	
	
	
}]);