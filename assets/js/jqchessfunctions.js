
changeOverallScore=function(piece,colour)
    {
    if (piece)
    
    {piece=piece.toUpperCase();
    if (colour=='b')
		{

		GamePlaying.OverallScore-=$scope.piecevalues[piece];
		}
		else
		{
		GamePlaying.OverallScore+=$scope.piecevalues[piece];	
		}
	}
	}
	
	 function onDrop(source, target) {
  
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
							$scope.Showcapturedpiece(move.captured,move.color,true);
							
							
							
						if (GamePlaying.Player1==me)
							{
								GamePlaying.Player1Moved='true';
								$scope.ShowWithdrawButton=false;
							}
						if (GamePlaying.Player2==me)
							{
								GamePlaying.Player2Moved='true';
								$scope.ShowWithdrawButton=false;
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
