
var boardEl;
		var board1 ;
var squareClass = 'square-55d63';
  var squareToHighlight;
  boardEl = $('#boardcontainer');
var game;

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

 var  boardorientations = [
        {id: '1', name: 'Left',value:'Left'},
	  {id: '2', name: 'Right',value:'Right'}
          ];
var   piecethemes = [
      'A','B','C','D','E','F','G','H'
    ];
var     soundvolumes=[0,1,2,3,4,5,6,7,8,9,10];
 var     boardthemes = [
      'symbol','uscf','dilena','wikipedia','leipzig','metro','original',
      'A1','A2','B1','B2','C1','C2','D1','D2','E1','E2'
    ];
  var   previousboardtheme='original';
  //  boardcontainerstyle="col-sm-7 col-md-6";
   var   boardsizes = [
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

changeOverallScore=function(piece,colour)
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
	var onSnapEnd = function() {};
	 function onDrop(source, target) {
  
							if (usersTurn(game,MyID)===false)
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
					  
					  if (move === null || GamePlaying.Result){
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
						    
						  
						   return 'snapback';
						   }
							GamePlaying.Move+=1;
							ChangeOverallScore(move.captured,move.color);
							Showcapturedpiece(move.captured,move.color,true);
							
							
							
						if (GamePlaying.Player1==me)
							{
								GamePlaying.Player1Moved='true';
								ShowWithdrawButton=false;
							}
						if (GamePlaying.Player2==me)
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
					updateStatus(game,move);
};

function updateStatus(game,move)
{
	//console.log("update status");
GamePlaying.fen=game.fen();
GamePlaying.lastmove=move.from+move.to;

/*
if (game.turn()=='b')
{
	//console.log("WhiteInterval "+WhiteInterval);
	clearInterval(WhiteInterval);
	clearInterval(BlackInterval);
	StartBlackClock();
	}
	else
	{
	clearInterval(WhiteInterval);
	clearInterval(BlackInterval);
	StartWhiteClock();
		
		
	}
*/
updateTurnTakerLabel(game);
updatePlayersLabel(game);
//game.load(gameRecord.fen);

//console.log("put chessgame result is :"+GamePlaying.Result);
//console.log("put chessgame move is :"+GamePlaying.Move);
//console.log("put chessgame captured whites:"+GamePlaying.capturedWhitepieces);
//console.log("put chessgame captured Blacks:"+GamePlaying.capturedBlackpieces);



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
