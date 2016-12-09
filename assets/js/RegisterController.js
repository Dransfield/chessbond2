angular.module('HomepageModule').controller('RegisterController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// set-up loginForm loading state
	
	$scope.LevelForm = {
		loading: false
	}
$scope.register=function()
{
console.log($scope.vm.user.password);
io.socket.post("/register",{name:$scope.vm.user.username,email: $scope.vm.user.email,password:$scope.vm.user.password},function(resData,jwres)

{
		
			
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