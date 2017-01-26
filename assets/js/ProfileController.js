angular.module('HomepageModule').controller('ProfileController', ['$scope', '$http','$window' ,'toastr', function($scope, $http,$window,toastr){
$scope.User;
$scope.SoleConnectorVariable="";
	
	$scope.SoleConnectorFunction=function(id)
	{
		$http.get('/subscription?subscriber='+id, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.SoleConnectorVariable="false";
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			console.log(JSON.stringify(sailsResponse));
			if(sailsResponse.data.length==0)
			{
			//	$scope.joinmyuserIDRoom(id);
			//$scope.ReconnectFunction(id);
			$scope.getuser(id);
			//$scope.joinopengameRoom();
			$scope.SoleConnectorVariable="true";
			}
			
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			
			}
			
			
			)
			.catch(function onError(sailsResponse) {
			$scope.SoleConnectorVariable="true";
			
			//$scope.joinmyuserIDRoom(id);
			//$scope.ReconnectFunction(id);
			$scope.getuser(id);
			//$scope.joinopengameRoom();
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			
			
			});
	}
$scope.getuser=function(MyID)
	{
		
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
			}
			)	
		
	};
}]);