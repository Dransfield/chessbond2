angular.module('HomepageModule').controller('TwoPlayerController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
var board1 ;
var game;
$scope.Player1Namer="";
$scope.Player2Name="";
$scope.chatting=new Array();

$scope.BottomPlayerPic="";
$scope.TopPlayerPic="";
$scope.ShowOptions=true;
$scope.PreferenceNames=['Sound','ChessPieceTheme'];

$scope.HideInject=true;

$scope.PreferencesGUIType=new Array();
$scope.PreferencesGUIType['Sound']='Toggle';
$scope.PreferencesGUIType['ChessPieceTheme']='Select';

$scope.PreferenceOptions=new Array();
$scope.PreferenceOptions['Sound']=['SoundEnabled','SoundDisabled'];
$scope.PreferenceOptions['ChessPieceTheme']=['A','B','C','D','E','F'];

$scope.PlayerOnBottom='White';
var squareClass = 'square-55d63';
  var squareToHighlight;
  boardEl = $('#board');
  
$scope.PreferenceVariable=new Array();

$scope.PreferenceInitialValue=new Array();
$scope.PreferenceInitialValue['Sound']='SoundEnabled';
$scope.PreferenceInitialValue['ChessPieceTheme']=[{name:'A'}];

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

$scope.pic1height=50;
$scope.pic1coordy=40;
$scope.pic1coordx=40;

$scope.smallimage1=function()
{
$scope.pic1height=50; $scope.pic1coordx=40; $scope.pic1coordy=40;	
}
$scope.bigimage1=function()
{
$scope.pic1height=200; $scope.pic1coordx=0;	$scope.pic1coordy=-60;
}


$scope.pic2height=50;
$scope.pic2coordy=40;
$scope.pic2coordx=40;

$scope.smallimage2=function()
{
$scope.pic2height=50; $scope.pic2coordx=40; $scope.pic2coordy=40;	
}
$scope.bigimage2=function()
{
$scope.pic2height=200; $scope.pic2coordx=0;	$scope.pic2coordy=0;
}

//document.addEventListener("visibilitychange", function() {
  //console.log( document.visibilityState );
 // if (document.visibilityState=='visible')
 // {console.log('document is visible');}
//});
    $scope.PlayBell=function()
    {
	$scope.BellSound.play();
	};
	
	$scope.ChangePreference=function(prefid,me,newpref)
	{
	$http.get('/user?id='+me).then(function
			(res)
			{var obj={};
			for (opti in $scope.PreferenceNames)
				{
				var init=$scope.PreferenceInitialValue[$scope.PreferenceNames[opti]];
				
				obj[$scope.PreferenceNames[opti]]=init;
				}
				
				if(res.data.JSONpref)
				{
				obj=JSON.parse(res.data.JSONpref);
				}
			
			obj[prefid]=newpref;
			console.log(JSON.stringify(obj));
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
	$scope.PrefSelectChanged=function(pref,me,func)
	{
		$scope.ChangePreference(pref,me,$scope.PreferenceVariable[pref]);
		func(me);
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
	
    
	// set-up loginForm loading state
	
	document.head = document.head || document.getElementsByTagName('head')[0];
	io.socket.on('timeevent',function(data){
		//toastr.success(data.data.message);
		console.log("recieved timevent "+JSON.stringify(data));
	});
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
  console.log("recieved chess game move"+JSON.stringify(data));
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
		 var move =game.move({ from: gameRecordnow.lastmove.substr(0, 2), to: gameRecordnow.lastmove.substr(2, 5) });
		if (move!=null){
		console.log("move returned from game "+JSON.stringify(move));
		board1.move(modified);
		var square=   boardEl.find('.square-' + move.to);
		var position =square .position();
		$( "#highlight" ).detach();
		square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/circle.png'>");
		updateTurnTakerLabel(game,gameRecordnow);
		console.log(game.ascii());
		$scope.Moves=game.pgn();
		
		if (game.fen()!=board1.fen())
		{
			board1.position(game.fen());
		}
		
		}
		else
		{
			console.log("move is null updating game and board with");
		board1.position(gameRecordnow.fen);
		//game.load(gameRecordnow.fen);
		console.log("after update "+game.ascii());
		}
		
		});
		
	});

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
};
	
	
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
			);
			
			
			
		};
		function ShowPlayersAvatars(gameRecord)
		{
			var idtoget;
			var picurl;
			
			
			console.log("player1"+gameRecord.Player1);
			console.log("player2"+gameRecord.Player2);
			
			
			
			
			$http.get('/user?id='+gameRecord.Player1).then(function
			(res)
			{
				var picurl=PicUrlForUser(res.data);
				console.log("$scope.PlayerOnBottom"+$scope.PlayerOnBottom);
			if ($scope.PlayerOnBottom=='White')
			{
			$scope.BottomPlayerPic=picurl;
				
			}
			else
			{
			$scope.TopPlayerPic=picurl;
			}
			
			});
			
			$http.get('/user?id='+gameRecord.Player2).then(function
			(res)
			{
				var picurl=PicUrlForUser(res.data);
				if ($scope.PlayerOnBottom=='White')
			{
			$scope.TopPlayerPic=picurl;
				
			}
			else
			{
			$scope.BottomPlayerPic=picurl;
			}
			
			});
			
		}

		
		function PicUrlForUser(usr)
		{
		 var picurl='blank';
				if (usr.auth.Picture)
				{
				if (usr.auth.Picture!='')
				{
				picurl=usr.auth.Picture;	
				}
				}
				if (picurl=='blank')
				{
				if(usr.auth.facebookId)
				{
				if(usr.auth.facebookId>0)
				{
				picurl="http://graph.facebook.com/"+usr.auth.facebookId+"/picture?type=square";	
				}
				}	
				}
		return picurl;
		}
	$scope.joinRoom=function (usrName)
		{
			
			io.socket.get("/subscribeToRoom",{roomName:GameID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
		
	
		};
		$scope.resetBoard=function(me)
		{
						$http.get('/chessgame?id='+GameID)
						.then(function (res) {
							var gameRecord = res.data;
							console.log(gameRecord);

							ShowPlayersAvatars(gameRecord);
  
							var onSnapEnd = function() {
									//board1.position(game.fen());
								/*	console.log("on snap end");
									console.log(game.ascii());
									console.log(gameRecord.fen);
									console.log(game.fen());
									if (gameRecord.fen)
									{
									if (game.fen()!=gameRecord.fen)
									{
									console.log("game is different to gameRecord");
									console.log("game"+JSON.stringify(game));	
								//	console.log("move"+JSON.stringify(move));
									console.log("gameRecord"+JSON.stringify(gameRecord));
										io.socket.put('/Chessgame/'+gameRecord.id,{
										  fen: game.fen(),
										  pgn:game.pgn({max_width: 5, newline_char: '-' }),
										  lastmove:move.from+move.to
										  }  
										  
										,function(resData,jwres)
									{
										io.socket.put('/chessgamemove',{GameID:gameRecord.id},function(resData,jwres)
										{
										
										});
										}
									);
									
									}
									
									
									}
									*/
								};
								var onDrop = function(source, target) {
  
							if (usersTurn(game,gameRecord,me)===false)
						{ 
							toastr.warning("It's not your turn");
							return 'snapback';}
						// see if the move is legal
						var move = game.move({
							from: source,
							to: target,
							promotion: 'q' // NOTE: always promote to a queen for example simplicity
						  });

					  // illegal move
					  
					  if (move === null){
						  if (game.game_over())
							{
						  toastr.warning("The game is over");
						 }
						  if (game.in_check())
							{
						  toastr.warning("You are in check");
						 }
	 
						 console.log('gameover?'+game.game_over());
						  console.log('in check?'+game.in_check());
						  console.log('in checkmate?'+game.in_checkmate());
						  console.log('in draw?'+game.in_draw());
						   
						  
						   return 'snapback';
						   }
	
							  if (game.in_draw())
								{
							  toastr.success("It's a draw");
							 }
							  if (game.in_checkmate())
								{
							  toastr.success("Checkmate!");
							 }
	 
							console.log("move from ondrop "+JSON.stringify(move));
							var square=   boardEl.find('.square-' + move.to);
							var position =square .position();
							 $( "#highlight" ).detach();
						  square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/circle.png'>");
						  $scope.Moves=game.pgn();
					  //console.log("left"+position.left);
					  //console.log("top"+position.top);
					  //console.log("html"+square.html());
					  //console.log("height"+square.height());
					 // console.log("<img style='position:absolute;height:"+square.height()+"px;top:"+position.top+"px;left:"+position.left+"px' src='/images/circle.png'>");
					  //square.append("<img style='position:relative;height:"+square.height()+"px;top:"+position.top+"px;left:"+position.left+"px' src='/images/circle.png'>");

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
      pgn:game.pgn({max_width: 5, newline_char: '-' }),
      lastmove:move.from+move.to
      }  
      
    ,function(resData,jwres)
{
	io.socket.put('/chessgamemove',{GameID:gameRecord.id},function(resData,jwres)
	{
	
	});
	}
);
console.log('about to putsocket');




}
//console.log(JSON.stringify($scope.MyPieceTheme));
//console.log(JSON.stringify($scope.MyPieceTheme[0]['name']));

 board1 = ChessBoard('board',{draggable: true,onDrop: onDrop,onSnapEnd:onSnapEnd,pieceTheme: 'img/chesspieces/'+$scope.PreferenceVariable['ChessPieceTheme'][0]['name']+'/{piece}.png'} );
 game = new Chess();

 if (gameRecord.Player2==me)
	{board1.flip();
		$scope.PlayerOnBottom='Black';
		}

	board1.start();
	
		if (gameRecord.fen)
		{
		board1.position(gameRecord.fen);
		console.log("pgn "+gameRecord.pgn)
		$scope.Moves=gameRecord.pgn;
		if(game.load_pgn(gameRecord.pgn)===false)
		{
		alert('couldnt load game');
		}
		console.log("last move"+gameRecord.lastmove);
		
		var square=   boardEl.find('.square-' + gameRecord.lastmove.substr(2, 5));
	var position =square .position();
	 $( "#highlight" ).detach();
  square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/circle.png'>");
  
		}
		updateTurnTakerLabel(game,gameRecord);
		
		
		});
			};
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
				if (Object.keys(obj)[mykey]=='ChessPieceTheme')
				{
				if (!Array.isArray(obj[Object.keys(obj)[mykey]]))
				{
				$scope.PreferenceVariable[Object.keys(obj)[mykey]]=$scope.PreferenceInitialValue['ChessPieceTheme'];
				}	
				}
				console.log($scope.PreferenceVariable[Object.keys(obj)[mykey]]);
				}
				
				
	
			
			
			
			
$scope.resetBoard(me);
		
		
	});
	
	};
	
   

		
	 


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