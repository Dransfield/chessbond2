angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	
$scope.Accounts={};

	$scope.addAccount=function(accID) {
			AccountService.addAccount(accID);
			//console.log(accID+" was added by webpage");
			
			};
	$scope.BlockUser=function(MyID,sender)
		{
		$scope.BlockedUsers[sender]=true;
			
			io.socket.post('/block',{blocker:MyID,blocked:sender},
			function (resData, jwRes) {
				});
		};
	$scope.downloadAccounts= function() {
                AccountService.clearPromises();
                    //  console.log("download accounts function fired");
                for (x in AccountService.getRequestedAccounts())
                {
					
					var actneeded=AccountService.getRequestedAccounts()[x].id;
					if(!AccountService.getRequestedAccounts()[x].requested)
					{
					AccountService.addPromise(new Promise((resolve,reject)=>{
					
					AccountService.LabelRequestedAccount(actneeded);
				
					
					//console.log(actneeded+" ajax getting now");
	
					io.socket.get('/user/'+actneeded,
					function(usr){
					
						if (usr)
						{
							AccountService.setAccount(usr);
							AccountService.RemoveRequestedAccount(usr.id);
								io.socket.get('/subscription?subscriber='+usr.id,
								function (rply) {
		
								
									if(rply)
									{
								//	console.log("got reply");
										if(rply.length>0)
										{
								//		console.log(usr.name+" is online");
										AccountService.setField(usr.id,'online',true);
										}
										else
										{
										
									//	console.log(usr.name+" is not online");
										AccountService.setField(usr.id,'online',false);
										}
									resolve(usr.id);
									}
									else
									{resolve(usr.id);}
								
							});
						}
						else
						{resolve(actneeded);}
					});
	
				}));	
                      
                
            }
            
            
        }}
	$scope.downloadAccounts();
	
	//console.log(JSON.stringify(AccountService.getRequestedAccounts()));
	Promise.all(AccountService.getPromises()).then(values => { 
 // console.log(values); 
  $scope.$apply(function(){$scope.Accounts=AccountService.getAccounts();});
});
}]);
