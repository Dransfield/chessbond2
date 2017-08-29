
var myuser;
var userIndex=0;
var Accounts={};
var Albums={};
var OpenGames={};
var JoinedGames=[];
var AccountsToRetrieve={};
var AccountPromises=[];
var PrivatePromises=[];
var FollowPromises=[];
var BlockPromises=[];
var WallPostPromises=[];
var NotificationPromise;
var PrivateConversations={};
var PrivateMessages={};
var Follows={};
var Blocks={};
var Bookmarks={};
var WallPosts=[];
var WallPostsToRetrieve=[];
var Reports=[];
var GamePlaying={};
var soundVolume=5;
var UploadedImages=[];
var BannedWords=[];
var Notifications=[];
var OthersVisits=[];
var OwnersVisits=[];
var mypics=[];

var NavbarDropDown;
		subscribeToMandatoryRooms();
		updateWholeSiteVisit();
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
		
		io.socket.on('notification',function(data)
			{
				console.log(JSON.stringify(data));
				Notifications.push(data);
				$("#NumberofNotificationsSpan").html(Notifications.length);
				
				var noti=$("<span ><li style='list-style-position: inside; cursor:pointer;color:black'>"+data.msg+"</li></span>");
				noti.click({thisadr:data.adr},visitNotification);
				NavbarDropDown.append(noti);
				NavbarDropDown.append("<hr>");
				
			});
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
		//subscribeToMandatoryRooms();
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
		if($("#justloggedinpage").length)
		{
		setupJustLoggedInPage();
		}
		if($("#messagespage").length)
		{
		setupMessagesPage();
		}
		if($("#albumspage").length)
		{
		setupAlbumsPage();
		}
		if($("#albumpage").length)
		{
		setupAlbumPage();
		}
		if($("#profilepage").length)
		{
		setupProfilePage();
		}
		if($("#homepage").length)
		{
		setupHomePage();
		}
		if($("#statspage").length)
		{
		setupStatsPage();
		}
		if($("#adminpage").length)
		{
		setupAdminPage();
		}
		if($("#privateconversationpage").length)
		{
		setupChatPage();
		}
		if($("#opentournamentpage").length)
		{
		setupOpenTournament();	
		}
		if($("#textpage").length)
		{
		setupTextPage();	
		}
	
	
		function updateWholeSiteVisit()
		{
			io.socket.get("/wholesitevisit",{person:MyID,theDate:new Date()},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
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
	
	function setupTextPage()
	{
		AccountsToRetrieve[MyID]=MyID;
		retrieveAccounts();
	}
	
	
	
	function createalbum()
	{
		
		//console.log("pressed create album button");
	if(!Accounts[MyID].Invisible)
	{
	io.socket.post('/newalbum', { name:"New Album" ,user:MyID},
    function (resData, jwr) {

     // $scope.getalbums(id);
		toastr.success('Created New Album');
    });
	}
	else
	{
		toastr.warning('Disabled Account',"Can't create new album");
	}
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
	retrieveBannedWords().then(function(){
		getWallposts(GameID,30000).then(function(){
		retrieveGame(GameID).then(function()
		{
			AccountsToRetrieve[GamePlaying.Player1]=GamePlaying.Player1;
			AccountsToRetrieve[GamePlaying.Player2]=GamePlaying.Player2;
			AccountsToRetrieve[MyID]=MyID;
			
				retrievePrivatesandFollows().then(function(){
					
					
		retrieveAccounts(true).then(function()
			{
					
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
	
	io.socket.put('/LookedAtProfile',{userID:ProfID,visitor:MyID,myip:ipadd},
		function  (data){
		
		});
	
			
	retrieveBannedWords().then(function()
	{
				retrieveGames([ProfID]).then(function()
				{
					
						 retrieveOthersProfileVisits(ProfID,25).then(function()
						 {
							 	 retrieveOwnersProfileVisits(ProfID,25).then(function()
						 {
							
						
							
								retrievePrivatesandFollows().then(function()
								{	
									retrieveAccounts().then(function()
									{		
										getWallposts(ProfID,30000).then(function()
										{
						
					
					
				 
											console.log("add flexdiv");
											console.log("joined games");
											console.log(JSON.stringify(JoinedGames));
											var leftright=addFlexDiv($("#profilepage"),"leftright","row","wrap");
										leftright.css("align-items","flex-start");
										var leftcol=addFlexDiv(leftright,"leftcol","column","wrap");
										leftcol.css("width","50%");
										
										var nameAndBookmark=addFlexDiv(leftcol,"nameAndBookmark","row","nowrap");
										showUsernameJumbo(nameAndBookmark,ProfID);
									//	nameAndBookmark.append("<img style='width:50px;height:50px;' src='/images/bookmrk.png'></img>");
									//	nameAndBookmark.append("<img style='width:75px;height:75px;' src='/images/bookmrk.png'></img>");
										
										
										function purpleButton(){
										var bookmarkImg=$("<img id='bookmarkImg' style='width:100px;height:100px;' src='/images/bookmrk.png'></img>");
										nameAndBookmark.append(bookmarkImg);
										bookmarkImg.click(function()
										{
											
										$(this).animate({width: "300px",height:"300px"}, 1500 )
										.animate({width:"100px",height:"100px"},1500);
										
										
										setTimeout(function(){
											io.socket.post("/bookmark",{bookmarker:MyID,observed:ProfID},function(res)
											{
												toastr.success("Bookmark Added");
												$("#bookmarkImg").detach();
												redButton();
												}
											);
											},3000);
										
											
										});
										}
										
										function redButton()
										{
											var bookmarkImg=$("<img id='bookmarkImg' style='width:100px;height:100px;' src='/images/bookmrkdone.png'></img>");
										nameAndBookmark.append(bookmarkImg);
										
										
										bookmarkImg.click(function()
										{
											
										$(this).animate({width: "300px",height:"300px"}, 1500 )
										.animate({width:"100px",height:"100px"},1500);
										
										
										setTimeout(function(){
											for(bIter in bookmarks)
											{
											if (bookmarks[bIter].observed==ProfID && bookmarks[bIter].bookmarker==MyID)
											{
											io.socket.post("/bookmark/destroy",{id:bookmarks[bIter].id},function(res)
											{
												console.log(res);
												toastr.success("Bookmark Removed");
												$("#bookmarkImg").detach();
												purpleButton();
												}
											);
											}
											}
											},3000);
											
										});	
											
										}
										
										var foundBookmark=false;
										
										for (bIter in bookmarks)
										{
										if (bookmarks[bIter].observed==ProfID)	
											{
												foundBookmark=true;
											}
										}
										if(foundBookmark==false)
										{
										purpleButton();
										}
										else
										{
											
										redButton();
										}
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
										showAnchorButton(leftcol,'Albums',"/albums/"+ProfID,"KbigButton KcyanElement");
										
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
			console.log("calling phrase for date2"+Accounts[ProfID]['updatedAt']);
				Accounts[ProfID]['ProfileUpdatedPhrase']=phrasefordate(Accounts[ProfID]['updatedAt']);
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
					{
					block2.css("background-color","#e0e0eb");
					}
					
				var resultSpan=addSpan(block2);
			//	var inp=showInput(block2);	
			var inp=$("<input type='text' autocomplete='off' class='form-control' placeholder='' name='name' >");
				block2.append(inp);
					inp.keydown({inny:inp},function(event)
					{
						try{
							setTimeout(function(){
							console.log("changed text input"+event.data.inny.val());
								getCities(event.data.inny.val()).then(values=>{
								
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
							
							},70);
						}
					
						catch(err)
						{
						io.socket.post("/recenterror",{msg:err.message,line:err.lineNumber,thefile:err.fileName},function(res1,res2)
						{});
						}
						finally {
						}
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
			flagSpan.css("width","100%");
			var flagimage=showFlag(flagSpan,ProfID);
			if(ProfID==MyID)
			{
			var flagsel=showSelect(flagSpan,countries,countries,"Choose your country");
			flagsel.css("height","25%");
			
			flagsel.change(
			function()
			{
				console.log(countryToFilename(flagsel.val()));
				console.log(flagsel.val());
			
				Accounts[ProfID]['Country']=flagsel.val();
				updateAccountInfo('Country',MyID);
				flagimage.attr("src","/images/flatflags/"+countryToFilename(Accounts[ProfID]['Country'])+".png");
			
			}
			
			);
		}
	//	io.socket.get("/sitevisit?limit=25&sort=createdAt%20DESC",
//	function (resData,jwres){
	//	console.log(resData);
		//showVisitorsGraph(leftright);//,resData);
		
	showVisitorsTable(leftright,OwnersVisits);
			 
	showVisitorsTable(leftright,OthersVisits);
			 
		
	
		
				
		
		//});
			var games=3;
			showRecentGames(leftcol,ProfID);
			leftcol.css("align-items","flex-start");
			showHeader(tblRight,2,"Comment Wall");
			var chatDiv=addFlexDiv(tblRight,"chatdiv","column",'wrap');
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
				var del=false;
					if(MyID==ProfID)
					{del=true;}
			showChatMessage(thisDiv,WallPosts[(WallPosts.length-1)],"none",true,del);
			}
			else
			{
					var replydiv=addFlexDiv($("#"+WallPosts[(WallPosts.length-1)].replyto),43,"column");
						replydiv.css("padding-left","20%");
						var del=false;
					if(MyID==ProfID)
					{del=true;}
					replydiv.attr("id",WallPosts[(WallPosts.length-1)].id);
						//showChatMessage(replydiv,WallPosts[iter],msg.id,true,del);
			showChatMessage(replydiv,WallPosts[(WallPosts.length-1)],WallPosts[(WallPosts.length-1)].replyto,true,del);
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
		});
	});
});
}


function retrievePrivatesandFollows()
	{
	
	var p1=addFollowPromises();
	
	var p2=addBlockPromises();
	
	var p3=addPrivatePromises();
	var p4=addBookmarkPromises();
	return Promise.all([p1,p2,p3,p4]);
	}
	
function retrievePrivateRangeandFollows(index,amt)
	{
	return Promise.all([addFollowPromises(),addBlockPromises(),addPrivatePromiseRange(index,amt),addBookmarkPromises()]);
	}
	
function setupAdminPage()
{
	
		AccountsToRetrieve[MyID]=MyID;
		 retrieveBannedWords().then(function()
		 {
		
		io.socket.get("/avatar?sort=createdAt%20DESC",{},function(resData2,res2){
			for (iter2 in resData2)
			{
				AccountsToRetrieve[resData2[iter2].user]=resData2[iter2].user;
				UploadedImages[resData2[iter2].id]=(resData2[iter2]);
			}
		
		
		retrieveReports().then(function()
		{
			RetrieveWallPostsFromList().then(function()
			{
			//	retrieveAllVisits().then(function()
			//	{
					retrieveAccounts().then(function()
					{
					renderAdminPage();
					});
			//	});
			});
		
		});
});
});
}

function renderStatsPage()
{
	
	showStatTable($("#statspage"));
	
}

function setupAlbumsPage()
{

	AccountsToRetrieve[MyID]=MyID;
	AccountsToRetrieve[ProfID]=ProfID;
	retrievePrivatesandFollows().then(function()
				{	
					retrieveAccounts().then(function()
					{
						retrieveAlbums(ProfID).then(function()
						{
						
						showHeader($("#albumspage"),1,"Albums:");
						
						if(ProfID==MyID)
						{
							var newalbumbut=showButton($("#albumspage"),"New Album","KgreenElement KregularButton");
							newalbumbut.click(createalbum);
							var albumList=$("<div></div>");
							$("#albumspage").append(albumList);
							for (iter in Albums)
							{
							albumList.append($("<div><h2><a href='/album/"+Albums[iter].id+"'>"+Albums[iter].name+"</a></h2></div>"));	
							}
							
							io.socket.on('madealbum', function (data)
								{
									albumList.append($("<div><h2><a href='/album/"+data.id+"'>"+data.name+"</a></h2></div>"));	
							
								});
						}
						
						});
					});
				});
					
}

function renderAlbumPage(alb)
{
	console.log("render func"+iter);
						var nameHeader=showHeader($("#albumpage"),1,alb.name);
						if(alb.user==MyID)
						{
						showGenericTextwithInput($("#albumpage"),"name",nameHeader,alb.name,updateAlbumName,alb.id)
						showHeader($("#albumpage"),3," Upload more photos"); 
						showImageUploadForm($("#albumpage"),MyID,alb.id);
						}
						var displayFlex=addFlexDiv($("#albumpage"),"re","row");
						
						var imgIndex=0;
						
							var leftbut=showButton(displayFlex,"<  ("+0+")","KgreenElement KhugeButton");
							console.log(leftbut.attr("id"));
							var leftbuttonnumber=ButtonNumber;
								var middleSpan=addSpan(displayFlex);
							middleSpan.css("position","relative");
							middleSpan.css("left","0");
							middleSpan.css("top","0");
							middleSpan.append("<img src='/img/frame.jpg' style='position:relative;width:600px'>");
						var imgelem=$("<img id='imageyouarelookingfor' style='position:absolute;top:0px;left:149px;width:300px;height:200px' src='/user/avatar/"+mypics[0].id+"'>");
						middleSpan.append(imgelem);
							var rightbut=showButton(displayFlex,">("+(mypics.length-1)+")","KgreenElement KhugeButton");
							
							var rightbuttonnumber=ButtonNumber;
							//console.log("button"+thisbuttonnumber);
							
							
						
						
							
					rightbut.click(function()
					{
						if (imgIndex<mypics.length-1)
						{
						imgIndex=imgIndex+1;
								$("#imageyouarelookingfor").attr("src","/user/avatar/"+mypics[imgIndex].id);
								$("#dateSpan").empty();
						$("#dateSpan").append("Created at "+mypics[imgIndex].phrase);
						$("#descSpan").empty();
						var theText=showHeader($("#descSpan"),3,mypics[imgIndex].description);
						showGenericTextwithInput($("#descSpan"),"description",theText,mypics[imgIndex].description,updatePicDescription,mypics[imgIndex].id)
						//$(this).val(">("+(mypics.length-imgIndex)+")");
						//$("#button"+ButtonNumber).val("ass");
						$("#button"+rightbuttonnumber).text(">("+((mypics.length-imgIndex)-1)+")");
						$("#button"+leftbuttonnumber).text("<  ("+imgIndex+")");
							
							var setAvatarButton=showButton(descSpan,"Set image as avatar","KgreenElement KregularButton");
						
						setAvatarButton.click(function(){
							setAvatar(MyID,mypics[imgIndex].id);
						});
							
							}
						});						
						
						
						leftbut.click(function()
							{
								if (imgIndex>0)
								{
								imgIndex=imgIndex-1;
								$("#imageyouarelookingfor").attr("src","/user/avatar/"+mypics[imgIndex].id);
								$("#dateSpan").empty();
								$("#dateSpan").append("Created at "+mypics[imgIndex].phrase);
								$("#descSpan").empty();
								var theText=showHeader($("#descSpan"),3,mypics[imgIndex].description);
								showGenericTextwithInput($("#descSpan"),"description",theText,mypics[imgIndex].description,updatePicDescription,mypics[imgIndex].id)
						
									//$("#leftbut").val(">("+imgIndex+")");
										$("#button"+rightbuttonnumber).text(">("+((mypics.length-imgIndex)-1)+")");
						
									$("#button"+leftbuttonnumber).text("<  ("+imgIndex+")");
									
									var setAvatarButton=showButton(descSpan,"Set image as avatar","KgreenElement KregularButton");
						
									setAvatarButton.click(function(){
									setAvatar(MyID,mypics[imgIndex].id);
									});
								}
							});
												
						var rightSpan=addFlexDiv(displayFlex,"rightspan","column");
						
						var dateSpan=addSpan(rightSpan,"dateSpan");
						dateSpan.empty();
						dateSpan.append("Created at "+mypics[imgIndex].phrase);
						console.log("mypics[iter].description "+mypics[0].description);
						showHeader(rightSpan,1,"Description");
						var descSpan=addSpan(rightSpan,"descSpan");
						var theText=showHeader(descSpan,3,mypics[0].description);
						if(alb.user==MyID)
						{
						showGenericTextwithInput(descSpan,"description",theText,mypics[0].description,updatePicDescription,mypics[0].id)
						
						var setAvatarButton=showButton(descSpan,"Set image as avatar","KgreenElement KregularButton");
						
						setAvatarButton.click(function(){
							setAvatar(MyID,mypics[imgIndex].id);
						});
						
						}
	
}

function setupAlbumPage()
{

	AccountsToRetrieve[MyID]=MyID;
	
	retrievePrivatesandFollows().then(function()
				{	
					retrieveAccounts().then(function()
					{
						retrieveAlbum(ProfID).then(function()
						{
						//var correctAlbum;
						//console.log(Albums);
						//for (iter in Albums)
						//{
						//	console.log(Albums[iter]);
						if(Albums.id==ProfID)
						{
						//	correctAlbum=iter;
						retrieveAvatars(Albums.id).then(function(){
						renderAlbumPage(Albums);
						});
						
						}
					//});
							
							/*
	<div class="btn btn-lg btn-success" ng-show="picIndex>0" ng-click="GetOlderPics(mypics[picIndex].id)"><</div>
	
	<span style="position:relative;left:0;top:0;">
	<img src="/img/frame.jpg" style="position:relative;width:600px">
	<img style="position:absolute;top:3px;left:99px;width:400px" ng-src="/user/avatar/{{mypics[picIndex].id}}">
	</span>
		<div ng-show="picIndex<(mypics.length-1)" class="btn btn-lg btn-success" ng-click="GetMorePics(mypics[picIndex].id)">Next Picture ({{((mypics.length-1)-picIndex)}})</div>

	<span>
	Created at {{mypics[picIndex].phrase}}<br>
	<span ng-show="User.id==Album.user">
		<button ng-click="editfideid=!editfideid" class="btn btn-sml">.Edit Description..
						</button>
		 <input  ng-show="editfideid" type="text"  class="form-control"  ng-change="ChangeAvatar('description',mypics[picIndex].id,mypics[picIndex].description)" ng-model="mypics[picIndex].description" />
	</span>
	<br>
	<span style="border-style:inset">
	{{mypics[picIndex].description}}
	</span>
	<br>
	<button ng-click="SetAvatar('<%-req.session.passport.user%>',mypics[picIndex].id)" type="submit" class="btn btn-lg btn-success">Use this image as avatar</button>
	<br>
	
	<button ng-click="DeleteAvatar(mypics[picIndex].id,mypics[picIndex].avatarFd)" type="submit" class="btn btn-sml btn-success">Delete Image</button>
	
	
	</span>
			
	
	
	</div>
						*/
						//}
						//}
						
					});
				});
					
});
}

function setupStatsPage()
{
	AccountsToRetrieve[MyID]=MyID;
	AccountsToRetrieve[ProfID]=ProfID;
	retrieveGames([ProfID]).then(function(){
				retrievePrivatesandFollows().then(function()
						{	
					retrieveAccounts().then(function()
					{
						
							
							renderStatsPage();		
						});
					});
				});
}

function setupChatPage()
{
	//addFlexDiv(elem,id,direction,wrap,jcontent,aItems)
	var overallDiv=addFlexDiv($("#privateconversationpage"),"overallDiv","row","nowrap","flex-start","flex-start");
				overallDiv.css("max-height","100vh");
				var  leftColumn=addFlexDiv(overallDiv,"leftColumn","column");
				leftColumn.css("border-style","solid");
				leftColumn.css("flex-grow","1");
				//leftColumn.css("width:33%");
				leftColumn.append("Talking to:");
				//var rightFlex=addFlexDiv(overallDiv,"rightFlex","column","nowrap","flex-start","flex-start");
			var rightFlex=addFlexDiv(overallDiv,"rightFlex","column");
				rightFlex.css("height","95%");
		
			//	var msgSpan=addSpan(rightflex,"msgSpan");
				rightFlex.css("flex-grow","2");
			//	msgSpan.css("overflow-y","scroll");
				
				var msgbox=addSpan(rightFlex,"msgbox");
				
					msgbox.css("overflow-y","scroll");
				//msgbox.css("overflow-y","auto");
				//msgbox.css("overflow","auto");
				msgbox.css("height","80%");
				msgbox.css("width","100%");
				var inputbox=addSpan(rightFlex);
				
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
		showPersonLeft(msgbox,data);
	});
	
	io.socket.on('WallPost', function (data)
			{
			console.log("recieved wall post socket");
		
			showChatMessage(msgbox,data,"none",false);
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
			
			
		msgbox.scrollTop(msgbox.prop("scrollHeight"));
				//	$("#privateconversationpage").append(data.content);
			});
				
			
			
retrieveBannedWords().then(function()
{
io.socket.get("/privateconversation",{id:convID},
	function (resData,jwres){
		console.log(JSON.stringify(resData));
		AccountsToRetrieve[resData.Talker1]=resData.Talker1;
		AccountsToRetrieve[resData.Talker2]=resData.Talker2;
		AccountsToRetrieve[MyID]=MyID;
		
		
			retrievePrivatesandFollows().then(function()
			{ 
				retrieveAccounts().then(function()
				{
					
					getWallposts(convID,34).then(function()
					{
				
				
					var otherPerson;
					
					if(resData.Talker1==MyID)
					{otherPerson=resData.Talker2;}
					
					if(resData.Talker2==MyID)
					{otherPerson=resData.Talker1;}
					
				//retrievePersonsVisits(otherPerson,1).then(function(){
				
				
					for(iter in WallPosts)
					{	
					showChatMessage(msgbox,WallPosts[iter],"none",false);
					}
					msgbox.scrollTop(msgbox.prop("scrollHeight"));
					
					
				//	console.log(otherPerson);
					 showUsernameJumbo(leftColumn,otherPerson);
					showAvatar(leftColumn,otherPerson);
					//console.log(Visits[0]);
					if(Accounts[otherPerson].lastTimeVisitedWholeSite)
					{
					leftColumn.append("Last visited:"+phrasefordate(Accounts[otherPerson].lastTimeVisitedWholeSite));
					}
					//console.log(inputbox);
					showFlag(leftColumn,otherPerson);
					leftColumn.append(Accounts[otherPerson].Country);
					renderChatPage(inputbox);
					
					})
				//})
			})
		})	
	});
	});

		
		
		
	
	
	
	

	
}


function SendWallPost(Myid,groupid,msgtype,address,msg,replyto,intendedfor)
		{
			var none='none';
			
			io.socket.post("/newwallpost",{ReplyTo:replyto,content:msg,sender:Myid,grpid:groupid,messagetype:msgtype,intendedFor:intendedfor},
			function onSuccess (){
			//$scope.chatInput = null;
			
			//io.socket.post('/newnotification',{reciever:groupid,msg:'New '+msgtype+' Recieved',adr:address},
			//function (resData, jwRes) {
				
				//});
			
			}
			);
			
			
			
	}


function getWallpostsFromPersonFromGroup(personFrom,grpid)
{
	
var cg = new Promise
((resolve, reject) => {
io.socket.get("/wallpost",{groupid:grpid,limit:1,sender:personFrom,sort:"createdAt DESC"},
	function (resData,jwres){
		//console.log("got wall posts"+JSON.stringify(resData));
		for (iter in resData)
		{
		WallPosts.push(resData[iter]);
		WallPosts[iter].content=censor(WallPosts[iter].content);
		}
resolve(resData);
});
});
return cg;
}


function getWallposts(grpID,num_of_posts)
{
	
var cg = new Promise
((resolve, reject) => {
io.socket.get("/wallpost",{groupid:grpID,limit:num_of_posts,sort:"createdAt DESC"},
	function (resData,jwres){
		//console.log("got wall posts"+JSON.stringify(resData));
		for (iter in resData)
		{
		WallPosts.push(resData[iter]);
		WallPosts[iter].content=censor(WallPosts[iter].content);
		}
resolve(resData);
});
});
return cg;
}

function RetrieveWallPostsFromList()

{
	for (x in WallPostsToRetrieve)
	{
	addWallPostPromise(WallPostsToRetrieve[x]);
	}
	
	
return Promise.all(WallPostPromises)

	
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

function setupJustLoggedInPage()
{
	AccountsToRetrieve[MyID]=MyID;
	retrieveAccounts().then(function()
		{
			io.socket.get("/ijustloggedin",{acc:MyID,loginTime:new Date()},
				function (resData,jwres){
				window.location.replace('/profile/'+MyID);
				});
		});
}

/*
function setupMessagesPage()
{
	AccountsToRetrieve[MyID]=MyID;
	
		retrieveBannedWords().then(function()
		{
			
			//retrievePrivateRangeandFollows(0,2).then(values => { 
			retrievePrivatesandFollows().then(function(){
			//	console.log("retrieved privates and follows");
			//	console.log(values);
				//console.log(PrivateConversations[MyID]);
				for (iter in PrivateConversations[MyID]) 
					{
						AccountsToRetrieve[PrivateConversations[MyID][iter].Talker1]=PrivateConversations[MyID][iter].Talker1;
						AccountsToRetrieve[PrivateConversations[MyID][iter].Talker2]=PrivateConversations[MyID][iter].Talker2;
					}
					
				//	for (iter in PrivateConversations[MyID]) 
					//	{
							//console.log('/msgroom/'+PrivateConversations[MyID][iter].id);
					//io.socket.get("/subscribeToRoom",{roomName:'/msgroom/'+PrivateConversations[MyID][iter].id},function (resData,jwres){
					//	io.socket.get("/subscribeToRoom",{roomName:MyID},function (resData,jwres){
						
						//console.log(JSON.stringify(resData));
					//	});
					//	}
					retrieveAccounts().then(function()
					{
					//console.log("retrieved accounts");
					
					//addFlexDiv(elem,id,direction,wrap,jcontent,aItems)
					var overallDiv=addFlexDiv($("#messagespage"),"overallDiv","row","nowrap","flex-start","flex-start");
					//overallDiv.css("max-height","100vh");
				//	var  leftColumn=addFlexDiv(overallDiv,"leftColumn","column");
					//leftColumn.css("border-style","solid");
				*/
				/*
					var peoplebox=addSpan(leftColumn,"peoplebox");
					
					peoplebox.css("overflow-y","scroll");
					peoplebox.css("height","80%");
					leftColumn.css("flex-grow","1");
					//leftColumn.css("width:33%");
					peoplebox.append("Talking to:");
				*/
					//var rightFlex=addFlexDiv(overallDiv,"rightFlex","column","nowrap","flex-start","flex-start");
				/*
					var rightFlex=addFlexDiv(overallDiv,"rightFlex","column");
					rightFlex.css("height","95%");
				 rightFlex.css("flex-grow","2");
				*/
				//	var msgSpan=addSpan(rightflex,"msgSpan");
					
				//	msgSpan.css("overflow-y","scroll");
					/*
					var msgbox=addSpan(rightFlex,"msgbox");
					
					msgbox.css("overflow-y","scroll");
				
					msgbox.css("height","80%");
					msgbox.css("width","100%");
					
					var inputbox=addSpan(rightFlex);
					inputbox.attr('id','inputbox');
					//showChatForm(inputbox,0,"Perm Message","none");
				
						io.socket.on('seenmessage', function (data)
						{
						setTimeout(function(){
							console.log("recieved seen message and timed out");
						$("#msgheader"+data).css("background-color","lightgreen");
						},2000);
						});
						
					
				
					for (iter in PrivateConversations[MyID]) 
						{
							var ava;
							var otherperson;
							
							if(MyID!=PrivateConversations[MyID][iter].Talker1)
							{
							otherPerson=PrivateConversations[MyID][iter].Talker1;
							}
						
							if(MyID!=PrivateConversations[MyID][iter].Talker2)
							{
							otherPerson=PrivateConversations[MyID][iter].Talker2;
							}
							
							var ava=showUserIdentity(peoplebox,otherPerson);
							//msgbox.empty();
							//console.log(msgbox);
							//console.log(msgbox.attr('id'));
							
							ava.click({person:otherPerson},getMessages);
							
					
							//console.log('/msgroom/'+PrivateConversations[MyID][iter].id);
						io.socket.get("/subscribeToRoom",{roomName:'/msgroom/'+PrivateConversations[MyID][iter].id},function (resData,jwres){
						console.log(JSON.stringify(resData));
						});
						
					
							
						//console.log(PrivateConversations[MyID][iter].Talker1);
						}
						
						
						getMessages();
						
					//	var showUserDiv=addFlexDiv(leftColumn,"showuserDiv","row","nowrap");
					//	var leftBut=showButton(showUserDiv,"<","KgreenElement KregularButton");
					//	leftBut.click({userAmt:2,peoplediv:peoplebox,msgrecepticle:msgbox},showPrevUsers);
					//	showUserDiv.append("----");
					//	var rightBut=showButton(showUserDiv,">","KgreenElement KregularButton");
					//	rightBut.click({userAmt:2,peoplediv:peoplebox,msgrecepticle:msgbox},showUsers);
						
				});
			});
		});
}
*/
function setupMessagesPage()
{
	AccountsToRetrieve[MyID]=MyID;
	
		retrieveBannedWords().then(function()
		{
			
			
			retrievePrivatesandFollows().then(function(){
		
				for (iter in PrivateConversations[MyID]) 
					{
						AccountsToRetrieve[PrivateConversations[MyID][iter].Talker1]=PrivateConversations[MyID][iter].Talker1;
						AccountsToRetrieve[PrivateConversations[MyID][iter].Talker2]=PrivateConversations[MyID][iter].Talker2;
//					console.log("private conversation found "+PrivateConversations[MyID][iter].id);
					}
					
				
					retrieveAccounts().then(function()
					{
				
					var overallDiv=addFlexDiv($("#messagespage"),"undermsgbox","row","nowrap","flex-start","flex-start");
				
						
					
					var msgbox=addSpan(overallDiv,"msgbox");
					
					msgbox.css("overflow-y","scroll");
				
					msgbox.css("height","80%");
					msgbox.css("width","100%");
					
					var inputbox=addSpan(overallDiv);
					inputbox.attr('id','inputbox');
					//showChatForm(inputbox,0,"Perm Message","none");
				
						io.socket.on('seenmessage', function (data)
						{
						setTimeout(function(){
							console.log("recieved seen message and timed out");
						$("#msgheader"+data).css("background-color","lightgreen");
						},2000);
						});
						
					
				
					for (iter in PrivateConversations[MyID]) 
						{
							var ava;
							var otherperson;
							
							if(MyID!=PrivateConversations[MyID][iter].Talker1)
							{
							otherPerson=PrivateConversations[MyID][iter].Talker1;
							}
						
							if(MyID!=PrivateConversations[MyID][iter].Talker2)
							{
							otherPerson=PrivateConversations[MyID][iter].Talker2;
							}
							
						//	var ava=showUserIdentity(overallDiv,otherPerson);
						
							
						//	ava.click({person:otherPerson},getMessages);
							
					
							
						io.socket.get("/subscribeToRoom",{roomName:'/msgroom/'+PrivateConversations[MyID][iter].id},function (resData,jwres){
						console.log(JSON.stringify(resData));
						});
						
					
							
					
						}
						
						
						getMessages();
						
				
				});
			});
		});
}

function showPrevUsers(event)
{
	userIndex=userIndex-event.data.userAmt;
	//console.log(userIndex);
	event.data.peoplediv.html("");
	PrivateConversations[MyID]={};
	retrievePrivateRangeandFollows(userIndex,event.data.userAmt).then(function()
					{
				for (iter in PrivateConversations[MyID]) 
					{
						AccountsToRetrieve[PrivateConversations[MyID][iter].Talker1]=PrivateConversations[MyID][iter].Talker1;
						AccountsToRetrieve[PrivateConversations[MyID][iter].Talker2]=PrivateConversations[MyID][iter].Talker2;
					}
					/*
					for (iter in PrivateConversations[MyID]) 
						{
							//console.log('/msgroom/'+PrivateConversations[MyID][iter].id);
					io.socket.get("/subscribeToRoom",{roomName:'/msgroom/'+PrivateConversations[MyID][iter].id},function (resData,jwres){
						console.log(JSON.stringify(resData));
						});
						}
						*/
				retrieveAccounts().then(function()
					{
					for (iter in PrivateConversations[MyID]) 
						{
							
							var otherperson;
							event.data.peoplediv.append("<p></p><p></p><p></p>");
							if(MyID!=PrivateConversations[MyID][iter].Talker1)
							{
							otherPerson=PrivateConversations[MyID][iter].Talker1;
							}
						
							if(MyID!=PrivateConversations[MyID][iter].Talker2)
							{
							otherPerson=PrivateConversations[MyID][iter].Talker2;
							}
							
							var ava=showUserIdentity(event.data.peoplediv,otherPerson);
							ava.click({person:otherPerson,msgrecepticle:event.data.msgrecepticle},getMessages);
							
						//console.log(PrivateConversations[MyID][iter].Talker1);
						}
						//var rightBut=showButton(event.data.peoplediv,">","KgreenElement KregularButton");
						//rightBut.click({userAmt:2,peoplediv:event.data.peoplediv},showUsers);
					});
					
					});
}


function showUsers(event)
{
	userIndex=userIndex+event.data.userAmt;
	//console.log(userIndex);
	event.data.peoplediv.empty();
	PrivateConversations[MyID]={};
	retrievePrivateRangeandFollows(userIndex,event.data.userAmt).then(function()
					{
				for (iter in PrivateConversations[MyID]) 
					{
						AccountsToRetrieve[PrivateConversations[MyID][iter].Talker1]=PrivateConversations[MyID][iter].Talker1;
						AccountsToRetrieve[PrivateConversations[MyID][iter].Talker2]=PrivateConversations[MyID][iter].Talker2;
					}
				/*
					for (iter in PrivateConversations[MyID]) 
						{
							console.log('/msgroom/'+PrivateConversations[MyID][iter].id);
					io.socket.get("/subscribeToRoom",{roomName:'/msgroom/'+PrivateConversations[MyID][iter].id},function (resData,jwres){
						console.log(JSON.stringify(resData));
						});
						}
				*/
				retrieveAccounts().then(function()
					{
					for (iter in PrivateConversations[MyID]) 
						{
							var ava;
							var otherperson;
							event.data.peoplediv.append("<p></p><p></p><p></p>");
							if(MyID!=PrivateConversations[MyID][iter].Talker1)
							{
							otherPerson=PrivateConversations[MyID][iter].Talker1;
							}
						
							if(MyID!=PrivateConversations[MyID][iter].Talker2)
							{
							otherPerson=PrivateConversations[MyID][iter].Talker2;
							}
							
							
							
							var ava=showUserIdentity(event.data.peoplediv,otherPerson);
							ava.click({person:otherPerson,msgrecepticle:event.data.msgrecepticle},getMessages);
						//	ava.click({person:otherPerson,msgrecepticle:event.data.msgrecepticle},getMessages);
							
						//console.log(PrivateConversations[MyID][iter].Talker1);
						}
						//var rightBut=showButton(event.data.peoplediv,">","KgreenElement KregularButton");
						//rightBut.click({userAmt:2,peoplediv:event.data.peoplediv},showUsers);
					});
					
					});
}
//function getMessages(usracc,msgbox)

function getMessages(event)
{
	var usracc;
	if (event)
	{
	usracc=event.data.person;
	}
	
	
	var msgbox=$("#msgbox");
	console.log("GET MESSAGES");
	//console.log("msgbox2 "+msgbox[0]);
	//event.data.msgrecepticle.empty();
	msgbox.empty();
	WallPosts=[];
	
	
	if(!usracc)
	{
		$("#chatformspan").detach();
			var promiseList=[];

		for (myIter in PrivateConversations[MyID])
		{
			
			if(MyID!=PrivateConversations[MyID][myIter].Talker1)
			{
				otherPerson=PrivateConversations[MyID][myIter].Talker1;
			}
							
			if(MyID!=PrivateConversations[MyID][myIter].Talker2)
			{
				otherPerson=PrivateConversations[MyID][myIter].Talker2;
			}
			
			promiseList.push(getWallpostsFromPersonFromGroup(otherPerson,PrivateConversations[MyID][myIter].id));
				
				
		}
		
		Promise.all(promiseList).then(function(values) { 
		console.log(values[1]);
		//console.log(JSON.stringify(values));
		
			for (iter in values)
			{
				for (otherIter in values[iter])
				{
				
				showIdentMessage(msgbox,values[iter][otherIter],true);
				}
			}
			
			
				});
	
		
		
	}
	if (usracc)
	{
	var conv;
	var backBut=showButton(msgbox,"Back","KgreenElement KregularButton");
				
				backBut.click(function(){getMessages()});
				
		
	for (iter in PrivateConversations[MyID])
	{
		console.log(PrivateConversations[MyID][iter]);
		console.log(usracc);
		console.log(MyID);
		if((PrivateConversations[MyID][iter].Talker1==usracc && PrivateConversations[MyID][iter].Talker2==MyID) || (PrivateConversations[MyID][iter].Talker2==usracc && PrivateConversations[MyID][iter].Talker1==MyID))
		{
			
			
			conv=PrivateConversations[MyID][iter];
			console.log("iter1 "+iter);
			showIdentMessages(iter,PrivateConversations[MyID][iter].id,15,usracc,msgbox);
			
		}
	}
}
}

function showIdentMessages(iter,convid,msgsToShow,otherPerson,msgbox)
{
	getWallposts(convid,msgsToShow).then(values=>
			{
				for (messageIter in values)
				{
				showIdentMessage(msgbox,values[messageIter],false);
				}
				$("#chatformspan").detach();
				var chatDivv=$("<div></div>");
				showChatForm(chatDivv,values[0].groupid,"Perm Message","none",otherPerson);
				$("#undermsgbox").append(chatDivv);
			})
}

function showIdentMessage(elem,msgobj,clickable)
{
	var ava=	showUserIdentity(elem,msgobj.sender,msgobj.id);
				var textSpan=addSpan(ava);
				if (clickable)
				{
				ava.click({person:msgobj.sender},getMessages);
				}
				textSpan.append(msgobj.content);
				textSpan.css("border-style","solid");
				//textSpan.css("border","2px");
				textSpan.css("margin","6px");
				textSpan.css("flex-grow","5");
				
				textSpan.hover(function(){
					$(this).css("background-color", "yellow");
					}, function(){
					$(this).css("background-color", "pink");
				});
			
				var buttonSpan=addFlexDiv(ava,"buttons"+msgobj.id,"column");
				var delbut=showButton(buttonSpan,"X","KredElement KregularButton");
				
				delbut.click({msgid:msgobj.id},deleteidentmessage);
	
}
function deleteidentmessage(event)
			{
				$("#ident"+event.data.msgid).slideUp();
			/*	io.socket.put('/wallpost/destroy',{id:event.data.msgid},
				function  (data){
				});
			*/
			io.socket.post('/wantstodeletemessage',{id:event.data.msgid,deleter:MyID},function(data){
			});
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
	retrievePrivatesandFollows().then(function()
			{ 
	retrieveAccounts().then(function()
		{
			
			renderHomePage();
			});
		});
	

	
	
});

}

function retrieveAlbum(albid)
{
	
		//console.log("get albums "+usracc);
	var albumPromise = new Promise(function(resolve, reject) {
  io.socket.get("/album",{id:albid},
		function(alb)
		{
			Albums=alb;
			//console.log(JSON.stringify(alb));
			//console.log(usracc);
				resolve(alb);
		}
		);
	
});

return albumPromise;
	
}

function retrieveAlbums(usracc)
{
	console.log("get albums "+usracc);
	var albumPromise = new Promise(function(resolve, reject) {
  io.socket.get("/album",{user:usracc},
		function(alb)
		{
			Albums=alb;
			console.log(JSON.stringify(alb));
			console.log(usracc);
				resolve(alb);
		}
		);
	
});

return albumPromise;
}

function retrieveAccount(usracc,func,boardscreen)
{
	if(boardscreen === undefined) { boardscreen = false; }
	
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
							//otherPerson=pc[y].Talker2;
						//	if (Accounts[pc[y].Talker2])
						//	{
						//	otherPersonsName=Accounts[pc[y].Talker2].name;
						//	}
							}
							else
							{
							PrivateConversations[MyID][pc[y].Talker1]=pc[y];	
							//otherPerson=pc[y].Talker1;
							//if (Accounts[pc[y].Talker1])
							{
							//otherPersonsName=Accounts[pc[y].Talker1].name;
							}
							}
				/*
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
					*/		
							
						}
						/*
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
						*/	
						
						resolve(pc);
					});
	  
	});
	
	
	return privatePromise;
	
}

function retrieveAccounts(boardscreen)

{
	if(boardscreen === undefined) { boardscreen = false; }
	
	for (x in AccountsToRetrieve)
	{
	console.log("account to retrieve "+AccountsToRetrieve[x]);
	addAccountPromise(AccountsToRetrieve[x],boardscreen);
	}
	
	
return Promise.all(AccountPromises);

	
}

function retrieveNotifications()

{
	addNotificationPromises();
return NotificationPromise;
	
}



function retrieveAvatars(albid)
{
	var cg = new Promise
	((resolve, reject) => {
io.socket.get('/avatar?albumid='+albid,
	function  (data){
		console.log(JSON.stringify(data));
		
		for (x in data)
		{
				var nu=new Date(data[x].createdAt);
			console.log(nu);
			var month = nu.getUTCMonth() + 1; //months from 1-12
			var day = nu.getUTCDate();
			var year = nu.getUTCFullYear();

			newdate = day+ "/"+month+"/"+year ;
				data[x].phrase=newdate;
		if (!data[x].description)
		{data[x].description="no description";}
		console.log("$scope.mypics[x].phrase "+data[x].phrase);
		console.log("data[x].avatarFd "+data[x].avatarFd);
		}
		mypics=data;
		resolve(data);
	});	
	});
	return cg;	
}


function retrieveOthersProfileVisits(owner,amount)
{

	var cg = new Promise
	((resolve, reject) => {
			io.socket.get("/sitevisit",{visitor:{'!':owner},profileOwner:owner,limit:amount,sort:"createdAt DESC"},
			function (resData,jwres){
				for (x in resData)
				{
				OthersVisits.push(resData[x]);	
				AccountsToRetrieve[resData[x].visitor]=resData[x].visitor;
				AccountsToRetrieve[resData[x].profileOwner]=resData[x].profileOwner;
				
				}
				resolve(resData);
			});

	});
	return cg;	
	
}

function retrieveOwnersProfileVisits(owner,amount)
{
	
	
	
	var cg = new Promise
	((resolve, reject) => {
			io.socket.get("/sitevisit",{visitor:owner,profileOwner:owner,limit:amount,sort:"createdAt DESC"},
			function (resData,jwres){
				for (x in resData)
				{
				OwnersVisits.push(resData[x]);	
				AccountsToRetrieve[resData[x].visitor]=resData[x].visitor;
				AccountsToRetrieve[resData[x].profileOwner]=resData[x].profileOwner;
				
				}
				resolve(resData);
			});

	});
	return cg;	
	
	
}

function retrieveReports(boardscreen)
{
	
if(boardscreen === undefined) { boardscreen = false; }
	
var cg = new Promise
((resolve, reject) => {
		io.socket.get("/commentreport",{},
		function (resData,jwres){
			for (x in resData)
			{
			Reports.push(resData[x]);	
			AccountsToRetrieve[resData[x].reporter]=resData[x].reporter;
			WallPostsToRetrieve[resData[x].msgID]=resData[x].msgID;
			}
			resolve(resData);
		});

});
return cg;	
}

function retrieveBannedWords()

{
var cg = new Promise
((resolve, reject) => {
		io.socket.get("/bannedword",{limit:8888},
		function (resData,jwres){
			//console.log(resData);
			//console.log(jwres);
			for (x in resData)
			{
			BannedWords.push(resData[x]);	
		//	console.log(BannedWords[x].word);
			}
			resolve(resData);
		});

});
return cg;	
}

function addBlocked(usracc)
{
				DropDowns[usracc]['block'].empty();
				DropDowns[usracc]['block'].append("<a>UnBlock</a>");
				
				DropDowns[usracc]['block'].click({usracc:usracc},clickBlock);
	
}


function addFollowed(usracc)
{
	/*
	console.log("add followed "+usracc);
	PrivateconText="<a >Following</a>";
					
	DropDowns[usracc]['Foll'].append(PrivateconText);
	*/
		DropDowns[usracc]['Foll'].empty();
				DropDowns[usracc]['Foll'].append("<a>UnFollow</a>");
				DropDowns[usracc]['Foll'].click({usracc:usracc},clickFollow);
}
function addSeeChat(usracc)
{
	console.log("adding see chat for "+usracc);
	//PrivateconText=$("<a href='/seeprivateconversation/"+PrivateConversations[MyID][usracc].id+"'>Go To Chat</a>");
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
								Blocks[usracc]=usracc;
								DropDowns[usracc]['block'].empty();
								DropDowns[usracc]['block'].append("<a>UnBlock</a>");
								$( "[id='blockbutton"+usracc+"']").text("UnBlock");
								
								for(iter in WallPosts)
								{		
								if (WallPosts[iter].sender==usracc)
								{
								$("[id='msgcontent"+WallPosts[iter].id+"']").slideUp();	
								}
								}
								
								});
					}
					else
					{
					console.log("lets delete "+resData[0].id);
						io.socket.post('/block/destroy/'+resData[0].id,{id:resData.id},
							function (resData2, jwRes2) {
								console.log(jwRes2);
							console.log("lets delete "+resData[0].id);
								//console.log("resData[0].id "+resData2[0].id);
								Blocks[usracc]=null;
								DropDowns[usracc]['block'].empty();
								DropDowns[usracc]['block'].append("<a>Block</a>");
								$( "[id='blockbutton"+usracc+"']").text("Block");
								
								for(iter in WallPosts)
								{		
								if (WallPosts[iter].sender==usracc)
								{
								$("[id='msgcontent"+WallPosts[iter].id+"']").slideDown();	
								}
								}
								
								});
					
						
					}
					
	});
}


function clickFollow(event)
{
	var usracc=event.data.usracc;
					DropDowns[usracc]['Foll'].empty();
					DropDowns[usracc]['Foll'].append("<a>Processing..</a>");
				io.socket.get('/follow',{follower:MyID,followed:usracc},
							function (resData, jwRes) {
				//				console.log(usracc);
				//console.log(event.usracc);
				console.log(JSON.stringify(resData));
				if(!resData || resData.length==0)
					{
						
					io.socket.post('/follow',{follower:MyID,followed:usracc},
							function (resData2, jwRes2) {
							//	console.log("resData[0].id "+resData2.id);
								Blocks[usracc]=usracc;
								DropDowns[usracc]['Foll'].empty();
								DropDowns[usracc]['Foll'].append("<a>UnFollow</a>");
								});
					}
					else
					{
					console.log("lets delete 1 "+resData[0].id);
						io.socket.post('/follow/destroy/'+resData[0].id,{id:resData.id},
							function (resData2, jwRes2) {
								console.log(jwRes2);
							console.log("lets delete 2 "+resData[0].id);
								//console.log("resData[0].id "+resData2[0].id);
								Blocks[usracc]=null;
								DropDowns[usracc]['Foll'].empty();
								DropDowns[usracc]['Foll'].append("<a>Follow</a>");
								});
					
						
					}
					
	});
}

function addBeginBlock(usracc)
{
	DropDowns[usracc]['block'].empty();
DropDowns[usracc]['block'].append("<a>Block</a>");
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
		DropDowns[usracc]['Foll'].empty();
DropDowns[usracc]['Foll'].append("<a>Follow</a>");
				DropDowns[usracc]['Foll'].click({usracc:usracc},clickFollow);
				/*
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
	
	
	
	*/
}
function addAccountPromise(usracc,boardscreen)
{
	
if(boardscreen === undefined) { boardscreen = false; }
	
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
				retrieveNotifications().then(function(){
					$("#navbar").html("");
				showNavbar($("#navbar"),MyID,boardscreen);
				});
				}
				
				if(usr)
				{
				console.log("creating dropdown for "+usr.id+" "+usr.name);
				CreateDropDown(usr.id);
				if(usr.tempBan)
				
				{
				if (!$("#adminpage").length>0)
				{
				coverall=$("<div style='background-color:white;position:fixed;height: 90%;width: 100%;top:30px;right:0px;border-style:solid;border-color:black;border-width:2;z-index:9999;'><p>You Have been temporarily banned.</p></div>");
				$("#navbar").append(coverall);	
				}	
				}
				
				}
				 
				resolve(usr);
		}
		);
	}));
}


function addWallPostPromise(pID)
{
WallPostPromises.push(new Promise((resolve, reject) => {
	 io.socket.get('/Wallpost/'+pID,
		function(usr)
		{
			
			//console.log(JSON.stringify(myuser));
			WallPosts[usr.id]=usr;
			
		
			AccountsToRetrieve[usr.sender]=usr.sender;
				 
				resolve(usr);
		}
		);
	}));
}


function addPrivatePromiseRange(index,amt)
{
	
		return new Promise((resolve,reject)=>{
					io.socket.get("/privateconversation",{or:[{Talker1:MyID},{Talker2:MyID}],limit:amt,skip:index},
						function (pc) {
						if(!PrivateConversations[MyID])
							{
							PrivateConversations[MyID]={};
							}
						//console.log(pc);
							for (y in pc)
							{
									
							
								if(MyID==pc[y].Talker1)
								{
								PrivateConversations[MyID][pc[y].Talker2]=pc[y];
								}
								else
								{
								PrivateConversations[MyID][pc[y].Talker1]=pc[y];	
								}
				
							
							
							}
						
						resolve(pc);
					});
				});
	
}


function addPrivatePromises()
{
	
							PrivateConversations[MyID]={};
							
		return new Promise((resolve,reject)=>{
					io.socket.get("/privateconversation",{or:[{Talker1:MyID},{Talker2:MyID}],limit:30000},
						function (pc) {
						
						//console.log(pc);
							for (y in pc)
							{
									
						
							/*if(MyID==pc[y].Talker1)
							{
							PrivateConversations[MyID][pc[y].Talker2]=pc[y];
						
							}
							else
							{
							PrivateConversations[MyID][pc[y].Talker1]=pc[y];	
							
							}*/
							PrivateConversations[MyID]=pc;
					
							
							
							}
							console.log("resolve privatecon");
						resolve(pc);
				
						
						
						
					});
				});
	
}



function addNotificationPromises()
{
	
		NotificationPromise=(new Promise((resolve,reject)=>{
					io.socket.get("/notification",{reciever:MyID},
						function (pc) {
						if(!Notifications)
							{
							Notifications={};
							}
						
							for (y in pc)
							{
							Notifications.push(pc[y]);
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
		//console.log(resData);
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
	
	//for (x in Accounts)
	//{
		//if(Accounts[x])
	//	{
		//	if(Accounts[x].id)
		//	{
					return new Promise((resolve,reject)=>{
					//var thisguy=Accounts[x].id;
					//var thisguysname=Accounts[x].name;
				//	console.log("requesting private conversations for "+thisguy+" "+thisguysname);
					//io.socket.get("/block",{blocker:MyID,blocked:thisguy},
					io.socket.get("/block",{blocker:MyID},
						function (pc) {
						//console.log("recieved private conversation"+JSON.stringify(pc));
						//console.log("found "+pc.length+" private conversations for "+thisguy+" "+thisguysname);
						//if(pc)
						//{
						//	if (pc.length==0)
							//{
							//addBeginBlock(thisguy);
							//}	
						//}	
						
						//if(!pc)
						//{
						//addBeginBlock(thisguy);
						//}
						
							for (y in pc)
							{
					
							//console.log("Talker1"+pc[x].Talker1);
							//console.log("Talker2"+pc[x].Talker2);
							
							//var otherPerson=pc[y].blocked;
							//console.log("pc "+JSON.stringify(pc));
							//	if(Accounts[otherPerson])
							//	{
							
							//	console.log("about to add blocked");
									Blocks[pc[y].blocked]=pc[y];
								//	addBlocked(otherPerson);
									
									
					
								//}
							
							
							
							
							}
						resolve(pc);
					});
				});
	//}}}
	
}

function addBookmarkPromises()
{
	
		return new Promise((resolve,reject)=>{
					io.socket.get("/bookmark",{bookmarker:MyID},
					
						function (pc) {
						
							bookmarks=pc;
						resolve(pc);
					});
				});

}


function addFollowPromises()
{
	//console.log("addprivatepromises func");
	
	//for (x in Accounts)
	//{
	//	if(Accounts[x])
		//{
		//	if(Accounts[x].id)
		//	{
		return new Promise((resolve,reject)=>{
					//var thisguy=Accounts[x].id;
					//var thisguysname=Accounts[x].name;
					
				//	console.log("requesting private conversations for "+thisguy+" "+thisguysname);
					//io.socket.get("/follow",{follower:MyID,followed:thisguy},
					io.socket.get("/follow",{follower:MyID},
					
						function (pc) {
						//console.log("recieved private conversation"+JSON.stringify(pc));
						//console.log("found "+pc.length+" private conversations for "+thisguy+" "+thisguysname);
						//if(pc)
						//{
						//	if (pc.length==0)
						//	{
						//	addBeginFollow(thisguy);
						//	}	
						//}	
						
						//if(!pc)
						//{
						//addBeginFollow(thisguy);
						//}
						
							for (y in pc)
							{
					
							//console.log("Talker1"+pc[x].Talker1);
							//console.log("Talker2"+pc[x].Talker2);
							
							//var otherPerson=pc[y].followed;
							//console.log("pc "+JSON.stringify(pc));
							//	if(Accounts[otherPerson])
							//	{
							
								//console.log("about to addfollowed");
									Follows[pc[y].followed]=pc[y];
								//	addFollowed(otherPerson);
									
									
					
								//}
							
							
							
							
							}
						resolve(pc);
					});
				});
	//}}}
}


function renderAdminPage()
	{
	console.log("renderchatpage");
	var horiFlex=addFlexDiv($("#adminpage"),"adminflex","column","wrap");
	var sideBoard=addFlexDiv(horiFlex,"sideboard","row","wrap");
	//sideBoard.css("width","20%");
	var banbutton=showButton(sideBoard,"Manage Members","KgreenElement KregularButton");
	var imagesbutton=showButton(sideBoard,"Manage Images","KgreenElement KregularButton");
	var banwordsbutton=showButton(sideBoard,"Manage Words","KgreenElement KregularButton");
	
	var forms=[];
	
	
	var adminscreen=showAdminReportForm(horiFlex);
	var imagescreen=showLatestImagesForm(horiFlex);
	var banwordscreen=showBanWordsForm(horiFlex);
	
	forms.push(imagescreen);
	forms.push(adminscreen);
	forms.push(banwordscreen);
	
	for (s in forms)
	{forms[s].hide();}
	adminscreen.show();
	
	
	banbutton.click(function()
		{
		for(s in forms)
		{forms[s].slideUp();}
		adminscreen.slideDown();
		});
			
	imagesbutton.click(function()
		{
		for(s in forms)
		{forms[s].slideUp();}
		imagescreen.slideDown();
		});
	
	banwordsbutton.click(function()
		{
		for(s in forms)
		{forms[s].slideUp();}
		banwordscreen.slideDown();
		});
	
	
	}
	
function renderChatPage(col)
	{
	console.log("renderchatpage");
		showChatForm(col,convID,"Private Conversation","none");
		
	}
	
function renderHomePage()
	{
		
	showOpenGameList($("#usr"),OpenGames);
	showRecentGames($("#usr"),MyID);
	showLoginForm($("#loginform"));
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







