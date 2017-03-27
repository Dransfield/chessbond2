angular.module('HomepageModule').controller('PrivateconversationController', ['$scope', '$http','$window' ,'toastr','PrivateconversationService', function($scope, $http,$window,toastr,PrivateconversationService){

$scope.Privateconversations=[];

$scope.DownloadedPrivateconversationsOnce=false;
	$scope.setShouldGetPrivateconversations=function(accID){
		PrivateconversationService.setShouldGetBlockedAccounts(accID);
	$scope.downloadPrivateconversations();
	};
	
	
	$scope.NewPrivateconversation=function(MyID,sender)
		{
			
		$scope.BlockedAccounts[sender]=true;
			BlockedAccountService.setPrivateconversation(sender);
			io.socket.post('/Privateconversation',{Talker1:MyID,Talker2:sender},
			function (resData, jwRes) {
				});
		};
		
	$scope.downloadPrivateconversations= function() {
			console.log("download Privateconversations");
				if(PrivateconversationService.getShouldGetPrivateconversations()==true)
				
				{
					if(PrivateconversationService.getRequestedPrivateconversations()==false)
					{
						PrivateconversationService.setRequestedPrivateconversations();
					
				
					io.socket.get("/privateconversation",{or:[{'talker1':MyID},{'talker2':MyID}],limit:30000},
		function (pc) {
				console.log("in blk promise recieved reply");
				for (x in pc)
				{
					
				
				PrivateconversationService.setPrivateconversation(pc[x]);	
				
				}
				$rootScope.$broadcast('new pc');
				});	
					}
					}
					
					
					}
			
              
        
        
        
	
	
	  $scope.$on('new pc', function(event, args) {
				
		
		$scope.$apply(function(){
	  $scope.PrivateConversations=PrivateConversationService.getPrivateConversations();
	});
	});


}]);
