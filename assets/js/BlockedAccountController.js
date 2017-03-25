angular.module('HomepageModule').controller('BlockedAccountController', ['$scope', '$http','$window' ,'toastr','BlockedAccountService', function($scope, $http,$window,toastr,BlockedAccountService){

$scope.BlockedAccounts=[];
$scope.TotalPromises=[];
$scope.DownloadedAccountsOnce=false;
	$scope.setShouldGetBlockedAccounts=function(accID){
		BlockedAccountService.setShouldGetBlockedAccounts(accID);
	};
	
	
	$scope.BlockUser=function(MyID,sender)
		{
			console.log("blockuser function");
		$scope.BlockedAccounts[sender]=true;
			BlockedAccountService.setBlockedAccount(sender);
			io.socket.post('/block',{blocker:MyID,blocked:sender},
			function (resData, jwRes) {
				});
		};
		$scope.UnBlockUser=function(MyID,sender)
	{
		console.log("unblocked ")
		console.log(sender);
		sender=String(sender);
		$scope.BlockedAccounts[sender]=false;
			BlockedAccountService.UnsetBlockedAccount(sender);
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
			console.log("download accounts");
				BlockedAccountService.clearBlockedAccountPromises();
				if(BlockedAccountService.getShouldGetBlockedAccounts()==true)
				
				{
					if(BlockedAccountService.getRequestedBlockedAccounts()==false)
					{
						BlockedAccountService.setRequestedBlockedAccounts();
					BlockedAccountService.addBlockedAccountPromise(
					new Promise((resolve,reject)=>{
						console.log("in blk promise");
							io.socket.get('/block?blocker='+BlockedAccountService.getBlockerPerson(),
			function (blk) {
				console.log("in blk promise recieved reply");
				for (x in blk)
				{
					
				console.log("found "+JSON.stringify(blk[x]));
				BlockedAccountService.setBlockedAccount(blk[x].blocked);	
				
				}
				resolve('Blocked');
				});	
					}
					)
					);
					}
			}
              
        
        
        }
	
	
	
	Promise.all(BlockedAccountService.getBlockedAccountPromises()
).then(values => { 
  console.log(values); 
  $scope.$apply(
  function(){
	  console.log("applying blocked accounts");
	  $scope.BlockedAccounts=BlockedAccountService.getBlockedAccounts();
	 console.log(JSON.stringify($scope.BlockedAccounts));
	  }
	  );
});
	


}]);
