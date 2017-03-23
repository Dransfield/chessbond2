angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	

	$scope.addAccount=function(accID) {
			AccountService.addAccount(accID);
			console.log(accID+" was requested");
			
			};
	$scope.downloadAccounts= function() {
                
                      
                for (x in AccountController.AccountsRequested)
                {
					Promises.push(new Promise((resolve,reject)=>{
						
				
					
					console.log(AccountController.AccountsRequested[x]+" not requested");
	
					io.socket.get('/user/'+AccountController.AccountsRequested[x],
					function(usr){
					
						if (usr)
						{
							AccountController.setAccount(usr);
								io.socket.get('/subscription?subscriber='+AccountController.AccountsRequested[x],
								function (rply) {
		
								
									if(rply)
									{
									console.log("got reply");
										if(rply.length>0)
										{
										console.log(AccountController.AccountsRequested[x]+" is online");
										AccountController.setField(AccountController.AccountsRequested[x],'online',true);
										}
										else
										{
										
										console.log(AccountsRequested[x]+" is not online");
										AccountController.setField(AccountController.AccountsRequested[x],'online',false);
										}
									resolve(AccountController.AccountsRequested[x]);
									}
									else
									{resolve(AccountController.AccountsRequested[x]);}
								
							});
						}
						else
						{resolve(AccountController.AccountsRequested[x]);}
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
