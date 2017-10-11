angular.module('HomepageModule').controller('HomepageController', ['$scope', '$http','$window' ,'toastr', function($scope, $http,$window,toastr){
$scope.opg=new Array();
$scope.sessions=new Array();
$scope.joinedgames=new Array();
$scope.Players=new Array();
$scope.User;
$scope.Notifications=[];
$scope.GameForm={};

$scope.GameForm.color='White';
$scope.SoleConnectorVariable="";
	//document.getElementById("body").style.backgroundColor="#4D129F";
		$scope.gamecategories=[{time:1,extratime:0},
					{time:2,extratime:0},
					{time:3,extratime:0},
					{time:4,extratime:0},
					{time:5,extratime:0},
					{time:6,extratime:0},
					{time:7,extratime:0},
					{time:8,extratime:0},
					{time:9,extratime:0},
					{time:10,extratime:0},
					{time:15,extratime:0},
					{time:20,extratime:0},
					{time:30,extratime:0},
					{time:60,extratime:0},
					{time:2,extratime:1},
					{time:3,extratime:1},
					{time:5,extratime:2},
					{time:10,extratime:5},
					{time:15,extratime:5},
					{time:20,extratime:10},
					{time:30,extratime:10},
					{time:60,extratime:10}]
	
	$scope.GetNotifications=function(usrid)
	{
		io.socket.get('/notification?reciever='+usrid,
	function  (data){
	$scope.Notifications=data;
	});
	
	io.socket.on('notification',function(data){
	$scope.$apply(function(){$scope.Notifications.push(data);});
	});
	};
	$scope.DestroyNotifications=function(adr)
	{
		//console.log("destroy adr"+adr);
		io.socket.get('/notification?adr='+adr,
	function  (data){
	for (x in data)
	{
	//	console.log("destroy "+data[x].id);
		io.socket.put('/notification/destroy',{id:data[x].id},
	
		function  (data2){
			//console.log("data2 "+JSON.stringify(data2));
	});
	}
	});
	
	};
	
	$scope.SoleConnectorFunction=function(id)
	{/*
		console.log("sole connector func");
		$http.get('/subscription?subscriber='+id, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.SoleConnectorVariable="true";
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			console.log(JSON.stringify(sailsResponse));
			if(sailsResponse.data.length==0)
			
		{
		 */	
				console.log("sole connector");
			$scope.joinmyuserIDRoom(id);
			$scope.ReconnectFunction(id);
			$scope.getuser(id);
			$scope.joinopengameRoom(id);
			$scope.SoleConnectorVariable="true";
			/*}
			
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			
			}
			
			
			)
			.catch(function onError(sailsResponse) {
			$scope.SoleConnectorVariable="true";
				console.log("hello2");
			
			$scope.joinmyuserIDRoom(id);
			$scope.ReconnectFunction(id);
			$scope.getuser(id);
			$scope.joinopengameRoom(id);
			console.log("$scope.SoleConnectorVariable "+$scope.SoleConnectorVariable);
			
			
			});*/
	}
	
	$scope.createopengame=function(type,id,name,gamecat)
	{
		console.log("$scope.GameForm1`"+$scope.timeobject['time']);
		console.log("$scope.GameForm2"+$scope.timeobject.time);
		console.log("$scope.GameForm2"+$scope.timeobject.extratime);
		var gamecat=$scope.timeobject.time+"|"+$scope.timeobject.extratime;
			if(!$scope.User.Invisible)
	{
	io.socket.put('/newopengame', { GameType:type,GameCategory:gamecat,TimeLimit:$scope.timeobject.time,ExtraTimeLimit:$scope.timeobject.extratime,Player1Color:$scope.GameForm.color,Player1: id,Player1Name:name },
    function (resData, jwr) {

      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		toastr.success('Created New Game');
    });
	}
	else
	{
		toastr.warning('Disabled Account',"Can't create new game");
	}
	};
	
	$scope.createsession=function(type,id,name)
	{
	io.socket.put('/newsession', { GameType:type,TimeLimit:$scope.GameForm.timelimit,Player1Color:$scope.GameForm.color,Player1: id,Player1Name:name },
    function (resData, jwr) {

      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		toastr.success('Created New Game');
    });
	};
	
	
	$scope.ReconnectFunction=function(MyID)
	{
io.socket.on('connect',function(data){
	console.log("DISCONNECT DETECTED!!!!");
	$scope.joinopengameRoom(MyID);
	$scope.joinsessionRoom();
	if($scope.User)
	{
		console.log("naughty");
	$scope.joinmyuserIDRoom($scope.User.id);
	}
	else
	{
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
			$scope.joinmyuserIDRoom($scope.User.id);
			console.log("naughty2");
			}
			)		
	}
	});
	
	};
	io.socket.on('newmygameevent', function (data)
			{
			console.log('recieved new game event '+data);
			
			data.phrase=phrasefordate(data.createdAt);
			$scope.$apply(function(){
			$scope.joinedgames.push(data);
			});
			console.log(data);
			});
		
		/*	setInterval(function (MyID)
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
	*/
	io.socket.on('deletegameevent', function (data)
			{
			console.log("delete game event"+data);
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
			
			io.socket.on('newsessionevent', function (data)
			{
			console.log('newsessionevent'+data);
			data.phrase=phrasefordate(data.createdAt);
			$scope.$apply(function(){
			$scope.sessions.push(data);
			});
			console.log(data);
			});
			
	io.socket.on('newopengameevent', function (data)
			{
			console.log('newopengameevent'+data);
			data.phrase=phrasefordate(data.createdAt);
			$scope.$apply(function(){
			$scope.opg.push(data);
			});
			console.log(data);
			});
			
		
		
io.socket.on('joined im online room',function(data)
			{
			io.socket.get("/user?id="+data.joiner,{},function (resData,jwres){
		var foundplayer=false;
					for(var i = $scope.Players.length - 1; i >= 0; i--) {
			
			if($scope.Players[i].name==resData.name) {
			foundplayer=true;
			}
			}
			
			if (foundplayer==false)
			{
			$scope.$apply($scope.Players.push({name:resData.name,id:resData.id}));
			}
    	});
				
			});
		io.socket.on('left room',function(data)
			{
			io.socket.get("/user?id="+data.leaver,{},function (resData,jwres){
					for(var i = $scope.Players.length - 1; i >= 0; i--) {
			
			if($scope.Players[i].name==resData.name) {
			$scope.$apply($scope.Players.splice(i, 1));
			}
			}
			
			
    	});
				
			});
		
		function phrasefordate(dat)
			{
			var nu=Date.parse(dat);
			//console.log("nu "+nu);
		var n = Date.now();
		
		var newnum=n-nu;
		newnum=newnum/1000;
		if (newnum<60)
		{
		if (newnum<0)
		{newnum=0;}
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
		/*$http.put('/ChangeUsersCurrentGame', {
			  GameID: GameID,
			  oppo:Player2
    })
    .then(function onSuccess (dat){
     */
     window.location="/humanvshuman/"+GameID;
	/*
    })
    */
	};
	
$scope.joingame=function(GameID,PlayerID,PlayerName,playercolor,MyID,MyName,GamType,GamCategory,timelimit){
		console.log("joingame player1"+PlayerID+" player2"+MyID+" player1name "+PlayerName+" Player2Name "+MyName);
		console.log("timelimit*60"+timelimit*60);
		if (!$scope.User.Invisible)
		{
		$http.put('/joingame', {
			GameID:GameID,
			PlayerID:PlayerID,
			//PlayerName:PlayerName,
			PlayerColor:playercolor,
			MyID:MyID,
			//MyName:MyName,
			GameType:GamType,
			GameCategory:GamCategory,
			Player1TimeLimit:timelimit*60,
			Player2TimeLimit:timelimit*60
			})
			.then(function onSuccess(sailsResponse){
			
			$scope.deleteopengame(GameID);
			}
			)
			}
			else
			{
				toastr.warning('Disabled Account',"Can't join game");
			}
		};
			
		$scope.deletegame=function(id,user)
		{
			console.log('asked to delete game '+id);
			 io.socket.put('/deletegame', { gameid:id,owner:user},function  (data,jwres){
      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		//toastr.success('Created New Game');
		});
		
		};
		
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
				$window.location.href = '/justloggedin';
			}
			}
			);
			
			};
			
		$scope.deleteopengame=function(id)
		{
			console.log('asked to delete'+id);
			 io.socket.put('/deleteopengame', { gameid:id},function  (data,jwres){
      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		//toastr.success('Created New Game');
	});
		
		};
		
	$scope.joinImOnlineRoom=function()
	{
	var roomname='im online';
	io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			//console.log(JSON.stringify(resData));
			});
	};

$scope.joinsessionRoom=function()
{
	
	var roomname='sessionroom';
	io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			//console.log(JSON.stringify(resData));
			});
			
			
	$http.get('/session?limit=3000').then( function (dat) {
			$scope.opg=[];
			for(x in dat.data)
			{
			dat.data[x].phrase=phrasefordate(dat.data[x].createdAt);
			$scope.sessions.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			}
			
			
			});
	};
	$scope.joinopengameRoom=function (id)
		{
			
		var roomname='openchessgameroom';
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
		
		$http.get('/subscription?room='+roomname+'&limit=3000').then( function (dat) {
			$scope.Players=[];
			for(x in dat.data)
			{
			//console.log(dat.data[x].subscriber);
			//console.log(JSON.stringify(dat.data));
			
			$http.get('/user?id='+dat.data[x].subscriber, {
			})
			.then(function onSuccess(sailsResponse){
				
			
			var foundplayer=false;
			for(var i = $scope.Players.length - 1; i >= 0; i--) {
			
				if($scope.Players[i].name==sailsResponse.data.name) {
				foundplayer=true;
				}
			}
			
			if (foundplayer==false)
			{
			$scope.Players.push({name:sailsResponse.data.name});
			}
			
			}
			)
			 // => {id:9, name: 'Timmy Mendez'}
			
			}
			
			
			});
		
		$http.get('/openchessgame?limit=3000').then( function (dat) {
			$scope.opg=[];
			for(x in dat.data)
			{
			dat.data[x].phrase=phrasefordate(dat.data[x].createdAt);
			$scope.opg.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			}
			
			
			});
			
			/*
			$http.get('/chessgame?limit=3000').then( function (dat) {
			$scope.joinedgames=[];
			for(x in dat.data)
			{
			dat.data[x].phrase=phrasefordate(dat.data[x].createdAt);
			$scope.joinedgames.push(dat.data[x]); // => {id:9, name: 'Timmy Mendez'}
			}
			
			
			});
			*/
			
		io.socket.get('/chessgame?Player1='+id+'&sort=createdAt ASC',
			function (games) {
				$scope.joinedgames=[];
			//console.log("games1");
			console.log("games "+JSON.stringify(games));
			//for (x in games)
			//{console.log("games[x] "+games[x]);
			//}
 
				for (var y in games)
				{		 
				$scope.joinedgames.push(games[y]);
				}

				io.socket.get('/chessgame?Player2='+id+'&sort=createdAt ASC',
					function (moregames) {
						//console.log("games2");
						for (var x in moregames)
						{		 
						$scope.joinedgames.push(moregames[x]);
						}
						console.log("moregames "+JSON.stringify(moregames));
						$scope.joinedgames.sort(function(a, b){return Date.parse(b.createdAt)-Date.parse(a.createdAt);});
					});
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
			
		
		
			
	};
	
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

		};
	
	$scope.showflash=function(msg)
	{
		msg=msg.split("•");

		toastr.error(msg[msg.length-1]);
	}
$scope.countryTofilename=function(country)
{
	if (country){
	//return country.replace(/ /gi, "_");
	return country.replace(/ /gi, "-");
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
	{name:'Bosnia and Herzegovina'},
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
	
	{name:'Democratic Republic of the Congo'},
	{name:'Denmark'},
	{name:'Djibouti'},
	{name:'Dominica'},
	{name:'Dominican Republic'},
	{name:'East Timor'},
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
	{name:"Ivory Coast"},
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
	{name:'Macau'},
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
	
	{name:'Montenegro'},
	
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
	{name:'Russia'},
	{name:'Rwanda'},
	{name:'Saint Kitts and Nevis'},
	{name:'Saint Lucia'},
	{name:'Saint Pierre'},
	{name:'Saint Vincent and the Grenadines'},
	{name:'Samoa'},
	{name:'San Marino'},
	{name:'Sao Tome and Principe'},
	{name:'Saudi Arabia'},
	{name:'Senegal'},
	{name:'Serbia'},
	{name:'Seychelles'},
	{name:'Sierra Leone'},
	{name:'Singapore'},
	{name:'Slovakia'},
	{name:'Slovenia'},
	{name:'Solomon Islands'},
	{name:'Somalia'},
	{name:'South Africa'},
	
	{name:'South Korea'},

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
	
	{name:'Togo'},
	{name:'Tonga'},
	{name:'Trinidad and Tobago'},
	{name:'Tunisia'},
	{name:'Turkey'},
	{name:'Turkmenistan'},
	{name:'Turks and Caicos Islands'},
	{name:'Tuvalu'},
	{name:'United Arab Emirates'},
	{name:'Uganda'},
	{name:'Ukraine'},
	{name:'United Kingdom'},
	{name:'United States'},
	{name:'Uruguay'},
	{name:'US Virgin Islands'},
	{name:'Uzbekistan'},
	{name:'Vanuatu'},
	{name:'Vatican City'},
	{name:'Venezuela'},
	{name:'Vietnam'},
	{name:'Wallis And Futuna'},
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