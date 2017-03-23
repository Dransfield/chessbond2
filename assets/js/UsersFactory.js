app.factory('UsersFactory', function ($http) {
  var service = {};


  service.GetAccount2 = function (Myid) {
    		
		
		console.log("is "+Myid+" account gotten?");
	
	if(!$scope.Accounts[Myid])
	{
		console.log(Myid+" not gotten");
	
		io.socket.get('/user/'+Myid,
		function(usr){
			
			
			  if (usr)
			{
	
				$scope.Accounts[Myid]=usr;
	io.socket.get('/subscription?subscriber='+Myid,
			function (rply) {
		
				$scope.$apply(function()
				{
				if(rply)
				{
					console.log("got reply");
				if(rply.length>0)
				{
					console.log("got reply>0"+Myid);
				
				$scope.Accounts[Myid].online=true;
				
				}
				else
				{
					console.log(JSON.stringify(rply));
						console.log(Myid+" is not online");
					$scope.Accounts[Myid].online=false;
				}
				
			}});
		
		});
	
	}
	
	});
	
	}	
	 

	
	}
  




  return service;
});
