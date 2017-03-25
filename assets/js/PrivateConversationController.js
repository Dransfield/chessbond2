angular.module('HomepageModule').controller('PrivateConversationController', ['$scope', '$http','$window' ,'toastr','ConversationService', function($scope, $http,$window,toastr,ConversationService){

//$scope.getuserAndJoinRoom=function(MyID)
//	{


//};


io.socket.get('/privateconversation?talkingto='+id,
			function (msgs) {
				//console.log(JSON.stringify(msgs));
				
				
				console.log("msgs.length "+msgs.length);
				for (x in msgs)
				{
				$scope.WallPosts[x]=msgs[x];
				
				msgs[x].Age=DateService.phrasefordate(msgs[x].createdAt);//$scope.CalcAge(msgs[x].createdAt);
				
						
				}
				
			
			});


}]);
