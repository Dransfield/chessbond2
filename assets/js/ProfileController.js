angular.module('HomepageModule').controller('ProfileController', ['$scope', '$http','$window' ,'toastr', function($scope, $http,$window,toastr){
$scope.User;
$scope.SoleConnectorVariable="";
$scope.MyGames=[];
$scope.GameInfo=[];
$scope.getdate=function(datestr)
{
	return Date.parse(datestr);
	};
$scope.GetInfo=function(id)
{
	io.socket.get('/chessgame?Player1='+id,
	 function (games) {
//console.log("games "+JSON.stringify(games));
//for (x in games)
//{console.log("games[x] "+games[x]);
//}
 
	for (x in games)
	{		 
	$scope.MyGames.push(games[x]);
	}

io.socket.get('/chessgame?Player2='+id,
	 function (moregames) {
	for (x in moregames)
	{		 
	$scope.MyGames.push(moregames[x]);
	}
	$scope.MyGames.sort(function(a, b){return Date.parse(a.createdAt)-Date.parse(b.createdAt)});

$scope.MyGames=$scope.MyGames.slice(0,24);

	io.socket.get('/user?id='+$scope.MyGames[x].Player1,
	 function (user1) {
		io.socket.get('/user?id='+$scope.MyGames[x].Player2,
	 function (user2) {
		 	 
$scope.$apply(function(){
for (x in $scope.MyGames)
{
var datenum=Date.parse($scope.MyGames[x].createdAt);
var dateobj=new Date(datenum);
var MonthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
var datestring=dateobj.getDate()+","+MonthNames[dateobj.getMonth()]+" "+dateobj.getFullYear();

var resultstring="";

if (!$scope.MyGames[x].Result)
{resultstring="No Result";}

var drawpos;
var wonpos;

if(resultstring=="")
{
drawpos=$scope.MyGames[x].Result.indexOf("</span> Drew by <span");
wonpos=$scope.MyGames[x].Result.indexOf("</span> Won by <span");
if (drawpos>-1)
{resultstring="1-1 (Draw)";}
if (resultstring=="")
{
if 	($scope.MyGames[x].Result.indexOf($scope.MyGames[x].Player1Name)<wonpos)
{
if ($scope.MyGames[x].Player1==id)
{resultstring="1-0 (Won)";}
else
{resultstring="1-0 (Lost)";}
}
else
{
if ($scope.MyGames[x].Player2==id)
{resultstring="0-1 (Won)";}
else

{
	console.log("player1 name "+$scope.MyGames[x].Player1Name+" player2name "+$scope.MyGames[x].Player2Name);
	console.log("wonpos "+wonpos);
	console.log("$scope.MyGames[x].Result.indexOf($scope.MyGames[x].Player1Name) "+$scope.MyGames[x].Result.indexOf($scope.MyGames[x].Player1Name));
	resultstring="0-1 (Lost)";}
}
}


}

if ($scope.MyGames[x].Player1Color=='White')
{

$scope.GameInfo.push({id:$scope.MyGames[x].id,res:resultstring,timelimit:($scope.MyGames[x].Player1TimeLimit/60),date:datestring,moves:$scope.MyGames[x].Move,WhitePlayerID:$scope.MyGames[x].Player1,BlackPlayerID:$scope.MyGames[x].Player2,WhitePlayerName:$scope.MyGames[x].Player1Name,BlackPlayerName:$scope.MyGames[x].Player2Name,WhiteAvatar:user1.picture,BlackAvatar:user2.picture,WhiteELO:user1.ELO,BlackELO:user2.ELO});

}
else
{

$scope.GameInfo.push({id:$scope.MyGames[x].id,res:resultstring,timelimit:($scope.MyGames[x].Player1TimeLimit/60),date:datestring,moves:$scope.MyGames[x].Move,WhitePlayerID:$scope.MyGames[x].Player2,BlackPlayerID:$scope.MyGames[x].Player1,WhitePlayerName:$scope.MyGames[x].Player2Name,BlackPlayerName:$scope.MyGames[x].Player1Name,WhiteAvatar:user2.picture,BlackAvatar:user1.picture,WhiteELO:user2.ELO,BlackELO:user1.ELO});

}

	
}
});

});

});



});

});
}
	$scope.SoleConnectorFunction=function(id)
	{
		
		$http.get('/subscription?subscriber='+id, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.SoleConnectorVariable="false";
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			console.log(JSON.stringify(sailsResponse));
			if(sailsResponse.data.length==0)
			{
			//	$scope.joinmyuserIDRoom(id);
			//$scope.ReconnectFunction(id);
			$scope.getuser(id);
			$scope.GetInfo(id);
			//$scope.joinopengameRoom();
			$scope.SoleConnectorVariable="true";
			}
			
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			
			}
			
			
			)
			.catch(function onError(sailsResponse) {
			$scope.SoleConnectorVariable="true";
			
			//$scope.joinmyuserIDRoom(id);
			//$scope.ReconnectFunction(id);
			$scope.getuser(id);
			$scope.GetInfo(id);
			//$scope.joinopengameRoom();
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			
			
			});
	}
	$scope.getLookedatUser=function(id)
	{
		
		$http.get('/user?id='+id, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.LookedatUser=sailsResponse.data;
			}
			)	
		
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
	
	
	$scope.countryTofilename=function(country)
{
	if (country){
	return country.replace(/ /gi, "_");
	}
}
$scope.countries=[
	{name:'Afghanistan'},
	{name:'Albania'},
	{name:'Algeria'},
	{name:'American Samoa'},
	{name:'Andorra'},
	{name:'Angola'},
	{name:'Anguilla'},
	{name:'Antigua and Barbuda'},
	{name:'Argentina'},
	{name:'Armenia'},
	{name:'Aruba'},
	{name:'Australia'},
	{name:'Austria'},
	{name:'Azerbaijan'},
	{name:'Bahamas'},
	{name:'Bahrain'},
	{name:'Bangladesh'},
	{name:'Barbados'},
	{name:'Belarus'},
	{name:'Belgium'},
	{name:'Belize'},
	{name:'Benin'},
	{name:'Bermuda'},
	{name:'Bhutan'},
	{name:'Bolivia'},
	{name:'Bosnia'},
	{name:'Botswana'},
	{name:'Brazil'},
	{name:'British Virgin Islands'},
	{name:'Brunei'},
	{name:'Bulgaria'},
	{name:'Burkina Faso'},
	{name:'Burundi'},
	{name:'Cambodia'},
	{name:'Cameroon'},
	{name:'Canada'},
	{name:'Cape Verde'},
	{name:'Cayman Islands'},
	{name:'Central African Republic'},
	{name:'Chad'},
	{name:'Chile'},
	{name:'China'},
	{name:'Christmas Island'},
	{name:'Colombia'},
	{name:'Comoros'},
	{name:'Cook Islands'},
	{name:'Costa Rica'},
	{name:'Croatia'},
	{name:'Cuba'},
	{name:'Cyprus'},
	{name:'Czech Republic'},
	{name:"Côte d'Ivoire"},
	{name:'Democratic Republic of the Congo'},
	{name:'Denmark'},
	{name:'Djibouti'},
	{name:'Dominica'},
	{name:'Dominican Republic'},
	{name:'Ecuador'},
	{name:'Egypt'},
	{name:'El Salvador'},
	{name:'Equatorial Guinea'},
	{name:'Eritrea'},
	{name:'Estonia'},
	{name:'Ethiopia'},
	{name:'Falkland Islands'},
	{name:'Faroe Islands'},
	{name:'Fiji'},
	{name:'Finland'},
	{name:'France'},
	{name:'French Polynesia'},
	{name:'Gabon'},
	{name:'Gambia'},
	{name:'Georgia'},
	{name:'Germany'},
	{name:'Ghana'},
	{name:'Gibraltar'},
	{name:'Greece'},
	{name:'Greenland'},
	{name:'Grenada'},
	{name:'Guam'},
	{name:'Guatemala'},
	{name:'Guinea'},
	{name:'Guinea Bissau'},
	{name:'Guyana'},
	{name:'Haiti'},
	{name:'Honduras'},
	{name:'Hong Kong'},
	{name:'Hungary'},
	{name:'Iceland'},
	{name:'India'},
	{name:'Indonesia'},
	{name:'Iran'},
	{name:'Iraq'},
	{name:'Ireland'},
	{name:'Israel'},
	{name:'Italy'},
	{name:'Jamaica'},
	{name:'Japan'},
	{name:'Jordan'},
	{name:'Kazakhstan'},
	{name:'Kenya'},
	{name:'Kiribati'},
	{name:'Kuwait'},
	{name:'Kyrgyzstan'},
	{name:'Laos'},
	{name:'Latvia'},
	{name:'Lebanon'},
	{name:'Lesotho'},
	{name:'Liberia'},
	{name:'Libya'},
	{name:'Liechtenstein'},
	{name:'Lithuania'},
	{name:'Luxembourg'},
	{name:'Macao'},
	{name:'Macedonia'},
	{name:'Madagascar'},
	{name:'Malawi'},
	{name:'Malaysia'},
	{name:'Maldives'},
	{name:'Mali'},
	{name:'Malta'},
	{name:'Marshall Islands'},
	{name:'Martinique'},
	{name:'Mauritania'},
	{name:'Mauritius'},
	{name:'Mexico'},
	{name:'Micronesia'},
	{name:'Moldova'},
	{name:'Monaco'},
	{name:'Mongolia'},
	{name:'Montserrat'},
	{name:'Morocco'},
	{name:'Mozambique'},
	{name:'Myanmar'},
	{name:'Namibia'},
	{name:'Nauru'},
	{name:'Nepal'},
	{name:'Netherlands'},
	{name:'Netherlands Antilles'},
	{name:'New Zealand'},
	{name:'Nicaragua'},
	{name:'Niger'},
	{name:'Nigeria'},
	{name:'Niue'},
	{name:'Norfolk Island'},
	{name:'North Korea'},
	{name:'Norway'},
	{name:'Oman'},
	{name:'Pakistan'},
	{name:'Palau'},
	{name:'Panama'},
	{name:'Papua New Guinea'},
	{name:'Paraguay'},
	{name:'Peru'},
	{name:'Philippines'},
	{name:'Pitcairn Islands'},
	{name:'Poland'},
	{name:'Portugal'},
	{name:'Puerto Rico'},
	{name:'Qatar'},
	{name:'Republic of the Congo'},
	{name:'Romania'},
	{name:'Russian Federation'},
	{name:'Rwanda'},
	{name:'Saint Kitts and Nevis'},
	{name:'Saint Lucia'},
	{name:'Saint Pierre'},
	{name:'Saint Vincent and the Grenadines'},
	{name:'Samoa'},
	{name:'San Marino'},
	{name:'Sao Tomé and Príncipe'},
	{name:'Saudi Arabia'},
	{name:'Senegal'},
	{name:'Serbia and Montenegro'},
	{name:'Seychelles'},
	{name:'Sierra Leone'},
	{name:'Singapore'},
	{name:'Slovakia'},
	{name:'Slovenia'},
	{name:'Solomon Islands'},
	{name:'Somalia'},
	{name:'South Africa'},
	{name:'South Georgia'},
	{name:'South Korea'},
	{name:'Soviet Union'},
	{name:'Spain'},
	{name:'Sri Lanka'},
	{name:'Sudan'},
	{name:'Suriname'},
	{name:'Swaziland'},
	{name:'Sweden'},
	{name:'Switzerland'},
	{name:'Syria'},
	{name:'Taiwan'},
	{name:'Tajikistan'},
	{name:'Tanzania'},
	{name:'Thailand'},
	{name:'Tibet'},
	{name:'Timor-Leste'},
	{name:'Togo'},
	{name:'Tonga'},
	{name:'Trinidad and Tobago'},
	{name:'Tunisia'},
	{name:'Turkey'},
	{name:'Turkmenistan'},
	{name:'Turks and Caicos Islands'},
	{name:'Tuvalu'},
	{name:'UAE'},
	{name:'Uganda'},
	{name:'Ukraine'},
	{name:'United Kingdom'},
	{name:'United States of America'},
	{name:'Uruguay'},
	{name:'US Virgin Islands'},
	{name:'Uzbekistan'},
	{name:'Vanuatu'},
	{name:'Vatican City'},
	{name:'Venezuela'},
	{name:'Vietnam'},
	{name:'Wallis and Futuna'},
	{name:'Yemen'},
	{name:'Zambia'},
	{name:'Zimbabwe'}
]


		$scope.ChangePreference=function(prefid,me,newpref)
	{
		
			io.socket.put('/user/'+me+"?"+prefid+"="+newpref,{
				
					  }  
				  
				,function(resData,jwres)
			{
				console.log(resData);
				console.log(jwres);
				}
			);
     
		
	}
		$scope.PrefSelectChanged=function(pref,me,func)
	{
		$scope.ChangePreference(pref,me,$scope.User[pref]);
		console.log("changed "+pref+" to "+JSON.stringify($scope.User[pref]));
		if(func){
		func(me);}
	}
}]);