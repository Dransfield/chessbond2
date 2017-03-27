angular.module('HomepageModule').controller('PrivateconversationController', ['$scope','$rootScope', '$http','$window' ,'toastr','PrivateConversationService', function($scope,$rootScope, $http,$window,toastr,PrivateConversationService){

$scope.PrivateConversations=[];

$scope.DownloadedPrivateconversationsOnce=false;
	$scope.setShouldGetPrivateconversations=function(accID){
		PrivateConversationService.setShouldGetPrivateConversations(accID);
	$scope.downloadPrivateconversations();
	};
	
	$scope.GoToPrivateConversation=function(MyID,sender)
	{
		console.log('/seeprivateconversation/'+$scope.PrivateConversations[sender]);
		$window.location.href = '/seeprivateconversation/'+$scope.PrivateConversations[sender];
	}
	$scope.StartPrivateConversation=function(MyID,sender)
		{
			
		
			
			io.socket.post('/privateconversation',{Talker1:MyID,Talker2:sender},
			function (resData, jwRes) {
				console.log("resData[0].id "+resData.id);
				PrivateConversationService.setPrivateconversation(sender,resData.id);
				$scope.PrivateConversations[sender]=resData.id;
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
					
					console.log("Talker1"+pc.Talker1);
					console.log("Talker2"+pc.Talker2);
					
				if(PrivateConversationService.getTalkerPerson()==pc.Talker1)
				{
				PrivateConversationService.setPrivateConversation(pc.Talker2,pc[x].id);	
				}
				else
				{
				PrivateConversationService.setPrivateConversation(pc.Talker1,pc[x].id);	
				}
				
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
