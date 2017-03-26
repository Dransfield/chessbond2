angular.module('HomepageModule').controller('ChatMessageListController', ['$scope', '$http','$window' ,'toastr','DateService', function($scope, $http,$window,toastr,DateService){
	$scope.TheID='';
$scope.WallPosts=[];

	$scope.getChatMessages=function(id,skip=0){
	$scope.TheID=id;
	
		io.socket.get('/wallpost?replyto=none&reciever='+id+'&limit=10&skip='+skip+'&sort=createdAt DESC',
			function (msgs) {
				//console.log(JSON.stringify(msgs));
				
				
				console.log("msgs.length "+msgs.length);
				$scope.$apply(function(){
				for (x in msgs)
				{
				$scope.WallPosts[x]=msgs[x];
				
				msgs[x].Age=DateService.phrasefordate(msgs[x].createdAt);//$scope.CalcAge(msgs[x].createdAt);
				
						
				}
			});
			
			});
	};
	
	$scope.getChatMessages($scope.TheID);
	
}]);
