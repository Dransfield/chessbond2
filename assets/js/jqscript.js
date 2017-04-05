
var myuser;
var Accounts={};
var OpenGames={};
var JoinedGames={};
var AccountsToRetrieve={};
var AccountPromises=[];
var PrivatePromises=[];
var PrivateConversations={};

var roomname=MyID;
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			
			io.socket.on('PrivateConversationStarted', function (data)
			{
			
			
			$("#PrivateConversationDD"+data.user).empty();
			$("#PrivateConversationDD"+data.user).append("<a href='/seeprivateconversation/"+PrivateConversations[MyID][data.user].id+"' id='GoToPrivateDiv"+data.user+"'>Go To Chat</a>");
			
			
			});


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

	for (x in AccountsToRetrieve)
	{
	console.log("account to retrieve "+AccountsToRetrieve[x]);
	addAccountPromise(AccountsToRetrieve[x]);
	}
	
	
Promise.all(AccountPromises).then(values => { 
	console.log("account promises done");
	//console.log("OpenGames "+JSON.stringify(OpenGames));
	
	addPrivatePromises()
	
	Promise.all(PrivatePromises).then(values => { 
		console.log("private promises done");
		if($("#homepage"))
		{
		renderHomePage();
		}
	});

	
});
	
	
});



	



function addSeeChat(usracc)
{
	
	PrivateconText="<a href='/seeprivateconversation/"+PrivateConversations[MyID][usracc].id+"'>Go To Chat</a>";
					
	DropDowns[usracc]['Priv'].append(PrivateconText);
}
function addBeginChat(usracc)
{
	
DropDowns[usracc]['BeginChat']=$("<a id='StartPrivateDiv"+usracc+"'>Begin Chat</a>");
				DropDowns[usracc]['Priv'].append(DropDowns[usracc]['BeginChat']);
				DropDowns[usracc]['BeginChat'].click(function(){
					
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
	console.log("addprivatepromises func");
	for (x in Accounts)
	{
		
		PrivatePromises.push(new Promise((resolve,reject)=>{
					var thisguy=Accounts[x].id;
					var thisguysname=Accounts[x].name;
					
					console.log("requesting private conversations for "+thisguy+" "+thisguysname);
					io.socket.get("/privateconversation",{or:[{Talker1:thisguy},{Talker2:thisguy}],limit:30000},
						function (pc) {
						//console.log("recieved private conversation"+JSON.stringify(pc));
						console.log("found "+pc.length+" private conversations for "+thisguy+" "+thisguysname);
							for (y in pc)
							{
					
							//console.log("Talker1"+pc[x].Talker1);
							//console.log("Talker2"+pc[x].Talker2);
							
							if(!PrivateConversations[MyID])
							{
							PrivateConversations[MyID]={};
							}
					
							var otherPerson;
							
							if(MyID==pc[y].Talker1)
							{
							PrivateConversations[MyID][pc[y].Talker2]=pc[y];
							otherPerson=pc[y].Talker2;
							}
							else
							{
							PrivateConversations[MyID][pc[y].Talker1]=pc[y];	
							otherPerson=pc[y].Talker1;
							}
				
							if(Accounts[otherPerson])
							{
							var PrivateconText;
								if(PrivateConversations[MyID])
								{
									if(PrivateConversations[MyID][otherPerson])
									{
										console.log("about to add see chat for  "+otherPerson);
									addSeeChat(otherPerson);
									}
									else
									{
									addBeginChat(otherPerson);
									}
					
				
				
								}
								else
								{
								addBeginChat(otherPerson);
								}
				
							}
							
							
						}
						resolve(pc);
					});
				}));
	}
}
function renderHomePage()
{
showOpenGameList($("#usr"),OpenGames);
showJoinedGameList($("#usr"),JoinedGames);

showNewGameControls($("#newGameControls"));

	
}







