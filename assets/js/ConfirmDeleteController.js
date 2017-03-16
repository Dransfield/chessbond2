angular.module('HomepageModule').controller('ConfirmDeleteController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){
	
	$scope.confirmdelete=function()
	{
	console.log($scope.vm.password);
	}
	$scope.getuser=function(MyID)
	{
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
			/*
			for(x in $scope.categories)
			{
				for(c in $scope.colors)
				{
					if(!$scope.User['rating'+$scope.colors[c].col+$scope.categories[x].time+"|"+$scope.categories[x].extratime])
					{
						$scope.User['rating'+$scope.colors[c].col+$scope.categories[x].time+"|"+$scope.categories[x].extratime]=1200;
						console.log('rating'+$scope.colors[c].col+$scope.categories[x].time+"|"+$scope.categories[x].extratime+$scope.User['rating'+$scope.colors[c].col+$scope.categories[x].time+"|"+$scope.categories[x].extratime]);}
				}
			}*/
		});
	};


	
	
	

	
}]);
