	var myuser;
var Accounts{};
//io.socket.on('connect',function(data){
 io.socket.get('/user/'+MyID,
					function(usr){
			myuser=usr;
			console.log(JSON.stringify(myuser));
			Accounts[usr.id]=usr;
			showUsername($("#usr",usr);
			$("#usr").html(Accounts[usr.id].name);
		});
//});

function showUsername(elem,usracc)
{
elem.html(usracc.FideTitle+" "+usracc.name);	
}
