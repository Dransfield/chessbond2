angular.module('HomepageModule').controller('AlbumController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	$scope.mypics=[];
	
	
	$scope.getpics=function(id)
	{
	io.socket.get('/avatar?user='+id,
	function  (data){
		console.log(JSON.stringify(data));
	$scope.$apply(function(){$scope.mypics=data;});
	});
	}
	
	
	$scope.SetAvatar=function(MyID,picid)
	{
		io.socket.put('/User/'+MyID,{
      avatarid:picid
      }  
    ,function(resData,jwres)
	{
      toastr.success('Changed Profile Image');
      }  
    ,function(resData,jwres)
	{
		toastr.success(JSON.stringify(resData));
	});
	}
	
}]);