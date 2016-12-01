angular.module('HomepageModule').controller('TwoPlayerController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
var board1 ;
var game;
$scope.Player1Namer="";
$scope.Player2Name="";
$scope.chatting=new Array();


$scope.PreferenceNames=['Sound','ChessPieceTheme'];

$scope.PreferencesGUIType=new Array();
$scope.PreferencesGUIType['Sound']='Toggle';
$scope.PreferencesGUIType['ChessPieceTheme']='Select';

$scope.PreferenceOptions=new Array();
$scope.PreferenceOptions['Sound']=['SoundEnabled','SoundDisabled'];
$scope.PreferenceOptions['ChessPieceTheme']=['A','B','C','D','E','F'];


$scope.PreferenceVariable=new Array();

$scope.PreferenceInitialValue=new Array();
$scope.PreferenceInitialValue['Sound']='SoundEnabled';
$scope.PreferenceInitialValue['ChessPieceTheme']='A';

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
    $scope.BellSound= new Audio('alert.mp3');

//document.addEventListener("visibilitychange", function() {
  //console.log( document.visibilityState );
 // if (document.visibilityState=='visible')
 // {console.log('document is visible');}
//});
    $scope.PlayBell=function()
    {
	$scope.BellSound.play();
	}
	$scope.ChangePreference=function(prefid,me,newpref)
	{
	$http.get('/user?id='+me).then(function
			(res)
			{var obj={};
			for (opti in $scope.PreferenceNames)
				{
				
				obj[$scope.PreferenceNames[opti]]=$scope.PreferenceInitialValues[$scope.PreferenceNames[opti]];
				
				}
				
				if(res.data.JSONpref)
				{
				obj=JSON.parse(res.data.JSONpref);
				}
			
			obj[$scope.PreferenceNames[prefid]]=newpref;
				io.socket.put('/user/'+me,{
      JSONpref:JSON.stringify(obj)
      }  
      
    ,function(resData,jwres)
{console.log(me);
	console.log(resData);
	console.log(jwres);
	}
);
			})	
		
	}
	
	$scope.PrefToggleButtonClicked=function(pref,me)
	{
	if ($scope.PreferenceVariable[pref]==$scope.PreferenceOptions[pref][1])	
	{
	$scope.PreferenceVariable[pref]=$scope.PreferenceOptions[pref][0];
	$scope.ChangePreference(pref,me,$scope.PreferenceVariable[pref]);
	console.log("$scope.PreferenceVariable[pref]"+$scope.PreferenceVariable[pref]);
	console.log("pref "+pref);
	}
	else
	{
	$scope.PreferenceVariable[pref]=$scope.PreferenceOptions[pref][1];
	$scope.ChangePreference(pref,me,$scope.PreferenceVariable[pref]);
	}
	}
	
    $scope.MyPieceTheme=[$scope.piecethemes[0]];
	// set-up loginForm loading state
	
	document.head = document.head || document.getElementsByTagName('head')[0];
	io.socket.on('message', function (data){
		if (document.visibilityState=='hidden')
			{
			if($scope.PreferenceVariable['Sound']=='SoundEnabled')
			{
			$scope.PlayBell();
			}
			$scope.changeFavicon('http://www.chessbond.com/favicon2.ico');
			console.log('recieved chat message'+document.visibilityState);
			}
			console.log(document.visibilityState);
				var txtmsg = { talker:data.talker   , msg:data.greeting};
		
	$scope.$apply($scope.chatting.push(txtmsg));
				
			$("#chatdiv").scrollTop($("#chatdiv")[0].scrollHeight);
			
			});
			
	 io.socket.on('chessgamemove', function (data){
  console.log(data);
  if (document.visibilityState=='hidden')
				{
			if($scope.PreferenceVariable['Sound']=='SoundEnabled')
			{
			$scope.PlayBell();
			}
  $scope.changeFavicon('http://www.chessbond.com/favicon2.ico');
}
  			$http.get('/chessgame?id='+GameID)
.then(function (res) {
   var gameRecordnow = res.data;
		//board1.position(gameRecordnow .fen);
		//.if(game.load(gameRecordnow .fen)==false)
		//{
		//alert('couldnt load game');
	//	}
	console.log("last move"+gameRecordnow.lastmove);
	var modified=(gameRecordnow.lastmove.substr(0, 2) + "-" + gameRecordnow.lastmove.substr(2));
	console.log("with -"+modified);
	console.log("from "+gameRecordnow.lastmove.substr(0, 2)+"-to-"+gameRecordnow.lastmove.substr(2, 5)+"-");
		game.move({ from: gameRecordnow.lastmove.substr(0, 2), to: gameRecordnow.lastmove.substr(2, 5) });
		board1.move(modified);
		updateTurnTakerLabel(game,gameRecordnow);
		console.log(game.ascii());
		})
		
	})

$scope.changeFavicon=function (src) {
 var link = document.createElement('link'),
     oldLink = document.getElementById('dynamic-favicon');
 link.id = 'dynamic-favicon';
 link.rel = 'shortcut icon';
 link.href = src;
 if (oldLink) {
  document.head.removeChild(oldLink);
 }
 document.head.appendChild(link);
}
	
	
	function updatePlayersLabel(game,gameRecord)
	{
		console.log("hello");
		$scope.Player1Namer=gameRecord.Player1Name;
		$scope.Player2Name=gameRecord.Player2Name;
	console.log("scopep2"+$scope.Player2Name);	
	}
	
	function updateTurnTakerLabel(game,gameRecord)
	{
		if (game.turn()=='w')
		{
		$scope.TurnTaker=gameRecord.Player1Name;
		}
		else
		{
		$scope.TurnTaker=gameRecord.Player2Name;
		
		}
		
		
		$scope.Player1Namer=gameRecord.Player1Name;
		$scope.Player2Name=gameRecord.Player2Name;
	//console.log("scopep2"+$scope.Player2Name);	
		
		}
		
		function usersTurn(game,gameRecord,me)
		{
		if (game.turn()=='w')
		{
		if (gameRecord.Player1==me)
		{
			console.log('it is your turn');
			return true;}
		else
		{
			console.log('its '+gameRecord.Player1+'s turn'+me);
			return false;}
		}
		else
		{
		if (gameRecord.Player2==me)
		{
			console.log('it is your turn');
			return true;}
		else
		{
			console.log('its '+gameRecord.Player2+'s turn'+me);
		
		return false;}
		
		}
		}
		
		
	$scope.getchatmessages=function(){
		
	  $http.get('/chatmessage?room='+GameID+'&limit=30000', {
      room: GameID
    })
    .then(function onSuccess (dat){
      // Refresh the page now that we've been logged in.
      //$scope.$apply(function() {
      console.log("joined games reply"+JSON.stringify(dat.data));
		for (m in dat.data)
	{console.log("joined games reply2"+JSON.stringify(dat.data[m]));
		
		var txtmsg = { talker:dat.data[m]['talker']   ,   // property_# may be an identifier...
            msg:dat.data[m]['msg']};
		
			
	$scope.chatting.push(txtmsg);
	}
	//});
	
	$("#chatdiv").scrollTop($("#chatdiv")[0].scrollHeight);
    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
       // toastr.error('Cant find joined games, not logged in.', 'Error', {
          
        //});
        return;
      }

				toastr.error('An unexpected error occurred trying to find joined games.', 'Error', {
					
				});
				return;

    })
    .finally(function eitherWay(){
      
    });
    
}

		
		$scope.chatMessage=function(usrName)
		{
			$http.post("/chatmsg",{talker: usrName,roomName:GameID,message:$scope.chatInput})
			.then(function onSuccess (){
			$scope.chatInput = null;
			}
			)
			
			/*
			 $http.post('/Chatmessage', { talker: usrName,msg:$scope.chatInput,room:GameID})
			.then(function onSuccess (){
			// Refresh the page now that we've been logged in.
			//window.location.reload(true); 
			//toastr.success('Created New Game');
			})
			.catch(function onError(sailsResponse) {
			toastr.error("Can't Create New chat message"+sailsResponse.status);
			console.log(JSON.stringify(sailsResponse));
			// Handle known error type(s).
			// Invalid username / password combination.
			if (sailsResponse.status === 400 || 404) {
				// $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
				//
				//toastr.error('Invalid email/password combination.', 'Error', {
				// closeButton: true
				}
				else
				{
				toastr.error('An unexpected error occurred, please try again.', 'Error');
				}
				return;
      })
  
    .finally(function eitherWay(){
     // $scope.loginForm.loading = false;
    })*/
			
		}
	$scope.joinRoom=function (usrName)
		{
			
			io.socket.get("/subscribeToRoom",{roomName:GameID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
		
	
		}
	$scope.setBoard=function (me)
		{
			$http.get('/user?id='+me).then(function
			(res)
			{//res.data.JSONpref=null;
				if(!res.data.JSONpref )
				{
					var obj={};
					for (opt in $scope.PreferenceNames)
					{
					obj[$scope.PreferenceNames[opt]]=$scope.PreferenceInitialValue[$scope.PreferenceNames[opt]];
					$scope.ChangePreference(opt,me,$scope.PreferenceInitialValue[$scope.PreferenceNames[opt]]);
					console.log("$scope.PreferenceInitialValue[$scope.PreferenceNames[opt]]"+$scope.PreferenceInitialValue[$scope.PreferenceNames[opt]]);
				
					}
					res.data.JSONpref=JSON.stringify(obj);
				}
	
				console.log(res.data.JSONpref);
				var obj=JSON.parse(res.data.JSONpref);	
				for (mykey in Object.keys(obj))
				{
					//console.log(Object.keys(obj)[mykey]);
					//if (obj[obby])
					//{
					$scope.PreferenceVariable[Object.keys(obj)[mykey]]=obj[Object.keys(obj)[mykey]];
				console.log(obj[Object.keys(obj)[mykey]]);
				console.log(Object.keys(obj)[mykey]);
				console.log($scope.PreferenceVariable[Object.keys(obj)[mykey]]);
				}
				
				
				/*
				if (res.data.SoundEnabled=='true' || res.data.SoundEnabled=='false')
				{ 
			$scope.SoundEnabled=res.data.SoundEnabled;
			console.log("$scope.SoundEnabled "+$scope.SoundEnabled);
			if ($scope.SoundEnabled=='true')
			{
				console.log("changed soundbutton phrase to enanled");
			$scope.SoundButtonPhrase='SoundEnabled';
			}
			if ($scope.SoundEnabled=='false')
			{
				console.log("changed soundbutton phrase to disabled");
			$scope.SoundButtonPhrase='SoundDisabled';
			}
		
		}*/
			})
			
			$http.get('/chessgame?id='+GameID)
.then(function (res) {
   var gameRecord = res.data;
  console.log(gameRecord);

	if (gameRecord.Player2==me)
	{}
      
			
		 var onDrop = function(source, target) {
  
  if (usersTurn(game,gameRecord,me)==false)
  { return 'snapback';}
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  
  if (move === null){
	  console.log('gameover?'+game.game_over());
	  console.log('in check?'+game.in_check());
	  console.log('in checkmate?'+game.in_checkmate());
	  console.log('in draw?'+game.in_draw());
	   
	  
	   return 'snapback';}
  console.log('move'+JSON.stringify(move));
updateStatus(game,gameRecord,move);
};

function updateStatus(game,gameRecord,move)
{
	console.log("update status");
gameRecord.fen=game.fen();
gameRecord.lastmove=move.from+move.to;
updateTurnTakerLabel(game,gameRecord);
updatePlayersLabel(game,gameRecord);
//game.load(gameRecord.fen);


io.socket.put('/Chessgame/'+gameRecord.id,{
      fen: game.fen(),
      lastmove:move.from+move.to
      }  
      
    ,function(resData,jwres)
{}
);
console.log('about to putsocket');
io.socket.put('/chessgamemove',{GameID:gameRecord.id},function(resData,jwres)
{});



}
//console.log(JSON.stringify($scope.MyPieceTheme));
//console.log(JSON.stringify($scope.MyPieceTheme[0]['name']));

 board1 = ChessBoard('board',{draggable: true,onDrop: onDrop,pieceTheme: 'img/chesspieces/'+$scope.MyPieceTheme[0]['name']+'/{piece}.png'} );
 game = new Chess();

 if (gameRecord.Player2==me)
	{board1.flip();}

	board1.start();
	
		if (gameRecord.fen)
		{
		board1.position(gameRecord.fen);
		if(game.load(gameRecord.fen)==false)
		{
		alert('couldnt load game');
		}
		
	
		}
		updateTurnTakerLabel(game,gameRecord);
		}
		
		)
		
		
	
	
	}
	
   

		
	 


	   /* 
     
	 setInterval(function ()
		{
        if (announced_game_over) {
            return;
        }
        }
        )
        
        if (chess.game_over())
        {
        if (chess.game_checkmate())
        {
        if (chess.NotPlayersTurn())
        {
            announced_game_over = true;
           toastr.success("You Won!");
           $http.put('/updatelevelbeaten', {
			DifficultyLevelBeaten:$scope.LevelForm.level,
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
     
    
	$scope.injectfen=function (){
	
	
	chess.injectboard('3Q1R2/8/5R2/P7/6p1/2K1k1P1/P6B/8 w - - 0 55');
	chess.injectgame('3Q1R2/8/5R2/P7/6p1/2K1k1P1/P6B/8 w - - 0 55');
	}
	
	
	$scope.PressedGoButton=function(){
	$scope.hideboard=false;
	chess=init($scope.LevelForm.level);
	$scope.hidedifficulty=true;
	toastr.success("Playing at difficulty level "+$scope.LevelForm.level);
	
	};
	 */
}]
 )
 ;