angular.module('HomepageModule').controller('PrivateconversationController', ['$scope','$rootScope', '$http','$window' ,'toastr','PrivateConversationService', function($scope,$rootScope, $http,$window,toastr,PrivateConversationService){

$scope.PrivateConversations=[];

$scope.DownloadedPrivateconversationsOnce=false;
	$scope.setShouldGetPrivateconversations=function(accID){
		PrivateConversationService.setShouldGetPrivateConversations(accID);
	$scope.downloadPrivateconversations();
	};
	
	
	$scope.StartPrivateConversation=function(MyID,sender)
		{
			
		
			BlockedAccountService.setPrivateconversation(sender);
			io.socket.post('/privateconversation',{Talker1:MyID,Talker2:sender},
			function (resData, jwRes) {
				BlockedAccountService.setPrivateconversation(sender,resData[0].id);
				$scope.PrivateConversations[sender]=resData[0].id;
				});
		};
		
	$scope.downloadPrivateconversations= function() {
			console.log("download Privateconversations");
				if(PrivateConversationService.getShouldGetPrivateConversations()==true)
				
				{
					if(PrivateConversationService.getRequestedPrivateConversations()==false)
					{
						PrivateConversationService.setRequestedPrivateConversations();
					
				
					io.socket.get("/privateconversation",{or:[{Talker1:PrivateConversationService.getTalkerPerson()},{Talker2:PrivateConversationService.getTalkerPerson()}],limit:30000},
		function (pc) {
				console.log("in private conversation recieved reply"+JSON.stringify(pc));
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
