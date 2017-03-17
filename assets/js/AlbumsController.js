angular.module('HomepageModule').controller('AlbumsController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	$scope.myalbums=[];
		/*
		$scope.ChangeAlbum=function(prefid,me,newpref)
		{
		
			io.socket.put('/album/'+me+"?"+prefid+"="+newpref,{
				
					  }  
				  
				,function(resData,jwres)
			{
				console.log(resData);
				console.log(jwres);
				}
			);
     
		
		};
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
		*/
	$scope.getuser=function(MyID)
	{
		
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
		});
	};
	
		$scope.joinmyuserIDRoom=function(MyID)
	{
		
		
		
		io.socket.get("/subscribeToRoom",{roomName:MyID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			
		
		
			
	};
	$scope.createalbum=function(type,id,name,gamecat)
	{
		
		
			if($scope.User.Invisible==false)
	{
	io.socket.put('/album', { name:"New Album":name ,user:id},
    function (resData, jwr) {

      $scope.getalbums=function(id);
		toastr.success('Created New Album');
    });
	}
	else
	{
		toastr.warning('Disabled Account',"Can't create new album");
	}
	};
	$scope.getalbums=function(albid)
	{
		console.log("looking for albums of "+albid);
	io.socket.get('/album?user='+albid,
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
		
	$scope.$apply(function(){$scope.myalbums=data;});
	});
	}
	/*
	
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
	*/
}]);
