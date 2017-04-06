
var myuser;
var Accounts={};
var OpenGames={};
var JoinedGames={};
var AccountsToRetrieve={};
var AccountPromises=[];
var PrivatePromises=[];
var FollowPromises=[];
var PrivateConversations={};
var Follows={};

var roomname=MyID;
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			
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


		if($("#homepage"))
		{
		setupHomePage();
		}
		if($("#privateconversationpage"))
		{
		setupChatPage();
		}

function setupChatPage()
{


io.socket.get("/privateconversation",{id:convID},
	function (resData,jwres){
		JSON.stringify(resData);
		AccountsToRetrieve[resData.Talker1]=resData.Talker1;
		AccountsToRetrieve[resData.Talker2]=resData.Talker2;
		
		retrieveAccounts();
	});

	
}

function setupHomePage()
{
var opcg = new Promise
((resolve, reject) => {
	io.socket.get("/openchessgame?limit=3000",{},
	function (resData,jwres){
		resolve(resData);
	});
});
		
var cg = new Promise
((resolve, reject) => {
		io.socket.get("/chessgame",{or:[{'Player1':MyID},{'Player2':MyID}],limit:30000},
		function (resData,jwres){
			resolve(resData);
		});		
});

Promise.all([opcg, cg]).then(values => { 
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

	retrieveAccounts();
	

	
	
});

}
function retrieveAccounts()

{
	for (x in AccountsToRetrieve)
	{
	console.log("account to retrieve "+AccountsToRetrieve[x]);
	addAccountPromise(AccountsToRetrieve[x]);
	}
	
	
Promise.all(AccountPromises).then(values => { 
	console.log("account promises done");
	//console.log("OpenGames "+JSON.stringify(OpenGames));
	
	addPrivatePromises();
	addFollowPromises();
	
	Promise.all([PrivatePromises,FollowPromises]).then(values => { 
		console.log("private promises done");
		if($("#homepage"))
		{
		renderHomePage();
		}
		if($("#privateconversationpage"))
		{
		renderChatPage();
		}
	});

	

});	
	
	
	
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
							if (Accounts[pc[y].Talker1])
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
	showChatList($("#privateconversationpage"));
	}
	
function renderHomePage()
	{
	showOpenGameList($("#usr"),OpenGames);
	showJoinedGameList($("#usr"),JoinedGames);
	showNewGameControls($("#newGameControls"));
	}







