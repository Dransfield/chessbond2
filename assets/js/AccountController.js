angular.module('HomepageModule').controller('AccountController', ['$scope', '$rootScope','$http','$window' ,'toastr','AccountService', function($scope,$rootScope, $http,$window,toastr,AccountService){
	
$scope.Accounts={};


$scope.DownloadedAccountsOnce=false;
	
	
	$scope.addAccount=function(accID) {
			AccountService.addAccount(accID);
			
			console.log("website added account "+accID);
			$rootScope.$broadcast('new account added')
			};
	
	$scope.downloadAccounts= function() {
			
               // AccountService.clearAccountPromises();
                     console.log("download accounts function fired");
                for (x in AccountService.getRequestedAccounts())
                {
					
					var actneeded=AccountService.getRequestedAccounts()[x].id;
					
					console.log("AccountService.getRequestedAccounts()[x].requested "+AccountService.getRequestedAccounts()[x].requested);
					
					if(!AccountService.getRequestedAccounts()[x].requested)
					{
					//AccountService.addAccountPromise(new Promise((resolve,reject)=>{
					
					AccountService.LabelRequestedAccount(actneeded);
				
					
					console.log(actneeded+" ajax getting now");
	
					io.socket.get('/user/'+actneeded,
					function(usr){
					console.log("downloaded account "+actneeded);
						if (usr)
						{
							//console.log("usr is valid"+usr.id);
							AccountService.setAccount(usr);
							$rootScope.$broadcast('new user');
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
										
										//$scope.$apply(
									//	function(){$scope.Accounts=AccountService.getAccounts();});
										
									$rootScope.$broadcast('new user');
									}
									else
									{$rootScope.$broadcast('new user');}
								
							});
						}
						else
						{resolve(actneeded);}
					});
	
				//}));	
                      
                
            }
            
            
        }
        
        
        }
        $scope.$on('new user', function(event, args) {
				
		
		$scope.$apply(function(){
		$scope.Accounts=AccountService.Accounts;
		});
		//console.log("new user scope.accounts "+JSON.stringify($scope.Accounts));
		});
		//$scope.$on('new account added', function(event, args) {
		$scope.Accounts=AccountService.Accounts;
		$scope.downloadAccounts();
	//	});
	/*
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
*/
	
	//console.log(JSON.stringify(AccountService.getRequestedAccounts()));

}]);
