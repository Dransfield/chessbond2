
var boardEl;
		var board1 ;
var squareClass = 'square-55d63';
  var squareToHighlight;
  boardEl = $('#boardcontainer');
var game;

var turnTakerNoticeDiv;
var topPlayerMarque;
var bottomPlayerMarque;

var BottomPingDisplay;

var TopPingDisplay;
var PingStartTime=Date.now();
var TopMinutes="0";
var TopSeconds="0";
var TopMilliseconds="000";

var BottomMinutes="0";
var BottomSeconds="0";
var BottomMilliseconds="000";

var WhiteTime=0;
var BlackTime=0;

var WhiteTimeDisplay="string";
var WhiteMinutes="string";
var WhiteSeconds="string";
var WhiteMilliSeconds="string";

var BlackTimeDisplay="string";
var BlackMinutes="string";
var BlackSeconds="string";
var BlackMilliSeconds="string";

var PingStartTime=0;

var capturedWhitepieces=[];

var capturedBlackpieces=[];

var WhiteInterval=0;
var BlackInterval=0;

var pieceNames=['pawn','rook','knight','bishop','queen','king'];
var pieceNamesInitial=['P','R','N','B','Q','K'];

 var  boardorientations = [
        {id: '1', name: 'Left',value:'Left'},
	  {id: '2', name: 'Right',value:'Right'}
          ];
var   piecethemeNames = [
      'A','B','C','D','E','F','G','H'
    ];
var   piecethemeValues = [
      'A','B','C','D','E','F','G','H'
    ];
var volumeValues=[0,1,2,3,4,5,6,7,8,9,10];
var volumeNames=[0,1,2,3,4,5,6,7,8,9,10];
  
 var     boardthemes = [
      'symbol','uscf','dilena','wikipedia','leipzig','metro',
		'original',
      'A1','A2','B1','B2','C1','C2','D1','D2','E1','E2'
    ];
   
   var boardThemeValues=
      [{name:'original',whitebackground:'#f0d9b5',
		  whiteforeground:'#111111',blackbackground:'#b58863',
		  blackforeground:'#111111'},
		  {name:'A1',whitebackground:'#fbe2db',
		  whiteforeground:'#111111',blackbackground:'#901d78',
		  blackforeground:'#111111'},
		  {name:'A2',whitebackground:'#f09ba0',
		  whiteforeground:'#111111',blackbackground:'#0093dd',
		  blackforeground:'#111111'},
		  {name:'B1',whitebackground:'#f6e2ee',
		  whiteforeground:'#111111',blackbackground:'#5e6f89',
		  blackforeground:'#111111'},
		  
		    {name:'B2',whitebackground:'#fffcc7',
		  whiteforeground:'#111111',blackbackground:'#da251c',
		  blackforeground:'#111111'},
		    {name:'C1',whitebackground:'#d3b49f',
		  whiteforeground:'#111111',blackbackground:'#71625b',
		  blackforeground:'#111111'},
		    {name:'C2',whitebackground:'#ffffff',
		  whiteforeground:'#111111',blackbackground:'#1f1a17',
		  blackforeground:'#111111'},
		    {name:'D1',whitebackground:'#b2b5aa',
		  whiteforeground:'#111111',blackbackground:'#613005',
		  blackforeground:'#111111'},
		  {name:'D2',whitebackground:'#e8c312',
		  whiteforeground:'#111111',blackbackground:'#0093dd',
		  blackforeground:'#111111'},
		    {name:'E1',whitebackground:'#bab3d5',
		  whiteforeground:'#111111',blackbackground:'#070e79',
		  blackforeground:'#111111'},
		  {name:'E2',whitebackground:'#ffffcb',
		  whiteforeground:'#111111',blackbackground:'#fe9900',
		  blackforeground:'#111111'},
		  {name:'symbol',whitebackground:'#FFFFFF',
		  whiteforeground:'#111111',blackbackground:'#58AC8A',
		  blackforeground:'#111111'},
		   {name:'uscf',whitebackground:'#C3C6BE',
		  whiteforeground:'#111111',blackbackground:'#727FA2',
		  blackforeground:'#111111'},
		    {name:'dilena',whitebackground:'#FFE5B6',
		  whiteforeground:'#111111',blackbackground:'#B16228',
		  blackforeground:'#111111'},
		   {name:'wikipedia',whitebackground:'#D18B47',
		  whiteforeground:'#111111',blackbackground:'#FFCE9E',
		  blackforeground:'#111111'},
		   {name:'leipzig',whitebackground:'#FFFFFF',
		  whiteforeground:'#111111',blackbackground:'#E1E1E1',
		  blackforeground:'#111111'},
		  {name:'metro',whitebackground:'#FFFFFF',
		  whiteforeground:'#111111',blackbackground:'#EFEFEF',
		  blackforeground:'#111111'}
		  ];
 


var boardThemeNames=['original','A1','A2',
   'B1','B2','C1','C2','D1','D2','E1','E2',
   'symbol','ucsf','dilena','wikipedia','leipzig'
   ,'metro'
   
   
   
   ];

  var   previousboardtheme='original';
  //  boardcontainerstyle="col-sm-7 col-md-6";
   var   boardSizeValues = [
   
      {id: '1', name: 'Small',value:25},
      {id: '2', name: 'Medium',value:50},
      {id: '3', name: 'Large',value:75},
	  {id: '4', name: 'Big',value:100}
    
    ];
    var boardSizeNames=['Small','Medium','Large','Big'];
    var ShowAcceptDrawButton=false;
    
    var piecevalues={P:1,N:3,B:3,R:5,Q:9};
 //   BellSound= new Audio('/alert.mp3');
//	MoveSound=new Audio('/move.mp3');
//	CheckMateSound=new Audio("/checkmate.mp3");
	var DrawSound=new Audio("/draw.mp3");
//	WithdrawSound=new Audio("/withdraw.mp3");
	var SoundEnabled=false;
	$("#SoundModal").modal()
	var EnableSound=function()
{
			
	console.log("Sound Enabled");
	BellSound= new Audio('/alert.mp3');
	MoveSound=new Audio('/move.mp3');
	CheckMateSound=new Audio("/checkmate.mp3");
	DrawSound=new Audio("/draw.mp3");
	WithdrawSound=new Audio("/withdraw.mp3");
	BellSound.volume=0;
	MoveSound.volume=0;
	CheckMateSound.volume=0;
	DrawSound.volume=0;
	WithdrawSound.volume=0;
	BellSound.play();
	MoveSound.play();
	CheckMateSound.play();
	DrawSound.play();
	WithdrawSound.play();
	BellSound.pause();
	MoveSound.pause();
	CheckMateSound.pause();
	//DrawSound.pause();
	WithdrawSound.pause();
	BellSound.volume=.1;
	MoveSound.volume=.1;
	//CheckMateSound.volume=.1;
	DrawSound.volume=.1;
	WithdrawSound.volume=.1;
	
};

function init(){
		
		var roomname=GamePlaying.id;
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
		
	setInterval(function (){
		DoPing(MyID);
	},20000);
	
	
	DoPing=function()
	{
	var PingStartTime=Date.now()
		io.socket.put('/pingtest',{
				gameid:GamePlaying.id,
				playerid:MyID
					  }  
				  
		,function(resData,jwres)
			{
				//console.log(resData);
				//console.log(jwres);
				//console.log("Ping:"+(Date.now()-$PingStartTime));
				var Ping=(Date.now()-PingStartTime);
				io.socket.put('/BroadcastPing',{
				gameid:GameID,
				playerid:MyID,
				ping:Ping
					  }  
					  	,function(resData,jwres)
				{
				}
				);
				//$//scope.PingDisplay=(Date.now()-$PingStartTime);
				//console.log(Date.now());
				//return (Date.now()-$PingStartTime)
				}
			);
			
	};

io.socket.on('ping',function(data){
		if (data){
		console.log(data.player+" has ping of "+data.ping);
		if (data.player==GamePlaying.PlayerIDOnBottom)
			{
			BottomPingDisplay.html("Ping:"+data.ping);
			}
			else
			{
			
			TopPingDisplay.html("Ping:"+data.ping);
			}
		}
		
		});
		
			
		
	
}



function changeOverallScore(piece,colour)
    {
    if (piece)
    
    {piece=piece.toUpperCase();
    if (colour=='b')
		{

		GamePlaying.OverallScore-=piecevalues[piece];
		}
		else
		{
		GamePlaying.OverallScore+=piecevalues[piece];	
		}
	}
	}
	
	function onChangedfunc(obj)
	{
		
		for (iter in pieceNames)
		{
		$("div.chess_board div.chess_player_black.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/b'+pieceNamesInitial[iter]+'.png)');
		$("div.chess_board div.chess_player_white.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/w'+pieceNamesInitial[iter]+'.png)');
		}
	}
	var onSnapEnd = function() {};
	 function onDrop(mov) {
		
		
				
						
		
							if (usersTurn(game,MyID)===false)
						{ 
							toastr.warning("It's not your turn");
							return game.fen();}
						// see if the move is legal
					
					
					 if (GamePlaying.Result){
						  if (GamePlaying.Result)
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
						  console.log('in threefold?'+game.in_threefold_repetition());
						    
						  
						   return game.fen();
						   }
						
				var nextPlayer,
						status,
					move = game.move({
						from: mov.from,
						to: mov.to,
						promotion: 'q'
						});
					
					  // illegal move
					  
						
					 
							GamePlaying.Move+=1;
							//ChangeOverallScore(move.captured,move.color);
							//Showcapturedpiece(move.captured,move.color,true);
							
							
							
						if (GamePlaying.Player1==MyID)
							{
								GamePlaying.Player1Moved='true';
								ShowWithdrawButton=false;
							}
						if (GamePlaying.Player2==MyID)
							{
								GamePlaying.Player2Moved='true';
								ShowWithdrawButton=false;
							}
						
						console.log("is it over?");
							  if (game.game_over())
								{
						
							  console.log("its over");
							 }
							 else
							 {console.log("not over");
							 }
						console.log("is it a draw?");
							  if (game.in_draw())
								{
							  toastr.success("It's a draw");
							  console.log("its a draw");
							 }
							 else
							 {console.log("no draw");
							 }
							  if (game.in_checkmate())
							{
							  toastr.success("Checkmate!");
							  console.log("checkmate");
							ShowOfferDrawButton=false;
								if(Accounts[MyID])
								{		
								if(Accounts[MyID].SoundEnabled=='Sound Enabled')
								{
								PlayCheckMate();
								
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
						
						  Moves=game.pgn().split(".");
					  //console.log("left"+position.left);
					  //console.log("top"+position.top);
					  //console.log("html"+square.html());
					  //console.log("height"+square.height());
					 // console.log("<img style='position:absolute;height:"+square.height()+"px;top:"+position.top+"px;left:"+position.left+"px' src='/images/circle.png'>");
					  //square.append("<img style='position:relative;height:"+square.height()+"px;top:"+position.top+"px;left:"+position.left+"px' src='/images/circle.png'>");
					
					 // console.log('move'+JSON.stringify(move));
					//console.log("result: "+GamePlaying.Result);
					updateStatus(game,mov);
					return game.fen();
};


function updateTurnTakerLabel(game)
	{
		if (game.turn()=='w')
		{
		if(	GamePlaying.Player1Color=='White')
		{
		GamePlaying.TurnTakerSentence="It's "+GamePlaying.Player1Name+"'s turn";
		}
		else
		{
		GamePlaying.TurnTakerSentence="It's "+GamePlaying.Player2Name+"'s turn";
		}
		
		}
		else
		{
		
		if(	GamePlaying.Player1Color=='Black')
		{
		GamePlaying.TurnTakerSentence="It's "+GamePlaying.Player1Name+"'s turn";
		}
		else
		{
		GamePlaying.TurnTakerSentence="It's "+GamePlaying.Player2Name+"'s turn";
		}
		
		}
		
}

function updateStatus(game,move)
{
	//console.log("update status");
GamePlaying.fen=game.fen();
GamePlaying.lastmove=move.from+move.to;


updateTurnTakerLabel(game);
//updatePlayersLabel(game);


io.socket.put('/Chessgame/'+GamePlaying.id,{
      fen: game.fen(),
      pgn:game.pgn({max_width: 5, newline_char: '-' }),
      lastmove:move.from+move.to,
      Move:GamePlaying.Move,
	TurnTakerSentence:GamePlaying.TurnTakerSentence,
	  capturedWhitepieces:GamePlaying.capturedWhitepieces,
      capturedBlackpieces:GamePlaying.capturedBlackpieces,
      OverallScore:GamePlaying.OverallScore,
      Player1Moved:GamePlaying.Player1Moved,
      Player2Moved:GamePlaying.Player2Moved
      
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
	{descriptor='in threefold repetition';
		console.log("THREEFOLD");
		}
	
	if (game.in_stalemate())
	{descriptor='stalemate';}
	
	io.socket.put('/chessgamemove',{GameState:state,GameDescriptor:descriptor,GameOver:gameover,GameID:GamePlaying.id,ColorToMove:game.turn()},function(resData,jwres)
	{
	//console.log(jwres);
	});
	
	}
);
//console.log('about to putsocket');




}

function usersTurn(game,me)
		{
		if (game.turn()=='w')
		{
		if (GamePlaying.Player1==me && GamePlaying.Player1Color=='White' )
		{
			return true;
		}
		if (GamePlaying.Player2==me && GamePlaying.Player1Color=='Black' )
		{
			
			return true;
		}
		}
		
		if (game.turn()=='b')
		{
		if (GamePlaying.Player1==me && GamePlaying.Player1Color=='Black' )
		{
			return true;
		}
		if (GamePlaying.Player2==me && GamePlaying.Player1Color=='White' )
		{
			
			return true;
		}

		}
	return false;
	}
	
	function UpdateClocks(player1time,player2time)
		{
			var intp1minute=parseInt(player1time/60);
			var p1minute=intp1minute.toString();
			var intp2minute=parseInt(player2time/60);
			var p2minute=intp2minute.toString();
			var intp1second=parseInt(player1time % 60);
			var p1second=intp1second.toString();
			var intp2second=parseInt(player2time % 60);
			var p2second=intp2second.toString();
			
			if (intp2second<10)
			{p2second="0"+p2second;}
			if (intp1second<10)
			{p1second="0"+p1second;}
			
			
			if (GamePlaying.PlayerIDOnBottom==GamePlaying.Player1)
			{
				
				BottomSeconds=p1second;
				BottomMinutes=p1minute;
				BottomMilliseconds="000";
				TopSeconds=p2second;
				TopMinutes=p2minute;
				}
				else
				{
				BottomSeconds=p2second;
				BottomMinutes=p2minute;
				BottomMilliseconds="000";
				TopSeconds=p1second;
				TopMinutes=p2minute;
				
				}
				
			}
			
			
			
		}
