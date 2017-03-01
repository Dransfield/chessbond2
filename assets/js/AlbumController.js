angular.module('HomepageModule').controller('AlbumController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	$scope.mypics=[];
	
		$scope.ChangeAvatar=function(prefid,me,newpref)
		{
		
			io.socket.put('/avatar/'+me+"?"+prefid+"="+newpref,{
				
					  }  
				  
				,function(resData,jwres)
			{
				console.log(resData);
				console.log(jwres);
				}
			);
     
		
		};
		
	$scope.getuser=function(MyID)
	{
		
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
		});
	}
	
	$scope.DeleteAvatar=function(id,picadr)
	{
		console.log('delete '+picadr);
		io.socket.put('/deleteavatar',{picid:id,adr:picadr},	function  (data){
		console.log(JSON.stringify(data));
		$scope.$apply(function(){
			for(var i = $scope.mypics.length - 1; i >= 0; i--) {
				
			if($scope.mypics[i].id === data.id) {
			$scope.mypics.splice(i, 1);
			}
			}
		});
		
		
	});
	}
	$scope.getpics=function(id)
	{
	io.socket.get('/avatar?user='+id,
	function  (data){
		console.log(JSON.stringify(data));
		
		for (x in data)
		{
				var nu=new Date(data[x].createdAt);
			console.log(nu);
			var month = nu.getUTCMonth() + 1; //months from 1-12
			var day = nu.getUTCDate();
			var year = nu.getUTCFullYear();

			newdate = day+ "/"+month+"/"+year ;
				data[x].phrase=newdate;
		console.log("$scope.mypics[x].phrase "+data[x].phrase);
		console.log("data[x].avatarFd "+data[x].avatarFd);
		}
		
	$scope.$apply(function(){$scope.mypics=data;});
	});
	}
	
	
	$scope.SetAvatar=function(MyID,picid)
	{
		io.socket.put('/User/'+MyID,{
      avatarid:picid
      }  
    ,function(resData,jwres)
	{
      toastr.success('Changed Profile Image');
      }  
    ,function(resData,jwres)
	{
		toastr.success(JSON.stringify(resData));
	});
	}
	
}]);