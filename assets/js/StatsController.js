angular.module('HomepageModule').controller('StatsController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){
$scope.colors=[{col:'Overall'},{col:'Black'},{col:'White'}];
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
	
	$scope.getAllgamesandCalculate=function(MyID)
	{
		io.socket.get("/chessgame",{or:[{'Player1':MyID},{'Player2':MyID}],limit:30000},
		function (resData,jwres){
			//console.log(JSON.stringify(resData));
		
			for (x in resData)
			{
				//console.log("found a game "+resData[x].GameCategory);
				if(resData[x].Result)
				{
				
				var splitted=resData[x].Result.split(">");
				for (y in splitted)
				{
				if(splitted[y].indexOf("Won by")>-1)	
					{
						var name=splitted[y-1].split("<")[0];
					console.log(name);
					
					if(resData[x].Player1==MyID)
					{
						if(resData[x].Player1Name==name)
						{console.log("I won that as player1"+resData[x].GameCategory);
						console.log("enemy ELO "+resData[x].Player2CategoryELO);
						console.log("enemy name "+resData[x].Player2Name);
						
						var p1color;
						var p2color;
						if(resData[x].Player1Color=='White')
						{
						p1color='White';
						p2color='Black';
						}
						else
						{
						p2color='White';
						p1color='Black';
						}
						
						
						
							if(resData[x].Player2CategoryELO)
							{
								console.log("resData[x].Player2CategoryELO "+resData[x].Player2CategoryELO);
								if(!$scope.LookedatUser['highest'+p1color+resData[x].GameCategory])
								{$scope.LookedatUser['highest'+p1color+resData[x].GameCategory]=0;}
								if(resData[x].Player2CategoryELO>$scope.LookedatUser['highest'+p1color+resData[x].GameCategory])
								{
									console.log("its higher");
									$scope.LookedatUser['highest'+p1color+resData[x].GameCategory]=resData[x].Player2CategoryELO;
								}
							}
						}
					}
					if(resData[x].Player2==MyID)
					{
						if(resData[x].Player2Name==name)
						{console.log("I won that as player2"+resData[x].GameCategory);
						console.log("enemy ELO "+resData[x].Player1CategoryELO);
						console.log("enemy name "+resData[x].Player1Name);
						
						var p1color;
						var p2color;
						if(resData[x].Player1Color=='White')
						{p1color='White';
						p2color='Black';}
						else
						{p2color='White';
						p1color='Black';}
						
						
						
							if(resData[x].Player1CategoryELO)
							{
								
									if(!$scope.LookedatUser['highest'+p2color+resData[x].GameCategory])
								{$scope.LookedatUser['highest'+p2color+resData[x].GameCategory]=0;}
								
								
								if(resData[x].Player1CategoryELO>$scope.LookedatUser['highest'+p2color+resData[x].GameCategory])
								{
									$scope.LookedatUser['highest'+p2color+resData[x].GameCategory]=resData[x].Player1CategoryELO;
								}
							}
						
						}
					}
				}
				}
			
		}}});
		
	}
	
	$scope.getLookedatUser=function(MyID)
	{	
		
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.LookedatUser=sailsResponse.data;
			$scope.getAllgamesandCalculate(MyID);
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