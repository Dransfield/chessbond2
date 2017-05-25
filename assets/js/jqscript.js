
var myuser;
var Accounts={};
var OpenGames={};
var JoinedGames=[];
var AccountsToRetrieve={};
var AccountPromises=[];
var PrivatePromises=[];
var FollowPromises=[];
var BlockPromises=[];
var PrivateConversations={};
var PrivateMessages={};
var Follows={};
var Blocks={};
var WallPosts=[];
var GamePlaying={};
var soundVolume=5;

		subscribeToMandatoryRooms()
			var myStatus;
			var idleTimer=5*60;
			
			setInterval(function(){
				
				idleTimer=idleTimer-1;
				if(idleTimer<1)
				{
				idleTimer=5;
				
				if(myStatus!='idle')
				{
				myStatus='idle';	
				io.socket.put('/imidle',{user:MyID,idlestatus:'idle'},
					function(data){});
					}
					
					
				}
					
				
				
				
			},1000);
			
			$('div').mousemove(usrInteracted);
			$('div').mousedown(usrInteracted);
			
			var el = document.getElementsByTagName("body")[0];
			el.addEventListener("touchstart", usrInteracted, false);
			
			function usrInteracted()
			{
				idleTimer=5*60;
			if(myStatus!='active')
			{
			myStatus='active';
					io.socket.put('/imidle',{user:MyID,idlestatus:'active'},
					function(data){});
			
			}
		}
			
		io.socket.on('IdleNotification',function (data)
			{
				console.log(JSON.stringify(data));
				if(Accounts[data.user])
					{
			Accounts[data.user].idle=data.idlestatus;
			console.log(data.idlestatus);
			if(data.idlestatus=='active')
			{
//			$("#circlediv"+Accounts[data.user].name).css("background-color","green");
			$("[id='circlediv"+Accounts[data.user].name+"']").css("background-color","green");
			
			}
			if(data.idlestatus=='idle')
			{
//			$("#circlediv"+Accounts[data.user].name).css("background-color","orange");
			
			$("[id='circlediv"+Accounts[data.user].name+"']").css("background-color","orange");
			
			}
			
			}
		});
		
		io.socket.on
		('connect',function()
		{
		subscribeToMandatoryRooms()
		}
		);
		
				io.socket.on('PrivateConversationStarted', function (data)
			{
			
			console.log("adding go to chat to  "+JSON.stringify(data));
			$("#PrivateConversationDD"+data.user).empty();
			$("#PrivateConversationDD"+data.user).append("<a href='/seeprivateconversation/"+PrivateConversations[MyID][data.user].id+"' id='GoToPrivateDiv"+data.user+"'>Go To Chat</a>");
			
			
			});
				
				io.socket.on('FollowStarted', function (data)
			{
			
			
			$("#FollowDD"+data.user).empty();
			$("#FollowDD"+data.user).append("<a>Following</a>");
			
			
			});
		if($("#playervsplayer").length)
		{
			
		setupPlayervsPlayerPage();
		}
		if($("#profilepage").length)
		{
		setupProfilePage();
		}
		if($("#homepage").length)
		{
		setupHomePage();
		}
		if($("#privateconversationpage").length)
		{
		setupChatPage();
		}
		if($("#opentournamentpage").length)
		{
		setupOpenTournament();	
		}
	
	
	
	
		function subscribeToMandatoryRooms()
		{
			io.socket.get("/subscribeToRoom",{roomName:'IdleNotificationRoom'},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			io.socket.get("/subscribeToRoom",{roomName:MyID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
		
			io.socket.get("/subscribeToRoom",{roomName:'im online'},function (resData,jwres){
			//console.log(JSON.stringify(resData));
			});
		
			//io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			//console.log(JSON.stringify(resData));
			//});
		}
		
	function setupOpenTournament()
	{
		AccountsToRetrieve[MyID]=MyID;
		retrieveAccounts();
	}
	
	
	
	
	
	


	
	function setupPlayervsPlayerPage()
	{
		var roomname='/humanvshuman/'+GameID;
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
		
		$("#mousemove").mousemove(function()
	{
		
		$("#favicon").attr("href","/favicon.ico");
	});
		getWallposts(GameID).then(function(){
		retrieveGame(GameID).then(function()
		{
			AccountsToRetrieve[GamePlaying.Player1]=GamePlaying.Player1;
			AccountsToRetrieve[GamePlaying.Player2]=GamePlaying.Player2;
			AccountsToRetrieve[MyID]=MyID;
			retrieveAccounts(true).then(function()
			{
				retrievePrivatesandFollows().then(function(){
					
					
		
					
						PlayerColorOnTop='Black';
						PlayerColorOnBottom='White';
						PlayerIDOnTop=GamePlaying.Player2;
						PlayerIDOnBottom=GamePlaying.Player1;
							
						if (GamePlaying.Player2==MyID){
							PlayerIDOnBottom=GamePlaying.Player2;
							PlayerIDOnTop=GamePlaying.Player1;
							console.log("im player2");
							console.log("GamePlaying.Player1Color "+GamePlaying.Player1Color);
							if (GamePlaying.Player1Color=='White')
							{
							PlayerColorOnBottom='Black';
							PlayerColorOnTop='White';
							}
						
						}
						
						if (GamePlaying.Player1==MyID){
							console.log("im player1");
							PlayerIDOnTop=GamePlaying.Player2;
							PlayerIDOnBottom=GamePlaying.Player1;
							if (GamePlaying.Player1Color=='Black')
							{
								console.log("im black");
							
							
							PlayerColorOnBottom='Black';
							PlayerColorOnTop='White';
							}
						}
						
					var horizontalDiv=$("#playervsplayer")
				
			
				horizontalDiv.css("display","flex");
				horizontalDiv.css("align-items","flex-start");
				//=addF(overall,"horizontal","row","wrap","flex-start");
				var boardDivDiv=addFlexDiv(horizontalDiv,"bdd","column","wrap","flex-start");
				//showBoardOptions(boardDivDiv);
				
					coverall=$("<div style='background-color:white;position:fixed;height: 20%;width: 30%;top:30px;right:0px;border-style:solid;border-color:black;border-width:2;'><p>Ready to begin? (Click here to enable sound)</p></div>");
					horizontalDiv.append(coverall);
				coverall.css("z-order",9999);
				coverall.click(function(){
					EnableSound();
					coverall.detach();
					});
				
				topPlayerMarque=addFlexDiv(boardDivDiv,"topPlayerMarque","row","nowrap","space-between","center");
				topPlayerMarque.css("overflow","auto");
				TopMinutes=addSpan(topPlayerMarque,"topminutes");
				TopSeconds=addSpan(topPlayerMarque,"topseconds");
				TopMilliseconds=addSpan(topPlayerMarque,"topmilliseconds");
				topPlayerMarque.append("<img style='position:relative;' src='/images/eye2.png' height='30px'>");
				showsmallAvatar(topPlayerMarque,PlayerIDOnTop);
				showUsername(topPlayerMarque,PlayerIDOnTop);
				if (Accounts[PlayerIDOnTop])
				{
				topPlayerMarque.append(Accounts[PlayerIDOnTop].ELO);
				}
				showFlag(topPlayerMarque,PlayerIDOnTop);
				TopPingDisplay=$("<p>Ping</p>");
				topPlayerMarque.append(TopPingDisplay);
					var sideBoard=addSpan(horizontalDiv,"sideBoard");
					var boardcontainer=addFlexDiv(boardDivDiv,"boardcontainer","row","wrap","flex-start");
				
				if(Accounts[MyID])
				{
				
				for (sIter in boardSizeValues)
				{
					console.log("boardSizeValues[sIter] "+boardSizeValues[sIter].name);
					
					if (boardSizeValues[sIter].value==Accounts[MyID].BoardSize)
					{
						console.log("setting bdd to "+Accounts[MyID].BoardSize);
				//	boardDivDiv.css("width",boardSizeValues[sIter].value+"%");
					//sideBoard.css("width",(100-boardSizeValues[sIter].value)+"%");
					//resizeBoard(boardSizeValues[sIter].value);
					$("#bdd").css("width",boardSizeValues[sIter].value+"%");
					$("#boardcontainer").css("width","100%");
					$("#sideBoard").css("width",(100-boardSizeValues[sIter].value)+"%");
					}
				}
				}
				
				bottomPlayerMarque=addFlexDiv(boardDivDiv,"bottomPlayerMarque","row","nowrap","space-between","center");
				bottomPlayerMarque.css("overflow","auto");
				BottomMinutes=addSpan(bottomPlayerMarque,"bottomminutes");
				BottomSeconds=addSpan(bottomPlayerMarque,"bottomseconds");
				BottomMilliseconds=addSpan(bottomPlayerMarque,"bottommilliseconds");
				
				bottomPlayerMarque.append("<img style='position:relative;' src='/images/eye2.png' height='30px'>");
				showsmallAvatar(bottomPlayerMarque,PlayerIDOnBottom);
				showUsername(bottomPlayerMarque,PlayerIDOnBottom);
				if (Accounts[PlayerIDOnBottom])
				{
				bottomPlayerMarque.append(Accounts[PlayerIDOnBottom].ELO);
				}
				showFlag(bottomPlayerMarque,PlayerIDOnBottom);
				
				BottomPingDisplay=$("<p>Ping</p>");
				bottomPlayerMarque.append(BottomPingDisplay);
				
				boardcontainer.css("width",boardDivDiv.css("width"));
				topPlayerMarque.css("width",boardDivDiv.css("width"));
				bottomPlayerMarque.css("width",boardDivDiv.css("width"));
				
				withdrawDiv=addDiv(sideBoard);
				if (GamePlaying.Move>1 && !GamePlaying.Result)
				{
				withdrawButton=showButton(withdrawDiv,"Withdraw","KgreenElement KregularButton");
				
				withdrawButton.click(withdrawFromGame);
				withdrawDiv.css("padding","10px");
				}
				var resultTitle=$("<div><div class='label label-default' >Result: </div></div>");
				sideBoard.append(resultTitle);
				sideBoard.css("padding-left","10px");
				//resultTitle.css("padding-left","15px");
			//sideBoard.css("overflow","auto");
		resultDiv=addDiv(sideBoard,"resultsdiv");
		
         if(GamePlaying.Result)
         {resultDiv.html(GamePlaying.Result);}
         
         resultDiv.css("padding","4px");
         resultDiv.css("margin-left","8px");
         turnTakerNoticeDiv=sideBoard.append("<div class='label label-default'></div>");
		var chatDiv=addDiv(sideBoard,"chatDiv");
		chatDiv.css("padding-left","5px");
		var chatInput=addSpan(sideBoard,"chatinput");
		
			//	var chatDiv2=addFlexDiv(chatDiv,"chatDiv2","column");
		//	chatDiv2.css("overflow","auto");
			chatDiv.css("height","70%");
			chatDiv.css("overflow","auto");
	
		//	chatDiv2.css("height",boardDivDiv.css("width"));
			console.log("boardDivDiv.css('width')"+boardDivDiv.css("width"));
			for(iter in WallPosts)
					{	
					showChatMessage(chatDiv,WallPosts[iter],"none",false);
					}
				chatDiv.scrollTop(chatDiv.prop("scrollHeight"));
	
			showChatForm($("#chatinput"),GamePlaying.id,"chesschat","none");		
					io.socket.on('WallPost', function (data)
			{
			console.log("recieved wall post socket"+JSON.stringify(data));
		//	console.log("recieved wall post socket"+JSON.stringify(data[0]));
				if (document.visibilityState=='hidden')
			{
				console.log("Accounts[MyID]['SoundEnabled'] "+Accounts[MyID]['SoundEnabled']);
			if(Accounts[MyID]['SoundEnabled']=='Sound Enabled')
			{
			PlayBell();
			}
			$("#favicon").attr("href","/favicon2.ico");
			//console.log('recieved chat message'+document.visibilityState);
			}
			WallPosts.push(data);
			
			showChatMessage(chatDiv,WallPosts[(WallPosts.length-1)],"none",false);
				chatDiv.scrollTop(chatDiv.prop("scrollHeight"));
	
			//$("#favicon").attr("href","/favicon2.ico");
				//	$("#privateconversationpage").append(data.content);
			});
				//console.log(boardcontainer.prop("width"));
				console.log("bc width "+boardcontainer.css( "width" ));
				console.log("bdd width "+boardDivDiv.css("width"));
				console.log("marque width "+topPlayerMarque.css("width"));
				//console.log("Accounts[MyID].ChessPieceTheme[0] "+Accounts[MyID].ChessPieceTheme[0]);
				// board1 = ChessBoard('boardcontainer',{draggable: true,onDrop: onDrop,onSnapEnd:onSnapEnd,pieceTheme: '/img/chesspieces/'+Accounts[MyID].ChessPieceTheme[0]+'/{piece}.png'} );
		
		var myColor='white';
				 if (GamePlaying.Player1!=GamePlaying.Player2)
				{
				if (GamePlaying.Player1==MyID){
					if (GamePlaying.Player1Color=='Black')
					{
					
					myColor='black';
					
					}
				}			
				if (GamePlaying.Player2==MyID){
					if (GamePlaying.Player1Color=='White')
					{
				myColor='black';
					}
				}	
				}
		console.log("orientation "+myColor);
		game = new Chess();
		var loadBoardWith=game.fen();
		if(GamePlaying.fen)
		{
			game.load(GamePlaying.fen);
		loadBoardWith=GamePlaying.fen;
		}
		
		var cfg;
		if(Accounts[MyID])
		{
		 cfg = {
			draggable: false,
			position: loadBoardWith,
			orientation:myColor,
			onMoveEnd:myMoveEndFunc,
			pieceTheme:'/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/{piece}.png'};
		}
		else
		{
		 cfg = {
			draggable: false,
			position: loadBoardWith,
			orientation:myColor,
			onMoveEnd:myMoveEndFunc,
			pieceTheme:'/img/chesspieces/A/{piece}.png'};
		}
				board1 = new ChessBoard('boardcontainer', cfg);
		
				//{
	//	position: game.fen(),
		//orientation:myColor,
		//draggable:false,
		//eventHandlers: {
			//onPieceSelected: pieceSelected,
			//onMove: onDrop,
			//onChanged:onChangedfunc
		//}
	//});
	//$(".square-55d63").css();
	UpdateClocks(GamePlaying.Player1TimeLeft,GamePlaying.Player2TimeLeft);
	//chatDiv.css("overflow","auto");
			
					topPlayerMarque.css("width","100%");
		bottomPlayerMarque.css("width","100%");
		$("#sideBoard").css("height",$("#bdd").css("height"));
				//$("#chatDiv").css("max-height","100%");
		$("#chatDiv").css("overflow","scroll");
		//$("#chatDiv2").css("max-height","85%");
		$("#chatDiv2").css("overflow","scroll");
	if(Accounts[MyID])
	{
	for (btIter in boardThemeValues)
	{
		if (boardThemeValues[btIter].name==Accounts[MyID].BoardTheme)
		{
			
			var obj=boardThemeValues[btIter];
	$(".white-1e1d7").css("background-color",obj.whitebackground);	
		$(".black-3c85d").css("background-color",obj.blackbackground);
		}
	}
	}
	
		
				
				
			if(Accounts[MyID])
			{
				for (iter in pieceNames)
					{
							
					$("div.chess_board div.chess_player_black.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/b'+pieceNamesInitial[iter]+'.png)');
					$("div.chess_board div.chess_player_white.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/w'+pieceNamesInitial[iter]+'.png)');
						
					}
			}
				 
				init();
				var scoreDiv=addSpan($("#underboard"),"overallscore");
				$("#overallscore").html("<h2>Overall Score:"+GamePlaying.OverallScore+"</h2>");
				var capturedPiecesDiv=addFlexDiv($("#underboard"),"capturedPieces","column");
				showCapturedPieces();
				});
			});
		});
	});
	}
	
	function pieceSelected(notationSquare) {
	var i,
		movesNotation,
		movesPosition = [];

	movesNotation = game.moves({square: notationSquare, verbose: true});
	for (i = 0; i < movesNotation.length; i++) {
		movesPosition.push(ChessUtils.convertNotationSquareToIndex(movesNotation[i].to));
	}
	return movesPosition;
}

function setupProfilePage()
{
	
	AccountsToRetrieve[MyID]=MyID;
	AccountsToRetrieve[ProfID]=ProfID;
	
	//increase profile views
	
	var roomname="/profile/"+ProfID;
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
	
	io.socket.put('/LookedAtProfile',{userID:ProfID},
		function  (data){
		
		});
	
			
	
				retrieveGames([ProfID]).then(function(){
					retrieveAccounts().then(function()
					{
						retrievePrivatesandFollows().then(function()
						{			
							getWallposts(ProfID).then(function(){
				
					
					
				 
				console.log("add flexdiv");
				console.log("joined games");
				console.log(JSON.stringify(JoinedGames));
				var leftright=addFlexDiv($("#profilepage"),"leftright","row","wrap");
			leftright.css("align-items","flex-start");
			var leftcol=addFlexDiv(leftright,"leftcol","column","wrap");
			leftcol.css("width","50%");
			showUsernameJumbo(leftcol,ProfID);
			//var divv=addDiv(leftcol);
			showAvatar(leftcol,ProfID);
			if(MyID==ProfID)
			{
			showImageUploadForm(leftcol,ProfID)
			}
			
			showHeader(leftcol,2,"Highest Difficulty Level Beaten:"+Accounts[ProfID].DifficultyLevelBeaten);
			showHeader(leftcol,2,"Cumulative Rating:"+Accounts[ProfID].ELO);
			showNewGameControls(leftcol);
			showAnchorButton(leftcol,'Statistics',"/stats/"+ProfID,"KbigButton KcyanElement");
			//var tbl=addFlexDiv(leftright,"rightcol","column");
			
			
			//var tbl=showStripedTable(elem);
			
			//var tbl=addFlexDiv(leftright,'tbl',"row","wrap")
			//var tblLeft=addFlexDiv(leftright,'tblLeft',"column","wrap")
			var tblRight=addFlexDiv(leftright,'tblRight',"column","wrap")
			tblRight.css("width","50%");
			showHeader(tblRight,2,"Who am I?");
			var pairarrayone=['Profile Views:','Registered member on:','Last login:',
			'Number of times logged in:','Gender:','Date of birth:','Current City:',
			'Fide Title:<br>(Self Claimed:)','Valid Fide ID:','Fide Ratings:',
			'Profile Updated:','Speak (languages):','Countries Travelled:','Wishing to Travel:',
			'My Upcoming Trip:','Who Am I?:','How Do I Start My Day?:','Hobbies / Interests:',
			'Request / Expectation:','Favorite Music / Band:','Favorite TV Shows / Concerts:',
			'Favorite Books / Food:','Favorite Quote / Writer:','My Professional Chess Tournaments / Trainings/ Participations:',
			'My best performance in live chess tournaments:','My Live Chess Tournaments History:',
			'My other performing skills / Inspiring Sports:','My Victory Speech would be (If I became Chess Champion):',
			'My Victory Speech would be	(If I won the Nobel Prize in any category):'
			
			];
			var pairarraytwo=['ProfileViews','Registeredmemberon','LastloginPhrase',
			'Numberoftimesloggedin','Gender',
			'BirthDayTotal','CurrentCity',
			'FideTitle','FideID','FideRatings','ProfileUpdatedPhrase','SpokenLanguages',
			'CountriesTravelled','WishingToTravel','MyUpcomingTrip','WhoAmI','HowDoIStartMyDay',
			'HobbiesInterests','RequestExpectation','FavoriteMusicBand','FavoriteTVShows','FavoriteBooksFood',
			'FavoriteQuoteWriter','ProChessTournaments','MyBestChessPerformance',
			'MyLiveChessTournamentsHistory','SkillsSports','VictorySpeech','NobelSpeech'
			];
			
			
				var fideTitles=["GM","IM","FM","CM"];
			var fideSpan;
			var fideDiv;
			var fidesel;
			if(Accounts[ProfID].Gender)
			{
			if (Accounts[ProfID].Gender=="Female")
			{
				fideTitles=["WGM","WIM","WFM","WCM"];
			}	
				
			}
			
			var pairarraythree=[0,0,0,0,4,3,2,5,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
			if(Accounts[ProfID].BirthDay)
			{
			Accounts[ProfID].BirthDayTotal=Accounts[ProfID].BirthDay+"/"+Accounts[ProfID].BirthMonth+"/"+Accounts[ProfID].BirthYear;
			}
			else
			{
			Accounts[ProfID].BirthDayTotal="/ / /";	
			}
			Accounts[ProfID].LastloginPhrase=phraseforloggedindate(Accounts[ProfID].Lastlogin);
				Accounts[ProfID]['ProfileUpdatedPhrase']=phrasefordate(Accounts[ProfID]['ProfileUpdated']);
			var dateObj=new Date(Accounts[ProfID].createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();

			newdate = day+ "/"+month+"/"+year ;
			Accounts[ProfID].Registeredmemberon=newdate;
			
			
			function addvarpair(tbl,one,two,texteditable,bckgrd)
			{
			var block=addFlexDiv(tbl,two+"flex","row","nowrap","space-between");
			if (bckgrd==0)
			{block.css("background-color","#e0e0eb");}
			block.css("width","100%");
			
			//block.css("padding","10px");
			
			var myspan1=addSpan(block,one+"r");
			myspan1.html("<b>"+one+"</b>");
			//myspan1.css("width","50%");
			//console.log("one "+one);
			
			if(one=="Profile Updated:")
			{Accounts[ProfID]['Profupdatedspan']=myspan1;}
			
			if(!Accounts[ProfID][two])
			{Accounts[ProfID][two]="";}
			var myspan=addSpan(block,two);
			
			//myspan.css("width","50%");
			
			myspan.html(Accounts[ProfID][two]);
			if(MyID==ProfID)
			{
			if (texteditable==5)
				{
					fideSpan=myspan;
				var block2=addFlexDiv(tbl,two+"edit","row","wrap");
				block2.append("<span>Edit:</span>");
				fidesel=showSelect(block2,fideTitles,fideTitles,"Choose Fide");	
				fidesel.change(function()
				{
					//console.log(fidesel.val());
				Accounts[ProfID].FideTitle=JSON.parse(fidesel.val());	
				updateAccountInfo("FideTitle",MyID);
				myspan.html(JSON.parse(fidesel.val()));
				});
				}
				
			if (texteditable==4)
			{
			var block2=addFlexDiv(tbl,two+"edit","row","nowrap","space-between");
			block2.append("<span>Edit:</span>");
			var sel=showSelect(block2,["Male","Female"],["Male","Female"],"Choose Gender");	
			sel.change(function(e)
			{
				//console.log(JSON.stringify(sel));
				myspan.html(JSON.parse(sel.val()));
				Accounts[ProfID].Gender=JSON.parse(sel.val());
				updateAccountInfo("Gender",MyID);
				
				if (Accounts[ProfID].Gender=="Female")
				{
					if(!Accounts[ProfID].FideTitle.startsWith("W"))
					{
					Accounts[ProfID].FideTitle="W"+Accounts[ProfID].FideTitle;	
					}
					fidesel.empty();
					updateAccountInfo("FideTitle",MyID);
					fideSpan.html(Accounts[ProfID].FideTitle);
					fideTitles=["WGM","WIM","WFM","WCM"];
					for(witer in fideTitles)
					{
					fidesel.append("<option value='"+JSON.stringify(fideTitles[witer])+"'>"+fideTitles[witer]+"</option>");
					}
				}
				if (Accounts[ProfID].Gender=="Male")
				{
					if(Accounts[ProfID].FideTitle.startsWith("W"))
					{
					Accounts[ProfID].FideTitle=Accounts[ProfID].FideTitle.substring(1);	
					}
					fidesel.empty();
					updateAccountInfo("FideTitle",MyID);
					fideSpan.html(Accounts[ProfID].FideTitle);
					fideTitles=["GM","IM","FM","CM"];
					for(witer in fideTitles)
					{
						
					fidesel.append("<option value='"+JSON.stringify(fideTitles[witer])+"'>"+fideTitles[witer]+"</option>");
					}
				}
				
				//console.log(e.target.selectedOptions.value);
				
			});
			
			if (bckgrd==0)
			{block2.css("background-color","#e0e0eb");}
			
			}
			
			if (texteditable==3)
				{
				var block2=addFlexDiv(tbl,two+"edit","row","wrap");
				block2.append("<span>Edit:</span>");
				var days=[];
				for (i = 0; i < 32; i++) {
					days[i]=i;
				} 
				var months=["January","February","March","April","May",
				"June","July","August","September","October","November",
				"December"];
				var years=[];
					for (i = 1900; i < new Date().getFullYear(); i++) {
					years[i]=i;
				} 
				var daysel=showSelect(block2,days,days,"Choose Day");	
				var monthsel=showSelect(block2,months,months,"Choose Month");	
				var yearsel=showSelect(block2,years,years,"Choose Year");	
				
				daysel.change(function()
				{
				Accounts[ProfID].BirthDay=JSON.parse(daysel.val());	
				updateAccountInfo("BirthDay",MyID);
				updatebirth();
				});
				monthsel.change(function()
				{
				Accounts[ProfID].BirthMonth=JSON.parse(monthsel.val());	
				updateAccountInfo("BirthMonth",MyID);
				updatebirth();
				});
				yearsel.change(function()
				{
				Accounts[ProfID].BirthYear=JSON.parse(yearsel.val());	
				updateAccountInfo("BirthYear",MyID);
				updatebirth();
				});
				function updatebirth()
				{
				myspan.html(Accounts[ProfID].BirthDay+"/"+Accounts[ProfID].BirthMonth+"/"+Accounts[ProfID].BirthYear);	
				}
				
			}
			if (texteditable==2)
				{
			
				var block2=addFlexDiv(tbl,two+"city","row","wrap","space-between");
				
				if (bckgrd==0)
				{block2.css("background-color","#e0e0eb");}
				var resultSpan=addSpan(block2);
				var inp=showInput(block2);	
				inp.keydown(function(event)
				{
				console.log("changed text input"+$(this).val()+event.key);
				getCities($(this).val()+event.key).then(values=>{
					console.log("promise resolved");
				console.log(JSON.stringify(values));
				
				var cityarr=[];
				for (myiter in values)
				{
				cityarr.push(values[myiter].city);
				}
				resultSpan.empty();
				var citysel=showSelect(resultSpan,cityarr,cityarr,"matched cities")
				
				
				citysel.change(function(){
				myspan.html(JSON.parse(citysel.val()));	
				Accounts[ProfID]['CurrentCity']=JSON.parse(citysel.val());
				updateAccountInfo('CurrentCity',MyID);
				});
				
				
				});
				
				});
					
				}
			
			if (texteditable==1)
			{
			
			var block2=addFlexDiv(tbl,two+"edit","row","nowrap");
			
			/*if(bckgrd==0)
			{bckgrd=1;}
			else
			{bckgrd=0;}
			*/
			if (bckgrd==0)
			{block2.css("background-color","#e0e0eb");}
			
			showTextwithInput(block2,two,myspan);	
			}
			
			}
			}
			/*
			function addvarpair(tbl,one,two,texteditable)
			{
			var tr=$("<tr></tr>");
			tbl.append(tr);
			var td=$("<td></td>");
			tr.append(td);
			td.append(" "+one+" ");
			td=$("<td></td>");
			tr.append(td);
			var myspan=addSpan(td,two);
			
			if(!Accounts[ProfID][two])
			{Accounts[ProfID][two]="";}
			myspan.html(Accounts[ProfID][two]);
			
			
			if (texteditable==1)
			{
			showTextwithInput(td,two,myspan);	
			}
			}
			*/
			var bck=0;
			for (variter in pairarrayone)
			{
				
			addvarpair(tblRight,pairarrayone[variter],pairarraytwo[variter],pairarraythree[variter],bck);
			if (bck==0)
			{bck=1;}
			else
			{bck=0;}
			
			}
			
			var flagSpan=addSpan(leftright);
			var flagsel=showSelect(flagSpan,countries,countries,"Choose your country");
			flagsel.css("height","25%");
			flagSpan.css("width","100%");
			
			showFlag(flagSpan,ProfID)
			flagsel.change(
			function()
			{
				console.log(countryToFilename(flagsel.val()));
				console.log(flagsel.val());
			flagimage.attr("src","/images/flatflags/"+countryToFilename(flagsel.val())+".png");
				Accounts[ProfID]['Country']=flagsel.val();
				updateAccountInfo('Country',MyID);
			}
			
			)
			
			var games=3;
			showRecentGames(leftcol,ProfID);
			leftcol.css("align-items","flex-start");
			var chatDiv=addFlexDiv(leftcol,"chatdiv","column",'wrap');
			chatDiv.css("align-items","flex-start");
			showChatForm(chatDiv,ProfID,"wall","none");
			//console.log(JSON.stringify(WallPosts));
			for(iter in WallPosts)
					{	
					var thisDiv=addFlexDiv(chatDiv,WallPosts[iter].id,"column");
					var del=false;
					if(MyID==ProfID)
					{del=true;}
					showChatMessage(thisDiv,WallPosts[iter],"none",true,del);
					}
					
					
					io.socket.on('WallPost', function (data)
			{
			console.log("recieved wall post socket"+JSON.stringify(data));
		//	console.log("recieved wall post socket"+JSON.stringify(data[0]));
			
			WallPosts.push(data);
				if (document.visibilityState=='hidden')
			{
				console.log("Accounts[MyID]['SoundEnabled'] "+Accounts[MyID]['SoundEnabled']);
			if(Accounts[MyID]['SoundEnabled']=='Sound Enabled')
			{
			PlayBell();
			}
			$("#favicon").attr("href","/favicon2.ico");
			//console.log('recieved chat message'+document.visibilityState);
			}
			if(WallPosts[(WallPosts.length-1)].replyto=='none')
			{
				var thisDiv=addFlexDiv(chatDiv,WallPosts[(WallPosts.length-1)].id,"column");
			showChatMessage(thisDiv,WallPosts[(WallPosts.length-1)],"none",true);
			}
			else
			{
					var replydiv=addFlexDiv($("#"+WallPosts[(WallPosts.length-1)].replyto),43,"column");
						replydiv.css("padding-left","20%");
			showChatMessage(replydiv,WallPosts[(WallPosts.length-1)],WallPosts[(WallPosts.length-1)].replyto,false);
			}
			
			//$("#favicon").attr("href","/favicon2.ico");
				//	$("#privateconversationpage").append(data.content);
			});
		if(Accounts[MyID].Invisible)
		{
			console.log("IM INVISIBLE");
		}
			});
			
		});
		});
		});
		
		
}

function retrievePrivatesandFollows()
	{
	addPrivatePromises();
	addFollowPromises();
	addBlockPromises();
	return Promise.all(FollowPromises,PrivatePromises,BlockPromises);
	}
	
function setupChatPage()
{
	$("#closechat").click(function()
	
	{
		console.log("close chat");
		$("#privateconversationpage").slideUp();
			io.socket.post("/leftprivateconversation",{grpid:convID,leaver:MyID},
			function onSuccess (){
			//$scope.chatInput = null;
			
			//io.socket.post('/newnotification',{reciever:groupid,msg:'New '+msgtype+' Recieved',adr:address},
			//function (resData, jwRes) {
				
				//});
			
			}
			);
		}
	);
	$("#mousemove").mousemove(function()
	{
		
		$("#favicon").attr("href","/favicon.ico");
	});
	var roomname="/privateconversation/"+convID;
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
	
	
	io.socket.on('personleft',function(data){
		console.log(JSON.stringify(data));
		showPersonLeft($("#privateconversationpage"),data);
	});
	io.socket.on('WallPost', function (data)
			{
			console.log("recieved wall post socket");
		
			showChatMessage($("#privateconversationpage"),data,"none",false);
			//console.log("document.visibilityState "+document.visibilityState);
			if (document.visibilityState=='hidden')
			{
				console.log("Accounts[MyID]['SoundEnabled'] "+Accounts[MyID]['SoundEnabled']);
			if(Accounts[MyID]['SoundEnabled']=='Sound Enabled')
			{
			PlayBell();
			}
			$("#favicon").attr("href","/favicon2.ico");
			//console.log('recieved chat message'+document.visibilityState);
			}
			
			
		$("#privateconversationpage").scrollTop($("#privateconversationpage").prop("scrollHeight"));
				//	$("#privateconversationpage").append(data.content);
			});
				
			
			

io.socket.get("/privateconversation",{id:convID},
	function (resData,jwres){
		console.log(JSON.stringify(resData));
		AccountsToRetrieve[resData.Talker1]=resData.Talker1;
		AccountsToRetrieve[resData.Talker2]=resData.Talker2;
		
		retrieveAccounts().then(function()
		{
			retrievePrivatesandFollows().then(function()
			{ 
				getWallposts(convID).then(function(){
				
					for(iter in WallPosts)
					{	
					showChatMessage($("#privateconversationpage"),WallPosts[iter],"none",false);
					}
					$("#privateconversationpage").scrollTop($("#privateconversationpage").prop("scrollHeight"));
		
					renderChatPage();
					
				})
			})
		})	
	});
	

		
		
		
	
	
	
	

	
}


function SendWallPost(Myid,groupid,msgtype,address,msg,replyto)
		{
			var none='none';
			
			io.socket.post("/newwallpost",{ReplyTo:replyto,content:msg,sender:Myid,grpid:groupid,messagetype:msgtype},
			function onSuccess (){
			//$scope.chatInput = null;
			
			//io.socket.post('/newnotification',{reciever:groupid,msg:'New '+msgtype+' Recieved',adr:address},
			//function (resData, jwRes) {
				
				//});
			
			}
			);
			
			
			
	}
	
function getWallposts(grpID)
{
	
var cg = new Promise
((resolve, reject) => {
io.socket.get("/wallpost?limit=39999",{groupid:grpID},
	function (resData,jwres){
		console.log("got wall posts"+JSON.stringify(resData));
		for (iter in resData)
		{
		WallPosts.push(resData[iter]);
		}
resolve();
});
});
return cg;
}

function retrieveGame(gameid)
{
var cg = new Promise
((resolve, reject) => {
		io.socket.get("/chessgame",{id:gameid},
		function (resData,jwres){
	
			//console.log(JSON.stringify(resData));
		//	console.log(resData);
		
			//console.log("joined games persons[x]");
			//console.log(JSON.stringify(JoinedGames[persons[x]][0]));
			//console.log(JSON.stringify(JoinedGames[persons[x]][1]));
			//console.log(JSON.stringify(JoinedGames[persons[x]]['0'][1]));
			GamePlaying=resData;
			resolve(resData);
		});		
});

return cg;
}


function retrieveGames(persons)
{
	var PromiseArray=[];
	for (x in persons)
	{
	//	console.log("persons[x] "+persons[x]);
var cg = new Promise
((resolve, reject) => {
		io.socket.get("/chessgame",{or:[{'Player1':persons[x]},{'Player2':persons[x]}],limit:30000},
		function (resData,jwres){
			
			
			
			resData.sort(function(b,a)
			{
			//	console.log(a.createdAt);
			//	console.log(new Date(a.createdAt).getTime());
				return (new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime());
				}
			
			);
			JoinedGames[persons[x]]=[];
			//console.log(JSON.stringify(resData));
		//	console.log(resData);
			for (y in resData)
			{
			JoinedGames[persons[x]].push(resData[y]);
			AccountsToRetrieve[resData[y].Player1]=resData[y].Player1;
			AccountsToRetrieve[resData[y].Player2]=resData[y].Player2;
			
			//console.log("resdata");
			//console.log(JSON.stringify(resData[y]));
			}	
		
			//console.log("joined games persons[x]");
			//console.log(JSON.stringify(JoinedGames[persons[x]][0]));
			//console.log(JSON.stringify(JoinedGames[persons[x]][1]));
			//console.log(JSON.stringify(JoinedGames[persons[x]]['0'][1]));
			resolve(resData);
		});		
});
PromiseArray.push(cg);	

}
return Promise.all(PromiseArray);

}

function setupHomePage()
{
	AccountsToRetrieve[MyID]=MyID;
var opcg = new Promise
((resolve, reject) => {
	io.socket.get("/openchessgame?limit=3000",{},
	function (resData,jwres){
		resolve(resData);
	});
});
		

Promise.all([opcg, retrieveGames([MyID])]).then(values => { 
	OpenGames=values[0];
	//JoinedGames=values[1];
	console.log("TWO NAVBARS");
	AccountsToRetrieve[MyID]=MyID;
	for (x in OpenGames)
	{
	AccountsToRetrieve[values[0][x].Player1]=values[0][x].Player1;
	}
	//console.log(JSON.stringify(values[1]));
	//console.log(JSON.stringify(JoinedGames));
	//console.log("opengames");
	//console.log(JSON.stringify(OpenGames));
	/*
	if(JoinedGames[0])
	{
	for (x in JoinedGames)
	{
	AccountsToRetrieve[values[1][x].Player1]=values[1][x].Player1;
	AccountsToRetrieve[values[1][x].Player2]=values[1][x].Player2;
	}
	}
	*/
	retrieveAccounts().then(function()
		{
			retrievePrivatesandFollows().then(function()
			{ 
			renderHomePage();
			});
		});
	

	
	
});

}


function retrieveAccount(usracc,func,boardscreen=false)
{
	var acctPromise = new Promise(function(resolve, reject) {
  io.socket.get('/user/'+usracc,
		function(usr)
		{
			myuser=usr;
			//console.log(JSON.stringify(myuser));
			Accounts[usr.id]=usr;
			
			//showUsername($("#usr"),usr.id);
			//$("#usr").html(Accounts[usr.id].name);
			console.log("do navbar? "+MyID+" "+usr.id);
				if (MyID==usr.id)
				{
				showNavbar($("#navbar"),MyID,boardscreen);
				}
				
				if(usr)
				{
				console.log("creating dropdown for "+usr.id+" "+usr.name);
				CreateDropDown(usr.id);
				}
				 Accounts[usr.id]=usr;
				resolve(usr);
		}
		);
	
});

return acctPromise;
}

function retrieveFollowed(usracc)
{

	
		
	  var followPromise = new Promise(function(resolve, reject) {
	  
	  
	  io.socket.get("/follow",{followed:usracc},
						function (pc) {
						//console.log("recieved private conversation"+JSON.stringify(pc));
						//console.log("found "+pc.length+" private conversations for "+thisguy+" "+thisguysname);
						if(pc)
						{
							if (pc.length==0)
							{
							addBeginFollow(usracc);
							}	
						}	
						
						if(!pc)
						{
						addBeginFollow(usracc);
						}
						
							for (y in pc)
							{
					
							//console.log("Talker1"+pc[x].Talker1);
							//console.log("Talker2"+pc[x].Talker2);
							
							var otherPerson=pc[y].followed;
							console.log("pc "+JSON.stringify(pc[y]));
								if(Accounts[otherPerson])
								{
							
								console.log("about to addfollowed");
									Follows[otherPerson]=pc[y];
									addFollowed(otherPerson);
									
									
					
								}
							
							
							
							
							}
						resolve(pc);
					});
	  
	});
	return followPromise;
}

function retrievePrivate()
{

	privatePromise = new Promise(function(resolve, reject) {
	  
	  
	  	io.socket.get("/privateconversation",{or:[{Talker1:MyID},{Talker2:MyID}],limit:30000},
						function (pc) {
						//console.log("recieved private conversation"+JSON.stringify(pc));
						//console.log("found "+pc.length+" private conversations for "+thisguy+" "+thisguysname);
						
						
							for (y in pc)
							{
					
							//console.log("Talker1"+pc[x].Talker1);
							//console.log("Talker2"+pc[x].Talker2);
							
							if(!PrivateConversations[MyID])
							{
							PrivateConversations[MyID]={};
							}
					
							var otherPerson;
							var otherPersonsName;
							
							if(MyID==pc[y].Talker1)
							{
							PrivateConversations[MyID][pc[y].Talker2]=pc[y];
							otherPerson=pc[y].Talker2;
							if (Accounts[pc[y].Talker2])
							{
							otherPersonsName=Accounts[pc[y].Talker2].name;
							}
							}
							else
							{
							PrivateConversations[MyID][pc[y].Talker1]=pc[y];	
							otherPerson=pc[y].Talker1;
							if (Accounts[pc[y].Talker1])
							{
							otherPersonsName=Accounts[pc[y].Talker1].name;
							}
							}
				
							if(Accounts[otherPerson])
							{
							
								if(PrivateConversations[MyID])
								{
									if(PrivateConversations[MyID][otherPerson])
									{
									console.log("about to add see chat for  "+otherPerson+" "+otherPersonsName);
									addSeeChat(otherPerson);
									}
									
					
								}
							
							}
							
							
						}
						
							for (x in Accounts)
							{
								if(Accounts[x])
								{
									if(Accounts[x].id)
									{
										if(!PrivateConversations[MyID][Accounts[x].id])
										{
										addBeginChat(Accounts[x].id);
										}
									}	
								}
							}
						
						
						resolve(pc);
					});
	  
	});
	
	
	return privatePromise;
	
}

function retrieveAccounts(boardscreen=false)

{
	for (x in AccountsToRetrieve)
	{
	console.log("account to retrieve "+AccountsToRetrieve[x]);
	addAccountPromise(AccountsToRetrieve[x],boardscreen);
	}
	
	
return Promise.all(AccountPromises)

	
}

function addBlocked(usracc)
{
				DropDowns[usracc]['block'].empty();
				DropDowns[usracc]['block'].append("<a>UnBlock</a>");
				DropDowns[usracc]['block'].click({usracc:usracc},clickBlock);
	
}


function addFollowed(usracc)
{
	console.log("add followed "+usracc);
	PrivateconText="<a >Following</a>";
					
	DropDowns[usracc]['Foll'].append(PrivateconText);
}
function addSeeChat(usracc)
{
	console.log("adding see chat for "+usracc);
	PrivateconText=$("<a href='/seeprivateconversation/"+PrivateConversations[MyID][usracc].id+"'>Go To Chat</a>");
					
	DropDowns[usracc]['Priv'].append(PrivateconText);
}

function clickBlock(event)
{
	var usracc=event.data.usracc;
					DropDowns[usracc]['block'].empty();
					DropDowns[usracc]['block'].append("<a>Processing..</a>");
				io.socket.get('/block',{blocker:MyID,blocked:usracc},
							function (resData, jwRes) {
				//				console.log(usracc);
				//console.log(event.usracc);
				console.log(JSON.stringify(resData));
				if(!resData || resData.length==0)
					{
						
					io.socket.post('/block',{blocker:MyID,blocked:usracc},
							function (resData2, jwRes2) {
							//	console.log("resData[0].id "+resData2.id);
								Blocks[MyID][usracc]=resData2;
								DropDowns[usracc]['block'].empty();
								DropDowns[usracc]['block'].append("<a>UnBlock</a>");
								});
					}
					else
					{
					
						io.socket.post('/block/destroy/'+resData.id,{id:resData.id},
							function (resData2, jwRes2) {
								console.log(jwRes2);
							
								console.log("resData[0].id "+resData2.id);
								Blocks[MyID][usracc]=null;
								DropDowns[usracc]['block'].empty();
								DropDowns[usracc]['block'].append("<a>Block</a>");
								});
					
						
					}
					
	});
}

function addBeginBlock(usracc)
{
	DropDowns[usracc]['block'].empty();
DropDowns[usracc]['block'].append("<a>Begin Block</a>");
				DropDowns[usracc]['block'].click({usracc:usracc},clickBlock);
				
}

function addBeginChat(usracc)
{
	
DropDowns[usracc]['BeginChat']=$("<a id='StartPrivateDiv"+usracc+"'>Begin Chat</a>");
				DropDowns[usracc]['Priv'].append(DropDowns[usracc]['BeginChat']);
				DropDowns[usracc]['BeginChat'].click(function(){
					$("#PrivateConversationDD"+usracc).empty();
					$("#PrivateConversationDD"+usracc).append("<a>Processing..</a>");
					io.socket.post('/privateconversation',{Talker1:MyID,Talker2:usracc},
							function (resData, jwRes) {
								console.log("resData[0].id "+resData.id);
								PrivateConversations[MyID][usracc]=resData;
								io.socket.post('/startprivateconversation',{Talker1:MyID,Talker2:usracc},
							function (resData, jwRes) {
								console.log("resData[0].id "+resData.id);
								
								});
					
								});
					
					
					});
	


}
function addBeginFollow(usracc)
{
	
DropDowns[usracc]['BeginFoll']=$("<a id='StartFollowDiv"+usracc+"'>Follow</a>");
				DropDowns[usracc]['Foll'].append(DropDowns[usracc]['BeginFoll']);
				DropDowns[usracc]['BeginFoll'].click(function(){
					$("#FollowDD"+usracc).empty();
					$("#FollowDD"+usracc).append("<a>Processing..</a>");
					io.socket.post('/follow',{follower:MyID,followed:usracc},
							function (resData, jwRes) {
								console.log("resData[0].id "+resData.id);
								Follows[usracc]=resData;
								io.socket.post('/startfollow',{follower:MyID,followed:usracc},
							function (resData, jwRes) {
								console.log("resData[0].id "+resData.id);
								
								});
					
								});
					
					
					});
	
	
	
	
}
function addAccountPromise(usracc,boardscreen=false)
{
AccountPromises.push(new Promise((resolve, reject) => {
	 io.socket.get('/user/'+usracc,
		function(usr)
		{
			myuser=usr;
			//console.log(JSON.stringify(myuser));
			Accounts[usr.id]=usr;
			
			//showUsername($("#usr"),usr.id);
			//$("#usr").html(Accounts[usr.id].name);
			console.log("do navbar? "+MyID+" "+usr.id);
				if (MyID==usr.id)
				{
				showNavbar($("#navbar"),MyID,boardscreen);
				}
				
				if(usr)
				{
				console.log("creating dropdown for "+usr.id+" "+usr.name);
				CreateDropDown(usr.id);
				}
				 
				resolve(usr);
		}
		);
	}));
}

function addPrivatePromises()
{
	//console.log("addprivatepromises func");
	/*
	for (x in Accounts)
	{
		if(Accounts[x])
		{
			if(Accounts[x].id)
			{
				*/
		PrivatePromises.push(new Promise((resolve,reject)=>{
					//var thisguy=Accounts[x].id;
					//var thisguysname=Accounts[x].name;
					
					//console.log("requesting private conversations for "+thisguy+" "+thisguysname);
					io.socket.get("/privateconversation",{or:[{Talker1:MyID},{Talker2:MyID}],limit:30000},
						function (pc) {
						//console.log("recieved private conversation"+JSON.stringify(pc));
						//console.log("found "+pc.length+" private conversations for "+thisguy+" "+thisguysname);
						if(!PrivateConversations[MyID])
							{
							PrivateConversations[MyID]={};
							}
						
							for (y in pc)
							{
					
							//console.log("Talker1"+pc[x].Talker1);
							//console.log("Talker2"+pc[x].Talker2);
							
							
					
							var otherPerson;
							var otherPersonsName;
							
							if(MyID==pc[y].Talker1)
							{
							PrivateConversations[MyID][pc[y].Talker2]=pc[y];
							otherPerson=pc[y].Talker2;
							if (Accounts[pc[y].Talker2])
							{
							otherPersonsName=Accounts[pc[y].Talker2].name;
							}
							}
							else
							{
							PrivateConversations[MyID][pc[y].Talker1]=pc[y];	
							otherPerson=pc[y].Talker1;
							if (Accounts[pc[y].Talker1])
							{
							otherPersonsName=Accounts[pc[y].Talker1].name;
							}
							}
				
							if(Accounts[otherPerson])
							{
							
								if(PrivateConversations[MyID])
								{
									if(PrivateConversations[MyID][otherPerson])
									{
									console.log("about to add see chat for  "+otherPerson+" "+otherPersonsName);
									addSeeChat(otherPerson);
									}
									
					
								}
							
							}
							
							
						}
						
							for (x in Accounts)
							{
								if(Accounts[x])
								{
									if(Accounts[x].id)
									{
										if(!PrivateConversations[MyID][Accounts[x].id])
										{
										addBeginChat(Accounts[x].id);
										}
									}	
								}
							}
						
						
						resolve(pc);
					});
				}));
	
}

function getCities(TypedCity)
{
	console.log("TypedCity "+TypedCity);
	var cg = new Promise
((resolve, reject) => {
io.socket.get("/city",{where:{'city':{'startsWith':TypedCity}}},
	function (resData,jwres){
		console.log(resData);
		//console.log($scope.TypedCity);
		for (x in resData)
		{
		
		resData[x].city=capitalizeFirstLetter(resData[x].city);	
		}
		
			FoundCities=resData;
		resolve(resData);
		
		});
		});	
		return cg;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addBlockPromises()
{
	//console.log("addprivatepromises func");
	
	for (x in Accounts)
	{
		if(Accounts[x])
		{
			if(Accounts[x].id)
			{
		BlockPromises.push(new Promise((resolve,reject)=>{
					var thisguy=Accounts[x].id;
					var thisguysname=Accounts[x].name;
				//	console.log("requesting private conversations for "+thisguy+" "+thisguysname);
					io.socket.get("/block",{blocker:MyID,blocked:thisguy},
						function (pc) {
						//console.log("recieved private conversation"+JSON.stringify(pc));
						//console.log("found "+pc.length+" private conversations for "+thisguy+" "+thisguysname);
						if(pc)
						{
							if (pc.length==0)
							{
							addBeginBlock(thisguy);
							}	
						}	
						
						if(!pc)
						{
						addBeginBlock(thisguy);
						}
						
							for (y in pc)
							{
					
							//console.log("Talker1"+pc[x].Talker1);
							//console.log("Talker2"+pc[x].Talker2);
							
							var otherPerson=pc[y].blocked;
							console.log("pc "+JSON.stringify(pc));
								if(Accounts[otherPerson])
								{
							
								console.log("about to add blocked");
									Blocks[otherPerson]=pc[y];
									addBlocked(otherPerson);
									
									
					
								}
							
							
							
							
							}
						resolve(pc);
					});
				}));
	}}}
	
}

function addFollowPromises()
{
	//console.log("addprivatepromises func");
	
	for (x in Accounts)
	{
		if(Accounts[x])
		{
			if(Accounts[x].id)
			{
		FollowPromises.push(new Promise((resolve,reject)=>{
					var thisguy=Accounts[x].id;
					var thisguysname=Accounts[x].name;
					
				//	console.log("requesting private conversations for "+thisguy+" "+thisguysname);
					io.socket.get("/follow",{follower:MyID,followed:thisguy},
						function (pc) {
						//console.log("recieved private conversation"+JSON.stringify(pc));
						//console.log("found "+pc.length+" private conversations for "+thisguy+" "+thisguysname);
						if(pc)
						{
							if (pc.length==0)
							{
							addBeginFollow(thisguy);
							}	
						}	
						
						if(!pc)
						{
						addBeginFollow(thisguy);
						}
						
							for (y in pc)
							{
					
							//console.log("Talker1"+pc[x].Talker1);
							//console.log("Talker2"+pc[x].Talker2);
							
							var otherPerson=pc[y].followed;
							console.log("pc "+JSON.stringify(pc));
								if(Accounts[otherPerson])
								{
							
								console.log("about to addfollowed");
									Follows[otherPerson]=pc[y];
									addFollowed(otherPerson);
									
									
					
								}
							
							
							
							
							}
						resolve(pc);
					});
				}));
	}}}
}

function renderChatPage()
	{
	console.log("renderchatpage");
		showChatForm($("#chatinput"),convID,"Private Conversation","none");
		
	}
	
function renderHomePage()
	{
		
	showOpenGameList($("#usr"),OpenGames);
	showRecentGames($("#usr"),MyID);
	
	$("#newGameControls").css("text-align","center");
	showWebsiteNameJumbo($("#newGameControls"))
	
	showNewGameControls($("#newGameControls"));
	
	io.socket.on('newmygameevent', function (data)
			{
			console.log('recieved new game event '+data);
			
			data.phrase=phrasefordate(data.createdAt);
			JoinedGames[MyID].push(data);
			//addJoinedGame(games.length-1,games,myelem);
			addGamesToRecentGames2(MyID);
		$(location).attr('href', '/humanvshumannew/'+data.id);
			
			});
	
	}







