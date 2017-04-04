
	var myuser;
var Accounts={};
var OpenGames={};
var JoinedGames={};
var AccountsToRetrieve={};
var AccountPromises=[];
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
			console.log("resData "+resData);
			resolve(resData);
});		
});
Promise.all([opcg, cg]).then(values => { 
 // console.log("values"+values); // [3, 1337, "foo"] 
//console.log("values[0]"+values[0]);
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
			resolve(usr);
		});
	})
	);
}

function renderHomePage()
{
showOpenGameList($("#usr"),OpenGames);
showJoinedGameList($("#usr"),JoinedGames);

showNewGameControls($("#newGameControls"));	
}

Promise.all(AccountPromises).then(values => { 
	//console.log("account promises done");
	//console.log("OpenGames "+JSON.stringify(OpenGames));
if($("#homepage"))
{renderHomePage();}
});
}
, reason => {
	//console.log("promise failed");
  console.log(reason)
});



