
	var myuser;
var Accounts={};
var OpenGames={};

var p1 = new Promise((resolve, reject) => {
console.log("p1 promise");
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
		
var p2 = new Promise((resolve, reject) => {
console.log("p2 promise");
		io.socket.get("/chessgame",{or:[{'Player1':MyID},{'Player2':MyID}],limit:30000},
		function (resData,jwres){
			console.log("resData "+resData);
			resolve(resData);
});		
});
Promise.all([p1, p2]).then(values => { 
  console.log("values"+values); // [3, 1337, "foo"] 
console.log("values[0]"+values[0]);
for (x in values[0])
{
console.log("values[0][x].Player1"+values[0][x].Player1);
}
}
, reason => {
	console.log("promise failed");
  console.log(reason)
});


//io.socket.on('connect',function(data){
 io.socket.get('/user/'+MyID,
					function(usr){
			myuser=usr;
			console.log(JSON.stringify(myuser));
			Accounts[usr.id]=usr;
			showUsername($("#usr"),usr);
			$("#usr").html(Accounts[usr.id].name);
		});
//});


