angular.module('HomepageModule').controller('ForgotController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	// set-up loginForm loading state
	
	$scope.LevelForm = {
		loading: false
	}
	
	$scope.login=function()
		{
			
			$http.put("/login",{email:$scope.vm.user.email,password:$scope.vm.user.password})
			.then(function onSuccess (resData, jwr){
				if (resData.data.message!="Logged In Successfully")
				{
			toastr.info(resData.data.message);
			}
			else
			{
			//toastr.success(resData.data.message);
				$window.location.href = '/';
			}
			}
			);
			
			};
	
	$scope.NewPassword=function(coder)
	{
		
		$http.put("/ResetPassword",{psw:$scope.vm.password,code:coder})
			.then(function onSuccess (resData, jwr){
			if (resData.status==200)
					{	
						
						console.log(JSON.stringify(resData));
						toastr.success("Password changed!");	}
			}
			
			);
	
	
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