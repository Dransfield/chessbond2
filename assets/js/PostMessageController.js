angular.module('HomepageModule').controller('PostMessageController', ['$scope', '$rootScope','$http','$window' ,'toastr', function($scope,$rootScope, $http,$window,toastr){
	$scope.WallPostInput="";
	$scope.SendWallPost=function(Myid,groupid,msgtype,address)
		{
			var none='none';
			
			$http.post("/newwallpost",{ReplyTo:'none',content:$scope.WallPostInput,sender:Myid,grpid:groupid,messagetype:msgtype})
			.then(function onSuccess (){
			$scope.chatInput = null;
			
			//io.socket.post('/newnotification',{reciever:groupid,msg:'New '+msgtype+' Recieved',adr:address},
			//function (resData, jwRes) {
				
				//});
			
			}
			);
			
			
			
		};
		
}]);
