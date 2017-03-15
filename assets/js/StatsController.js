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
							{cat:'bestwin'},
							{cat:'lowestloss'},
							
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
			var mycolor;
			if(resData[x].Player1==MyID)
						{mycolor=p1color;}
			if(resData[x].Player2==MyID)
						{mycolor=p2color;}
					
		if(!$scope.LookedatUser['totaloppositionrating'+mycolor+resData[x].GameCategory])
		{$scope.LookedatUser['totaloppositionrating'+mycolor+resData[x].GameCategory]=0;}
		if(!$scope.LookedatUser['totalgames'+mycolor+resData[x].GameCategory])
		{$scope.LookedatUser['totalgames'+mycolor+resData[x].GameCategory]=0;}
		$scope.LookedatUser['totalgames'+mycolor+resData[x].GameCategory]++;
		
			if(!$scope.LookedatUser['totalmoves'+mycolor+resData[x].GameCategory])
		{$scope.LookedatUser['totalmoves'+mycolor+resData[x].GameCategory]=0;}
		$scope.LookedatUser['totalmoves'+mycolor+resData[x].GameCategory]=$scope.LookedatUser['totalmoves'+mycolor+resData[x].GameCategory]+resData[x].Move;
		
		if(!$scope.LookedatUser['DrawnGames'+mycolor+resData[x].GameCategory])
		{$scope.LookedatUser['DrawnGames'+mycolor+resData[x].GameCategory]=0;}
		if(!$scope.LookedatUser['WonGames'+mycolor+resData[x].GameCategory])
		{$scope.LookedatUser['WonGames'+mycolor+resData[x].GameCategory]=0;}
		if(!$scope.LookedatUser['LostGames'+mycolor+resData[x].GameCategory])
		{$scope.LookedatUser['LostGames'+mycolor+resData[x].GameCategory]=0;}
		if(!$scope.LookedatUser['highest'+mycolor+resData[x].GameCategory])
		{$scope.LookedatUser['highest'+mycolor+resData[x].GameCategory]=0;}
		if(!$scope.LookedatUser['lowest'+mycolor+resData[x].GameCategory])
		{$scope.LookedatUser['lowest'+mycolor+resData[x].GameCategory]=99999;}
	
		if(!resData[x].Player1CategoryELO)
		{resData[x].Player1CategoryELO=1200}
		if(!resData[x].Player2CategoryELO)
		{resData[x].Player2CategoryELO=1200}
		
				var splitted=resData[x].Result.split(">");
					for (y in splitted)
					{
						if(splitted[y].indexOf("Drew by")>-1||splitted[y].indexOf("Won by")>-1)
						{
							$scope.GetHighestRating(resData[x],MyID,splitted,mycolor);
								$scope.GetLowestRating(resData[x],MyID,splitted,mycolor);
								$scope.GetAverageOppositionRating(resData[x],MyID,splitted,mycolor);
						}
						if(splitted[y].indexOf("Drew by")>-1)
						{
						$scope.LookedatUser['DrawnGames'+mycolor+resData[x].GameCategory]++;
						
						}
						if(splitted[y].indexOf("Won by")>-1)
						{	
							var name=splitted[y-1].split("<")[0];
								if(name)
								{
								$scope.GetWinLossPercentages(resData[x],MyID,splitted,name,mycolor);
								$scope.GetBestWin(resData[x],MyID,splitted,name,mycolor);
								$scope.GetLowestLoss(resData[x],MyID,splitted,name,mycolor);
							
								}
							}
						}
				}
			}
			$scope.$apply(function(){
			for (ca in $scope.categories)
			{
			if($scope.LookedatUser['totalgames'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime])
			{
			$scope.LookedatUser['drawpercent'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt(($scope.LookedatUser['DrawnGames'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime])*100);
			$scope.LookedatUser['winpercent'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt(($scope.LookedatUser['WonGames'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime])*100);								
			$scope.LookedatUser['losepercent'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt(($scope.LookedatUser['LostGames'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime])*100);	
			$scope.LookedatUser['averageoppositionrating'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt($scope.LookedatUser['totaloppositionrating'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]);
			$scope.LookedatUser['averagemoves'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt($scope.LookedatUser['totalmoves'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'White'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]);		
			}
			if($scope.LookedatUser['totalgames'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime])
			{
			$scope.LookedatUser['drawpercent'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt(($scope.LookedatUser['DrawnGames'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime])*100);
			$scope.LookedatUser['winpercent'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt(($scope.LookedatUser['WonGames'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime])*100);								
			$scope.LookedatUser['losepercent'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt(($scope.LookedatUser['LostGames'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime])*100);	
			$scope.LookedatUser['averageoppositionrating'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt($scope.LookedatUser['totaloppositionrating'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]);		
			$scope.LookedatUser['averagemoves'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]=parseInt($scope.LookedatUser['totalmoves'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]/$scope.LookedatUser['totalgames'+'Black'+$scope.categories[ca].time+"|"+$scope.categories[ca].extratime]);		
			}
			}
			});
		});
		
	}
	
	$scope.GetWinLossPercentages=function(gData,MyID,splitted,name,mycolor)
	{
		
		

					if(gData.Player1==MyID)
						{
							if(gData.Player1Name==name)
							{
						$scope.LookedatUser['WonGames'+mycolor+gData.GameCategory]=$scope.LookedatUser['WonGames'+mycolor+gData.GameCategory]+1;								
							}
							if(gData.Player1Name!=name)
							{
						$scope.LookedatUser['LostGames'+mycolor+gData.GameCategory]=$scope.LookedatUser['LostGames'+mycolor+gData.GameCategory]+1;								
							}
						}
				
					if(gData.Player2==MyID)
						{
						if(gData.Player2Name==name)
							{
							$scope.LookedatUser['WonGames'+mycolor+gData.GameCategory]=$scope.LookedatUser['WonGames'+mycolor+gData.GameCategory]+1;								
							}						
							if(gData.Player2Name!=name)
							{
							$scope.LookedatUser['LostGames'+mycolor+gData.GameCategory]=$scope.LookedatUser['LostGames'+mycolor+gData.GameCategory]+1;								
							}
											
						}
					
				
			
			
			//console.log('WonGames'+$scope.LookedatUser['WonGames'+p1color+gData.GameCategory]);
			//console.log('TotalGames'+$scope.LookedatUser['TotalGames'+p1color+gData.GameCategory]);
			//console.log('divvy '+$scope.LookedatUser['WonGames'+p1color+gData.GameCategory]/$scope.LookedatUser['TotalGames'+p1color+gData.GameCategory]);
}

$scope.GetBestWin=function(gData,MyID,splitted,name,mycolor)
	{
	
				if(gData.Player1==MyID)
					{
					
						if(gData.Player1Name==name)
						{
					
						
						
							if(gData.Player2CategoryELO)
							{
								if(!$scope.LookedatUser['bestwin'+mycolor+gData.GameCategory])
								{$scope.LookedatUser['bestwin'+mycolor+gData.GameCategory]=0;}
	
								if(gData.Player2CategoryELO>$scope.LookedatUser['bestwin'+mycolor+gData.GameCategory])
								{
									//console.log("gothere3");
								
								$scope.$apply(function(){$scope.LookedatUser['bestwin'+mycolor+gData.GameCategory]=gData.Player2CategoryELO});
								}
							}
						}
					}
					if(gData.Player2==MyID)
					{
						if(gData.Player2Name==name)
						{
						
						if(gData.Player1CategoryELO)
							{
								if(!$scope.LookedatUser['bestwin'+mycolor+gData.GameCategory])
									{$scope.LookedatUser['bestwin'+mycolor+gData.GameCategory]=0;}
		
								if(gData.Player1CategoryELO>$scope.LookedatUser['bestwin'+mycolor+gData.GameCategory])
								{
									$scope.$apply(function(){$scope.LookedatUser['bestwin'+mycolor+gData.GameCategory]=gData.Player1CategoryELO});
								}
							}
						
						}
					}
				
			
	}
	
	

	$scope.GetLowestLoss=function(gData,MyID,splitted,name,mycolor)
	{
	
				if(gData.Player1==MyID)
					{
						//console.log("gData.Player1Name "+gData.Player1Name);
						//console.log("name "+name);
						
						if(gData.Player1Name!=name)
						{
						//console.log("gothere1");
					
						
							if(gData.Player2CategoryELO)
							{
								if(!$scope.LookedatUser['lowestloss'+mycolor+gData.GameCategory])
								{$scope.LookedatUser['lowestloss'+mycolor+gData.GameCategory]=30000;}
								if(gData.Player2CategoryELO<$scope.LookedatUser['lowestloss'+mycolor+gData.GameCategory])
								{
								$scope.$apply(function(){$scope.LookedatUser['lowestloss'+mycolor+gData.GameCategory]=gData.Player2CategoryELO});
								}
							}
						}
					}
					if(gData.Player2==MyID)
					{
						if(gData.Player2Name!=name)
						{
						//console.log("gothere2");
						//console.log("I won that as player2"+resData[x].GameCategory);
						//console.log("enemy ELO "+resData[x].Player1CategoryELO);
						//console.log("enemy name "+resData[x].Player1Nam
						
						if(gData.Player1CategoryELO)
							{
								if(!$scope.LookedatUser['lowestloss'+mycolor+gData.GameCategory])
								{$scope.LookedatUser['lowestloss'+mycolor+gData.GameCategory]=30000;}
								if(gData.Player1CategoryELO<$scope.LookedatUser['lowestloss'+mycolor+gData.GameCategory])
								{
									$scope.$apply(function(){$scope.LookedatUser['lowestloss'+mycolor+gData.GameCategory]=gData.Player1CategoryELO});
								}
							}
						
						}
					}
				
			
	}
	
	
	
	$scope.GetLowestRating=function(gData,MyID,splitted,mycolor)
	{
		/*
		if (gData.GameCategory=="2|1")
			{
			console.log("gData.GameCategory "+gData.GameCategory);
			console.log("winner is "+name);
			console.log("I am "+gData.Player1Name);
			console.log("gData.Player1CategoryELO "+gData.Player1CategoryELO);
			console.log("$scope.LookedatUser['lowest'+mycolor+gData.GameCategory] "+$scope.LookedatUser['lowest'+mycolor+gData.GameCategory]);
			console.log("gData.Player1CategoryELOafter "+gData.Player1CategoryELOafter);
			}*/
				
						
						
				if(gData.Player1==MyID)
					{		
							if(gData.Player1CategoryELOafter)
							{
									/*if (gData.GameCategory=="2|1")
										{
										console.log("gData.Player1CategoryELOafter "+gData.Player1CategoryELOafter);
										console.log("gData.GameCategory "+gData.GameCategory);
										}*/
												
								if(gData.Player1CategoryELOafter<$scope.LookedatUser['lowest'+mycolor+gData.GameCategory])
								{
											/*if (gData.GameCategory=="2|1")
												{
												console.log("gData.Player1CategoryELOafter "+gData.Player1CategoryELOafter);
												console.log("gData.GameCategory "+gData.GameCategory);
												}
											*/
									$scope.$apply(function(){$scope.LookedatUser['lowest'+mycolor+gData.GameCategory]=gData.Player1CategoryELOafter});
								//console.log("$scope.LookedatUser['lowest'+mycolor+gData.GameCategory] "+$scope.LookedatUser['lowest'+mycolor+gData.GameCategory]);
								}
							}
						
					}
					if(gData.Player2==MyID)
					{
						//if(gData.Player2Name!=name)
						//{
							if(gData.Player2CategoryELOafter)
							{
								
								if(gData.Player2CategoryELOafter<$scope.LookedatUser['lowest'+mycolor+gData.GameCategory])
								{
									$scope.$apply(function(){$scope.LookedatUser['lowest'+mycolor+gData.GameCategory]=gData.Player2CategoryELOafter});
								}
							}
						
						//}
					}
				
				
	}
	
	
	$scope.GetHighestRating=function(gData,MyID,splitted,mycolor)
	{
	
				if(gData.Player1==MyID)
					{
							
					
							if(gData.Player1CategoryELOafter)
							{
								if(gData.Player1CategoryELOafter>$scope.LookedatUser['highest'+mycolor+gData.GameCategory])
								{
									
									$scope.$apply(function(){$scope.LookedatUser['highest'+mycolor+gData.GameCategory]=gData.Player1CategoryELOafter});
								}
							}
						
					}
					if(gData.Player2==MyID)
					{
							if(gData.Player2CategoryELOafter)
							{
								
								if(gData.Player2CategoryELOafter>$scope.LookedatUser['highest'+mycolor+gData.GameCategory])
								{
									$scope.$apply(function(){$scope.LookedatUser['highest'+mycolor+gData.GameCategory]=gData.Player2CategoryELOafter});
								}
							}
						
						
					}
				
				
	}
	$scope.GetAverageOppositionRating=function(gData,MyID,splitted,mycolor)
	{
			if(gData.Player1==MyID)
					{
					$scope.LookedatUser['totaloppositionrating'+mycolor+gData.GameCategory]=$scope.LookedatUser['totaloppositionrating'+mycolor+gData.GameCategory]+gData.Player2CategoryELOafter;
					}
			if(gData.Player2==MyID)
					{
					$scope.LookedatUser['totaloppositionrating'+mycolor+gData.GameCategory]=$scope.LookedatUser['totaloppositionrating'+mycolor+gData.GameCategory]+gData.Player1CategoryELOafter;
					}
				
		
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
