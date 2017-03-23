angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	
$scope.Accounts{};

	$scope.addAccount=function(accID) {
			AccountService.addAccount(accID);
			console.log(accID+" was requested");
			
			};
	$scope.downloadAccounts= function() {
                AccountService.clearPromises();
                      console.log("download accounts function fired");
                for (x in AccountService.getRequestedAccounts())
                {
					AccountService.addPromise(new Promise((resolve,reject)=>{
						
				
					
					console.log(AccountService.getRequestedAccounts()[x]+" not requested");
	
					io.socket.get('/user/'+AccountService.getRequestedAccounts()[x],
					function(usr){
					
						if (usr)
						{
							AccountService.setAccount(usr);
								io.socket.get('/subscription?subscriber='+AccountService.getRequestedAccounts()[x],
								function (rply) {
		
								
									if(rply)
									{
									console.log("got reply");
										if(rply.length>0)
										{
										console.log(AccountService.getRequestedAccounts()[x]+" is online");
										AccountService.setField(AccountService.getRequestedAccounts()[x],'online',true);
										}
										else
										{
										
										//console.log(AccountsRequested[x]+" is not online");
										AccountService.setField(AccountService.getRequestedAccounts()[x],'online',false);
										}
									resolve(AccountService.getRequestedAccounts()[x]);
									}
									else
									{resolve(AccountService.getRequestedAccounts()[x]);}
								
							});
						}
						else
						{resolve(AccountService.getRequestedAccounts()[x]);}
					});
	
				}));	
                      
                
            }
            
            
        }
	$scope.downloadAccounts();
	
	console.log(JSON.stringify(AccountService.getRequestedAccounts()));
	Promise.all(AccountService.getPromises()).then(values => { 
  console.log(values); 
  $scope.$apply(function(){$scope.Accounts=AccountService.getAccounts();});
});
}]);
