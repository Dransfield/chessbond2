	var myuser;
var Accounts{};
//io.socket.on('connect',function(data){
 io.socket.get('/user/'+MyID,
					function(usr){
			myuser=usr;
			console.log(JSON.stringify(myuser));
			Accounts[usr.id]=usr;
			$("#usr").html(Accounts[usr.id].name);
		});
//});
