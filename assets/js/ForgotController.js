angular.module('HomepageModule').controller('ForgotController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	// set-up loginForm loading state
	
	$scope.LevelForm = {
		loading: false
	}
	
	$scope.login=function(myemail,pswd)
		{
			
			$http.put("/login",{email:myemail,password:pswd})
			.then(function onSuccess (resData, jwr){
				if (resData.data.message!="Logged In Successfully")
				{
			toastr.info(resData.data.message);
			}
			else
			{
			//toastr.success(resData.data.message);
				$window.location.href = '/profile';
			}
			}
			);
			
			};
	
	$scope.NewPassword=function(coder)
	{
	
		$http.put("/ResetPassword",{psw:$scope.vm.password,code:coder})
			.then(function onSuccess (resData, jwr){
				console.log("HELLO");
				console.log(JSON.stringify(jwr));
						console.log(JSON.stringify(resData));
			if (resData.status==200)
					{	
						
						console.log(JSON.stringify(resData));
						toastr.success("Password changed!");	
						$scope.login(resData.data.email,$scope.vm.password);
						
						}
			}
			
			)
			.catch(function onError(sailsResponse) {
			if (sailsResponse.status==404)
			{
			toastr.error("Please request another change of password");	
			$window.location.href = '/forgot';
			}
			
			})
			;
	
	
	};
	$scope.ForgotPassword=function()
		{
			
			$http.put("/SendMail",{address:$scope.vm.address})
			.then(function onSuccess (resData, jwr){
			
					
					if (resData.status==200)
					{	toastr.success("Email Sent!");	}
				
			}
			
			);
			
			};
	
	
	
}]);