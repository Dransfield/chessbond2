angular.module('HomepageModule').controller('SinglePlayerController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// set-up loginForm loading state
	
	$scope.LevelForm = {
		loading: false
	}
	$scope.fenform = {
		loading: false
	}
	$scope.hideboard=true;
	$scope.chess={}
	
	 $scope.piecethemes = [
      {name:'A'},
      {name:'B'},
      {name:'C'},
      {name:'D'},
      {name:'E'},
	  {name:'F'},
	{name:'G'},
   {name:'H'}
    ];
    $scope.MyPieceTheme=[$scope.piecethemes[0]];
    
   
	$scope.PressedGoButton=function(){
	$scope.hideboard=false;
$scope.User={};
	$scope.chess=init($scope.LevelForm.level,$scope.MyPieceTheme[0]['name']);
	$scope.hidedifficulty=true;
	toastr.success("Playing at difficulty level "+$scope.LevelForm.level);
	console.log("HELLO");
	console.log($scope.chess);
	$scope.getuser=function(MyID)
	{
		
		toastr.success("getting user "+MyID);
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
			toastr.success("got user "+$scope.User.name);
			}
			)	
		
	};
	 setInterval(function (chess)
		{
        if (announced_game_over) {
            return;
        }
        
        
        
        if ($scope.chess.game_over())
        {
        if ($scope.chess.game_checkmate())
        {
        if ($scope.chess.NotPlayersTurn())
        {
            announced_game_over = true;
           toastr.success("You Won!");
           $http.put('/updatelevelbeaten', {
			DifficultyLevelBeaten:$scope.LevelForm.level
			})
			.then(function onSuccess (){
			//Refresh the page now that we've been logged in.
			toastr.success('Your victory has been recorded in your profile');
			})   
            .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 500) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
        toastr.error('Log in to record your victories.', 'Error', {
          closeButton: true
        });
        return;
      }
		
				toastr.error('An unexpected error occurred, please try again.', 'Error', {
					closeButton: true
				});
				return;

    })
           
        }
        }
		}
        
    }, 1000);
     
    }
	$scope.injectfen=function (){
	
	
	$scope.chess.injectboard('3Q1R2/8/5R2/P7/6p1/2K1k1P1/P6B/8 w - - 0 55');
	$scope.chess.injectgame('3Q1R2/8/5R2/P7/6p1/2K1k1P1/P6B/8 w - - 0 55');
	}
	
	
	
	
	
}]);