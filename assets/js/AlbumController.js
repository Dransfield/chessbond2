angular.module('HomepageModule').controller('AlbumController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	$scope.mypics=[];
	
	
	$scope.getpics=function(id)
	{
	
	io.socket.get("/Avatar",{user:id},function(pics){$scope.mypics=pics;});
	}
	
	
	
	
	
}]);