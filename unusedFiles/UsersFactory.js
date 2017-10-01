angular.module('HomepageModule').factory('UsersFactory', function ($http) {
  var service = {};


  service.GetAccount2 = function (accountsarray,Myid) {
    		
		
		console.log("is "+Myid+" account gotten?");
	
	if(!accountsarray[Myid])
	{
		console.log(Myid+" not gotten");
	
		io.socket.get('/user/'+Myid,
		function(usr){
			
			
			  if (usr)
			{
	
				accountsarray[Myid]=usr;
	io.socket.get('/subscription?subscriber='+Myid,
			function (rply) {
		
				
				if(rply)
				{
					console.log("got reply");
				if(rply.length>0)
				{
					console.log("got reply>0"+Myid);
				
				accountsarray[Myid].online=true;
				
				}
				else
				{
					console.log(JSON.stringify(rply));
						console.log(Myid+" is not online");
					accountsarray[Myid].online=false;
				}
				
			}
		
		});
	
	}
	
	});
	
	}	
	 

	
	}
  




  return service;
});
