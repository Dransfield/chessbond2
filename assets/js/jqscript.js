	var myuser;

$(document).ready(){
 io.socket.get('/user/'+MyID,
					function(usr){
			myuser=usr;
			$("#usr").innerHTML(myuser.name);
		});
};
