angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	

	$scope.addAccount=function(accID) {
			AccountService.addAccount(accID);
			console.log(accID+" was requested");
			
			};
	$scope.downloadAccounts= function() {
                
                      
                for (x in AccountService.AccountsRequested)
                {
					AccountService.addPromise(new Promise((resolve,reject)=>{
						
				
					
					console.log(AccountService.AccountsRequested[x]+" not requested");
	
					io.socket.get('/user/'+AccountService.AccountsRequested[x],
					function(usr){
					
						if (usr)
						{
							AccountService.setAccount(usr);
								io.socket.get('/subscription?subscriber='+AccountService.AccountsRequested[x],
								function (rply) {
		
								
									if(rply)
									{
									console.log("got reply");
										if(rply.length>0)
										{
										console.log(AccountService.AccountsRequested[x]+" is online");
										AccountController.setField(AccountService.AccountsRequested[x],'online',true);
										}
										else
										{
										
										console.log(AccountsRequested[x]+" is not online");
										AccountController.setField(AccountService.AccountsRequested[x],'online',false);
										}
									resolve(AccountService.AccountsRequested[x]);
									}
									else
									{resolve(AccountService.AccountsRequested[x]);}
								
							});
						}
						else
						{resolve(AccountService.AccountsRequested[x]);}
					});
	
				}));	
                      
                
            }
            
            
        }
	$scope.downloadAccounts();
	console.log(JSON.stringify(AccountService.getRequestedAccounts()));
	Promise.all(AccountService.getPromises()).then(values => { 
  console.log(values); 
  $scope.$apply(function(){});
});
}]);
