angular.module('HomepageModule').controller('AccountController', ['$scope', '$http','$window' ,'toastr','AccountService', function($scope, $http,$window,toastr,AccountService){
	
$scope.Accounts={};
$scope.BlockedAccounts=[];
$scope.TotalPromises=[];
	$scope.setShouldGetBlockedAccounts=function(accID){
		AccountService.setShouldGetBlockedAccounts(accID);
	};
	
	$scope.addAccount=function(accID) {
			AccountService.addAccount(accID);
			//console.log(accID+" was added by webpage");
			
			};
	$scope.BlockUser=function(MyID,sender)
		{
			console.log("blockuser function");
		$scope.BlockedAccounts[sender]=true;
			AccountService.setBlockedAccount(sender);
			io.socket.post('/block',{blocker:MyID,blocked:sender},
			function (resData, jwRes) {
				});
		};
		$scope.UnBlockUser=function(MyID,sender)
	{
		
		$scope.BlockedUsers[sender]=false;
			AccountService.UnsetBlockedAccount(sender);
		io.socket.get('/block?blocked='+sender+'&blocker='+MyID,
	function  (data){
		console.log("Get"+JSON.stringify(data));
			for(x in data){
	io.socket.put('/block/destroy',{id:data[x].id},
		function  (data){
			
			
		
		});
		}
		});
	};
	$scope.downloadAccounts= function() {
				AccountService.clearBlockedAccountPromises();
				if(AccountService.getShouldGetBlockedAccounts()==true)
				
				{
					if(AccountService.getRequestedBlockedAccounts()==false)
					{
						AccountService.setRequestedBlockedAccounts();
					AccountService.addBlockedAccountPromise(
					new Promise((resolve,reject)=>{
						console.log("in blk promise");
							io.socket.get('/block?blocker='+AccountService.getBlockerPerson(),
			function (blk) {
				console.log("in blk promise recieved reply");
				for (x in blk)
				{
					
				console.log("found "+JSON.stringify(blk[x]));
				AccountService.setBlockedAccount(blk[x].blocked);	
				
				}
				resolve('Blocked');
				});	
					}
					)
					);
					}
			}
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
            
            
        }
        
        
        }
	$scope.downloadAccounts();
	
	
	Promise.all(AccountService.getBlockedAccountPromises()
).then(values => { 
  console.log(values); 
  $scope.$apply(
  function(){
	  console.log("applying blocked accounts");
	  $scope.BlockedAccounts=AccountService.getBlockedAccounts();
	 console.log(JSON.stringify($scope.BlockedAccounts));
	  }
	  );
});
	
	//console.log(JSON.stringify(AccountService.getRequestedAccounts()));
	Promise.all(AccountService.getAccountPromises()).then(values => { 
 // console.log(values); 
  $scope.$apply(
  function(){
	  console.log("applying  accounts");
	 
	  $scope.Accounts=AccountService.getAccounts();
	  }
	  );
});
}]);
