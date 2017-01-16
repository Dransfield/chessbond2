angular.module('HomepageModule').controller('TwoPlayerController', ['$scope', '$http', 'toastr','$sce','$compile','$timeout', function($scope, $http, toastr,$sce,$compile,$timeout){
var board1 ;

var game;
$scope.Player1Namer="";
$scope.Player2Name="";
$scope.chatting=new Array();
$scope.Players=[];
$scope.BottomPlayerPic="";
$scope.TopPlayerName="";
$scope.BottomPlayerName="";
$scope.TopPlayerELO="";
$scope.BottomPlayerELO="";
$scope.ShowOfferDrawButton=false;
$scope.TopPlayerPic="";
$scope.Player1Online="";
$scope.Player2Online="";
$scope.ShowOptions=true;

$scope.to_trusted = function(someHTML) {
    
    return $sce.trustAsHtml(somecHTML);
}
$scope.HideInject=true;

$scope.ChessGameObject={};
$scope.ChessGameObject2={};



	
$scope.PlayerOnBottom='White';
var squareClass = 'square-55d63';
  var squareToHighlight;
  boardEl = $('#boardcontainer');
  
$scope.TopMinutes=0;
$scope.TopSeconds=0;

$scope.BottomMinutes=0;
$scope.BottomSeconds=0;

$scope.WhiteTime=0;
$scope.BlackTime=0;

$scope.WhiteTimeDisplay="string";
$scope.WhiteMinutes;
$scope.WhiteSeconds;
$scope.BlackTimeDisplay="string";
$scope.BlackMinutes;
$scope.BlackSeconds;
$PingStartTime=0;

$scope.capturedWhitepieces=[];

$scope.capturedBlackpieces=[];

$scope.WhiteInterval=0;
$scope.BlackInterval=0;

  $scope.boardorientations = [
        {id: '1', name: 'Left',value:'Left'},
	  {id: '2', name: 'Right',value:'Right'}
          ];
  $scope.piecethemes = [
      'A','B','C','D','E','F','G','H'
    ];
     $scope.boardthemes = [
      'symbol','uscf','dilena','wikipedia','leipzig','metro','original',
      'A1','A2','B1','B2','C1','C2','D1','D2','E1','E2'
    ];
    $scope.previousboardtheme='original';
    $scope.boardcontainerstyle="col-sm-7 col-md-6";
     $scope.boardsizes = [
     /*
      {id: '1', name: 'Small',value:200},
      {id: '2', name: 'Medium',value:300},
      {id: '3', name: 'Large',value:400},
	  {id: '4', name: 'Big',value:600}
    */
      {id: '1', name: 'Small',value:100},
      {id: '2', name: 'Medium',value:200},
      {id: '3', name: 'Large',value:300},
	  {id: '4', name: 'Big',value:400}
    
    ];
    $scope.piecevalues={P:1,N:3,B:3,R:5,Q:9};
    $scope.BellSound= new Audio('/alert.mp3');
$scope.MoveSound=new Audio('/move.mp3');
$scope.CheckMateSound=new Audio("/checkmate.mp3");

$scope.OfferDraw=function()
{
		$http.put('/OfferDraw', {
			})
			.then(function onSuccess(sailsResponse){
		
		
		});

};


$scope.StartRightClock=function()
{
	
	if(game.turn()=='b')
	{
	$scope.StartBlackClock();	
	}
	if(game.turn()=='w')
	{
	$scope.StartWhiteClock();	
	}
	
};

$scope.StartWhiteClock=function()
	{
		if ($scope.ChessGameObject.Player1Colour=='White')
		{
		$scope.WhiteTime=$scope.ChessGameObject.Player1TimeLimit;
		}
		else
		{
		$scope.WhiteTime=$scope.ChessGameObject.Player2TimeLimit;
		}
		
		//$scope.WhiteTime=(($scope.ChessGameObject.TimeLimit*60)*1000);
		$scope.WhiteInterval=	setInterval(function (){
		if ($scope.WhiteTime>0)
		{
		$scope.WhiteTime-=121;
		
		if ($scope.ChessGameObject.Player1Colour=='White')
		{
		$scope.ChessGameObject.Player1TimeLimit-=121;
		}
		else
		{
		$scope.ChessGameObject.Player2TimeLimit-=121;
		}
		
		}
		if ($scope.WhiteTime<0)
		{
		$scope.WhiteTime=0;
		}
		var bythousand=$scope.WhiteTime/1000;
		$scope.WhiteSeconds=parseInt(bythousand % 60);
		$scope.WhiteMinutes=parseInt((bythousand)/60);
		$scope.WhiteMilliseconds=parseInt($scope.WhiteTime % 1000);
		if ($scope.WhiteSeconds<10)
		{$scope.WhiteSeconds="0"+$scope.WhiteSeconds;}
		if($scope.PlayerOnBottom=='White')
		{
		$scope.$apply($scope.BottomMinutes=$scope.WhiteMinutes);	
		$scope.$apply($scope.BottomSeconds=$scope.WhiteSeconds);	
		$scope.$apply($scope.BottomMilliseconds=$scope.WhiteMilliseconds);
		}
		else
		{
		$scope.$apply($scope.TopMinutes=$scope.WhiteMinutes);	
		$scope.$apply($scope.TopSeconds=$scope.WhiteSeconds);	
		$scope.$apply($scope.TopMilliseconds=$scope.WhiteMilliseconds);	
		
		}
		
		
		
		
		},121);	
		
	};
$scope.StartBlackClock=function()
	{
		if ($scope.ChessGameObject.Player1Colour=='Black')
		{
		$scope.BlackTime=$scope.ChessGameObject.Player1TimeLimit;
		}
		else
		{
		$scope.BlackTime=$scope.ChessGameObject.Player2TimeLimit;
		}
		
	$scope.BlackInterval=setInterval(function (){
		
		if ($scope.BlackTime>0)
		{
		$scope.BlackTime-=121;
		
		
		if ($scope.ChessGameObject.Player1Colour=='Black')
		{
		$scope.ChessGameObject.Player1TimeLimit-=121;
		}
		else
		{
		$scope.ChessGameObject.Player2TimeLimit-=121;
		}
		
		}
		if ($scope.BlackTime<0)
		{
			$scope.BlackTime=0;
		}
		var bythousand=$scope.BlackTime/1000;
		$scope.BlackSeconds=parseInt(bythousand % 60);
		$scope.BlackMinutes=parseInt((bythousand)/60);
		$scope.BlackMilliseconds=parseInt($scope.BlackTime % 1000);
		if ($scope.BlackSeconds<10)
		{$scope.BlackSeconds="0"+$scope.BlackSeconds;}
		if($scope.PlayerOnBottom=='Black')
		{
		$scope.$apply($scope.BottomMinutes=$scope.BlackMinutes);
		$scope.$apply($scope.BottomSeconds=$scope.BlackSeconds);	
		$scope.$apply($scope.BottomMilliseconds=$scope.BlackMilliseconds);
		}
		else
		{
		$scope.$apply($scope.TopMinutes=$scope.BlackMinutes);	
		$scope.$apply($scope.TopSeconds=$scope.BlackSeconds);	
		$scope.$apply($scope.TopMilliseconds=$scope.BlackMilliseconds);	
		
		}
		},121);	
		
	};

    $scope.ChangeOverallScore=function(piece,colour)
    {
    if (piece)
    
    {piece=piece.toUpperCase();
    if (colour=='b')
		{

		$scope.ChessGameObject.OverallScore-=$scope.piecevalues[piece];
		}
		else
		{
		$scope.ChessGameObject.OverallScore+=$scope.piecevalues[piece];	
		}
	}
	}
    

$scope.pic1height=30;
$scope.pic1coordy=35;
$scope.pic1coordx=30;

$scope.smallimage1=function()
{
$scope.pic1height=30; $scope.pic1coordx=30; $scope.pic1coordy=35;	
}
$scope.bigimage1=function()
{
$scope.pic1height=200; $scope.pic1coordx=0;	$scope.pic1coordy=-60;
}


$scope.pic2height=30;
$scope.pic2coordy=50;
$scope.pic2coordx=50;

$scope.smallimage2=function()
{
$scope.pic2height=30; $scope.pic2coordx=50; $scope.pic2coordy=50;	
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
	$scope.PlayMove=function()
    {
		
	$scope.MoveSound.play();
	};
	$scope.PlayCheckMate=function()
    {
	$scope.CheckMateSound.play();
	};
	

	$scope.getuserAndSetBoardAndJoinRoom=function(MyID)
	{
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
			$http.get('/chessgame?id='+GameID)
						.then(function (res) {
							
							
							  
							$scope.ChessGameObject=res.data;
							$scope.setBoard(MyID);
							$scope.joinRoom(MyID);
							if ($scope.ChessGameObject.Player1==MyID || $scope.ChessGameObject.Player2==MyID)
							{
								if(!$scope.ChessGameObject.Result)
								{
								$scope.ShowOfferDrawButton=true;
								}
							}
							});
			/*
			if (!$scope.User.BoardSize)
			{
				console.log("board size undefined"+$scope.User.BoardSize);
				console.log("$scope.User"+JSON.stringify($scope.User));
				$scope.User.BoardSize=400;
				console.log("$scope.User"+JSON.stringify($scope.User));
				}
				else
				{	console.log("board size not undefined"+$scope.User.BoardSize);
			}

			if ($scope.User.BoardSize==0)
			{$scope.User.BoardSize=400;}
      		*/
      		}
			)	
		
	};
	$scope.DoPingInterval=function()
	{
		
	setInterval(function (){
		$scope.DoPing();
	},20000);
	}
	$scope.DoPing=function()
	{
	$PingStartTime=Date.now()
		io.socket.put('/pingtest',{
				
					  }  
				  
		,function(resData,jwres)
			{
				//console.log(resData);
				//console.log(jwres);
				//console.log("Ping:"+(Date.now()-$PingStartTime));
				$scope.PingDisplay=(Date.now()-$PingStartTime);
				//console.log(Date.now());
				return (Date.now()-$PingStartTime)
				}
			);
			
	};
	

	
	
	
	$scope.Showcapturedpiece=function(cap,colour,updaterecord)
	{
	if (cap)
	{
		var str=cap;
		var pieceUpper=str.toUpperCase();
		if (colour=='w')
		{colour='b';}
		else
		{colour='w';}
		if (colour=='w')
		{
		$scope.capturedWhitepieces.push(pieceUpper);
		if (updaterecord)
		{
		if($scope.ChessGameObject.capturedWhitepieces)
		{
		$scope.ChessGameObject.capturedWhitepieces+=","+(pieceUpper);
		
		}
		else
		{
		$scope.ChessGameObject.capturedWhitepieces=(pieceUpper);
		}
		}
		}
		else
		{
		$scope.capturedBlackpieces.push(pieceUpper);
		if (updaterecord)
		{
		if($scope.ChessGameObject.capturedBlackpieces)
		{
		$scope.ChessGameObject.capturedBlackpieces+=","+(pieceUpper);
		}
		else
		{
		$scope.ChessGameObject.capturedBlackpieces=(pieceUpper);
		}
		}
		}
	}
	};
	
	$scope.ChangePreference=function(prefid,me,newpref)
	{
		
			io.socket.put('/user/'+me+"?"+prefid+"="+newpref,{
				
					  }  
				  
				,function(resData,jwres)
			{
				console.log(resData);
				console.log(jwres);
				}
			);
     
		
	}
	$scope.PrefSelectChanged=function(pref,me,func)
	{
		$scope.ChangePreference(pref,me,$scope.User[pref]);
		console.log("changed "+pref+" to "+JSON.stringify($scope.User[pref]));
		if(func){
		func(me,true);}
	}
	$scope.PrefToggleButtonClicked=function(pref,me,state1,state2)
	{
	if ($scope.User[pref]==state1)	
	{
	$scope.User[pref]=state2;
	$scope.ChangePreference(pref,me,state2);
	}
	else
	{
	$scope.User[pref]=state1;
	$scope.ChangePreference(pref,me,state1);
	}
	};
	
    
	// set-up loginForm loading state
	
	$scope.ReconnectFunction=function(MyID)
	{
	io.socket.on('disconnect',function(data){
	var txtmsg = { content:"<br>disconnect from server"};
				$scope.$apply($scope.chatting.push(txtmsg));
				if (MyID==$scope.ChessGameObject.Player1)
				{
				io.socket.get("/updateGameTime",{game:GameID,player:MyID,newTime:$scope.ChessGameObject.Player1TimeLimit},function (resData,jwres){
			console.log(JSON.stringify(resData));
				});
			}
				if (MyID==$scope.ChessGameObject.Player2)
				{
				io.socket.get("/updateGameTime",{game:GameID,player:MyID,newTime:$scope.ChessGameObject.Player2TimeLimit},function (resData,jwres){
			console.log(MyID+"sent game time"+JSON.stringify(resData));
				});
			}
				
	});
	io.socket.on('connect',function(data){
	var txtmsg = { content:"<br>reconnected to server"};
				$scope.$apply($scope.chatting.push(txtmsg));
				$scope.joinRoom(MyID);
			});
			
		
	};
	/*
	$scope.LoadSubscribers=function(){
		var roomname=GameID;
	
		$http.get('/subscription?room='+roomname+'&limit=3000').then( function (dat) {
			$scope.Players=[];
			for(x in dat.data)
			{
			//console.log(dat.data[x].subscriber);
			//console.log(JSON.stringify(dat.data));
			
			$http.get('/user?id='+dat.data[x].subscriber, {
			})
			.then(function onSuccess(sailsResponse){
				
			
			var foundplayer=false;
			for(var i = $scope.Players.length - 1; i >= 0; i--) {
			
				if($scope.Players[i].name==sailsResponse.data.name)
				{
				foundplayer=true;
				}
			}
			
			if (foundplayer==false)
			{
			$scope.Players.push({name:sailsResponse.data.name});
			//console.log("foundsubscriber "+sailsResponse.data.name);
			
			if (sailsResponse.data.name==$scope.Player1Namer)
			{
			$scope.Player1Online=" Online";	
			}
			if (sailsResponse.data.name==$scope.Player2Name)
			{
			$scope.Player2Online=" Online";	
			}
			
			}
			
			}
			)
			 // => {id:9, name: 'Timmy Mendez'}
			
			}
			
			
			});
			};
	*/
	$scope.Guest=function()
	{
		console.log("guest");
	$scope.User={};
	$scope.SoleConnectorVariable='true';
	$scope.User.ChessPieceTheme="D";
	$scope.User.BoardSize=300;
	
	$scope.setBoard (0);
	}
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
			
			$scope.ConnectSockets();
			$scope.ReconnectFunction(id);
			$scope.getuserAndSetBoardAndJoinRoom(id);
			$scope.SoleConnectorVariable="true";
			
			console.log("setboard");
			}
			
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			
			}
			
			
			)
			.catch(function onError(sailsResponse) {
			$scope.SoleConnectorVariable="true";
			
			
			$scope.ConnectSockets();
			$scope.ReconnectFunction(id);
			$scope.getuserAndSetBoardAndJoinRoom(id);
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			
			
			});
	}
	
	$scope.ConnectSockets=function(){
	console.log("Connect Sockets");
	document.head = document.head || document.getElementsByTagName('head')[0];
	
		
	io.socket.on('secondelapsed',function(data)
			{
			//console.log("second passed"+data.msg);
				
			});
	
	io.socket.on('joined room',function(data)
			{
	console.log("joined room"+JSON.stringify(data));
			io.socket.get("/user?id="+data.joiner,{},function (resData,jwres){
				console.log("found joiner"+resData.name);
				//	for(var i = $scope.Players.length - 1; i >= 0; i--) {
			//console.log("player in list"+$scope.Players[i].name);
		//	if($scope.Players[i].name==resData.name) {
			if (resData.name==$scope.Player1Namer)
			{
			$scope.Player1Online=" Online"
			}
			if (resData.name==$scope.Player2Name)
			{
			$scope.Player2Online=" Online"
			}
			//$scope.$apply($scope.Players.splice(i, 1));
			//}
			//}
			
			var txtmsg = { content:resData.name+" joined the room"};
		
			$scope.$apply($scope.chatting.push(txtmsg));
    	});
				
			});
	
	io.socket.on('left room',function(data)
			{
	console.log("left room"+JSON.stringify(data));
			io.socket.get("/user?id="+data.leaver,{},function (resData,jwres){
				console.log("found leaver"+resData.name);
					//for(var i = $scope.Players.length - 1; i >= 0; i--) {
			//console.log("player in list"+$scope.Players[i].name);
			//if($scope.Players[i].name==resData.name) {
			if (resData.name==$scope.Player1Namer)
			{
			$scope.Player1Online=""
			}
			if (resData.name==$scope.Player2Name)
			{
			$scope.Player2Online=""
			}
			var txtmsg = { content:resData.name+" left the room"};
		
			$scope.$apply($scope.chatting.push(txtmsg));
			//$scope.$apply($scope.Players.splice(i, 1));
			//}
			});
			
			
    	
				
			});
	
	
	
	io.socket.on('timeoutevent',function(data){
	console.log(game.turn()+" timed out!");
	
	
	});
	io.socket.on('timeevent',function(data){
		//toastr.success(data.data.message);
		console.log(" timevent "+JSON.stringify(data));
	});
	io.socket.on('message', function (data){
		if (document.visibilityState=='hidden')
			{
			if($scope.User['SoundEnabled']=='Sound Enabled')
			{
			$scope.PlayBell();
			}
			$scope.changeFavicon('https://www.chessbond.com/favicon2.ico');
			console.log('recieved chat message'+document.visibilityState);
			}
			console.log(document.visibilityState);
				var txtmsg = { content:data.content};
		console.log(data.content);
	$scope.$apply($scope.chatting.push(txtmsg));
				
			$("#chatdiv").scrollTop($("#chatdiv")[0].scrollHeight);
			
			});

	 io.socket.on('chessgamemove', function (data){
		console.log("recieved chess game move"+JSON.stringify(data));
		if (document.visibilityState=='hidden')
				{  $scope.changeFavicon('https://www.chessbond.com/favicon2.ico');
					}
			

  			$http.get('/chessgame?id='+GameID)
		.then(function (latest) {
		   
		   $scope.ChessGameObject=latest.data;
		//   console.log(latest.data);
		   if ($scope.ChessGameObject2.id)
		   { 
			   console.log("object2 "+JSON.stringify($scope.ChessGameObject2));
			  $scope.ChessGameObject= $scope.ChessGameObject2;
		  }
		  if ($scope.ChessGameObject.Result)
			{
			$scope.ShowOfferDrawButton=false;	
			}
		//board1.position(gameRecordnow .fen);
		//.if(game.load(gameRecordnow .fen)==false)
		//{
		//alert('couldnt load game');
	//	}
	//console.log("last move"+$scope.ChessGameObject.lastmove);
	
	UpdateClocks($scope.ChessGameObject.Player1TimeLeft,$scope.ChessGameObject.Player2TimeLeft)
	
	var modified=($scope.ChessGameObject.lastmove.substr(0, 2) + "-" + $scope.ChessGameObject.lastmove.substr(2));
	console.log("with -"+modified);
	console.log("from "+$scope.ChessGameObject.lastmove.substr(0, 2)+"-to-"+$scope.ChessGameObject.lastmove.substr(2, 5)+"-");
		
		 var move =game.move({ from: $scope.ChessGameObject.lastmove.substr(0, 2), to: $scope.ChessGameObject.lastmove.substr(2, 5) });
		if (move!=null){
			
		if($scope.User)
			{	
					
			if($scope.User.SoundEnabled=='Sound Enabled')
			{
			
			$scope.PlayMove();
			}
			}
		
			$scope.Showcapturedpiece(move.captured,move.color,false);
			
	
			
			if (game.turn()=='b')
			{
			clearInterval($scope.WhiteInterval);
			clearInterval($scope.BlackInterval);
			$scope.StartBlackClock();
			}
			else
			{
			clearInterval($scope.WhiteInterval);
			clearInterval($scope.BlackInterval);
			$scope.StartWhiteClock();
			}
			
			
		console.log("move returned from game "+JSON.stringify(move));
		board1.move(modified);
		
		var square=   boardEl.find('.square-' + move.to);
		var position =square .position();
		$( "img[id='highlight']" ).detach();
		square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
		 square.each(function( index ) {
		console.log( index + ": " + $( this ).text() );
		});
		 square=   boardEl.find('.square-' + move.from);
		square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
		
			

			 square=   $("b[id='lastpgn']");
			$( "img[id='pgnhighlight']" ).detach();
			  square.append("<img id='pgnhighlight' style='position:absolute;height:"+square.height()+"px;' src='/images/pgnhighlight.png'>");
					
		
		//updateTurnTakerLabel(game);
		//console.log(game.ascii());
		$scope.Moves=game.pgn().split(".");
		
		if (game.fen()!=board1.fen())
		{
			board1.position(game.fen());
			console.log("changed board position to match fen");
		}
		
		if (game.in_checkmate())
		{
			if($scope.User)
			{		
			if($scope.User.SoundEnabled=='Sound Enabled')
			{
			$scope.PlayCheckMate();
			toastr.success("CheckMate!");
			}
			}
		}
		
		}
		else
		{
			console.log("move is null updating game and board with");
		board1.position($scope.ChessGameObject.fen);
		
		
		$scope.PlayMove();
		//game.load(gameRecordnow.fen);
		//console.log("after update "+game.ascii());
		}
		
		});
		
	});

};

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
	
	
	function updatePlayersLabel(game)
	{
		//console.log("hello");
		$scope.Player1Namer=$scope.ChessGameObject.Player1Name;
		$scope.Player2Name=$scope.ChessGameObject.Player2Name;
		//console.log("scopep2"+$scope.Player2Name);	
	}
	
	function updateTurnTakerLabel(game)
	{
		if (game.turn()=='w')
		{
		if(	$scope.ChessGameObject.Player1Color=='White')
		{
		$scope.ChessGameObject.TurnTakerSentence="It's "+$scope.ChessGameObject.Player1Name+"'s turn";
		}
		else
		{
		$scope.ChessGameObject.TurnTakerSentence="It's "+$scope.ChessGameObject.Player2Name+"'s turn";
		}
		
		}
		else
		{
		
		if(	$scope.ChessGameObject.Player1Color=='Black')
		{
		$scope.ChessGameObject.TurnTakerSentence="It's "+$scope.ChessGameObject.Player1Name+"'s turn";
		}
		else
		{
		$scope.ChessGameObject.TurnTakerSentence="It's "+$scope.ChessGameObject.Player2Name+"'s turn";
		}
		
		}
		
		
		
	//console.log("scopep2"+$scope.Player2Name);	
		
		}
		
		function usersTurn(game,me)
		{
		if (game.turn()=='w')
		{
		if ($scope.ChessGameObject.Player1==me && $scope.ChessGameObject.Player1Color=='White' )
		{
			return true;
		}
		if ($scope.ChessGameObject.Player2==me && $scope.ChessGameObject.Player1Color=='Black' )
		{
			
			return true;
		}
		}
		
		if (game.turn()=='b')
		{
		if ($scope.ChessGameObject.Player1==me && $scope.ChessGameObject.Player1Color=='Black' )
		{
			return true;
		}
		if ($scope.ChessGameObject.Player2==me && $scope.ChessGameObject.Player1Color=='White' )
		{
			
			return true;
		}

		}
	return false;
	}
		
	$scope.getchatmessages=function(){
		
	  $http.get('/chatmessage?room='+GameID+'&limit=30000', {
      room: GameID
    })
    .then(function onSuccess (dat){
      // Refresh the page now that we've been logged in.
      //$scope.$apply(function() {
     // console.log("joined games reply"+JSON.stringify(dat.data));
		for (m in dat.data)
	{//console.log("joined games reply2"+JSON.stringify(dat.data[m]));
		
		var txtmsg = {content:dat.data[m]['content']};
		
			
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
			$http.post("/chatmsg",{content:"<td><b>"+$scope.User.name+"</b>:"+$scope.chatInput+"</td>",roomName:GameID})
			.then(function onSuccess (){
			$scope.chatInput = null;
			}
			);
			
			
			
		};
		$scope.countryTofilename=function(country)
{
	return country.replace(/ /gi, "_");
}
		
		function UpdateClocks(player1time,player2time)
		{
			if ($scope.PlayerOnBottom=='White')
			{
				if ($scope.ChessGameObject.Player1Color=='White')
				{
				var bythousand=player1time/1000;
				$scope.BottomSeconds=parseInt(bythousand % 60);
				$scope.BottomMinutes=parseInt((bythousand)/60);
				}
				else
				{
				var bythousand=player2time/1000;
				$scope.BottomSeconds=parseInt(bythousand % 60);
				$scope.BottomMinutes=parseInt((bythousand)/60);
				}
				
			}
			
			
		}
		
		function ShowPlayersAvatars()
		{
			var idtoget;
			var picurl;
			
			
			console.log("player1"+$scope.ChessGameObject.Player1);
			console.log("player2"+$scope.ChessGameObject.Player2);
			
			
			
			
			$http.get('/user?id='+$scope.ChessGameObject.Player1).then(function
			(res)
			{
				//console.log(JSON.stringify(res.data));
				
			var picurl="";
				if (res.data.picture){
		picurl=(res.data.picture.replace("http:","https:"));
			}
				
				var flagurl="/images/flags/"+$scope.countryTofilename(res.data.Country)+".png";
				
				//console.log("flagurl "+flagurl);
				//console.log("$scope.PlayerOnBottom"+$scope.PlayerOnBottom);
			if ($scope.PlayerOnBottom=='White')
			{
			$scope.BottomPlayerPic=picurl;
			$scope.BottomPlayerFlag=flagurl;	
			$scope.BottomPlayerName=res.data.name;
			$scope.BottomPlayerELO=res.data.ELO;
			}
			else
			{
			$scope.TopPlayerPic=picurl;
			$scope.TopPlayerFlag=flagurl;	
			$scope.TopPlayerName=res.data.name;
			$scope.TopPlayerELO=res.data.ELO;
			}
			
			});
			
			$http.get('/user?id='+$scope.ChessGameObject.Player2).then(function
			(res)
			{
			var picurl="";
				if (res.data.picture){
		picurl=(res.data.picture.replace("http:","https:"));
			}
				var flagurl="/images/flags/"+$scope.countryTofilename(res.data.Country)+".png";
				
				
			
			if ($scope.PlayerOnBottom=='White')
			{
			$scope.TopPlayerPic=picurl;
			$scope.TopPlayerFlag=flagurl;	
			$scope.TopPlayerName=res.data.name;
			$scope.TopPlayerELO=res.data.ELO;
			}
			else
			{
			$scope.BottomPlayerPic=picurl;
			$scope.BottomPlayerFlag=flagurl;	
			$scope.BottomPlayerName=res.data.name;
			$scope.BottomPlayerELO=res.data.ELO;
			}
			
			});
			
		}

		
		
	$scope.joinRoom=function (usr)
		{
		
			io.socket.get("/subscribeToRoom",{roomName:GameID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			
			var index1 = resData.dwellers.indexOf($scope.Player1Namer);
			var index2 = resData.dwellers.indexOf($scope.Player2Name);
			//console.log("$scope.Player2Name"+$scope.Player2Name);
			//console.log("resData.dwellers.indexOf($scope.Player2Name);"+resData.dwellers.indexOf($scope.Player2Name));
			if (index1!=-1)
			{
			$scope.Player1Online=" Online";	
			}
			if (index2!=-1)
			{
			
			console.log("player2 name"+$scope.Player2Name);
			$scope.Player2Online=" Online";	
			}
			
			var txtmsg = { content:"<b>Users in the room: "+resData.dwellers+"<b>"};
				$scope.$apply($scope.chatting.push(txtmsg));
			});
			
	//	$http.get('/user?id='+usr)
		//				.then(function (res) {
		//					$scope.User = res.data;
							
		//				});
	
		};
		
							
		$scope.ShowCapturedPieces=function()
		{
			if($scope.ChessGameObject.capturedWhitepieces)
			{
			$scope.capturedWhitepieces=$scope.ChessGameObject.capturedWhitepieces.split(",");
			}
			
			if($scope.ChessGameObject.capturedBlackpieces)
			{
				
			$scope.capturedBlackpieces=$scope.ChessGameObject.capturedBlackpieces.split(",");
			console.log("Captured blacks:"+$scope.ChessGameObject.capturedBlackpieces);
			}
		};
		$scope.colorBoard=function(me,apply)
		
		{
			
			
			var whitelist;
			var blacklist;
			var actualWhitelist;
			var actualBlacklist;
			
			for (x in $scope.boardthemes)
			{
			whitelist= $('.white'+$scope.boardthemes[x])
			if (whitelist.size()>0)
			{actualWhitelist=whitelist;}
			
			whitelist.removeClass('white'+$scope.boardthemes[x]);
			blacklist= $('.black'+$scope.boardthemes[x])
			if (blacklist.size()>0)
			{actualBlacklist=blacklist;}
			blacklist.removeClass('white'+$scope.boardthemes[x]);
			}
			actualWhitelist.addClass('white'+$scope.User.BoardTheme);
			actualBlacklist.addClass('black'+$scope.User.BoardTheme);
					
			
		};
		$scope.reorientBoard=function(me,apply)
		{
			//$("#infocontainer").detach();
			//$("#boardcontainercontainer").detach();
			var info=$( "div[id='infocontainer']" );
			var boar=$( "div[id='boardcontainercontainer']" );
			info.detach();
			boar.detach();
			
			if($scope.User.BoardOrientation=='Right')
			{
			$( "div[id='overallcontainer']" ).append(info);
			$( "div[id='overallcontainer']" ).append(boar);
			
			}
			else
			{
			$( "div[id='overallcontainer']" ).append(boar);
			$( "div[id='overallcontainer']" ).append(info);
			
			}
			
			
			 $timeout(function(){$scope.resizeBoard(me,apply)},2000);
			
		};
		
		$scope.resizeBoard=function(me,apply)
		{
			console.log("board1 "+board1);
			console.log("$scope.User.BoardSize "+$scope.User.BoardSize);
			if (apply==true){
			$scope.$apply($scope.User.BoardSize=$scope.User.BoardSize);
			}
			if ($scope.User.BoardSize==600)
			{
			if (apply==true)
			{
		
			
			$scope.$apply($scope.boardcontainerstyle="col-sm-9 col-md-8");
			$scope.$apply($scope.sideofboardstyle="col-sm-3 col-md-4");
			
			
			}
			else
			{
			
			
			$scope.boardcontainerstyle="col-sm-9 col-md-8";
			$scope.sideofboardstyle="col-sm-3 col-md-4";
			
			}
			
			}
			
		if ($scope.User.BoardSize==400)
			{
			
			if (apply==true)
			{
					
			$scope.$apply($scope.boardcontainerstyle="col-md-12");
			$scope.$apply($scope.sideofboardstyle="col-md-6");
			
			}
			else
			{
			$scope.boardcontainerstyle="col-sm-12 col-md-12";
			$scope.sideofboardstyle="col-sm-5 col-md-6";
			}
		}
		if ($scope.User.BoardSize==300)
		{
			if(apply==true)
			{
			$scope.$apply($scope.boardcontainerstyle="col-sm-9 col-md-9");
			$scope.$apply($scope.sideofboardstyle="col-sm-6 col-md-7");
			}
			else
			{
			$scope.boardcontainerstyle="col-sm-9 col-md-9";
			$scope.sideofboardstyle="col-sm-6 col-md-7";
			}
		
		}
		if ($scope.User.BoardSize==200)
		{
			if (apply==true)
			{
			$scope.$apply($scope.boardcontainerstyle="col-sm-7 col-md-7");
			$scope.$apply($scope.sideofboardstyle="col-sm-7 col-md-8");
			}
			else
			{
			$scope.boardcontainerstyle="col-sm-7 col-md-7";
			$scope.sideofboardstyle="col-sm-7 col-md-8";
			}
		}
			if ($scope.User.BoardSize==100)
		{
			if (apply==true)
			{
			$scope.$apply($scope.boardcontainerstyle="col-sm-5 col-md-5");
			$scope.$apply($scope.sideofboardstyle="col-sm-8 col-md-9");
			}
			else
			{
			$scope.boardcontainerstyle="col-sm-5 col-md-5";
			$scope.sideofboardstyle="col-sm-8 col-md-9";
			}
		}
		board1.resize();	
		
		
		if ($scope.BoardOrientation=='Right')
		{
		//$scope.sideofboardstyle+=" rightstyle";	
		}
		else
		{
		$scope.sideofboardstyle+=" leftstyle";	
		}
		
			console.log("$scope.User.BoardSize[0] "+$scope.User.BoardSize[0]);
			
		};
		$scope.resetBoard=function(me)
		{
						
							//$scope.LoadSubscribers();
							
							ShowPlayersAvatars();
							
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
  
							if (usersTurn(game,me)===false)
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
					  
					  if (move === null || game.in_draw() || $scope.ChessGameObject.Result){
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
							$scope.ChessGameObject.Move+=1;
						$scope.ChangeOverallScore(move.captured,move.color);
						  $scope.Showcapturedpiece(move.captured,move.color,true);
						
							  if (game.in_draw())
								{
							  toastr.success("It's a draw");
							 }
							  if (game.in_checkmate())
							{
							  toastr.success("Checkmate!");
							  console.log("checkmate");
							$scope.ShowOfferDrawButton=false;
								if($scope.User)
								{		
								if($scope.User.SoundEnabled=='Sound Enabled')
								{
								$scope.PlayCheckMate();
								
								}
								}
							}
							 
	 
						//	console.log("move from ondrop "+JSON.stringify(move));
							var square=   boardEl.find('.square-' + move.to);
							var position =square .position();
							 $( "img[id='highlight']" ).detach();
						  square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
					
							 square=   $("b[id='lastpgn']");
							$( "img[id='pgnhighlight']" ).detach();
						  square.append("<img id='pgnhighlight' style='position:absolute;height:"+square.height()+"px;' src='/images/pgnhighlight.png'>");
					
						  
						  
						  square=   boardEl.find('.square-' + move.from);
							square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
						
						  $scope.Moves=game.pgn().split(".");
					  //console.log("left"+position.left);
					  //console.log("top"+position.top);
					  //console.log("html"+square.html());
					  //console.log("height"+square.height());
					 // console.log("<img style='position:absolute;height:"+square.height()+"px;top:"+position.top+"px;left:"+position.left+"px' src='/images/circle.png'>");
					  //square.append("<img style='position:relative;height:"+square.height()+"px;top:"+position.top+"px;left:"+position.left+"px' src='/images/circle.png'>");
					
					 // console.log('move'+JSON.stringify(move));
					//console.log("result: "+$scope.ChessGameObject.Result);
					updateStatus(game,move);
};

function updateStatus(game,move)
{
	//console.log("update status");
$scope.ChessGameObject.fen=game.fen();
$scope.ChessGameObject.lastmove=move.from+move.to;

if (game.turn()=='b')
{
	//console.log("$scope.WhiteInterval "+$scope.WhiteInterval);
	clearInterval($scope.WhiteInterval);
	clearInterval($scope.BlackInterval);
	$scope.StartBlackClock();
	}
	else
	{
	clearInterval($scope.WhiteInterval);
	clearInterval($scope.BlackInterval);
	$scope.StartWhiteClock();
		
		
	}

updateTurnTakerLabel(game);
updatePlayersLabel(game);
//game.load(gameRecord.fen);

//console.log("put chessgame result is :"+$scope.ChessGameObject.Result);
//console.log("put chessgame move is :"+$scope.ChessGameObject.Move);
//console.log("put chessgame captured whites:"+$scope.ChessGameObject.capturedWhitepieces);
//console.log("put chessgame captured Blacks:"+$scope.ChessGameObject.capturedBlackpieces);



io.socket.put('/Chessgame/'+$scope.ChessGameObject.id,{
      fen: game.fen(),
      pgn:game.pgn({max_width: 5, newline_char: '-' }),
      lastmove:move.from+move.to,
      Move:$scope.ChessGameObject.Move,
	TurnTakerSentence:$scope.ChessGameObject.TurnTakerSentence,
	  capturedWhitepieces:$scope.ChessGameObject.capturedWhitepieces,
      capturedBlackpieces:$scope.ChessGameObject.capturedBlackpieces,
      OverallScore:$scope.ChessGameObject.OverallScore
      }  
    ,function(resData,jwres)
	{
		
	var state="playing";
	var descriptor="playing";
	var gameover='false';
	
	if (game.game_over())
	{gameover='true';}
	
	if (game.in_draw())
	{state='draw';}
	
	if (game.in_checkmate())
	{state='checkmate';}

	if (game.insufficient_material())
	{descriptor='insufficient material';}
	
	if (game.in_threefold_repetition())
	{descriptor='in threefold repetition';}
	
	if (game.in_stalemate())
	{descriptor='stalemate';}
	
	
	io.socket.put('/chessgamemove',{GameState:state,GameDescriptor:descriptor,GameOver:gameover,GameID:$scope.ChessGameObject.id,ColorToMove:game.turn()},function(resData,jwres)
	{
	//console.log(jwres);
	});
	
	}
);
//console.log('about to putsocket');




}
//console.log(JSON.stringify($scope.MyPieceTheme));
//console.log(JSON.stringify($scope.MyPieceTheme[0]['name']));

 board1 = ChessBoard('boardcontainer',{draggable: true,onDrop: onDrop,onSnapEnd:onSnapEnd,pieceTheme: '/img/chesspieces/'+$scope.User.ChessPieceTheme[0]+'/{piece}.png'} );
console.log("$scope.User.BoardSize "+$scope.User.BoardSize);
 game = new Chess();


updatePlayersLabel(game);
	if ($scope.ChessGameObject.Player2==me){
		if ($scope.ChessGameObject.Player1Color=='White')
		{
		board1.flip();
		
		$scope.PlayerOnBottom='Black';
		console.log("black is on bottom ");
		}
	
	
	}
	if ($scope.ChessGameObject.Player1==me){
		if ($scope.ChessGameObject.Player1Color=='Black')
		{
		board1.flip();
	
		$scope.PlayerOnBottom='Black';
		console.log("black is on bottom ");
		}
	}

	board1.start();
	
		if ($scope.ChessGameObject.fen)
		{
		board1.position($scope.ChessGameObject.fen);
		
		
		console.log("pgn "+$scope.ChessGameObject.pgn)
		$scope.Moves=$scope.ChessGameObject.pgn.split(".");
		console.log($scope.Moves);
		if(game.load_pgn($scope.ChessGameObject.pgn)===false)
		{
		alert('couldnt load game');
		}
		$scope.ShowCapturedPieces();
		$scope.StartRightClock();
		console.log("last move"+$scope.ChessGameObject.lastmove);
		
		var square=   boardEl.find('.square-' + $scope.ChessGameObject.lastmove.substr(2, 5));
	var position =square .position();
	 $( "img[id='highlight']").detach();
  square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
   square=   boardEl.find('.square-' + $scope.ChessGameObject.lastmove.substr(0, 2));
		square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
		
			 square=   $("b[id='lastpgn']");
							$( "img[id='pgnhighlight']" ).detach();
						  square.append("<img id='pgnhighlight' style='position:absolute;height:"+square.height()+"px;' src='/images/pgnhighlight.png'>");
					
		
		}
		
		
		
		
		$scope.reorientBoard(me,true);
		};
	$scope.setBoard=function (me)
		{
			
			$scope.resetBoard(me);
			var whitelist;
			var blacklist;
			
			for (x in $scope.boardthemes)
			{
			whitelist= $('.white'+$scope.boardthemes[x])
			whitelist.removeClass('white'+$scope.boardthemes[x]);
			blacklist= $('.black'+$scope.boardthemes[x])
			blacklist.removeClass('white'+$scope.boardthemes[x]);
			}
			whitelist.addClass('white'+$scope.User.BoardTheme);
			blacklist.addClass('black'+$scope.User.BoardTheme);
			
		};
	
   

		
}]
 )
 ;