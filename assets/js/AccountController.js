angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	
$scope.Accounts={};

$scope.TotalPromises=[];
$scope.DownloadedAccountsOnce=false;
	$scope.setShouldGetBlockedAccounts=function(accID){
		AccountService.setShouldGetBlockedAccounts(accID);
	};
	
	$scope.addAccount=function(accID) {
			AccountService.addAccount(accID);
			console.log(accID+" was added by webpage");
			
			if(!$scope.DownloadedAccountsOnce)
			{
			$scope.downloadAccounts();
			$scope.DownloadedAccountsOnce=true;
			}
			};
	
	$scope.downloadAccounts= function() {
			
                AccountService.clearAccountPromises();
                    //  console.log("download accounts function fired");
                for (x in AccountService.getRequestedAccounts())
                {
					
					var actneeded=AccountService.getRequestedAccounts()[x].id;
					if(!AccountService.getRequestedAccounts()[x].requested)
					{
					AccountService.addAccountPromise(new Promise((resolve,reject)=>{
					
					AccountService.LabelRequestedAccount(actneeded);
				
					
					//console.log(actneeded+" ajax getting now");
	
					io.socket.get('/user/'+actneeded,
					function(usr){
					console.log("downloaded account "+actneeded);
						if (usr)
						{
							console.log("usr is valid");
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
            
            
        }
        
        
        }
	$scope.Accounts=AccountService.getAccounts();
	
		Promise.all(AccountService.getAccountPromises()).then(values => { 
 // console.log(values); 
  $scope.$apply(
  function(){
	  console.log("applying  accounts");
	 
	  $scope.Accounts=AccountService.getAccounts();
	  
	  console.log(JSON.stringify($scope.Accounts));
	  }
	  );
});

	
	//console.log(JSON.stringify(AccountService.getRequestedAccounts()));

}]);
