
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


var opcg = new Promise((resolve, reject) => {
//console.log("p1 promise");
io.socket.get("/openchessgame?limit=3000",{},
function (resData,jwres){
			//console.log("dat "+dat);
			resolve(resData);
			//for(x in dat.data)
			//{
			//dat.data[x].phrase=phrasefordate(dat.data[x].createdAt);
			//$scope.opg.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			
			//}
			
			
			});
		});
		
var cg = new Promise((resolve, reject) => {
//console.log("p2 promise");
		io.socket.get("/chessgame",{or:[{'Player1':MyID},{'Player2':MyID}],limit:30000},
		function (resData,jwres){
			//console.log("resData "+resData);
			resolve(resData);
});		
});
Promise.all([opcg, cg]).then(values => { 
 // console.log("values"+values); // [3, 1337, "foo"] 
//console.log("values[0]"+JSON.stringify(values[0]));
OpenGames=values[0];
JoinedGames=values[1];
AccountsToRetrieve[MyID]=MyID;
//console.log("open game promise done "+JSON.stringify(OpenGames));
for (x in values[0])
{
//console.log("values[0][x].Player1"+values[0][x].Player1);
AccountsToRetrieve[values[0][x].Player1]=values[0][x].Player1;
}
for (x in values[1])
{
//console.log("values[1][x].Player1"+values[1][x].Player1);
AccountsToRetrieve[values[1][x].Player1]=values[1][x].Player1;
//console.log("values[1][x].Player2"+values[1][x].Player2);
AccountsToRetrieve[values[1][x].Player2]=values[1][x].Player2;

}


for (x in AccountsToRetrieve)
{
	console.log("account to retrieve "+AccountsToRetrieve[x]);
	AccountPromises.push(new Promise((resolve, reject) => {
	 io.socket.get('/user/'+AccountsToRetrieve[x],
					function(usr){
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
				CreateDropDown(usr.id);
				}
			resolve(usr);
		});
	})
	);
	
}

Promise.all(AccountPromises).then(values => { 
	console.log("account promises done");
	//console.log("OpenGames "+JSON.stringify(OpenGames));
	
	
	for (x in Accounts)
	{
		
		PrivatePromises.push(new Promise((resolve,reject)=>{
	
					io.socket.get("/privateconversation",{or:[{Talker1:Accounts[x].id},{Talker2:Accounts[x].id}],limit:30000},
		function (pc) {
				console.log("recieved private conversation"+JSON.stringify(pc));
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
					PrivateConversations[MyID][pc[y].Talker2]=pc;
					otherPerson=pc[y].Talker2;
				}
				else
				{
					PrivateConversations[MyID][pc[y].Talker1]=pc;	
					otherPerson=pc[y].Talker1;
				}
				
				
				var PrivateconText;
				if(PrivateConversations[MyID])
				{
				if(PrivateConversations[MyID][otherPerson])
				{
					PrivateconText="<a href='/seeprivateconversation/"+PrivateConversations[MyID][otherPerson].id+"'>Go To Chat</a>";
				}
					else
				{
					PrivateconText="<div id='StartPrivateDiv"+otherPerson+"'>Invite To Chat</div>";}
				}
					else
				{PrivateconText="<id='StartPrivateDiv"+otherPerson+"'>Invite To Chat</div>";}
				
	
				$("#PrivateConversationDD"+otherPerson).append(PrivateconText);
	
				}
				resolve(pc);
				});	
		}));
		
	
	}
	Promise.all(AccountPromises).then(values => { 
		if($("#homepage"))
		{
		renderHomePage();
		}
		});


});


});
function renderHomePage()
{
showOpenGameList($("#usr"),OpenGames);
showJoinedGameList($("#usr"),JoinedGames);

showNewGameControls($("#newGameControls"));

	
}







