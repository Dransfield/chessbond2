angular.module('HomepageModule').controller('ForgotController', ['$scope', '$http','$window', 'toastr', function($scope, $http,$window, toastr){

	// set-up loginForm loading state
	
	$scope.LevelForm = {
		loading: false
	}
	$scope.NewPassword=function(coder)
	{
		
		$http.put("/ResetPassword",{psw:$scope.vm.password,code:coder})
			.then(function onSuccess (resData, jwr){
				console.log("resData"+resData);
				console.log("jwr "+jwr);
			toastr.info(resData.data.message);
			}
			
			);
	
	
	};
	$scope.ForgotPassword=function()
		{
			
			$http.put("/SendMail",{address:$scope.vm.address})
			.then(function onSuccess (resData, jwr){
			toastr.info(resData.data.message);
					console.log("resData"+JSON.Stringify(resData));
				console.log("jwr "+jwr);
			}
			
			);
			
			};
	
	
	
}]);