angular.module('HomepageModule').controller('AlbumController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	$scope.mypics=[];
	
	
	$scope.getpics=function(id)
	{
	io.socket.get('/avatar?id='+id,
	function  (data){
		console.log(JSON.stringify(data));
	$scope.mypics=data;
	});
	}
	
	
	
	
	
}]);