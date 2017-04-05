
	var myuser;
var Accounts={};
var OpenGames={};
var JoinedGames={};
var AccountsToRetrieve={};
var AccountPromises=[];
var PrivateConversations={};

var roomname=MyID;
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
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
	AccountPromises.push(new Promise((resolve,reject)=>{
	
					io.socket.get("/privateconversation",{or:[{Talker1:AccountsToRetrieve[x]},{Talker2:AccountsToRetrieve[x]}],limit:30000},
		function (pc) {
				console.log("recieved private conversation"+JSON.stringify(pc));
				for (x in pc)
				{
					
					//console.log("Talker1"+pc[x].Talker1);
					//console.log("Talker2"+pc[x].Talker2);
					
					if(!PrivateConversations[AccountsToRetrieve[x]])
					{
						PrivateConversations[AccountsToRetrieve[x]]={};
					}
					
				if(AccountsToRetrieve[x]==pc[x].Talker1)
				{
					PrivateConversations[AccountsToRetrieve[x]][pc[x].Talker2]=pc;
				}
				else
				{
					PrivateConversations[AccountsToRetrieve[x]][pc[x].Talker1]=pc;	
				}
				
				}
				resolve(pc);
				});	
		}));
}

Promise.all(AccountPromises).then(values => { 
	console.log("account promises done");
	//console.log("OpenGames "+JSON.stringify(OpenGames));
if($("#homepage"))
{
	renderHomePage();
	
	for (x in Accounts)
	{
	
	var PrivateconText;
	if(PrivateConversations[MyID])
	{
	if(PrivateConversations[MyID][Accounts[x]])
	{PrivateconText="<a href='/privateconversation/"+PrivateConversations[MyID][Accounts[x]]+">Go To Chat</a>";}
		else
	{PrivateconText="<id='StartPrivateDiv"+Accounts[x]+"'>Invite To Chat</div>";}
	}
		else
	{PrivateconText="<id='StartPrivateDiv"+Accounts[x]+"'>Invite To Chat</div>";}
	
	
	$("#PrivateConversation"+Accounts[x].id).append(PrivateconText);
	
	}
}

});

});
function renderHomePage()
{
showOpenGameList($("#usr"),OpenGames);
showJoinedGameList($("#usr"),JoinedGames);

showNewGameControls($("#newGameControls"));

	
}







