angular.module('HomepageModule').controller('HomepageController', ['$scope', '$http','$window' ,'toastr', function($scope, $http,$window,toastr){
$scope.opg=new Array();
$scope.joinedgames=new Array();
$scope.Players=new Array();

	io.socket.on('deletegameevent', function (data)
			{
			console.log(data);
			$scope.$apply(function(){
			for(var i = $scope.joinedgames.length - 1; i >= 0; i--) {
				
			if($scope.joinedgames[i].id === data.gameid) {
			$scope.joinedgames.splice(i, 1);
			}
			}
			}
			);
			});

	io.socket.on('deleteopengameevent', function (data)
			{
			console.log(data);
			$scope.$apply(function(){
			for(var i = $scope.opg.length - 1; i >= 0; i--) {
				
			if($scope.opg[i].id === data.gameid) {
			$scope.opg.splice(i, 1);
			}
			}
			}
			);
			});
			
	io.socket.on('newopengameevent', function (data)
			{
			console.log('newopengameevent'+data);
			data.phrase=phrasefordate(data.Created);
			$scope.$apply(function(){
			$scope.opg.push(data);
			});
			console.log(data);
			}
			
		);
		
io.socket.on('userpresence',function(data)
			{console.log('user presence '+data);
			});
		function phrasefordate(dat)
			{
			
		var n = Date.now();
		
		var newnum=n-dat;
		newnum=newnum/1000;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" seconds ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" minutes ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" hours ago";
		}
		else
		{
		newnum=newnum/24;
		
		phrase=parseInt(newnum)+" days ago";
		
		}
		
		}
		
		}
		return phrase;
	}
	
$scope.PlayGame=function(GameID,Player2)
	{
		$http.put('/ChangeUsersCurrentGame', {
			  GameID: GameID,
			  oppo:Player2
    })
    .then(function onSuccess (dat){
     
     window.location="/humanvshuman";
	
    })
	}
	
$scope.joingame=function(GameID,PlayerID,PlayerName,MyID,MyName){
		console.log("joingame player1"+PlayerID+" player2"+MyID+" player1name "+PlayerName+" Player2Name "+MyName);
		$http.put('/joingame', {
			GameID:GameID,
			PlayerID:PlayerID,
			PlayerName:PlayerName,
			MyID:MyID,
			MyName:MyName
			})
			.then(function onSuccess(sailsResponse){
			
			$scope.deleteopengame(GameID);
			}
			)
			},
$scope.deletegame=function(id,user)
		{
			console.log('asked to delete game '+id);
			 io.socket.put('/deletegame', { gameid:id,owner:user},function  (data,jwres){
      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		//toastr.success('Created New Game');
    });
		
		},
		$scope.deleteopengame=function(id)
		{
			console.log('asked to delete'+id);
			 io.socket.put('/deleteopengame', { gameid:id},function  (data,jwres){
      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		//toastr.success('Created New Game');
    });
		
		},

	$scope.createopengame=function(id,name)
	{
	io.socket.put('/newopengame', { Player1: id,Player1Name:name,Created:Date.now() },
    function (resData, jwr) {

      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		toastr.success('Created New Game');
    });
	}
	$scope.joinopengameRoom=function ()
		{
			
		
		
			io.socket.get("/subscribeToRoom",{roomName:'openchessgameroom'},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
		
		$http.get('/openchessgame?limit=3000').then( function (dat) {
			
			for(x in dat.data)
			{
			dat.data[x].phrase=phrasefordate(dat.data[x].Created);
			$scope.opg.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			}
			
			
			});
			$http.get('/chessgame').then( function (dat) {
			
			for(x in dat.data)
			{
			dat.data[x].phrase=phrasefordate(dat.data[x].Created);
			$scope.joinedgames.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			}
			
			
			});
		}
	
	$scope.joinmyuserIDRoom=function(MyName,MyID)
	{
		
		io.socket.get("/subscribeToRoom",{roomName:MyID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			
			io.socket.on('newmygameevent', function (data)
			{
				console.log('recieved new game event'+data);
			data.phrase=phrasefordate(data.Created);
			$scope.$apply(function(){
			$scope.joinedgames.push(data);
			});
			console.log(data);
			});
			
				setInterval(function (MyID)
		{
				io.socket.get("/HomepageHeartbeat",{name:MyName,id:MyID},function (resData,jwres){
				$http.put('/user?id='+MyID, {
			OnHomePage:'true'
			})
			.then(function onSuccess(sailsResponse){
			
			$scope.deleteopengame(GameID);
			}
			)
			});
		}, 5000);
			
	}
	
	$scope.joinmygameRoom=function (GameID)
		{
			/*io.socket.get("/subscribeToRoom",{roomName:GameID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			io.socket.on('newmygameevent', function (data)
			{
			data.phrase=phrasefordate(data.Created);
			$scope.$apply(function(){
			$scope.opg.push(data);
			});
			console.log(data);
			}
			
			);
		$http.get('/openchessgame').then( function (dat) {
			
			for(x in dat.data)
			{
			dat.data[x].phrase=phrasefordate(dat.data[x].Created);
			$scope.opg.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			}
			
			
			});*/

		}
	$scope.LoginPushed=function (btton){
	$http.post('/loginbuttonpushed', {
      button:btton
    })
    .then(function onSuccess (dat){
         console.log("login reply"+JSON.stringify(dat.data));
         $window.location.href = '/auth/login?type='+btton;
	    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
        toastr.error('Cant logged in.', 'Error', {
          
        });
        return;
      }

				toastr.error('An unexpected error occurred trying to log in to facebook.', 'Error', {
					
				});
				return;

    })
	
	}
	

	
	
}]);
