
var boardEl;
var board1 ;
var squareClass = 'square-55d63';
  var squareToHighlight;

var withdrawDiv;
var withdrawButton;
var drawButton;
var resignButton;
var acceptDrawButton;
  boardEl = $('#boardcontainer');
  var chessmove;
var game;
var gameSkill;
var gameThinkTime;
 var engine =  STOCKFISH();
 var engineStatus = {};
  var time = { wtime: 300000, btime: 300000, winc: 2000, binc: 2000 };
var playingSinglePlayer=false;

var turnTakerNoticeDiv;

var topPlayerMarqueContainer;
var topPlayerMarque;
var bottomPlayerMarque;
var bottomPlayerMarqueContainer;

var boardWasFlipped=false;

var BottomPingDisplay;
var TopPingDisplay;

var PlayerIDOnTop;
var PlayerIDOnBottom;
var PlayerColorOnTop;
var PlayerColorOnBottom;

var currentFavicon;

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

//var capturedWhitepieces=[];

//var capturedBlackpieces=[];

var WhiteInterval=0;
var BlackInterval=0;
var BlackTime=0;
var WhiteTime=0;

var pieceNames=['pawn','rook','knight','bishop','queen','king'];
var pieceNamesInitial=['P','R','N','B','Q','K'];

var resultDiv;

 function PlayBell()
    {
	BellSound.volume=Accounts[MyID].SoundVolume/10;
	BellSound.play();
	}
	function PlayMove()
    {
	MoveSound.volume=Accounts[MyID].SoundVolume/10;
	MoveSound.play();
	}
	function PlayCheckMate()
    {
	CheckMateSound.volume=Accounts[MyID].SoundVolume/10;
	CheckMateSound.play();
	}
	function PlayWithdraw()
	{
	WithdrawSound.volume=Accounts[MyID].SoundVolume/10;
	WithdrawSound.play();
	}
	function PlayDraw()
	{
	DrawSound.volume=Accounts[MyID].SoundVolume/10;
	DrawSound.play();
	}



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
	var BellSound= new Audio('/alert.mp3');
	var	MoveSound=new Audio('/move.mp3');
	var CheckMateSound=new Audio("/checkmate.mp3");
	var DrawSound=new Audio("/draw.mp3");
	var WithdrawSound=new Audio("/withdraw.mp3");
	var SoundEnabled=false;
	//$("#SoundModal").modal()
	var EnableSound=function()
{
			
	
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
	CheckMateSound.volume=.1;
	DrawSound.volume=.1;
	WithdrawSound.volume=.1;
	
};

function init(){
		
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
		if (data.player==PlayerIDOnBottom)
			{
			BottomPingDisplay.html("Ping:"+data.ping);
			}
			else
			{
			
			TopPingDisplay.html("Ping:"+data.ping);
			}
		}
		
		});
		

io.socket.on('onExtraTime',function(data){
	
	if (data.playerID==GamePlaying.Player1)
	{GamePlaying.Player1TimeLeft=0;}
	if (data.playerID==GamePlaying.Player2)
	{GamePlaying.Player2TimeLeft=0;}
	//console.log("on extratime socket recieved");
	UpdateClocks(GamePlaying.Player1TimeLeft,GamePlaying.Player2TimeLeft,GamePlaying.Player1ExtraTimeLeft,GamePlaying.Player2ExtraTimeLeft);
	StartRightClock();
	
		});
		
	
}

function showCapturedPieces()
{
	$("#capturedPieces").empty();
	var blackspan=addSpan($("#capturedPieces"),"blackspan");
	var whitespan=addSpan($("#capturedPieces"),"whitespan");
	
	var pieceTheme='A';
	if(Accounts[MyID])
	{
		pieceTheme=Accounts[MyID].ChessPieceTheme;
	}
	
	if (GamePlaying.capturedBlackpieces)
	{
	var blackcap=GamePlaying.capturedBlackpieces.split(",");
	for (x in blackcap)
	{
		console.log(blackcap[x]);
		if(blackcap[x])
		{
			console.log("showing "+blackcap[x]);
			blackcap[x]=blackcap[x].replace("undefined", "");
			blackcap[x]=blackcap[x].toUpperCase();
			var img=$("<img src='/img/chesspieces/"+pieceTheme+"/b"+blackcap[x]+".png'>")
	img.css("width","5%");
	$("#blackspan").append(img);	
	}
	}
	}
	if (GamePlaying.capturedWhitepieces)
	{
	
	var whitecap=GamePlaying.capturedWhitepieces.split(",");
	console.log(GamePlaying.capturedWhitepieces);
	for (x in whitecap)
	{
		console.log(whitecap[x]);
	if( whitecap[x])
	{
			whitecap[x]=whitecap[x].replace("undefined", "");
			whitecap[x]=whitecap[x].toUpperCase();
		var img=$("<img src='/img/chesspieces/"+pieceTheme+"/w"+whitecap[x]+".png'>")
	img.css("width","5%");
	$("#whitespan").append(img);
	}
	}
	}
	
	
}

function showCapturedPiece(cap,colour,updaterecord)
	{
		console.log(cap);
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
		//capturedWhitepieces.push(pieceUpper);
		if (updaterecord)
		{
		if(GamePlaying.capturedWhitepieces)
		{
		GamePlaying.capturedWhitepieces+=","+(pieceUpper);
		
		}
		else
		{
		GamePlaying.capturedWhitepieces=(pieceUpper);
		}
		}
		}
		else
		{
		//capturedBlackpieces.push(pieceUpper);
		if (updaterecord)
		{
		if(GamePlaying.capturedBlackpieces)
		{
		GamePlaying.capturedBlackpieces+=","+(pieceUpper);
		}
		else
		{
		GamePlaying.capturedBlackpieces=(pieceUpper);
		}
		}
		}
	}
	
}
function changeOverallScore(piece,colour)
    {
    if (piece){
   // console.log(piece);
    
    piece=piece.toUpperCase();
  
    
    if (colour=='b')
		{

		GamePlaying.OverallScore+=piecevalues[piece];
		}
		else
		{
		GamePlaying.OverallScore-=piecevalues[piece];	
		}
	}
	
	
	}

    function get_moves()
    {
        var moves = '';
        var history = game.history({verbose: true});
        
        for(var i = 0; i < history.length; ++i) {
            var move = history[i];
            moves += ' ' + move.from + move.to + (move.promotion ? move.promotion : '');
        }
        
        return moves;
    }


    function uciCmd(cmd, which) {
        console.log("UCI: " + cmd);
        
        (which || engine).postMessage(cmd);
    }
    engine.onmessage = function(event) {
        var line;
        
        if (event && typeof event === "object") {
            line = event.data;
        } else {
            line = event;
        }
        console.log("Reply: " + line)
        if(line == 'uciok') {
            engineStatus.engineLoaded = true;
        } else if(line == 'readyok') {
            engineStatus.engineReady = true;
        } else {
			console.log("its a move");
            var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
            /// Did the AI move?
            if(match) {
				
				 if(Accounts[MyID])
			{	
					
			
                isEngineRunning = false;
                game.move({from: match[1], to: match[2], promotion: match[3]});
               board1.move(match[1]+"-"+match[2]);
			//singlePlayerWinFunc();
           if(Accounts[MyID].SoundEnabled=='Sound Enabled')
			{
			PlayMove();
			}
			}
		
            
            }
        }
        
}

function singlePlayerWinFunc()
{
	var gameover;
var descriptor="nothing";

	if (game.game_over())
	{gameover=true;
		console.log("game is over");}
	
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

	if(gameover==true)
	{
		if(descriptor.indexOf("nothing")==0)
		{
			
			if (game.turn()=='b')
			{
			descriptor=("you won");
			}
			if (game.turn()=='w')
			{
			descriptor=("you lost");
			}
	
		}
		console.log(descriptor);
		GamePlaying.Result=descriptor;
		resultDiv.html(GamePlaying.Result);
			resultDiv.css("padding","4px");
			resultDiv.css("margin-left","8px");
		
	
	}

	
}

function singlePlayerMoveFunc(old,newpos)
{
	if (!GamePlaying.Result)
	{
		$('.square-55d63').css("background-image","");
		$('.square-' +chessmove.to).css("background-size","contain");
		$('.square-' +chessmove.to).css("background-image", "url('/images/square.png')");
		//console.log("game.turn() "+game.turn());
		singlePlayerWinFunc();
		if (game.turn()=='b')
		{
		uciCmd('position startpos moves' + get_moves());
		uciCmd("go " + (time.depth ? "depth " + time.depth : ""));
		}
		if(GamePlaying.Result=="")
		{
		UpdateClocks(GamePlaying.Player1TimeLeft,GamePlaying.Player2TimeLeft,GamePlaying.Player1ExtraTimeLeft,GamePlaying.Player2ExtraTimeLeft);
		}
		StartRightClock();	
		board1.position(game.fen())
	}
	else
	{
	toastr.warning("Game is over");
	}

}
	
	
	function myMoveEndFunc(old,newpos)
	{
		console.log(chessmove);
			//square=   $('.square-' + chessmove.to);
	
		//square.append("<img id='highlight' style='position:absolute;height:"+square.height()+"px;' src='/images/square.png'>");
		
		//square.append("<b>HELLO</b>");
		//$('.square-' +chessmove.to).addClass('highlight-white');
		$('.square-55d63').css("background-image","");
		$('.square-' +chessmove.to).css("background-size","contain");
		//boardEl.find('.square-' +chessmove.to).addClass('highlight-white');
	$('.square-' +chessmove.to).css("background-image", "url('/images/square.png')");
		    ;
		}
	
	function onChangedfunc(obj)
	{
		
		for (iter in pieceNames)
		{
		$("div.chess_board div.chess_player_black.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/b'+pieceNamesInitial[iter]+'.png)');
		$("div.chess_board div.chess_player_white.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/w'+pieceNamesInitial[iter]+'.png)');
		}
		
	}
	var onSnapEnd = function() {console.log("snap end");};
	 function onDrop(mov) {
		
		
			
						/*
						 console.log('gameover?'+game.game_over());
						  console.log('in check?'+game.in_check());
						  console.log('in checkmate?'+game.in_checkmate());
						  console.log('in draw?'+game.in_draw());
						  console.log('in threefold?'+game.in_threefold_repetition());
						    
						  
						   return game.fen();
						   }
						*/
		/*		
					move = game.move({
						from: mov.from,
						to: mov.to,
						promotion: 'q'
						});
					
					  // illegal move
					  
						
					 
						//	GamePlaying.Move+=1;
					//		changeOverallScore(move.captured,move.color);
				//			Showcapturedpiece(move.captured,move.color,true);
							
							
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
							}
							 
	 */
					
					 // console.log('move'+JSON.stringify(move));
					//console.log("result: "+GamePlaying.Result);
					 
					 if(playingSinglePlayer==false)
					 {
					updateStatus(game,mov);
					}
					else
					{
						chessmove=mov;
					game.move(mov);
					//board1.move(mov);
				board1.move(mov.from+"-"+mov.to);
					if(Accounts[MyID])
					{	
					
					if(Accounts[MyID].SoundEnabled=='Sound Enabled')
						{
						PlayMove();
						}
					}
		
					    
					}
					//return game.fen();
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
GamePlaying.fen=game.fen();
GamePlaying.lastmove=move.from+move.to;
GamePlaying.Move+=1;


var pieceTaken=game.get(move.to);
if(pieceTaken)
{
	changeOverallScore(pieceTaken.type,pieceTaken.color);
	if(pieceTaken.color=='w')
	{GamePlaying.capturedWhitepieces+=pieceTaken.type+",";
	}
	if(pieceTaken.color=='b')
	{GamePlaying.capturedBlackpieces+=pieceTaken.type+",";
	}
	
	}
updateTurnTakerLabel(game);
//updatePlayersLabel(game);


io.socket.put('/Chessgame/'+GamePlaying.id,{
      fen: GamePlaying.fen,
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
		game.move(move);
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
	
	io.socket.put('/chessgamemove',{OverallScore:GamePlaying.OverallScore,GameState:state,GameDescriptor:descriptor,GameOver:gameover,GameID:GamePlaying.id,ColorToMove:game.turn()},function(resData,jwres)
	{
	
	});
	game.undo();
	}
);
//console.log('about to putsocket');




}

function StopClocks()
	{
	clearInterval(BlackInterval);
	clearInterval(WhiteInterval);
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
	function StartRightClock()
{
	
	if(game.turn()=='b')
	{
	clearInterval(BlackInterval);
	clearInterval(WhiteInterval);
	StartBlackClock();	
	}
	if(game.turn()=='w')
	{
	clearInterval(BlackInterval);
	clearInterval(WhiteInterval);
	StartWhiteClock();	
	}
	
}

function StartWhiteClock()
	{
		
		if (GamePlaying.Player1Color=='White')
		{
		
		if(GamePlaying.Player1TimeLeft>0)
		{	
		WhiteTime=GamePlaying.Player1TimeLeft*1000;
		}
		else
		{	
		WhiteTime=GamePlaying.Player1ExtraTimeLeft*1000;
		}
		
		
		
		}
		else
		{
			
		if(GamePlaying.Player2TimeLeft>0)
		{	
		WhiteTime=GamePlaying.Player2TimeLeft*1000;
		}
		else
		{	
		WhiteTime=GamePlaying.Player2ExtraTimeLeft*1000;
		}
		
		}
	
	WhiteInterval=setInterval(function (){
		
		
		if (WhiteTime>0)
		{
		WhiteTime-=121;
			if(!GamePlaying.PlayerIDOnTop)
			{
				
			if(GamePlaying.Player1TimeLeft>0)
			{	
			GamePlaying.Player1TimeLeft=GamePlaying.Player1TimeLeft-(121/1000);
			}
			else
			{
			GamePlaying.Player1ExtraTimeLeft=GamePlaying.Player1TimeLeft-(121/1000);
			
			}
			
			}
		}
		if (WhiteTime<0 && GamePlaying.Player1TimeLeft<0 && GamePlaying.Player1ExtraTimeLeft<0)
		{
			WhiteTime=0;
			if(GamePlaying.PlayerIDOnTop)
			{
			if(!GamePlaying.Result)
			{
				io.socket.put('/gametimedout',{
				gameid:GamePlaying.id,
				timedoutcolor:'White'
					  }  
				  
		,function(resData,jwres)
			{
			}
			);
			}
			}
		
			if(!GamePlaying.PlayerIDOnTop)
			{
			if(!GamePlaying.Result)
			{
			GamePlaying.Result="Player Timed Out";
			resultDiv.html(GamePlaying.Result);
			resultDiv.css("padding","4px");
			resultDiv.css("margin-left","8px");
			}	
			}
		
		}
		else
		{
				if(WhiteTime<0 && GamePlaying.Player1TimeLeft<0 && GamePlaying.Player1ExtraTimeLeft>0)
				{
				
				WhiteTime=	GamePlaying.Player1ExtraTimeLeft*1000;
				}
			
		}
		var bythousand=WhiteTime/1000;
		WhiteSeconds=(parseInt((bythousand % 60))).toString();
		WhiteMinutes=(parseInt((bythousand/60))).toString();
		var intmilli=parseInt(WhiteTime % 1000);
		var milli=intmilli.toString();
		if (WhiteSeconds<10)
		{WhiteSeconds="0"+WhiteSeconds;}
		if (intmilli<100 && intmilli>10)
		{milli="0"+milli;}
		if (intmilli<10 )
		{milli="00"+milli;}
		if(PlayerColorOnBottom=='White')
		{
		
		BottomMinutes.html(WhiteMinutes);
		BottomSeconds.html(":"+WhiteSeconds);	
		BottomMilliseconds.html(":"+milli);
		
		}
		else
		{
	
		TopMinutes.html(WhiteMinutes);	
		TopSeconds.html(":"+WhiteSeconds);	
		TopMilliseconds.html(":"+milli);	
	
		}
		},121);	
		
	}

function StartBlackClock()
	{
		
	
		if (GamePlaying.Player1Color=='Black')
		{
			
			if(GamePlaying.Player1TimeLeft>0)
			{
			BlackTime=GamePlaying.Player1TimeLeft*1000;
			}
			else
			{
			BlackTime=GamePlaying.Player1ExtraTimeLeft*1000;
			}
			
		}
		else
		{
			
			if(GamePlaying.Player2TimeLeft>0)
			{
			BlackTime=GamePlaying.Player2TimeLeft*1000;
			}
			else
			{
			BlackTime=GamePlaying.Player2ExtraTimeLeft*1000;
			
			}
		
		}
		
	
	BlackInterval=setInterval(function (){
		
		
		if (BlackTime>0)
		{
		BlackTime-=121;

			if(!GamePlaying.PlayerIDOnTop)
			{
			
			if (GamePlaying.Player2TimeLeft>0)
			{
			GamePlaying.Player2TimeLeft=GamePlaying.Player2TimeLeft-(121/1000);
			}
			else
			{
			GamePlaying.Player2ExtraTimeLeft=GamePlaying.Player2ExtraTimeLeft-(121/1000);
			}
			}
		}
		if (BlackTime<0 && GamePlaying.Player2ExtraTimeLeft<0 && GamePlaying.Player2TimeLeft<0)
		{
			BlackTime=0;
			if(GamePlaying.PlayerIDOnTop)
			{
			if(!GamePlaying.Result)
			{
				io.socket.put('/gametimedout',{
				gameid:GamePlaying.id,
				timedoutcolor:'Black'
					  }  
				  
		,function(resData,jwres)
			{
			}
			);
			}
			}
			
		
			if(!GamePlaying.PlayerIDOnTop)
			{
			if(!GamePlaying.Result)
			{
			GamePlaying.Result="Computer Timed Out";
			resultDiv.html(GamePlaying.Result);
			resultDiv.css("padding","4px");
			resultDiv.css("margin-left","8px");
			}	
			}
		
		}
		var bythousand=BlackTime/1000;
		
		BlackSeconds=(parseInt((bythousand % 60))).toString();
		BlackMinutes=(parseInt((bythousand/60))).toString();
		var intmilli=parseInt(BlackTime % 1000);
		var milli=intmilli.toString();
		if (BlackSeconds<10)
		{BlackSeconds="0"+BlackSeconds;}
		if (intmilli<100 && intmilli>10)
		{milli="0"+milli;}
		if (intmilli<10 )
		{milli="00"+milli;}
		

		if(PlayerColorOnBottom=='Black')
		{
		
		
		BottomMinutes.html(BlackMinutes);
		BottomSeconds.html(":"+BlackSeconds);	
		BottomMilliseconds.html("m:"+milli);
		
		}
		else
		{
	
		
		TopMinutes.html(BlackMinutes);	
		TopSeconds.html(":"+BlackSeconds);	
		TopMilliseconds.html("m:"+milli);
		
		
		}
		},121);	
		
	}
	
	function UpdateClocks(player1time,player2time,player1extratime,player2extratime)
		{
			
			var intp1minute;
			var p1minute;
			var intp2minute;
			var p2minute;
			var intp1second;
			var p1second;
			var intp2second;
			var p2second;
			
			var p1time;
			var p2time;
			
			if(player1time>0)
			{p1time=player1time;}
				else
			{p1time=player1extratime;}
			
			if(player2time>0)
			{p2time=player2time;}
				else
			{p2time=player2extratime;}
			
			intp1minute=parseInt(p1time/60);
			p1minute=intp1minute.toString();
			intp1second=parseInt(p1time % 60);
			p1second=intp1second.toString();
			
			intp2minute=parseInt(p2time/60);
			p2minute=intp2minute.toString();
			intp2second=parseInt(p2time % 60);
			p2second=intp2second.toString();
			
			if (intp2second<10)
			{p2second="0"+p2second;}
			if (intp1second<10)
			{p1second="0"+p1second;}
			
			
				if (PlayerIDOnBottom==GamePlaying.Player1)
				{
				
				BottomSeconds.html(":"+p1second);
				BottomMinutes.html(p1minute);
				BottomMilliseconds.html(":000");
				TopSeconds.html(":"+p2second);
				TopMinutes.html(p2minute);
				TopMilliseconds.html(":000");
				}
				else
				{
				BottomSeconds.html(":"+p2second);
				BottomMinutes.html(p2minute);
				BottomMilliseconds.html(":000");
				TopSeconds.html(":"+p1second);
				TopMinutes.html(p1minute);
				TopMilliseconds.html(":000");
				}
				
		}
			
			
			
		 io.socket.on('chessgamemove', function (data){
		console.log("recieved chess game move"+JSON.stringify(data));
		if (document.visibilityState=='hidden')
				{  changeFavicon('/favicon2.ico');
					}
			

  			io.socket.get('/chessgame',{id:GameID},function (resData,jwres){
			//console.log(JSON.stringify(resData));
		   
		   GamePlaying=resData;
		 
		  if (GamePlaying.Result)
			{
				
			resultDiv.html(GamePlaying.Result);
			resultDiv.css("padding","4px");
			resultDiv.css("margin-left","8px");
			withdrawButton.slideUp();
				drawButton.slideUp();
				resignButton.slideUp();
			if(!GamePlaying.tournamentGame)
			{
				console.log("showig rematch button");
			showRematchButton();
			}
			else
			{
			showTournamentRedirectNotice();	
			}
			if(GamePlaying.Result.indexOf("Result:</span><span class='redtext'>Draw</span><br>")>-1)
			{PlayDraw();
				
				}
			
			if(GamePlaying.Result.indexOf("withdrew from the game")>-1)
			{PlayWithdraw();
				for (x = 0; x < 13; x++)  
								
				{
					setTimeout(function(){PlayWithdraw();},x*500);
				}				
				}
			StopClocks();
			
			}
		
		//board1.position(gameRecordnow .fen);
		//.if(game.load(gameRecordnow .fen)==false)
		//{
		//alert('couldnt load game');
	//	}
	//console.log("last move"+$scope.ChessGameObject.lastmove);
	if(GamePlaying.Result=="")
	{
	UpdateClocks(GamePlaying.Player1TimeLeft,GamePlaying.Player2TimeLeft,GamePlaying.Player1ExtraTimeLeft,GamePlaying.Player2ExtraTimeLeft);
	
	
	}
	if (gameFunctions.movesPlayerMade(GamePlaying,MyID)>0 || GamePlaying.Result!="")
	{
		if(!withdrawButton.hidden)
		{
		withdrawButton.slideUp();
		withdrawButton.hidden=true;	
		} 
		if(!drawButton.shown)
		{
		drawButton.slideDown();
		resignButton.slideDown();
		drawButton.shown=true;	
		}
	}
	/*
	if(!withdrawButton)
	{
		withdrawButton=showButton(withdrawDiv,"Withdraw","KgreenElement KregularButton");
		withdrawButton.click(withdrawFromGame);
		withdrawDiv.css("padding","10px");
	}
	}
	*/
	var modified="";
	var move;
	if(GamePlaying.lastmove){
	modified=(GamePlaying.lastmove.substr(0, 2) + "-" + GamePlaying.lastmove.substr(2));
//	console.log("with -"+modified);
	//console.log("from "+GamePlaying.lastmove.substr(0, 2)+"-to-"+GamePlaying.lastmove.substr(2, 5)+"-");
		
		 move =game.move({ from: GamePlaying.lastmove.substr(0, 2), to: GamePlaying.lastmove.substr(2, 5) });
	chessmove=move;
	//changeOverallScore(move.captured,move.color);
	   $("#overallscore").html("<h2>Overall Score:"+GamePlaying.OverallScore+"</h2>");
		  //showCapturedPiece(move.captured,move.color,false);
		  showCapturedPieces();
	}
		if(!GamePlaying.Result)
	{
		StartRightClock();
	}	
		
			
		if(Accounts[MyID])
		{	
					
			if(Accounts[MyID].SoundEnabled=='Sound Enabled')
			{
			PlayMove();
			}
		}
		
	
		board1.move(modified);
		if(move){
		if(move.to){
		var square=   boardEl.find('.square-' + move.to);
		
		var position =square .position();
			

			 square=   $("b[id='lastpgn']");
			$( "img[id='pgnhighlight']" ).detach();
			  square.append("<img id='pgnhighlight' style='position:absolute;height:"+square.height()+"px;' src='/images/pgnhighlight.png'>");
					
		}
		}
		Moves=game.pgn().split(".");
		
		
		if (game.in_stalemate())
	{
	toastr.success("Stalemate!");
		
	}
		if (game.insufficient_material())
	{
		toastr.success("Insufficient material!");
		
		}
		if (game.in_threefold_repetition())
		{
			toastr.success("Game in threefold repetition!");
			//console.log("Game in threefold repetition!");
		}
		//else
	//	{
		//	console.log("Game not in threefold repetition!");
		//}
		if (game.in_checkmate())
		{
			if(Accounts[MyID])
			{		
			if(Accounts[MyID].SoundEnabled=='Sound Enabled')
			{
			PlayCheckMate();
			
			}
			}
			toastr.success("CheckMate!");
		}
		
		
		//square=   boardEl.find('.square-' + move.to);
	
		//square.append("<img id='highlight'  src='/images/square.png'>");
		//square.append("<b>HELLO</b>");
		//boardEl.find('.square-' +move.to).addClass('highlight-white');
		//square.css("background-image", "url('/images/square.png')");
		});
		
	});



changeFavicon=function (src) {
	if (currentFavicon!=src)
	{
 var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');
 link.id = 'dynamic-favicon';
 link.rel = 'shortcut icon';
 link.href = src;
 if (oldLink) {
  document.head.removeChild(oldLink);
 }
 document.head.appendChild(link);
currentFavicon=src;
}
};
	


var gameFunctions=
{
		playerIsPlayer1:function(player,game)
		{
			if(game.Player1==player)
			{return true;}
			else
			{return false;}
			
			},
	 playerIsWhite:function(player,game)
		{
		var imWhite=-1;
		if(game.Player1==player && game.Player1Color=='White')
		{imWhite=1;}
		if(game.Player1==player && game.Player1Color=='Black')
		{imWhite=0;}
		
		//else
		//{imWhite=false;}
		if(game.Player2==player && game.Player1Color=='Black')
		{imWhite=1;}
		if(game.Player2==player && game.Player1Color=='White')
		{imWhite=0;}
		
		//else
		//{imWhite=false;}
		return imWhite;
		},
resign:function(){
	io.socket.post('/Resign',{gameid:GamePlaying.id,resigner:MyID},

			function (resData, jwr) {
				console.log("accept draw res "+resData);
			
		
			});
},
acceptDraw:function(){
			var accepterName="";
			
			if (gameFunctions.playerIsPlayer1(MyID,GamePlaying))
			{
			accepterName=GamePlaying.Player1Name;
			}
			else
			{
			accepterName=GamePlaying.Player2Name;
			}
			

		SendWallPost(MyID,GamePlaying.id,"chesschat","",accepterName+" accepted a draw","none","");
				//io.socket.put('/WantRematch',{me:MyID,gam:GamePlaying.id,p1color:GamePlaying.Player1Color,gametype:GamePlaying.GameType,gamecat:GamePlaying.GameCategory,gametime:GamePlaying.Player1TimeLimit},
			io.socket.post('/AcceptDraw',{gameid:GamePlaying.id},

			function (resData, jwr) {
				console.log("accept draw res "+resData);
			acceptDrawButton.slideUp();
		
			});

		

		

},


offerDraw:function(){
			var offerTo;
			var offererName="";
			if (gameFunctions.playerIsPlayer1(MyID,GamePlaying))
			{
				offerTo=GamePlaying.Player2;
				offererName=GamePlaying.Player1Name;
			}
			else
			{
				offerTo=GamePlaying.Player1;
				offererName=GamePlaying.Player2Name;
			}
			
			SendWallPost(MyID,GamePlaying.id,"chesschat","",offererName+" offered a draw","none","");
			
			io.socket.put('/OfferDraw', {
		gameid:GamePlaying.id,
			userid:MyID,
			OfferedTo:offerTo,
			},function onSuccess(sailsResponse){
		
		
		});
			
},

withdraw:function()
	{
	
//$scope.ShowWithdrawButton=false;	
if (!GamePlaying.Result)
	{
	io.socket.put('/Withdraw', {
		gameid:GamePlaying.id,
			withdrawer:Accounts[MyID].name
			},function onSuccess(sailsResponse){
		
		
		});
	}
},

movesPlayerMade:function(theGame,player)
		{
			 if(this.playerIsWhite(MyID,theGame))
			 {
					var moves=theGame.Move-1;
						if(moves==0)
						{
						console.log("player is white,moves"+moves+" thegameMoves"+theGame.Move);	
						return 0;}
						else
						{
						console.log("player is white,returner"+(Math.ceil(moves/2))+" moves"+moves);	
						
						return Math.ceil(moves/2);
						}
				
				
			}
			else
			{	
					var moves=theGame.Move-2;
						if(moves<1)
						{
						console.log("player is white,moves returned:0 thegameMoves"+theGame.Move);	
						return 0;}
						else
						{
							console.log("player is white,moves"+(Math.ceil(moves/2))+" thegameMoves"+theGame.Move);	
						
						return Math.ceil(moves/2);
						}
				
			}
			
		
		},
isADraw: function(game)
		{
			//console.log(game);
			if(game.Result)
			{
				var splitted=game.Result.split(">");
					for (y in splitted)
					{
						if(splitted[y].indexOf("Drew by")>-1)
						{
							return true;
						}
					}
			}
		},
		
isALoss:function(player,game)
		{
			//console.log(game);
			if(game.Result)
			{
				var splitted=game.Result.split(">");
					for (y in splitted)
					{
						if(splitted[y].indexOf("Won by")>-1)
						{
							var name=splitted[y-1].split("<")[0];
								if(Accounts[ProfID].name!=name)
								{
										return true;
								}
							
						}
					}
			}
		},
isAWin:function(player,game)
		{
			if (game.GameCategory=="60|0")
			{
			console.log(game);
			}
			
			if(game.Result)
			{
				var splitted=game.Result.split(">");
					for (y in splitted)
					{
						if(splitted[y].indexOf("Won by")>-1)
						{
							var name=splitted[y-1].split("<")[0];
							
								if (game.GameCategory=="60|0")
								{
								console.log("winner name is "+name);
								}
							
								if(Accounts[ProfID].name==name)
								{
										return true;
								}
							
						}
					}
			}
		}
		
	
	
}
