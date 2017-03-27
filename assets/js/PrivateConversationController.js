angular.module('HomepageModule').controller('PrivateconversationController', ['$scope','$rootScope', '$http','$window' ,'toastr','PrivateConversationService', function($scope,$rootScope, $http,$window,toastr,PrivateConversationService){

$scope.Privateconversations=[];

$scope.DownloadedPrivateconversationsOnce=false;
	$scope.setShouldGetPrivateconversations=function(accID){
		PrivateConversationService.setShouldGetPrivateConversations(accID);
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
				if(PrivateConversationService.getShouldGetPrivateConversations()==true)
				
				{
					if(PrivateConversationService.getRequestedPrivateConversations()==false)
					{
						PrivateConversationService.setRequestedPrivateConversations();
					
				
					io.socket.get("/privateconversation",{or:[{'talker1':PrivateConversationService.getTalkerPerson()},{'talker2':PrivateConversationService.getTalkerPerson()}],limit:30000},
		function (pc) {
				console.log("in blk promise recieved reply");
				for (x in pc)
				{
					
				
				PrivateConversationService.setPrivateConversation(pc[x]);	
				
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
