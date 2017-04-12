
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
var WallPosts={};

			
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
	
function setupProfilePage()
{
	
	AccountsToRetrieve[MyID]=MyID;
	AccountsToRetrieve[ProfID]=ProfID;
	
	//increase profile views
	io.socket.put('/LookedAtProfile',{userID:ProfID},
		function  (data){
		
		});
	
			
	retrieveAccounts().then(function()
		{
			retrievePrivatesandFollows().then(function()
			{ 
				console.log("add flexdiv");
			var leftright=addFlexDiv($("#profilepage"),"leftright","row");
			var elem=addFlexDiv(leftright,"leftcol","column");
				
			showUsernameJumbo(elem,ProfID);
			var divv=addDiv(elem);
			showAvatar(divv,ProfID);
			if(MyID==ProfID)
			{
			showImageUploadForm(elem,ProfID)
			}
			
			showHeader(elem,2,"Highest Difficulty Level Beaten:"+Accounts[ProfID].DifficultyLevelBeaten);
			showHeader(elem,2,"Cumulative Rating:"+Accounts[ProfID].ELO);
			showNewGameControls(elem);
			showAnchorButton(elem,'Statistics',"/stats/"+ProfID,"btn-info")
			var elem=addFlexDiv(leftright,"rightcol","column");
			showHeader(elem,2,"Who am I?");
			var tbl=showStripedTable(elem);
			
			var pairarrayone=['Profile Views:','Registered member on:','Last login:',
			'Number of times logged in:','Gender:','Date of birth:','Current City:',
			'Fide Title:<br>(Self Claimed:)','Valid Fide ID:','Fide Ratings:',
			'Profile Updated:','Speak (languages):','Countries Travelled:','Wishing to Travel:',
			'My Upcoming Trip:','Who Am I?:','How Do I Start My Day?:','Hobbies/Interests:',
			'Request/Expectation:','Favorite Music/Band:','Favorite TV Shows/Concerts:',
			'Favorite Books/Food:','Favorite Quote/Writer:','My Professional Chess Tournaments/Trainings/Participations:',
			'My best performance in live chess tournaments:','My Live Chess Tournaments History:',
			'My other performing skills/Inspiring Sports:','My Victory Speech would be (If I became Chess Champion):',
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
			var pairarraythree=[0,0,0,2,3,1,4,5,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
			if(Accounts[ProfID].Birthday)
			{
			Accounts[ProfID].BirthDayTotal=Accounts[ProfID].BirthDay+"/"+Accounts[ProfID].BirthMonth+"/"+Accounts[ProfID].BirthYear;
			}
			else
			{
			Accounts[ProfID].BirthDayTotal="/ / /";	
			}
			Accounts[ProfID].LastloginPhrase=phraseforloggedindate(Accounts[ProfID].Lastlogin);
				
			var dateObj=new Date(Accounts[ProfID].createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();

			newdate = day+ "/"+month+"/"+year ;
			Accounts[ProfID].Registeredmemberon=newdate;
			
			
			function addvarpair(tbl,one,two,texteditable)
			{
			var tr=$("<tr></tr>");
			tbl.append(tr);
			var td=$("<td></td>");
			tr.append(td);
			td.append(" "+one+" ");
			td=$("<td></td>");
			tr.append(td);
			var myspan=addSpan(td);
			myspan.html(Accounts[ProfID][two]);
			if (texteditable==1)
			{
				console.log("show text with input");
			showTextwithInput(td,two,myspan);	
			}
			}
			
			for (variter in pairarrayone)
			{
			addvarpair(tbl,pairarrayone[variter],pairarraytwo[variter],pairarraythree[variter]);
			}
			
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
					console.log("marathon4");
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
		WallPosts[resData.id]=resData[iter];
		}
resolve();
});
});
return cg;
}

function getChessGames()
{
var cg = new Promise
((resolve, reject) => {
		io.socket.get("/chessgame",{or:[{'Player1':MyID},{'Player2':MyID}],limit:30000},
		function (resData,jwres){
			resolve(resData);
		});		
});
return cg;	
	
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
		

Promise.all([opcg, getChessGames()]).then(values => { 
	OpenGames=values[0];
	JoinedGames=values[1];
	console.log("TWO NAVBARS");
	AccountsToRetrieve[MyID]=MyID;
	for (x in OpenGames)
	{
	AccountsToRetrieve[values[0][x].Player1]=values[0][x].Player1;
	}
	
	for (x in JoinedGames)
	{
	AccountsToRetrieve[values[1][x].Player1]=values[1][x].Player1;
	AccountsToRetrieve[values[1][x].Player2]=values[1][x].Player2;
	}

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
		var privcon=$("#chatinput");
		var chatform=$("<input type='text' autocomplete='off' class='form-control' placeholder='post message' name='name' >");
		var chatbutton=$("<button id='postbutton' class='btn btn-default btn-sm' type='submit' >Post Message</button>");
		privcon.append(chatform);
		privcon.append(chatbutton);
		 chatform.keypress(function (e) {
 var key = e.which;
 //console.log("key "+key);
 if(key == 13)  // the enter key code
  { e.preventDefault();
	 // console.log("send wall post"+chatform.val());
		 	SendWallPost(MyID,convID,"Private Conversation","",chatform.val());
		 	chatform.val("");
		}
		 });
		chatbutton.click(function(){
			SendWallPost(MyID,convID,"Private Conversation","",chatform.val());
			chatform.val("");
			});
	}
	
function renderHomePage()
	{
		
	showOpenGameList($("#usr"),OpenGames);
	showJoinedGameList($("#usr"),JoinedGames);
	showNewGameControls($("#newGameControls"));
	}







