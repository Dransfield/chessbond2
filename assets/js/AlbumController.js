angular.module('HomepageModule').controller('AlbumController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	$scope.mypics=[];
	
	$scope.getuser=function(MyID)
	{
		
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
		});
	}
	$scope.getpics=function(id)
	{
	io.socket.get('/avatar?user='+id,
	function  (data){
		console.log(JSON.stringify(data));
		
		for (x in data)
		{
				var nu=Date.parse(data.createdAt);
			console.log(nu);
			var month = nu.getUTCMonth() + 1; //months from 1-12
			var day = nu.getUTCDate();
			var year = nu.getUTCFullYear();

			newdate = day+ "/"+month+"/"+year ;
				data.phrase=newdate;
		console.log("$scope.mypics[x].phrase "+data.phrase);
		}
		
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