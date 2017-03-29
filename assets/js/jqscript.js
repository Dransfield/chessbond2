	var myuser;

$(document).ready(function(){
 io.socket.get('/user/'+MyID,
					function(usr){
			myuser=usr;
			console.log(JSON.stringify(myuser));
			$("#usr").html(myuser.name);
		});
});
