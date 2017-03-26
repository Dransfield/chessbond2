angular.module('HomepageModule').controller('PostMessageController', ['$scope', '$rootScope','$http','$window' ,'toastr', function($scope,$rootScope, $http,$window,toastr){
	$scope.WallPostInput="";
	$scope.SendWallPost=function(Myid,groupid,msgtype,address)
		{
			var none='none';
			
			$http.post("/newwallpost",{ReplyTo:'none',content:$scope.WallPostInput,sender:Myid,reciever:groupid})
			.then(function onSuccess (){
			$scope.chatInput = null;
			
			io.socket.post('/newnotification',{reciever:usrid,msg:'New '+msgtype+' Recieved',adr:address},
			function (resData, jwRes) {
				
				});
			
			}
			);
			
			
			
		};
		
}]);
