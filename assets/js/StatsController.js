angular.module('HomepageModule').controller('StatsController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){
$scope.colors=[{col:'Overall'},{col:'White'},{col:'Black'}];
	$scope.categories=[{time:1,extratime:0},
					{time:2,extratime:0},
					{time:3,extratime:0},
					{time:4,extratime:0},
					{time:5,extratime:0},
					{time:6,extratime:0},
					{time:7,extratime:0},
					{time:8,extratime:0},
					{time:9,extratime:0},
					{time:10,extratime:0},
					{time:15,extratime:0},
					{time:20,extratime:0},
					{time:30,extratime:0},
					{time:60,extratime:0},
					{time:2,extratime:1},
					{time:3,extratime:1},
					{time:5,extratime:2},
					{time:10,extratime:5},
					{time:15,extratime:5},
					{time:20,extratime:10},
					{time:30,extratime:10},
					{time:60,extratime:10}]
	
	$scope.statcategories=[{cat:'rating'},
							{cat:'winpercent'},
							{cat:'losepercent'},
							{cat:'drawpercent'},
							{cat:'highest'},
							{cat:'lowest'},
							{cat:'averageoppositionrating'},
							{cat:'totalgames'},
							{cat:'totalmoves'},
							{cat:'averagemoves'}];
	$scope.getuser=function(MyID)
	{
		
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
			for(x in $scope.categories)
			{
				for(c in $scope.colors)
				{
					if($scope.User['rating'+c.col+x.time+x.extratime]
					console.log($scope.User['rating'+c.col+x.time+x.extratime])
				}
			}
		});
	};


	
	
	

	
}]);