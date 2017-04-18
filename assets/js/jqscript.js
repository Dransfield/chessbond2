
var myuser;
var Accounts={};
var OpenGames={};
var JoinedGames={};
var AccountsToRetrieve={};
var AccountPromises=[];
var PrivatePromises=[];
var FollowPromises=[];
var PrivateConversations={};
var PrivateMessages={};
var Follows={};
var WallPosts=[];
var GamePlaying={};
			
		subscribeToMandatoryRooms()
			
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
		
		retrieveGame(GameID).then(function()
		{
			AccountsToRetrieve[GamePlaying.Player1]=GamePlaying.Player1;
			AccountsToRetrieve[GamePlaying.Player2]=GamePlaying.Player2;
			retrieveAccounts().then(function()
			{
				retrievePrivatesandFollows().then(function(){
					
				var overall=$("#playervsplayer")
				var boardDivDiv=addDiv(overall);
				var topPlayerMarque=addFlexDiv(boardDivDiv,"topPlayerMarque","row","nowrap","space-around","center");
				var topMinutes=addSpan(topPlayerMarque,"topminutes");
				topPlayerMarque.append("<img style='position:relative;' src='/images/eye2.png' height='30px'>");
				showsmallAvatar(topPlayerMarque,GamePlaying.Player1);
				showUsername(topPlayerMarque,GamePlaying.Player1);
				topPlayerMarque.append(Accounts[GamePlaying.Player1].ELO);
				showFlag(flagSpan,topPlayerMarque);
				topPlayerMarque.append("ping");
				topPlayerMarque.append("timer");
				addSpan(boardDivDiv,"boardcontainer");
				 board1 = ChessBoard('boardcontainer',{draggable: true,onDrop: onDrop,onSnapEnd:onSnapEnd,pieceTheme: '/img/chesspieces/'+$scope.User.ChessPieceTheme[0]+'/{piece}.png'} );
 
				});
			});
		});
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
			var block=addFlexDiv(tbl,two+"flex","row","nowrap");
			if (bckgrd==0)
			{block.css("background-color","#e0e0eb");}
			
			block.css("justify-content","space-between");
			block.css("padding","10px");
			
			var myspan1=addSpan(block,one+"r");
			myspan1.html(one);
			myspan1.css("width","50%");
			//console.log("one "+one);
			
			if(one=="Profile Updated:")
			{Accounts[ProfID]['Profupdatedspan']=myspan1;}
			
			if(!Accounts[ProfID][two])
			{Accounts[ProfID][two]="";}
			var myspan=addSpan(block,two);
			
			myspan.css("width","50%");
			
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
				Accounts[ProfID].FideTitle=fidesel.val();	
				updateAccountInfo("FideTitle");
				myspan.html(fidesel.val());
				});
				}
				
			if (texteditable==4)
			{
			var block2=addFlexDiv(tbl,two+"edit","row","nowrap");
			block2.append("<span>Edit:</span>");
			var sel=showSelect(block2,["Male","Female"],["Male","Female"],"Choose Gender");	
			sel.change(function(e)
			{
				console.log(JSON.stringify(sel));
				myspan.html(sel.val());
				Accounts[ProfID].Gender=sel.val();
				updateAccountInfo("Gender");
				
				if (Accounts[ProfID].Gender=="Female")
				{
					if(!Accounts[ProfID].FideTitle.startsWith("W"))
					{
					Accounts[ProfID].FideTitle="W"+Accounts[ProfID].FideTitle;	
					}
					fidesel.empty();
					updateAccountInfo("FideTitle");
					fideSpan.html(Accounts[ProfID].FideTitle);
					fideTitles=["WGM","WIM","WFM","WCM"];
					for(witer in fideTitles)
					{
					fidesel.append("<option value='"+fideTitles[witer]+"'>"+fideTitles[witer]+"</option>");
					}
				}
				if (Accounts[ProfID].Gender=="Male")
				{
					if(Accounts[ProfID].FideTitle.startsWith("W"))
					{
					Accounts[ProfID].FideTitle=Accounts[ProfID].FideTitle.substring(1);	
					}
					fidesel.empty();
					updateAccountInfo("FideTitle");
					fideSpan.html(Accounts[ProfID].FideTitle);
					fideTitles=["GM","IM","FM","CM"];
					for(witer in fideTitles)
					{
						
					fidesel.append("<option value='"+fideTitles[witer]+"'>"+fideTitles[witer]+"</option>");
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
				Accounts[ProfID].BirthDay=daysel.val();	
				updateAccountInfo("BirthDay");
				updatebirth();
				});
				monthsel.change(function()
				{
				Accounts[ProfID].BirthMonth=monthsel.val();	
				updateAccountInfo("BirthMonth");
				updatebirth();
				});
				yearsel.change(function()
				{
				Accounts[ProfID].BirthYear=yearsel.val();	
				updateAccountInfo("BirthYear");
				updatebirth();
				});
				function updatebirth()
				{
				myspan.html(Accounts[ProfID].BirthDay+"/"+Accounts[ProfID].BirthMonth+"/"+Accounts[ProfID].BirthYear);	
				}
				
			}
			if (texteditable==2)
				{
			
				var block2=addFlexDiv(tbl,two+"city","row","wrap");
				
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
				myspan.html(citysel.val());	
				Accounts[ProfID]['CurrentCity']=citysel.val();
				updateAccountInfo('CurrentCity');
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
				updateAccountInfo('Country');
			}
			
			)
			
			var games=3;
			showRecentGames(leftcol,ProfID);
			var chatDiv=addFlexDiv(leftcol,"dunni","column",'wrap');
			showChatForm(chatDiv,ProfID,"wall");
			console.log(JSON.stringify(WallPosts));
			for(iter in WallPosts)
					{	
					showChatMessage(chatDiv,WallPosts[iter]);
					}
					
					
					io.socket.on('WallPost', function (data)
			{
			console.log("recieved wall post socket"+JSON.stringify(data));
		//	console.log("recieved wall post socket"+JSON.stringify(data[0]));
			
			WallPosts.push(data);
			
			showChatMessage(chatDiv,WallPosts[(WallPosts.length-1)]);
		
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
	return Promise.all(FollowPromises,PrivatePromises);
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
		
			showChatMessage($("#privateconversationpage"),data);
			$("#favicon").attr("href","/favicon2.ico");
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
					showChatMessage($("#privateconversationpage"),WallPosts[iter]);
					}
					$("#privateconversationpage").scrollTop($("#privateconversationpage").prop("scrollHeight"));
		
					renderChatPage();
					
				})
			})
		})	
	});
	

		
		
		
	
	
	
	

	
}


function SendWallPost(Myid,groupid,msgtype,address,msg)
		{
			var none='none';
			
			io.socket.post("/newwallpost",{ReplyTo:'none',content:msg,sender:Myid,grpid:groupid,messagetype:msgtype},
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
		console.log("persons[x] "+persons[x]);
var cg = new Promise
((resolve, reject) => {
		io.socket.get("/chessgame",{or:[{'Player1':persons[x]},{'Player2':persons[x]}],limit:30000},
		function (resData,jwres){
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
	console.log(JSON.stringify(values[1]));
	console.log(JSON.stringify(JoinedGames));
	console.log("opengames");
	console.log(JSON.stringify(OpenGames));
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


function retrieveAccount(usracc,func)
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
				showNavbar($("#navbar"),MyID);
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

function retrieveAccounts()

{
	for (x in AccountsToRetrieve)
	{
	console.log("account to retrieve "+AccountsToRetrieve[x]);
	addAccountPromise(AccountsToRetrieve[x]);
	}
	
	
return Promise.all(AccountPromises)

	
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
function addAccountPromise(usracc)
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
				showNavbar($("#navbar"),MyID);
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
		showChatForm($("#chatinput"),convID,"Private Conversation");
		
	}
	
function renderHomePage()
	{
		
	showOpenGameList($("#usr"),OpenGames);
	showRecentGames($("#usr"),MyID);
	//showJoinedGameList($("#usr"),JoinedGames);
	$("#newGameControls").css("text-align","center");
	showWebsiteNameJumbo($("#newGameControls"))
	
	showNewGameControls($("#newGameControls"));
	}







