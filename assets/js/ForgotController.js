angular.module('HomepageModule').controller('ForgotController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	// set-up loginForm loading state
	
	$scope.LevelForm = {
		loading: false
	}
	$scope.NewPassword=function(coder)
	{
		
		$http.put("/ResetPassword",{psw:$scope.vm.password,code:coder})
			.then(function onSuccess (resData, jwr){
			if (resData.status==200)
					{	toastr.success("Password changed!");	}
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