angular.module('HomepageModule').controller('HomepageController', ['$scope', '$http','$window' ,'toastr', function($scope, $http,$window,toastr){
$scope.opg=new Array();
$scope.joinedgames=new Array();
$scope.Players=new Array();
$scope.User;

$scope.countries={Afghanistan
	,Albania
	,Algeria
	,American Samoa
	,Andorra
	,Angola
	,Anguilla
	,Antigua and Barbuda
	,Argentina
	,Armenia
	,Aruba
	,Australia
	,Austria
	,Azerbaijan
	,Bahamas
	,Bahrain
	,Bangladesh
	,Barbados
	,Belarus
	,Belgium
	,Belize
	,Benin
	,Bermuda
	,Bhutan
	,Bolivia
	,Bosnia
	,Botswana
	,Brazil
	,British Virgin Islands
	,Brunei
	,Bulgaria
	,Burkina Faso
	,Burundi
	,Cambodia
	,Cameroon
	,Canada
	,Cape Verde
	,Cayman Islands
	,Central African Republic
	,Chad
	,Chile
	,China
	,Christmas Island
	,Colombia
	,Comoros
	,Cook Islands
	,Costa Rica
	,Croatia
	,Cuba
	,Cyprus
	,Czech Republic
	,Côte d'Ivoire
	,Democratic Republic of the Congo
	,Denmark
	,Djibouti
	,Dominica
	,Dominican Republic
	,Ecuador
	,Egypt
	,El Salvador
	,Equatorial Guinea
	,Eritrea
	,Estonia
	,Ethiopia
	,Falkland Islands
	,Faroe Islands
	,Fiji
	,Finland
	,France
	,French Polynesia
	,Gabon
	,Gambia
	,Georgia
	,Germany
	,Ghana
	,Gibraltar
	,Greece
	,Greenland
	,Grenada
	,Guam
	,Guatemala
	,Guinea
	,Guinea Bissau
	,Guyana
	,Haiti
	,Honduras
	,Hong Kong
	,Hungary
	,Iceland
	,India
	,Indonesia
	,Iran
	,Iraq
	,Ireland
	,Israel
	,Italy
	,Jamaica
	,Japan
	,Jordan
	,Kazakhstan
	,Kenya
	,Kiribati
	,Kuwait
	,Kyrgyzstan
	,Laos
	,Latvia
	,Lebanon
	,Lesotho
	,Liberia
	,Libya
	,Liechtenstein
	,Lithuania
	,Luxembourg
	,Macao
	,Macedonia
	,Madagascar
	,Malawi
	,Malaysia
	,Maldives
	,Mali
	,Malta
	,Marshall Islands
	,Martinique
	,Mauritania
	,Mauritius
	,Mexico
	,Micronesia
	,Moldova
	,Monaco
	,Mongolia
	,Montserrat
	,Morocco
	,Mozambique
	,Myanmar
	,Namibia
	,Nauru
	,Nepal
	,Netherlands
	,Netherlands Antilles
	,New Zealand
	,Nicaragua
	,Niger
	,Nigeria
	,Niue
	,Norfolk Island
	,North Korea
	,Norway
	,Oman
	,Pakistan
	,Palau
	,Panama
	,Papua New Guinea
	,Paraguay
	,Peru
	,Philippines
	,Pitcairn Islands
	,Poland
	,Portugal
	,Puerto Rico
	,Qatar
	,Republic of the Congo
	,Romania
	,Russian Federation
	,Rwanda
	,Saint Kitts and Nevis
	,Saint Lucia
	,Saint Pierre
	,Saint Vincent and the Grenadines
	,Samoa
	,San Marino
	,Sao Tomé and Príncipe
	,Saudi Arabia
	,Senegal
	,Serbia and Montenegro
	,Seychelles
	,Sierra Leone
	,Singapore
	,Slovakia
	,Slovenia
	,Solomon Islands
	,Somalia
	,South Africa
	,South Georgia
	,South Korea
	,Soviet Union
	,Spain
	,Sri Lanka
	,Sudan
	,Suriname
	,Swaziland
	,Sweden
	,Switzerland
	,Syria
	,Taiwan
	,Tajikistan
	,Tanzania
	,Thailand
	,Tibet
	,Timor-Leste
	,Togo
	,Tonga
	,Trinidad and Tobago
	,Tunisia
	,Turkey
	,Turkmenistan
	,Turks and Caicos Islands
	,Tuvalu
	,UAE
	,Uganda
	,Ukraine
	,United Kingdom
	,United States of America
	,Uruguay
	,US Virgin Islands
	,Uzbekistan
	,Vanuatu
	,Vatican City
	,Venezuela
	,Vietnam
	,Wallis and Futuna
	,Yemen
	,Zambia
	,Zimbabwe
}

	io.socket.on('deletegameevent', function (data)
			{
			console.log(data);
			$scope.$apply(function(){
			for(var i = $scope.joinedgames.length - 1; i >= 0; i--) {
				
			if($scope.joinedgames[i].id === data.gameid) {
			$scope.joinedgames.splice(i, 1);
			}
			}
			}
			);
			});

	io.socket.on('deleteopengameevent', function (data)
			{
			console.log(data);
			$scope.$apply(function(){
			for(var i = $scope.opg.length - 1; i >= 0; i--) {
				
			if($scope.opg[i].id === data.gameid) {
			$scope.opg.splice(i, 1);
			}
			}
			}
			);
			});
			
	io.socket.on('newopengameevent', function (data)
			{
			console.log('newopengameevent'+data);
			data.phrase=phrasefordate(data.Created);
			$scope.$apply(function(){
			$scope.opg.push(data);
			});
			console.log(data);
			}
			
		);
		
io.socket.on('userpresence',function(data)
			{
			io.socket.get("/user?id="+data.id,{},function (resData,jwres){
			console.log(JSON.stringify(resData));
			console.log("name "+resData.name);
		var foundPlayer=false;
		
			for(var i = $scope.Players.length - 1; i >= 0; i--) {
					
				if($scope.Players[i].name === resData.name) {
				foundPlayer=true;
				$scope.Players[i].time=0;
				}
				}
				//console.log("foundPlayer= "+foundPlayer);
			if (foundPlayer==false)
			{
			//console.log("actual name"+actualname);
			$scope.$apply($scope.Players.push({name:resData.name,time:0}));}
    	});
				
			});
		function phrasefordate(dat)
			{
			
		var n = Date.now();
		
		var newnum=n-dat;
		newnum=newnum/1000;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" seconds ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" minutes ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" hours ago";
		}
		else
		{
		newnum=newnum/24;
		
		phrase=parseInt(newnum)+" days ago";
		
		}
		
		}
		
		}
		return phrase;
	}
	
$scope.PlayGame=function(GameID,Player2)
	{
		$http.put('/ChangeUsersCurrentGame', {
			  GameID: GameID,
			  oppo:Player2
    })
    .then(function onSuccess (dat){
     
     window.location="/humanvshuman";
	
    })
	}
	
$scope.joingame=function(GameID,PlayerID,PlayerName,MyID,MyName){
		console.log("joingame player1"+PlayerID+" player2"+MyID+" player1name "+PlayerName+" Player2Name "+MyName);
		$http.put('/joingame', {
			GameID:GameID,
			PlayerID:PlayerID,
			PlayerName:PlayerName,
			MyID:MyID,
			MyName:MyName
			})
			.then(function onSuccess(sailsResponse){
			
			$scope.deleteopengame(GameID);
			}
			)
			},
		$scope.deletegame=function(id,user)
		{
			console.log('asked to delete game '+id);
			 io.socket.put('/deletegame', { gameid:id,owner:user},function  (data,jwres){
      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		//toastr.success('Created New Game');
		});
		
		},
		
		$scope.login=function()
		{
			
			$http.put("/login",{email:$scope.vm.username,password:$scope.vm.password})
			.then(function onSuccess (resData, jwr){
				if (resData.data.message!="Logged In Successfully")
				{
			toastr.info(resData.data.message);
			}
			else
			{
			toastr.success(resData.data.message);
				$window.location.href = '/';
			}
			}
			);
			
			},
		$scope.deleteopengame=function(id)
		{
			console.log('asked to delete'+id);
			 io.socket.put('/deleteopengame', { gameid:id},function  (data,jwres){
      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		//toastr.success('Created New Game');
    });
		
		},

	$scope.createopengame=function(id,name)
	{
	io.socket.put('/newopengame', { Player1: id,Player1Name:name,Created:Date.now() },
    function (resData, jwr) {

      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		toastr.success('Created New Game');
    });
	}
	$scope.joinopengameRoom=function ()
		{
			
		
		
			io.socket.get("/subscribeToRoom",{roomName:'openchessgameroom'},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
		
		$http.get('/openchessgame?limit=3000').then( function (dat) {
			
			for(x in dat.data)
			{
			dat.data[x].phrase=phrasefordate(dat.data[x].Created);
			$scope.opg.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			}
			
			
			});
			$http.get('/chessgame').then( function (dat) {
			
			for(x in dat.data)
			{
			dat.data[x].phrase=phrasefordate(dat.data[x].Created);
			$scope.joinedgames.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			}
			
			
			});
		};
	$scope.getuser=function(MyID)
	{
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
			}
			)	
		
	};
	$scope.joinmyuserIDRoom=function(MyID)
	{
		
		
		
		io.socket.get("/subscribeToRoom",{roomName:MyID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			
			io.socket.on('newmygameevent', function (data)
			{
			console.log('recieved new game event '+data);
			data.phrase=phrasefordate(data.Created);
			$scope.$apply(function(){
			$scope.joinedgames.push(data);
			});
			console.log(data);
			});
			
			setInterval(function (MyID)
			{
				
				for(var i = $scope.Players.length - 1; i >= 0; i--) {
			$scope.Players[i].time=$scope.Players[i].time+1;
			//console.log($scope.Players[i].name+" "+$scope.Players[i].time);
			if($scope.Players[i].time>3) {
			$scope.$apply($scope.Players.splice(i, 1));
			}
			}
				
			io.socket.get("/HomepageHeartbeat",{id:MyID},function (resData,jwres){
		
			});
		}, 5000);
			
	}
	
	$scope.joinmygameRoom=function (GameID)
		{
			/*io.socket.get("/subscribeToRoom",{roomName:GameID},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			io.socket.on('newmygameevent', function (data)
			{
			data.phrase=phrasefordate(data.Created);
			$scope.$apply(function(){
			$scope.opg.push(data);
			});
			console.log(data);
			}
			
			);
		$http.get('/openchessgame').then( function (dat) {
			
			for(x in dat.data)
			{
			dat.data[x].phrase=phrasefordate(dat.data[x].Created);
			$scope.opg.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			}
			
			
			});*/

		}
	$scope.LoginPushed=function (btton){
	$http.post('/loginbuttonpushed', {
      button:btton
    })
    .then(function onSuccess (dat){
         console.log("login reply"+JSON.stringify(dat.data));
         $window.location.href = '/auth/login?type='+btton;
	    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
        toastr.error('Cant logged in.', 'Error', {
          
        });
        return;
      }

				toastr.error('An unexpected error occurred trying to log in to facebook.', 'Error', {
					
				});
				return;

    })
	
	}
	


	
}]);
