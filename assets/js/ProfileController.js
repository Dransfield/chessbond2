angular.module('HomepageModule').controller('ProfileController', ['$scope', '$http','$window' ,'toastr', function($scope, $http,$window,toastr){
$scope.User;
$scope.SoleConnectorVariable="";
$scope.MyGames=[];
$scope.GameInfo=[];
$scope.WallPosts=[];
$scope.wallpostskip=0;
$scope.chessgameskip=0;
$scope.BlockedUsers=[];

$scope.editgender=false;
$scope.genders=['Male','Female'];

$scope.menfidetitles=['GM' , 'IM', 'FM' , 'CM'];
$scope.womenfidetitles=['WGM' , 'WIM', 'WFM' , 'WCM'];
$scope.fidetitles=$scope.menfidetitles;

$scope.TypedCity="";
$scope.FoundCities=[];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$scope.GetCities=function(){
	io.socket.get("/city",{where:{'city':{'startsWith':$scope.TypedCity}}},
	function (resData,jwres){
		//console.log(resData);
		//console.log($scope.TypedCity);
		for (x in resData)
		{
		
		resData[x].city=capitalizeFirstLetter(resData[x].city);	
		}
		$scope.$apply(function(){
			$scope.FoundCities=resData;
	
		
		});
		});
	};

$scope.editbirthday=false;
$scope.birthyears=[];
for (yeariter=1900;yeariter<new Date().getFullYear()+1;yeariter++)
{$scope.birthyears.push(yeariter);
}

$scope.birthdays=[];
for (dayiter=1;dayiter<32;dayiter++)
{$scope.birthdays.push(dayiter);
}

$scope.birthmonths=[{name:'January'},
{name:'February'},
{name:'March'},
{name:'April'},
{name:'May'},
{name:'June'},
{name:'July'},
{name:'August'},
{name:'September'},
{name:'October'},
{name:'November'},
{name:'December'},
]

$scope.IdleTime=0;
$scope.SetIdle=false;



$scope.Accounts=[];


    $("#mainContainer").show();
   /*
    $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});*/
  
		$scope.MouseWasMoved=function()
		{
			$scope.IdleTime=0;
			if($scope.SetIdle==true)
			{
				$scope.ChangePreference('idle',$scope.User.id,'no');
				$scope.SetIdle=false;
				
			}
		};
		$scope.GetFile=function()
	{
		console.log("sending ");
		io.socket.get("/getmyfile",{adr:"http://www.google.com"},
		function  (data){
		console.log(data);
		});
	};
	$scope.uploadFile=function()
	{
		$http.post('/uploadavatar',{avatar:'/root/Downloads/scroll/city2.jpg'})
	.then(function onSuccess (){
			//Refresh the page now that we've been logged in.
			toastr.success('Picture uploaded');
			})   
            .catch(function onError(sailsResponse) {
			console.log("error "+JSON.stringify(sailsResponse));
		});
	};
    $scope.IncreaseViews=function(Myid)
    {
		io.socket.put('/LookedAtProfile',{userID:Myid},
		function  (data){
		
		});
		
	};
    $scope.GetAccount=function(Myid)
    {
			
		
		console.log("is "+Myid+" account gotten?");
	
	if(!$scope.Accounts[Myid])
	{
		console.log(Myid+" not gotten");
	
		io.socket.get('/user/'+Myid,
		function(usr){
			
			
			  if (usr)
			{
	
				$scope.Accounts[Myid]=usr;
	io.socket.get('/subscription?subscriber='+Myid,
			function (rply) {
		
				$scope.$apply(function()
				{
				if(rply)
				{
					console.log("got reply");
				if(rply.length>0)
				{
					console.log("got reply>0"+Myid);
				
				$scope.Accounts[Myid].online=true;
				
				}
				else
				{
					console.log(JSON.stringify(rply));
						console.log(Myid+" is not online");
					$scope.Accounts[Myid].online=false;
				}
				
			}});
		
		});
	
	}
	
	});
	
	}	
	 

	
	};	
		
	
    
    
	
	
	

   
	$scope.DeleteWallPost=function(wllpstid)
	{
	console.log("deleting "+wllpstid);
	io.socket.put('/wallpost/destroy',{id:wllpstid},
		function  (data){
			console.log("deleted "+JSON.stringify(data));
			for (x in $scope.WallPosts)
			{
			if ($scope.WallPosts[x].id==wllpstid)
			{
			$scope.$apply(function(){$scope.WallPosts.splice(x,1);});	
			}
			}
		});
	};

	$scope.getdate=function(datestr)
	{
	return Date.parse(datestr);
	};
	

	
	$scope.SendWallPost=function(usrid)
		{
			var none='none';
			console.log("user "+$scope.User);
			console.log("lookedatuser "+$scope.LookedatUser);
			
			$http.post("/newwallpost",{ReplyTo:'none',senderpic:$scope.User.picture,content:$scope.WallPostInput,sender:$scope.User.id,sendername:$scope.User.name,roomName:'profile/'+$scope.LookedatUser.id,reciever:$scope.LookedatUser.id})
			.then(function onSuccess (){
			$scope.chatInput = null;
			
			io.socket.post('/newnotification',{reciever:$scope.LookedatUser.id,msg:'New Wall Post Recieved',adr:'/profile/'+$scope.LookedatUser.id},
			function (resData, jwRes) {
				
				});
			
			}
			);
			
			
			
		};
		$scope.GetMoreWallPosts=function(id)
		{
		$scope.wallpostskip+=10;
		console.log("$scope.wallpostskip "+$scope.wallpostskip);
			$scope.GetWallPosts(id);
		};
		
		$scope.GetMoreChessGames=function(id)
		{
		$scope.chessgameskip+=10;
			$scope.GetChessGames(id);
		};
		
		$scope.GetOlderChessGames=function(id)
		{
				$scope.chessgameskip-=10;
			$scope.GetChessGames(id);
			
		};
		
		$scope.GetOlderWallPosts=function(id)
		{
		$scope.wallpostskip-=10;
		console.log("$scope.wallpostskip "+$scope.wallpostskip);
			$scope.GetWallPosts(id);
		};
		
		
		$scope.CalcAge=function(time)
		{
			var time=Date.parse(time);
			return Date.now()-time;
			
		};
		$scope.phraseforloggedindate=function(dat)
		{
			console.log("nu "+nu);
			var nu=Date.parse(dat);
			console.log(nu);
			console.log(console.log(nu));
			
			var n = Date.now();
			var newnum=n-nu;
			console.log('newnum '+newnum);
			var millisecondsinaday=(24*(60*(60*(1000))));
			console.log("millisecondsinaday "+millisecondsinaday);
			if (newnum<millisecondsinaday)
			{
				
				newnum=newnum/1000;
				console.log("newnum after 1000 "+newnum);
		if (newnum<60)
		{
		if (newnum<0)
		{newnum=0;}
		phrase=parseInt(newnum)+" seconds ago";
		}
		else
		{
		newnum=newnum/60;
		console.log("newnum after  60"+newnum);
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" minutes ago";
		}
		else
		{
		newnum=newnum/60;
		console.log("newnum after another 60"+newnum);
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" hours ago";
		}
		else
		{
			console.log("newnum after  24 "+newnum);
		newnum=newnum/24;
		
		phrase=parseInt(newnum)+" days ago";
		
		}
		
		}
		
		}
		return phrase;
			}
			else
			{
				var nu=new Date(dat);
			var month = nu.getUTCMonth() + 1; //months from 1-12
			var day = nu.getUTCDate();
			var year = nu.getUTCFullYear();

			newdate = day+ "/"+month+"/"+year ;
			return newdate;
			}
		};
		
		$scope.phrasefordate=function(dat)
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
	};
	
	$scope.BlockUser=function(MyID,sender)
		{
		$scope.BlockedUsers[sender]=true;
			
			io.socket.post('/block',{blocker:MyID,blocked:sender},
			function (resData, jwRes) {
				});
		};
		
	$scope.UnBlockUser=function(MyID,sender)
	{
		
		$scope.BlockedUsers[sender]=false;
			
		io.socket.get('/block?blocked='+sender+'&blocker='+MyID,
	function  (data){
		console.log("Get"+JSON.stringify(data));
			for(x in data){
	io.socket.put('/block/destroy',{id:data[x].id},
		function  (data){
			
			
		
		});
		}
		});
	};
	$scope.GetBlockedUsers=function(MyID)
	
	{
	io.socket.get('/block?blocker='+MyID,
			function (blk) {
		$scope.$apply(function(){
		for (x in blk)
		{
			
		
		$scope.BlockedUsers[blk[x].blocked]=true;	
		
		}
		});
		});
	};

		
	$scope.GetWallPosts=function(id)
	{	
		io.socket.get('/wallpost?replyto=none&reciever='+id+'&limit=10&skip='+$scope.wallpostskip+'&sort=createdAt DESC',
			function (msgs) {
				//console.log(JSON.stringify(msgs));
				
				$scope.WallPosts=[];
				console.log("msgs.length "+msgs.length);
				for (x in msgs)
				{
				$scope.WallPosts[x]=msgs[x];
				$scope.WallPosts[x].Replies=[];
				msgs[x].Age=$scope.phrasefordate(msgs[x].createdAt);//$scope.CalcAge(msgs[x].createdAt);
				 $scope.doreplies(id,x);
						
				}
				
			
			});
	};
	$scope.doreplies=function(id,x)
	{
		
	io.socket.get('/wallpost?replyto='+$scope.WallPosts[x].id+'&reciever='+id+'&limit=10&sort=createdAt DESC',
			function (rply) {
				console.log("x "+x);
				$scope.$apply(function(){
				
				for (var y in rply)
				{
				$scope.WallPosts[x].Replies[y]=rply[y];
				rply[y].Age=$scope.phrasefordate(rply[y].createdAt);//$scope.CalcAge(msgs[x].createdAt);
				}
				
				});	
				});	
	};
	$scope.SendWallPostReply=function(personreplyingto,user,text,replyingto)
	{
			$http.post("/newwallpost",{ReplyTo:replyingto,senderpic:$scope.User.picture,content:text,sender:$scope.User.id,sendername:$scope.User.name,roomName:'profile/'+$scope.LookedatUser.id,reciever:$scope.LookedatUser.id})
			.then(function onSuccess (){
				
				io.socket.post('/newnotification',{reciever:personreplyingto,msg:'New Wall Post Recieved',adr:'/profile/'+$scope.LookedatUser.id},
			function (resData, jwRes) {
				});
				io.socket.post('/newnotification',{reciever:$scope.LookedatUser.id,msg:'New Wall Post Recieved',adr:'/profile/'+$scope.LookedatUser.id},
			function (resData, jwRes) {
				});
			});
	};
	$scope.GetChessGames=function(id)
	{
		
		
	
	$scope.MyGames=[];
	$scope.GameInfo=[];
		io.socket.get('/chessgame?Player1='+id+'&sort=createdAt ASC',
			function (games) {
			console.log("games1");
			//console.log("games "+JSON.stringify(games));
			//for (x in games)
			//{console.log("games[x] "+games[x]);
			//}
 
				for (var x in games)
				{		 
				$scope.MyGames.push(games[x]);
				}

				io.socket.get('/chessgame?Player2='+id+'&sort=createdAt ASC',
					function (moregames) {
						console.log("games2");
						for (var x in moregames)
						{		 
						$scope.MyGames.push(moregames[x]);
						}

						$scope.MyGames.sort(function(a, b){return Date.parse(b.createdAt)-Date.parse(a.createdAt);});
						$scope.MyGames=$scope.MyGames.slice($scope.chessgameskip,$scope.chessgameskip+9);
						console.log("HELLO");
							
						for (var x in $scope.MyGames)
						{
						//console.log('/user?id='+$scope.MyGames[x].Player1);
							io.socket.get('/user?id='+$scope.MyGames[x].Player1,
								function (user1) {
									io.socket.get('/user?id='+$scope.MyGames[x].Player2,
										function (user2) {
										var datenum=Date.parse($scope.MyGames[x].createdAt);
										var dateobj=new Date(datenum);
										var MonthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
										var datestring=dateobj.getDate()+","+MonthNames[dateobj.getMonth()]+" "+dateobj.getFullYear();
										var resultstring="";

											if (!$scope.MyGames[x].Result)
											{
												resultstring="No Result";
											}

											var drawpos;
											var wonpos;
										if(resultstring==="")
										{
											drawpos=$scope.MyGames[x].Result.indexOf("</span> Drew by <span");
												wonpos=$scope.MyGames[x].Result.indexOf("</span> Won by<span");
													
													if (drawpos>-1)
													{resultstring="1-1 (Draw)";}
													
											if (resultstring==="")
											{
												if 	($scope.MyGames[x].Result.indexOf($scope.MyGames[x].Player1Name)<wonpos)
												{
													if ($scope.MyGames[x].Player1==id)
													{
													resultstring="1-0 (Won)";
													}
													else
													{
													resultstring="1-0 (Lost)";
													}
												}
												else
												{
												
												if ($scope.MyGames[x].Player2==id)
												{
												resultstring="0-1 (Won)";
												}
												else
												{
												console.log("player1 name "+$scope.MyGames[x].Player1Name+" player2name "+$scope.MyGames[x].Player2Name);
												console.log("wonpos "+wonpos);
												console.log("$scope.MyGames[x].Result.indexOf($scope.MyGames[x].Player1Name) "+$scope.MyGames[x].Result.indexOf($scope.MyGames[x].Player1Name));
												resultstring="0-1 (Lost)";}
												}
											}
										}

										$scope.$apply(
											function(){
												if ($scope.MyGames[x].Player1Color=='White')
												{
												//console.log("white"+$scope.MyGames[x].id);
												$scope.GameInfo.push({id:$scope.MyGames[x].id,res:resultstring,timelimit:($scope.MyGames[x].Player1TimeLimit/60),date:datestring,moves:$scope.MyGames[x].Move,WhitePlayerID:$scope.MyGames[x].Player1,BlackPlayerID:$scope.MyGames[x].Player2,WhitePlayerName:$scope.MyGames[x].Player1Name,BlackPlayerName:$scope.MyGames[x].Player2Name,WhiteAvatar:user1.picture,BlackAvatar:user2.picture,WhiteELO:user1.ELO,BlackELO:user2.ELO});

												}
												else
												{
												//console.log("black"+$scope.MyGames[x].id);
												$scope.GameInfo.push({id:$scope.MyGames[x].id,res:resultstring,timelimit:($scope.MyGames[x].Player1TimeLimit/60),date:datestring,moves:$scope.MyGames[x].Move,WhitePlayerID:$scope.MyGames[x].Player2,BlackPlayerID:$scope.MyGames[x].Player1,WhitePlayerName:$scope.MyGames[x].Player2Name,BlackPlayerName:$scope.MyGames[x].Player1Name,WhiteAvatar:user2.picture,BlackAvatar:user1.picture,WhiteELO:user2.ELO,BlackELO:user1.ELO});

												}
											}
										);
									
								});
							
						});
					}
				});
			});
			
	};
	$scope.GetInfo=function(OwnerID)
	{
		
			$scope.GetWallPosts(OwnerID);
			$scope.GetChessGames(OwnerID);
			
			io.socket.on('IdleNotification',function (data)
			{
				$scope.$apply(function(){
			$scope.Accounts[data.id].idle=data.idlestatus;});
			console.log($scope.Accounts[data.id].name+" is idle");
			});
			
			io.socket.on('WallPost', function (data)
			{
			
			
			$scope.$apply(function(){
				if(data.replyto!='none')
				{
					console.log("recieved reply");
				for (x in $scope.WallPosts)
				{
				if($scope.WallPosts[x].id==data.replyto)
					{
						if(!$scope.WallPosts[x].Replies)
						{$scope.WallPosts[x].Replies=[];}
						$scope.WallPosts[x].Replies.push(data);}
				}
			}
			else
			{
					console.log("recieved not a reply");
				
			$scope.WallPosts.unshift(data);
			}
			});
			console.log(data);
			});
		
		io.socket.get("/subscribeToRoom",{roomName:'profile/'+OwnerID},function (resData,jwres){
			console.log(JSON.stringify(resData));
		});
		
	
			
		};
	
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
			//phraseforloggedindate(dat.data[x].createdAt);
			var dateObj=new Date($scope.LookedatUser.createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();

			newdate = day+ "/"+month+"/"+year ;
			$scope.LookedatUser.Registeredmemberon=newdate;
			$scope.LookedatUser.LastloginPhrase=$scope.phraseforloggedindate($scope.LookedatUser.Lastlogin);
			console.log("looked at user is "+$scope.LookedatUser.name);
			}
			)	
		
	};
$scope.getuser=function(MyID)
	{
		
		$http.get('/user?id='+MyID, {
			})
			.then(function onSuccess(sailsResponse){
			$scope.User=sailsResponse.data;
			if($scope.User.Gender=='Male')
			{
			$scope.fidetitles=$scope.menfidetitles;
			}
			else
			{
			$scope.fidetitles=$scope.womenfidetitles;
			}
			$scope.TopPlayerFlag=$scope.countryTofilename($scope.User['Country']);
				
			setInterval(function()
			{
			$scope.IdleTime+=1;
		if($scope.IdleTime>1)
		{
		$scope.ChangePreference('idle',$scope.User.id,'yes');
		$scope.SetIdle=true;
		
		}
		},60000);
			
			
			}
			)	
		
	};
	
	
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
     
		
		};
		$scope.PrefSelectChanged=function(pref,me,func)
	{
		$scope.ChangePreference(pref,me,$scope.User[pref]);
		$scope.Accounts[me][pref]=$scope.User[pref];
		$scope.LookedatUser[pref]=$scope.User[pref];
		$scope.TopPlayerFlag=$scope.countryTofilename($scope.User['Country']);
		
		console.log("changed "+pref+" to "+JSON.stringify($scope.User[pref]));
		if(func){
		func(me);}
	}
	$scope.setGender=function(MyID)
	{
		console.log($scope.User.Gender);
	if ($scope.User.Gender=='Male')
	{
	$scope.fidetitles=$scope.menfidetitles;
	}	
	else
	{	
	$scope.fidetitles=$scope.womenfidetitles;
	}
		
	};
	
	$scope.setCity=function(MyID)
	{
		$scope.editcity=false;
		
	};

}]);