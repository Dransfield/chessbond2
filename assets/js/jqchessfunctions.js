
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
      'symbol','uscf','dilena','wikipedia','leipzig','metro',
		'original',
      'A1','A2','B1','B2','C1','C2','D1','D2','E1','E2'
    ];
   var boardThemeNames=['original'];
   var boardThemeValues=
      [{name:'original',whitebackground:'#f0d9b5',whiteforeground:'#b58863',blackbackground:'#b58863',blackforeground:'#f0d9b5'}];
  /*
.whiteoriginal {
  background-color: #f0d9b5;
  color: #b58863;
}

.blackoriginal {
  background-color: #b58863;
  color: #f0d9b5;
}

 edde9b

.whiteA1
{
 background-color:#fbe2db;
}

.blackA1
{
 background-color:#901d78;
}

.whiteA2
{
background-color:#f09ba0;
}

.blackA2
{
background-color:#0093dd;
}

.whiteB1
{
background-color:#f6e2ee;
}

.blackB1
{
background-color:#5e6f89;
}

.whiteB2
{
background-color:#fffcc7;
}

.blackB2
{
background-color:#da251c;
}
.whiteC1
{
background-color:#d3b49f;
}

.blackC1
{
background-color:#71625b;
}
.whiteC2
{
background-color:#ffffff;
}

.blackC2
{
background-color:#1f1a17;
}
.whiteD1
{
background-color:#b2b5aa;
}

.blackD1
{
background-color:#613005;
}
.whiteD2
{
background-color:#e8c312;
}

.blackD2
{
background-color:#0093dd;
}
.whiteE1
{
background-color:#bab3d5;
}

.blackE1
{
background-color:#070e79;
}

.whiteE2
{
background-color:#ffffcb;
}

.blackE2
{
background-color:#fe9900;
}


.whitesymbol{
  background-color: #FFFFFF;
  color: #58AC8A;
}
.blacksymbol{
  background-color: #58AC8A;
  color: #EFEFEF;
}

.whiteuscf{
  background-color: #C3C6BE;
  color: #AAAAAA;
}
.blackuscf{
  background-color: #727FA2;
  color: #EFEFEF;
}

.whitedilena{
  background-color: #FFE5B6;
  color: #AAAAAA;
}
.blackdilena{
  background-color: #B16228;
  color: #EFEFEF;
}



.whitewikipedia{
  background-color: #D18B47;
  color: #AAAAAA;
}
.blackwikipedia{
  background-color: #FFCE9E;
  color: #EFEFEF;
}

.whiteleipzig{
  background-color: #FFFFFF;
  color: #AAAAAA;
}
.blackleipzig{
  background-color: #E1E1E1;
  color: #EFEFEF;
}


.whitemetro{
  background-color: #FFFFFF;
  color: #AAAAAA;
}
.blackmetro{
  background-color: #EFEFEF;
  color: #EFEFEF;
}
*/

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

function updateStatus(game,move)
{
	//console.log("update status");
GamePlaying.fen=game.fen();
GamePlaying.lastmove=move.from+move.to;


//updateTurnTakerLabel(game);
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
