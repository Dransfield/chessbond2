var ButtonNumber=0;
var UserNamesPrinted={};
var DropDowns={};
var Navbar={};
var rematchSeconds;
var acceptDrawSeconds;
var recentGameIndex=0;
var recentGamesToShow=20;
var lastChatMessagePostedBy="";
var NDDlinks={};
var updateTournamentInterval;

var gamecategories=[{time:1,extratime:0},
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
					{time:60,extratime:10}];

function gameCategoryNumberArray()
{
	var array=[];
	for (iter in gamecategories)
	{
		array.push(gamecategories[iter].time+"-"+gamecategories[iter].extratime);
	}
		return array;
}

function showTournamentRedirectNotice()
{
	
	var redirectButton=showButton($("body"),"Redirecting in ","KgreenElement KhugeButton");
	var timerspan=addSpan(redirectButton,"rematchTimer");
	redirectButton.css("position","fixed");
	redirectButton.css("top","50%");
	var redirectSeconds=30;
	
	setInterval(function(){
		redirectSeconds=redirectSeconds-1;
		$("#rematchTimer").html(redirectSeconds);
		if(rematchSeconds==0)
		{redirectbutton.slideUp();}
	},1000);

	}

function showAcceptDrawButton()
{

	
	
	
	acceptDrawButton=showButton($("body"),"Opponent offers a draw","KgreyElement KhugeButton");
	var acceptDrawDiv=addFlexDiv(acceptDrawButton,"offer","column");
	var timerspan=addSpan(acceptDrawDiv,"offerDrawTimer");
	var yesnoDiv=addDiv(acceptDrawDiv);
	var yesButton=showButton(yesnoDiv,"Yes","KgreenElement KhugeButton");
	var noButton=showButton(yesnoDiv,"No","KredElement KhugeButton");
	
	acceptDrawButton.css("position","fixed");
	acceptDrawButton.css("top","20%");
	acceptDrawSeconds=30;

	yesButton.click(gameFunctions.acceptDraw);
noButton.click(function(){

	
		if(GamePlaying.Player1==GamePlaying.Player2)
		{
			console.log("player 1 is player 2");
		
		}
		acceptDrawButton.slideUp();

	});

	setInterval(function(){
		acceptDrawSeconds=acceptDrawSeconds-1;
		$("#offerDrawTimer").html(acceptDrawSeconds);
		if(acceptDrawSeconds==0)
		{acceptDrawButton.slideUp();}
	},1000);

}

function showRematchButton()
{

	io.socket.on('newmygameevent', function (data)
		{
		$(location).attr('href', '/humanvshumannew/'+data.id);

		});

	io.socket.on('rematch',function (data)
		{

			console.log("recieved rematch");
			var nam="";
			if (GamePlaying.Player1=data.content)
				{nam=GamePlaying.Player1Name;}
			if (GamePlaying.Player2=data.content)
				{nam=GamePlaying.Player2Name;}

			var but=showButton($("body"),nam+" wants a rematch","KgreenElement KhugeButton");
			but.css("position","fixed");
			but.css("top","10%");
		});

	var Rematchbutton=showButton($("body"),"Rematch?","KgreenElement KhugeButton");
	var timerspan=addSpan(Rematchbutton,"rematchTimer");
	Rematchbutton.css("position","fixed");
	Rematchbutton.css("top","50%");
	rematchSeconds=30;

	Rematchbutton.click(function(){

		if(GamePlaying.Player!=GamePlaying.Player2)
		{
			//io.socket.put('/WantRematch',{me:MyID,gam:GamePlaying.id,p1color:GamePlaying.Player1Color,gametype:GamePlaying.GameType,gamecat:GamePlaying.GameCategory,gametime:GamePlaying.Player1TimeLimit},
			io.socket.put('/WantRematch',{me:MyID,msg:GamePlaying.Result,gam:GamePlaying.id},

			function (resData, jwr) {
			Rematchbutton.slideUp();
			/*
			if (!resData.opponentWantsRematch)
			{
			var Waitingbutton=showButton($("body"),"Waiting for response","KgreenElement KhugeButton");
			Waitingbutton.css("position","fixed");
			Waitingbutton.css("top","50%");
			var waitingspan=addSpan(Waitingbutton,"waitingTimer");
			setInterval(function(){
				rematchSeconds=rematchSeconds-1;
				$("#waitingTimer").html(rematchSeconds);
				if(rematchSeconds==0)
				{Waitingbutton.slideUp();}
			},1000);
			}
			*/
			});

		}

		if(GamePlaying.Player1==GamePlaying.Player2)
		{
			console.log("player 1 is player 2");
		/*io.socket.put('/newopengame', { GameType:GamePlaying.GameType,GameCategory:GamePlaying.GameCategory,TimeLimit:GamePlaying.GameCategory.split("|")[0],ExtraTimeLimit:GamePlaying.GameCategory.split("|")[1],Player1Color:GamePlaying.Player1Color,Player1:GamePlaying.Player1,Player1Name:Accounts[GamePlaying.Player1].name },
    function (resData, jwr) {
		console.log(resData);
		var data=(resData);
		console.log(data);
      // Refresh the page now that we've been logged in.
      //window.location.reload(true);
      var iter=0;
		io.socket.put('/joingame',
		{
			GameID:data.id,
			PlayerID:data.Player1,
			//PlayerName:PlayerName,
			PlayerColor:data.Player1Color,
			MyID:MyID,
			//MyName:MyName,
			GameType:data.GameType,
			GameCategory:data.GameCategory,
			Player1TimeLimit:data.TimeLimit*60,
			Player2TimeLimit:data.TimeLimit*60
		}

		,function(resData2,jwres2)
		{

			//console.log(JSON.parse(resData).id);

			io.socket.put('/deleteopengame', { gameid:data.id},function  (data2,jwres)
			{




			});
				$(location).attr('href', '/humanvshumannew/'+resData2.id);

		}
		);

    });*/

		}

	});

	setInterval(function(){
		rematchSeconds=rematchSeconds-1;
		$("#rematchTimer").html(rematchSeconds);
		if(rematchSeconds==0)
		{Rematchbutton.slideUp();}
	},1000);

}

function timeOfDayForDate(dat)
{
	
	var nu=new Date(dat);
			var hour = nu.getUTCHours() + 1; //months from 1-12
			var minute = nu.getUTCMinutes();
			var second = nu.getUTCSeconds();
			var secondstring=second.toString();
			if (secondstring.length==1)
			{secondstring="0"+secondstring;}
			var minutestring=minute.toString();
			if (minutestring.length==1)
			{minutestring="0"+minutestring;}
	return hour+":"+minutestring+":"+secondstring+" UTC (London Time)";
}

function differenceBetweenTwoDates(dat1,dat2)
{
	
	var nu1=Date.parse(dat1);
	var nu2=Date.parse(dat2);
	var newnum=nu2-nu1;
	
	var millisecondsinaday=(24*(60*(60*(1000))));
			//console.log("millisecondsinaday "+millisecondsinaday);
			

				newnum=newnum/1000;
				//console.log("newnum after 1000 "+newnum);
		if (newnum<60)
		{
		if (newnum<0)
		{newnum=0;}
		phrase=parseInt(newnum)+" seconds ";
		}
		else
		{
		newnum=newnum/60;
		//console.log("newnum after  60"+newnum);
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" minutes";
		}
		else
		{
		newnum=newnum/60;
		//console.log("newnum after another 60"+newnum);
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" hours";
		}
		else
		{
		//console.log("newnum after  24 "+newnum);
		newnum=newnum/24;

		phrase=parseInt(newnum)+" days";

		}

		}

		}
		return phrase;
			
}

function phraseforloggedindate(dat)
		{
			//console.log("nu "+nu);
			var nu=Date.parse(dat);
			//console.log(nu);
			//console.log(console.log(nu));
			// var offset=nu.getTimezoneOffset();
			// console.log("offset "+offset);
			
			var n = Date.now();
			var newnum=n-nu;
			//console.log('newnum '+newnum);
			var millisecondsinaday=(24*(60*(60*(1000))));
		//	console.log("millisecondsinaday "+millisecondsinaday);
			if (newnum<millisecondsinaday)
			{

				newnum=newnum/1000;
				//console.log("newnum after 1000 "+newnum);
		if (newnum<60)
		{
		if (newnum<0)
		{newnum=0;}
		phrase=parseInt(newnum)+" seconds ago";
		}
		else
		{
		newnum=newnum/60;
		//console.log("newnum after  60"+newnum);
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" minutes ago";
		}
		else
		{
		newnum=newnum/60;
		//console.log("newnum after another 60"+newnum);
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" hours ago";
		}
		else
		{
			//console.log("newnum after  24 "+newnum);
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
		}


	function phrasefordate(dat)
			{
			var nu=Date.parse(dat);
			//nu=nu-42777252;
			var nuDate=new Date(nu);
		//	console.log("last visit "+nu);
	//console.log("last visit string "+nuDate.toString());
		//	console.log("Date.UTC(nuDate)"+Date.UTC(nuDate));
		//	console.log("Date.UTC(nu)"+Date.UTC(nu));
			//console.log(nuDate.UTC());
		var n = Date.now();
	//	console.log("now "+n);
	//		console.log("diff "+(n-nu));
		var nuDate2=new Date(n);
	//	console.log("now string "+nuDate2.toString());
	//	console.log("now string "+nuDate2.toLocaleDateString());
		
		var offset=nuDate.getTimezoneOffset();
		//var offset2=nuDate2.getTimezoneOffset();
		
		var actualOffset=(((offset*60))*1000);
		//var actualOffset2=(((offset2*60))*1000);
		//nu=nu+actualOffset;
		//console.log("new diff "+(n-nu));
		//n=n+actualOffset2;
		//console.log(offset);
		//console.log(actualOffset);
		//console.log(offset2);
		//console.log(actualOffset2);
		var newnum=n-nu;
		//console.log(newnum);
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

/*
var gamecategories=[{time:1,extratime:0},
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
					{time:60,extratime:10}];
*/
function showUpcomingTournamentTable(elem)
{
	var tbl=$("<table id='ipTable'></table>");
	elem.append(tbl);
var headers=["Game Category","Available to Join.."," Interested"];
	for( h in headers)
	{
	var header=$("<th>"+headers[h]+"</th>");
	tbl.append(header);
	}
	for (iter in TournamentCandidates)
	{
	var row=$("<tr></tr>");
		tbl.append(row);
		
	 	var cell=$("<td></td>");
		cell.append(TournamentCandidates[iter].category);
		row.append(cell);
	}	
}


function sortTourn(a,b)
	{
		if(!b)
		{console.log("found null tourn");
			for (iter in Tournaments)
			{if(b==Tournaments[iter])
				{console.log("its the "+iter+" one");}
				}
			}
		if(!b.dateAvailable)
		{console.log("found null tourn with no available");}
		
	var nowDate=new Date(serverTime);
	var dateA=new Date(a.dateAvailable);
	var diffa=dateA-nowDate;
	var dateB=new Date(b.dateAvailable);
	var diffb=dateB-nowDate;
	return diffa - diffb;
	}

	function timeToAvailFunc(a)
	{
	var nowDate=new Date(serverTime);
	var dateA=new Date(a.dateAvailable);
	var diffa=dateA-nowDate;
	return diffa;	
	}
	
		function withdrawTournamentFunctionTournamentPage(event)
	{
		
		
		
		
		io.socket.post('/LeaveTournament',{player:event.data.plr,tourny:event.data.tournID},function (resData, jwr) {
				//toastr.success("Joined Tournament");
					console.log(JSON.stringify(jwr));
					if(jwr.statusCode!=404)
					{
						toastr.success(resData);
						event.data.withdrawDiv.slideUp();
						event.data.joinDiv.slideDown();
						showTournamentEntries(event.data.tournID,joinedPlayersDivContainer,joinedPlayersDiv);
				
					}
					else
					{
						toastr.error(resData);
					}
					
			});	
		
		
		
		
		}
	
	function withdrawTournamentFunctionMainPage(event)
	{
		
		
		
		tournamentTableContainer.slideUp();
		io.socket.post('/LeaveTournament',{player:event.data.plr,tourny:event.data.tournID},function (resData, jwr) {
				//toastr.success("Joined Tournament");
					console.log(JSON.stringify(jwr));
					if(jwr.statusCode!=404)
					{
						toastr.success(resData);
					}
					else
					{
						toastr.error(resData);
					}
					
					
					currentTournamentDiv.detach();
				joinbuttonDiv.detach();
				timeToCurrentTournamentStartDiv.detach();
				viewbuttonDiv.detach();
				withdrawbuttonDiv.detach();
				joinedPlayersDiv.detach();
				
				//for (emptyIter in bigemptyDiv)
				//{bigemptyDiv[emptyIter].detach();}
				bigemptyDiv.map(x=>x.detach());
				
				tournamentTable.detach();
				tournamentTable=showUpcomingTournamentTable2(tournamentTableContainer);
				showTournamentEntries(event.data.tournID,joinedPlayersDivContainer,joinedPlayersDiv);
				tournamentTableContainer.slideDown();
			});	
		
		
		
		
		}

function showTournamentGameSchedule(elem,thetournid)
{
var gameNumber=0;
				elem.append("<h1>Game Schedule</h1>");
				var games=JoinedGames[thetournid];
				console.log(JSON.stringify(games));
				
				
					for (gameIter=0; gameIter<games.length;gameIter++)
						{
						if(games[gameIter].Result.length==0 && games[gameIter].started==true)
							{
							elem.append("<div>Now Playing</div>");
							}
							
						elem.append("<a href='/humanvshumannew/"+games[gameIter].id+"'><h2>:"+(gameIter+1)+"</h2></a>");
						elem.append("<h4><div>White:</div></h4>");
						showUsername(elem,games[gameIter].Player1);
						elem.append("<h4><div> Black: </div></h4>");
						showUsername(elem,games[gameIter].Player2);
							
							
							if(games[gameIter].Result.length>0)
							{
							elem.append("<div>Result:"+games[gameIter].Result+"</div>");
							}
						
						}
	
}

function showTournamentEntries(tournID,joinedPlayersDivContainer,joinedPlayersDiv,entries)
{
	
//retrieveSpecificTournamentEntries(tournID).then
	//				(function()
	//				{
					joinedPlayersDivContainer.empty();
					joinedPlayersDiv=addFlexDiv(joinedPlayersDivContainer,"playerList","column");
				
					//console.log("TournamentEntries.length "+TournamentEntries.length);
					joinedPlayersDiv.append("<div>"+entries.length+" players joined</div>");
					
					
						for(playerIter in entries)
						{
						console.log(entries[playerIter]);
						
						 io.socket.get('/user/'+entries[playerIter].player,
							function(usr)
							{
							//joinedPlayersDiv.append(usr.name);	
							Accounts[usr.id]=usr;
							showUsernameJumbo(joinedPlayersDiv,usr.id)
							});
						
						}
					
					
					
					
				
}

function showRightTournamentButton(iter,resData,jwres,joinbuttonDiv,withdrawbuttonDiv,page)
				{
					//console.log("iter "+iter);
				//	if(resData.length==0)
				//	{
					joinTournamentButton=showButton(joinbuttonDiv,"Join","KgreenElement KregularButton");
					if(page.search("tournamentviewpage")==0)
					{
					joinTournamentButton.click({plr:MyID,tournID:Tournaments[iter].id,joinDiv:joinbuttonDiv,withdrawDiv:withdrawbuttonDiv},joinTournamentFunctionTournamentPage);
					}
					if(page.search("mainpage")==0)
					{
					joinTournamentButton.click({plr:MyID,tournID:Tournaments[iter].id,joinDiv:joinbuttonDiv,withdrawDiv:withdrawbuttonDiv},joinTournamentFunctionMainPage);
					}
					
					//}
				//	else
				//	{
						
					withdrawTournamentButton=showButton(withdrawbuttonDiv,"Withdraw","KgreenElement KregularButton");
					if(page.search("tournamentviewpage")==0)
					{
					withdrawTournamentButton.click({plr:MyID,tournID:Tournaments[iter].id,joinDiv:joinbuttonDiv,withdrawDiv:withdrawbuttonDiv},withdrawTournamentFunctionTournamentPage);
					}
					if(page.search("mainpage")==0)
					{
					withdrawTournamentButton.click({plr:MyID,tournID:Tournaments[iter].id,joinDiv:joinbuttonDiv,withdrawDiv:withdrawbuttonDiv},withdrawTournamentFunctionMainPage);
					}
					
					//}
					
					if(resData.length==0)
					{
						withdrawbuttonDiv.slideUp();
					}
					else
					{
						joinbuttonDiv.slideUp();
					}
					
}
				
function showUpcomingTournamentTable2(elem)
{
	
	
	
	console.log("howUpcomingTournamentTable2");
	console.log("Tournaments length "+Tournaments.length);
	
	//for(iter in Tournaments)
	//{console.log("iter"+iter);
		//console.log(JSON.stringify(Tournaments[iter]));
		//}
	Tournaments = Tournaments.filter(function(n){ return n != undefined }); 
	Tournaments.sort(sortTourn);
	
	for (iter in Tournaments)
	{
		if(!Tournaments[iter].activated)
		{
		Tournaments[iter].timeToAvailable=timeToAvailFunc(Tournaments[iter]);
		}
		else
		{
		Tournaments[iter].timeToAvailable=timeToAvailFunc(Tournaments[iter]);
			
		}
	}
	
	
	
	for (iter in Tournaments)
	{
		if(Tournaments[iter].timeToAvailable<1)
			{
				console.log(" current tourn iter "+iter);
				
				
				io.socket.get("/subscribeToRoom",{roomName:Tournaments[iter].id},function (resData,jwres){
				console.log(JSON.stringify(resData));
				});	
				
				//currentTournamentDiv=
				//	currentTournamentDivContainer.append(currentTournamentDiv);
				currentTournamentDiv=addFlexDiv(currentTournamentDivContainer,"tournflex","row");	
				joinedPlayersDiv=addFlexDiv(joinedPlayersDivContainer,"playerList","column");
				
					timeCells[iter]=$("<span style='text-align:center;background-color:coral'></span>");
					currentTournamentDiv.append(timeCells[iter]);
					timeCells[iter].append("<h2>Time Category:"+Tournaments[iter].category+"</h2>");
					bigemptyDiv[0]=showHeader(currentTournamentDivContainer,1," ");
				timeToCurrentTournamentStartDiv=addFlexDiv(currentTournamentDivContainer,"","row");
				timeToCurrentTournamentStartDiv.append(displayableTime(threeMinutes+Tournaments[iter].timeToAvailable));
				bigemptyDiv[1]=showHeader(currentTournamentDivContainer,1," ");
				
				joinbuttonDiv=addFlexDiv(currentTournamentDivContainer,"joinbuttonflex","row");
				bigemptyDiv[2]=showHeader(currentTournamentDivContainer,1," ");
				viewbuttonDiv=addFlexDiv(currentTournamentDivContainer,"viewbuttonflex","row");
				bigemptyDiv[3]=showHeader(currentTournamentDivContainer,1," ");
				withdrawbuttonDiv=addFlexDiv(currentTournamentDivContainer,"withdrawbuttonflex","row");
				//currentTournamentDiv.append(cell2);
			
				var joinTournamentButton;
				var withdrawTournamentButton;
				
				var currentIter=iter;
				io.socket.get("/currenttournamententry",{player:MyID,tournid:Tournaments[iter].id},function(resData,jwres)
				{
				showRightTournamentButton(currentIter,resData,jwres,joinbuttonDiv,withdrawbuttonDiv,"mainpage");	
				});
				
				
			
		
				var gotobut=showButton(viewbuttonDiv,"View Tournament","KregularButton KgreenElement");
			gotobut.click(GoToTournament);
			function GoToTournament(event)
			{
			$(location).attr('href', '/tournamentview/'+Tournaments[0].id);
			}
			
			}
	}
	
	
	console.log("showUpcomingTournamentTable2 ");
	var tbl=$("<table id='ipTable'></table>");
	elem.append(tbl);
	var tablePosition=1;
var headers=["Position","Game Category","Available in..","Players Interested"];
	for( h in headers)
	{
	var header=$("<th>"+headers[h]+"</th>");
	tbl.append(header);
	}
	console.log("Tournaments.length "+Tournaments.length);
	
	
	
	
	for (iter in Tournaments)
	{
		if(Tournaments[iter].activated==false)
		{
			//console.log("Tavailable "+Tournaments[iter].timeToAvailable);
			//console.log("Tournaments[iter].category "+Tournaments[iter].category);
			if(Tournaments[iter].timeToAvailable>0)
			{
	
				//var nowDate=new Date(serverTime);
				//var date1=new Date(Tournaments[iter].dateAvailable);
				
				//var date2=new Date(Tournaments[iter].createdAt);
				//var diff=date1-nowDate;
				//console.log(nowDate);
				//console.log(date1);
				//console.log(date2);
				//console.log(diff);
				
				var row=$("<tr></tr>");
					tbl.append(row);
					
					cell=$("<td></td>");
					cell.append(tablePosition);
					row.append(cell);
					
					tablePosition=tablePosition+1;
					
					var cell=$("<td></td>");
					cell.append(Tournaments[iter].category);
					row.append(cell);
					
					timeCells[iter]=$("<td></td>");
		
		
					//Tournaments[iter].currentTime=diff;
					
					//cell.append(Tournaments[iter].timeToAvailable);
					row.append(timeCells[iter]);
					
			}
		}
	}
		
	if(updateTournamentInterval)
	{
		
	clearInterval(updateTournamentInterval);	
	}
	
	updateTournamentInterval=setInterval(updateTimeCells,500);
	
	function updateTimeCells()
		{
			
			
	Tournaments.sort(sortTourn);
	/*
	for (iter in Tournaments)
	{
		Tournaments[iter].timeToAvailable=timeToAvailFunc(Tournaments[iter]);
					if(Tournaments[iter].timeToAvailable>0)
					{
					timeToCurrentTournamentStartDiv.html(displayableTime(Tournaments[iter].timeToAvailable));
					}
					else
					{
					timeToCurrentTournamentStartDiv.html(displayableTime(threeMinutes+Tournaments[iter].timeToAvailable));
						
					}
	}
	*/
	
	
		for (iter in Tournaments)
				{
					if(Tournaments[iter].timeToAvailable>0)
					{
						if(timeCells[iter])
						{
						//console.log("Tavailable "+Tournaments[iter].timeToAvailable);
						Tournaments[iter].timeToAvailable=Tournaments[iter].timeToAvailable-500;
						timeCells[iter].html(displayableTime(Tournaments[iter].timeToAvailable));
							
						if(Tournaments[iter].activated==true)
						{
						timeToCurrentTournamentStartDiv.html(displayableTime(Tournaments[iter].timeToAvailable));
						}
						
						}
						
					}
					
					else
					
					{
						Tournaments[iter].timeToAvailable=Tournaments[iter].timeToAvailable-500;
						
						timeToCurrentTournamentStartDiv.html("Tournament starts in:"+displayableTime(threeMinutes+Tournaments[iter].timeToAvailable));
					}
					
				}
	
		}
	
	return tbl;
}

function displayableTime(millis)

	{
	
			var bythousand=millis/1000;
					var secondsToShow=(parseInt((bythousand % 60))).toString();
					var	minutesToShow=(parseInt((bythousand/60))).toString();
					
					if (secondsToShow<10)
					{secondsToShow="0"+secondsToShow;}
					
					return minutesToShow+":"+secondsToShow;
			
	}

function showStatTable(elem)
{
	elem.append("<div>"+JoinedGames[ProfID].length+" games found</div>");
		var tbl=$("<table id='ipTable'></table>");
	elem.append(tbl);
	var headers=["Game Category","Color","Current Ratings","Win%","Loss%"
	,"Draws%","Highest Ratings Scored","Lowest Ratings Scored",
	"Average Opposition Ratings","Best Win","Lowest Loss","Total Games",
	"Total Moves","Average Move/Game"];
	for( h in headers)
	{
	var header=$("<th>"+headers[h]+"</th>");
	tbl.append(header);
	}

			
		
		
	
	
		
		
		
		function gameMatchesCategory(game,cat)
		{
			if (cat.indexOf(game.GameCategory)>-1)	
			{
			return true;
			}	
			return false;
		}

	var totalWhiteGamesPlayed=[];
	var totalWhiteMovesPlayed=[];
	var totalBlackGamesPlayed=[];
	var totalBlackMovesPlayed=[];
	var averageBlackMovesPlayed=[];
	var averageWhiteMovesPlayed=[];
	var drewWhiteGames=[];
	var drewBlackGames=[];
	var wonWhiteGames=[];
	var wonBlackGames=[];
	var lostWhiteGames=[];
	var lostBlackGames=[];
	var averageWhiteOppositionRatings=[];
	var averageBlackOppositionRatings=[];
	
	var totalWhiteOppositionRatings=[];
	var totalBlackOppositionRatings=[];
	var highestWinWhite=[];
	var highestWinBlack=[];
	var lowestLossWhite=[];
	var lowestLossBlack=[];
	var highestRatingsWhite=[];
	var highestRatingsBlack=[];
	var lowestRatingsWhite=[];
	var lowestRatingsBlack=[];
		
	for (x in gamecategories)
	{
		var categoryShowString=gamecategories[x].time+"|"+gamecategories[x].extratime;
		
		totalBlackGamesPlayed[categoryShowString]=JoinedGames[ProfID].filter(
		function(d)
		{
		return  gameMatchesCategory(d,categoryShowString) && !gameFunctions.playerIsWhite(ProfID,d) && d.Player1!=d.Player2 && d.Result!="Both Players Timed Out";
		});
		
		totalWhiteGamesPlayed[categoryShowString]=JoinedGames[ProfID].filter(
		function(d)
		{
			
		if(categoryShowString=="1|0" && gameMatchesCategory(d,categoryShowString))
		{
		console.log("is player white?"+gameFunctions.playerIsWhite(ProfID,d));	
		console.log(d);
		console.log(d.Player1!=d.Player2);
		console.log(d.Result!="Both Players Timed Out");
		}
		var returner=gameMatchesCategory(d,categoryShowString) && gameFunctions.playerIsWhite(ProfID,d) && d.Player1!=d.Player2 && d.Result!="Both Players Timed Out";
		if(categoryShowString=="60|0" && gameMatchesCategory(d,categoryShowString))
		{
		console.log(returner);
		}
		return returner;
		
		});
		
		if(categoryShowString=="60|0")
		{
			console.log(totalWhiteGamesPlayed[categoryShowString].length);
		}
		
		totalWhiteMovesPlayed[categoryShowString]=totalWhiteGamesPlayed[categoryShowString].reduce(
		function(i,d){
			return i+d.Move;
		},0);
		
		totalBlackMovesPlayed[categoryShowString]=totalBlackGamesPlayed[categoryShowString].reduce(
		function(i,d){
			return i+d.Move;
		},0);
		
		
		/*for (vIter in totalWhiteGamesPlayed[categoryShowString])
		{
			console.log("found game"+JSON.stringify(totalWhiteGamesPlayed[categoryShowString][vIter]));
			if(totalWhiteGamesPlayed[categoryShowString][vIter].Player1CategoryELO)
			{
			
				if(totalWhiteGamesPlayed[categoryShowString][vIter].Player1Color=="White")
				{
					totalWhiteOppositionRatings[categoryShowString]=totalWhiteOppositionRatings[categoryShowString]+totalWhiteGamesPlayed[categoryShowString][vIter].Player2CategoryELO;
				}
				else
				{
					totalWhiteOppositionRatings[categoryShowString]=totalWhiteOppositionRatings[categoryShowString]+totalWhiteGamesPlayed[categoryShowString][vIter].Player1CategoryELO;
				}
			}
		
		}*/
		
	//	console.log("totalBlackGamesPlayed "+categoryShowString+" "+totalBlackGamesPlayed[categoryShowString].length);
		
		totalBlackOppositionRatings[categoryShowString]=totalBlackGamesPlayed[categoryShowString].reduce(
		function(i,d){
			
			if(d.Player2CategoryELO && d.Player1Color=='Black')
			{
			return i+d.Player2CategoryELO;	
			}	
			
			
			if(d.Player1CategoryELO && d.Player1Color=='White')
			{
			return i+d.Player1CategoryELO;	
			}	
			else
			{
			return i+0;
			}
		},0);
		
			totalWhiteOppositionRatings[categoryShowString]=totalWhiteGamesPlayed[categoryShowString].reduce(
		function(i,d){
			
			if(d.Player2CategoryELO && d.Player1Color=='White')
			{
			return i+d.Player2CategoryELO;	
			}	
			
			
			if(d.Player1CategoryELO && d.Player1Color=='Black')
			{
			return i+d.Player1CategoryELO;	
			}	
			else
			{
			return i+0;
			}
		},0);
			//console.log(totalBlackOppositionRatings[categoryShowString]);
		/*
		for (vIter in totalBlackGamesPlayed[categoryShowString])
		{
			if(totalBlackGamesPlayed[categoryShowString][vIter].Player1CategoryELO)

				if(totalBlackGamesPlayed[categoryShowString][vIter].Player1Color=="Black")
				{
					totalBlackOppositionRatings[categoryShowString]=totalBlackOppositionRatings[categoryShowString]+totalBlackGamesPlayed[categoryShowString][vIter].Player2CategoryELO;
				}
				else
				{
				totalBlackOppositionRatings[categoryShowString]=totalBlackOppositionRatings[categoryShowString]+totalBlackGamesPlayed[categoryShowString][vIter].Player1CategoryELO;
				//console.log(totalBlackGamesPlayed[categoryShowString][vIter].Player1CategoryELO);
				//console.log(JSON.stringify(totalBlackGamesPlayed[categoryShowString][vIter]));
			
				}
			}
		
		}
		*/
		
		averageWhiteMovesPlayed[categoryShowString]=totalWhiteMovesPlayed[categoryShowString]/totalWhiteGamesPlayed[categoryShowString].length;
		averageBlackMovesPlayed[categoryShowString]=totalBlackMovesPlayed[categoryShowString]/totalBlackGamesPlayed[categoryShowString].length;
		
		console.log("totalWhiteOppositionRatings[categoryShowString] "+totalWhiteOppositionRatings[categoryShowString]);
		
		averageWhiteOppositionRatings[categoryShowString]=totalWhiteOppositionRatings[categoryShowString]/totalWhiteGamesPlayed[categoryShowString].length;
		averageBlackOppositionRatings[categoryShowString]=totalBlackOppositionRatings[categoryShowString]/totalBlackGamesPlayed[categoryShowString].length;
		
		
		wonWhiteGames[categoryShowString]=totalWhiteGamesPlayed[categoryShowString].filter(
		function(d)
		{
			if (categoryShowString=="1|0")
				{
				console.log(d);
				console.log(gameFunctions.isAWin(ProfID,d));
				}
			
		return (gameFunctions.isAWin(ProfID,d));
		});
		
		wonBlackGames[categoryShowString]=totalBlackGamesPlayed[categoryShowString].filter(
		function(d)
		{
		return (gameFunctions.isAWin(ProfID,d));
		});
		
		
		
		lowestRatingsWhite[categoryShowString]=totalWhiteGamesPlayed[categoryShowString].reduce(
		function(i,d){
			
			if(d.Player1==ProfID)
			{
			
			if(d.Player1CategoryELO)
			{
			
			if(i>d.Player1CategoryELO)
			{
				i=d.Player1CategoryELO;
				return i;}
			}
			}
			
			if(d.Player2==ProfID)
			{
			if(d.Player2CategoryELO)
			{
			
			
			if(i>d.Player2CategoryELO)
			{
				i=d.Player2CategoryELO;
				return i;}
			}
			}
			return i;
			
		},99999);
		
		
		highestRatingsWhite[categoryShowString]=totalWhiteGamesPlayed[categoryShowString].reduce(
		function(i,d){
			
			if(d.Player1==ProfID)
			{
			
			if(d.Player1CategoryELO)
			{
			
			if(i<d.Player1CategoryELO)
			{
				i=d.Player1CategoryELO;
				return i;}
			}
			}
			
			if(d.Player2==ProfID)
			{
			if(d.Player2CategoryELO)
			{
			
			
			if(i<d.Player2CategoryELO)
			{
				i=d.Player2CategoryELO;
				return i;}
			}
			}
			return i;
			
		},0);
		
		
		
		lowestRatingsBlack[categoryShowString]=totalBlackGamesPlayed[categoryShowString].reduce(
		function(i,d){
			
			if(d.Player1==ProfID)
			{
			
			if(d.Player1CategoryELO)
			{
			
			if(i>d.Player1CategoryELO)
			{
				i=d.Player1CategoryELO;
				return i;}
			}
			}
			
			if(d.Player2==ProfID)
			{
			if(d.Player2CategoryELO)
			{
			
			
			if(i>d.Player2CategoryELO)
			{
				i=d.Player2CategoryELO;
				return i;}
			}
			}
			return i;
			
		},99999);
		
		
		highestRatingsBlack[categoryShowString]=totalBlackGamesPlayed[categoryShowString].reduce(
		function(i,d){
			
			if(d.Player1==ProfID)
			{
			
			if(d.Player1CategoryELO)
			{
			
			if(i<d.Player1CategoryELO)
			{
				i=d.Player1CategoryELO;
				return i;}
			}
			}
			
			if(d.Player2==ProfID)
			{
			if(d.Player2CategoryELO)
			{
			
			
			if(i<d.Player2CategoryELO)
			{
				i=d.Player2CategoryELO;
				return i;}
			}
			}
			return i;
			
		},0);
		
		highestWinBlack[categoryShowString]=wonBlackGames[categoryShowString].reduce(
		function(i,d){
			
			if(d.Player1==ProfID)
			{
			
			if(d.Player2CategoryELO)
			{
			
			if(i<d.Player2CategoryELO)
			{
				i=d.Player2CategoryELO;
				return i;}
			}
			}
			
			if(d.Player2==ProfID)
			{
			if(d.Player1CategoryELO)
			{
			
			if(i<d.Player1CategoryELO)
			{
				i=d.Player1CategoryELO;
				return i;}
			}
			}
			return i;
			
		},0);
		
		
		highestWinWhite[categoryShowString]=wonWhiteGames[categoryShowString].reduce(
		function(i,d){
			if(d.Player1==ProfID)
			{
				if(d.Player2CategoryELO)
					{
					if(i<d.Player2CategoryELO)
						{
						i=d.Player2CategoryELO;
						return i;
						}
					}
			}
			
			if(d.Player2==ProfID)
			{
				if(d.Player1CategoryELO)
					{
					if(i<d.Player1CategoryELO)
						{
						i=d.Player1CategoryELO;
						return i;
						}
					}
			}
			return i;
			
		},0);
		
		
		lostWhiteGames[categoryShowString]=totalWhiteGamesPlayed[categoryShowString].filter(
		function(d)
		{
		return (gameFunctions.isALoss(ProfID,d));
		});
		
		lostBlackGames[categoryShowString]=totalBlackGamesPlayed[categoryShowString].filter(
		function(d)
		{
		return (gameFunctions.isALoss(ProfID,d));
		});
	
		
		lowestLossBlack[categoryShowString]=lostBlackGames[categoryShowString].reduce(
		function(i,d){
			
			if(d.Player1==ProfID)
			{
			
			if(d.Player2CategoryELO)
			{
			
			if(i>d.Player2CategoryELO)
			{
				i=d.Player2CategoryELO;
				return i;}
			}
			}
			
			if(d.Player2==ProfID)
			{
			if(d.Player1CategoryELO)
			{
			
			if(i>d.Player1CategoryELO)
			{
				i=d.Player1CategoryELO;
				return i;}
			}
			}
			return i;
			
		},99999);
		
		lowestLossWhite[categoryShowString]=lostWhiteGames[categoryShowString].reduce(
		function(i,d){
			
			if(d.Player1==ProfID)
			{
			
			if(d.Player2CategoryELO)
			{
			
			if(i>d.Player2CategoryELO)
			{
				i=d.Player2CategoryELO;
				return i;}
			}
			}
			
			if(d.Player2==ProfID)
			{
			if(d.Player1CategoryELO)
			{
			
			if(i>d.Player1CategoryELO)
			{
				i=d.Player1CategoryELO;
				return i;}
			}
			}
			return i;
			
		},99999);
		
		drewBlackGames[categoryShowString]=totalBlackGamesPlayed[categoryShowString].filter(
		function(d)
		{
		return (gameFunctions.isADraw(ProfID,d));
		});
		
		drewWhiteGames[categoryShowString]=totalWhiteGamesPlayed[categoryShowString].filter(
		function(d)
		{
		return (gameFunctions.isADraw(ProfID,d));
		});
		
		
		
	}
		

for (x in gamecategories)
		{
		var categoryString=gamecategories[x].time+"x"+gamecategories[x].extratime;
		var categoryShowString=gamecategories[x].time+"|"+gamecategories[x].extratime;
		
		var row=$("<tr></tr>");
		tbl.append(row);
		
		var cell=$("<td></td>");
		cell.append(categoryShowString);
		row.append(cell);
		
		cell=$("<td></td>");
		cell.append("White");
		row.append(cell);
		
		
		cell=$("<td></td>");
		cell.append(Accounts[ProfID]['ratingWhite'+categoryShowString]);
		row.append(cell);
		
			cell=$("<td></td>");
			if (categoryShowString=="10|0")
			{
				console.log(wonWhiteGames[categoryShowString].length);
				console.log(wonWhiteGames[categoryShowString][0]);
				
			}
		cell.append(parseInt((wonWhiteGames[categoryShowString].length/totalWhiteGamesPlayed[categoryShowString].length)*100));
		row.append(cell);
		
			cell=$("<td></td>");
		cell.append(parseInt((lostWhiteGames[categoryShowString].length/totalWhiteGamesPlayed[categoryShowString].length)*100));
		row.append(cell);
		
		cell=$("<td></td>");
		cell.append(parseInt((drewWhiteGames[categoryShowString].length/totalWhiteGamesPlayed[categoryShowString].length)*100));
		row.append(cell);
		
		if(highestRatingsWhite[categoryShowString]>0)
		{
		cell=$("<td>"+highestRatingsWhite[categoryShowString]+"</td>");
		row.append(cell);
		}
		else
		{
		cell=$("<td></td>");
		row.append(cell);
		}
		
		if(lowestRatingsWhite[categoryShowString]!=99999)
		{
		cell=$("<td>"+lowestRatingsWhite[categoryShowString]+"</td>");
		row.append(cell);
		}
		else
		{
		cell=$("<td></td>");
		row.append(cell);
		}
		
		cell=$("<td></td>");
		cell.append(parseInt(averageWhiteOppositionRatings[categoryShowString]));
		row.append(cell);
	
	
		if(highestWinWhite[categoryShowString]!=0)
		{
		cell=$("<td>"+highestWinWhite[categoryShowString]+"</td>");
		row.append(cell);
		}
		else
		{
		cell=$("<td></td>");
		row.append(cell);
		}
		
		if(lowestLossWhite[categoryShowString]==99999)
		{
		cell=$("<td></td>");
		row.append(cell);
		}
		else
		{
		cell=$("<td>"+lowestLossWhite[categoryShowString]+"</td>");
		row.append(cell);
		}
		
		cell=$("<td>"+	totalWhiteGamesPlayed[categoryShowString].length+"</td>");
		row.append(cell);
		
		
		cell=$("<td>"+	totalWhiteMovesPlayed[categoryShowString]+"</td>");
		row.append(cell);
	
		
		var avgmov=parseInt(averageWhiteMovesPlayed[categoryShowString]);
		if (avgmov)
		{
		cell=$("<td>"+avgmov+"</td>");
		}
		else
		{
		cell=$("<td></td>");
		}
		
		row.append(cell);
	
		row=$("<tr></tr>");
		tbl.append(row);
		
		cell=$("<td></td>");
		cell.append(categoryShowString);
		row.append(cell);
		cell=$("<td></td>");
		cell.append("Black");
		row.append(cell);
	
				cell=$("<td></td>");
		cell.append(Accounts[ProfID]['ratingBlack'+categoryShowString]);
		row.append(cell);
		
		cell=$("<td></td>");
		cell.append(parseInt((wonBlackGames[categoryShowString].length/totalBlackGamesPlayed[categoryShowString].length)*100));
		row.append(cell);
		
		cell=$("<td></td>");
		cell.append(parseInt((lostBlackGames[categoryShowString].length/totalBlackGamesPlayed[categoryShowString].length)*100));
		row.append(cell);
		
		cell=$("<td></td>");
		cell.append(parseInt((drewBlackGames[categoryShowString].length/totalBlackGamesPlayed[categoryShowString].length)*100));
		row.append(cell);
	
	
		if(highestRatingsBlack[categoryShowString]>0)
		{
		cell=$("<td>"+highestRatingsBlack[categoryShowString]+"</td>");
		row.append(cell);
		}
		else
		{
		cell=$("<td></td>");
		row.append(cell);
		}
		
		if(lowestRatingsBlack[categoryShowString]!=99999)
		{
		cell=$("<td>"+lowestRatingsBlack[categoryShowString]+"</td>");
		row.append(cell);
		}
		else
		{
		cell=$("<td></td>");
		row.append(cell);
		}
		
		cell=$("<td></td>");
		cell.append(parseInt(averageBlackOppositionRatings[categoryShowString]));
		row.append(cell);
	
	
		if(highestWinBlack[categoryShowString]!=0)
		{
		cell=$("<td>"+highestWinBlack[categoryShowString]+"</td>");
		row.append(cell);
		}
		else
		{
		cell=$("<td></td>");
		row.append(cell);
		}
		
		if(lowestLossBlack[categoryShowString]==99999)
		{
		cell=$("<td></td>");
		row.append(cell);
		}
		else
		{
		cell=$("<td>"+lowestLossBlack[categoryShowString]+"</td>");
		row.append(cell);
		}
		
		cell=$("<td>"+	totalBlackGamesPlayed[categoryShowString].length+"</td>");
		row.append(cell);
	
	
		cell=$("<td>"+	totalBlackMovesPlayed[categoryShowString]+"</td>");
		row.append(cell);
	
		avgmov=parseInt(averageBlackMovesPlayed[categoryShowString]);
		if(avgmov)
		{
		cell=$("<td>"+avgmov+"</td>");
		}
		else
		{
		cell=$("<td></td>");
		}
		
		row.append(cell);
	
		
		
		}

}

function showPersonLeft(elem,prsn)
{

	newdiv=$("<div style='background-color:red;overflow:visible;padding:4px;'></div>");
	elem.append(newdiv);
	showUsername(newdiv,prsn);
	newdiv.append("<span> has left the chat by closing their chat window</span>");
	elem.append("<hr>");
	elem.scrollTop(elem[0].scrollHeight);

}
function addFlexDiv(elem,id,direction,wrap,jcontent,aItems)
{
	if(wrap === undefined) { wrap = 'nowrap'; }
	if(jcontent === undefined) { jcontent = 'space-around'; }
	if(aItems === undefined) { aItems = 'center'; }
	
	var flex=$("<div id='"+id+"' style='display:flex;flex-direction:"+direction+";flex-wrap:"+wrap+";justify-content:"+jcontent+";align-items:"+aItems+";'></div>")
	elem.append(flex);
	return flex;

}
function addDiv(elem)
{
	var flex=$("<div></div>")
	elem.append(flex);
	return flex;


}

function addDivprepend(elem)
{
	var flex=$("<div></div>")
	elem.prepend(flex);
	return flex;


}

function addSpan(elem,id)
{
	var flex=$("<span id='"+id+"'></span>")
	elem.append(flex);
	return flex;


}

function showFlag(elem,usracc)
{
	if(Accounts[usracc])
	{
				var flagimage=$("<img data-toggle='tooltip' title='' class='countryflag' src=''></img>");

				if(Accounts[usracc]['Country'])
				{
				flagimage.attr("src","/images/flatflags/"+countryToFilename(Accounts[usracc]['Country'])+".png");


				}
				elem.append(flagimage);
				return flagimage;
	}
}

function showHeader(elem,num,content)
{
	var head=$("<h"+num+">"+content+"</h"+num+">");
elem.append(head);
return head;
}
function showWebsiteNameJumbo(elem)
{
	 var header=$("<h1></h1>");
      elem.append(header);
	header.append("Chessbond");
}
function showUsernameJumbo(elem,usracc)
{
	//var jum=$("<span class='jumbotron'><span>");
      var header=$("<h2 style='word-wrap:break-word;'></h2>");
     // jum.append(header);
      showUsername(header,usracc);
	elem.append(header);
}
function showUserIdentity(elem,usracc,msgid)
{
var thisDiv=addFlexDiv(elem,"ident"+msgid,"row","nowrap","center","stretch");

ava=showIdentAvatar(thisDiv,usracc);
ava.css("margin","5px");
							 thisDiv2=addFlexDiv(thisDiv,"ident2"+msgid,"column","nowrap");
							showUsername(thisDiv2,usracc);
									console.log(usracc);
						
							//console.log(inputbox);
							//showFlag(thisDiv,otherPerson);
							var countrySpan=addSpan(thisDiv2);
							countrySpan.append(Accounts[usracc].CurrentCity);
								if(Accounts[usracc].lastTimeVisitedWholeSite)
							{
							thisDiv2.append(phrasefordate(Accounts[usracc].lastTimeVisitedWholeSite));
							}
							thisDiv2.css("margin","6px");
							thisDiv.attr("class","clickToShowMessages");
							//ava.click({person:otherPerson,msgrecepticle:msgbox},getMessages);	
							//thisDiv.css("border-bottom-style","solid");
return thisDiv;	
}
function showImageUploadForm(elem,usracc,album)
{
	console.log("album "+album);
	if(!album)
	{
	elem.append(`
<form action="/uploadavatar" enctype="multipart/form-data" method="post">
    <input type="file" name="avatar" multiple="multiple"><br>
    <input type="submit" value="Upload">
    </form>`);
}
else
{
	var form=$("<form action='/uploadavatar/"+album+"' enctype='multipart/form-data' method='post'></form>");
	elem.append(form);
		form.append($("<input type='file' name='avatar' multiple='multiple'><br>"));
		 form.append($("<input type='submit' value='Upload'>"));
	
	
}
}

//loadin page//showChatMessage(thisDiv,WallPosts[iter],"none",true,del);
//recieved //showChatMessage(thisDiv,WallPosts[(WallPosts.length-1)],"none",true,del);
function showChatMessage(elem,msg,Replyto,allowreplies,deletebutton,showall)
{
	
if (showall===undefined){showall=true;}
if(deletebutton === undefined) { deletebutton = false; }
	
	//var myColumn=addFlexDiv(elem,45,"column","nowrap","flex-start");
	//var myColumn=addDiv(elem);
	var myColumn=$("<div id='wholemessage"+msg.id+"'></div>");
	elem.append(myColumn);
	//console.log("msg.replyto "+msg.replyto);
	
	if (msg.replyto==Replyto)
	{

	var postHeaderDiv;

/*
	if(msg.sender==MyID)
	{
		postHeaderDiv=$("<div  style='display:flex;flex-wrap:wrap;justify-content:flex-start;background-color:lightgrey;padding:4px;'></div>");
	}
	else
	{
		postHeaderDiv=$("<div  style='display:flex;flex-wrap:wrap;justify-content:flex-start;background-color:lightgreen;padding:4px;'></div>");

	}add
	*/
	if(msg.unread=="true")
	{
		postHeaderDiv=$("<div  id='msgheader"+msg.id+"' style='display:flex;flex-wrap:wrap;justify-content:flex-start;background-color:red;padding:4px;'></div>");
		
		if (MyID==msg.intendedFor || !msg.intendedFor)
		{
			setTimeout(function(){
			io.socket.post('/sawmessage',{id:msg.id,location:window.location.pathname},function (resData, jwr) {
				console.log("sending saw message ");
			});	
			},(5*1000));
		}
	
	}
	else
	{
		postHeaderDiv=$("<div  style='display:flex;flex-wrap:wrap;justify-content:flex-start;background-color:lightgreen;padding:4px;'></div>");

	}
	//console.log("show chat message "+JSON.stringify(msg));
	//console.log("sender "+msg.sender);
	//overallDiv.append(newdiv);
	var dateObj=new Date(msg.createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			var hour=dateObj.getUTCHours();
			var minute=dateObj.getUTCMinutes();
	if(minute<10)
	{minute="0"+minute;}
	
	if (lastChatMessagePostedBy!=msg.sender)
	{
	
	showsmallAvatar(postHeaderDiv,msg.sender);

	postHeaderDiv.append("<span style='border-style:solid'>");
	postHeaderDiv.append("<span style='width:5px'></span>");
	showUsername(postHeaderDiv,msg.sender);
	postHeaderDiv.append("<span style='width:20px'></span>");
	}
	lastChatMessagePostedBy=msg.sender;
	postHeaderDiv.append("<span>Posted On:"+month+"/"+day+"/"+year+"</span>");
	postHeaderDiv.append("<span style='width:30px'></span>");

	postHeaderDiv.append("<span>"+hour+":"+minute+"</span>");

	if(deletebutton)
	{var delbut=showButton(postHeaderDiv,"X","KredElement KregularButton");
		delbut.click(function(){
		$("#wholemessage"+msg.id).hide();
		io.socket.put('/wallpost/destroy',{id:msg.id},
				function  (data){
				});

		for(iter in WallPosts)
			{

			if(WallPosts[iter].replyto==msg.id)
			{
				console.log("should hide "+WallPosts[iter].id);
			$("#wholemessage"+WallPosts[iter].id).hide();
			io.socket.put('/wallpost/destroy',{id:WallPosts[iter].id},
				function  (data){
				});
			}

			}

		});

		}


	var blockbut=showButton(postHeaderDiv,"Block","KredElement KregularButton");
	blockbut.attr("id","blockbutton"+msg.sender);
	blockbut.click({usracc:msg.sender},clickBlock);


	var reportbut=showButton(postHeaderDiv,"Report","KredElement KregularButton");
	reportbut.attr("id","reportbutton"+msg.sender);
	reportbut.click(
	function(){
		rform.slideToggle();
		});

		var rform=showReportForm(elem,msg.id);
		rform.hide();

	postHeaderDiv.append("</span>");

	myColumn.append(postHeaderDiv);

	var nextdiv=addFlexDiv(myColumn,34,"row","wrap","space-around","center");
	nextdiv.attr("id","msgcontent"+msg.id);
	nextdiv.css("border-style","solid");
	nextdiv.css("padding","5px");
	
	var contentToPost=msg.content;
	if (showall==true)
	{
	nextdiv.append(contentToPost);
	}
	else
	{
	var	lengthToShow=29;
	if(contentToPost.length>lengthToShow)
	{
		var containerDiv=addSpan(nextdiv);
		
	contentToPost=contentToPost.substr(0,lengthToShow);
	
	//contentToPost=contentToPost+" ...";
	var contentDiv=addSpan(containerDiv);
	contentDiv.append(contentToPost);
	var dotDiv=addSpan(containerDiv);
	dotDiv.append("...");
	
	var restOfMessageDiv=addSpan(containerDiv);
	var restOfMessage=msg.content.slice(lengthToShow,msg.content.length);
	restOfMessageDiv.append(restOfMessage);
	restOfMessageDiv.hide();
	//containerDiv.append(restOfMessageDiv);
	var restOfMessageButton=showButton(nextdiv,"...","KgreenElement KregularButton");
	restOfMessageButton.click(function()
		{
			restOfMessageDiv.slideToggle();
			dotDiv.slideToggle();
		
		});
	
	}
	else
	{
	nextdiv.append(contentToPost);
	}	
	}
	nextdiv.css("width",postHeaderDiv.width());

	if(Blocks[msg.sender])
	{nextdiv.slideUp();
		blockbut.text("UnBlock");
		}

		if(allowreplies){
			var butdiv=addFlexDiv(elem,34,"row","wrap","space-around","center");

			var but=showButton(butdiv,"Reply","KgreenElement KregularButton");
		var rplto;
		//console.log("msg.replyto "+msg.replyto);
		if(msg.replyto=="none")
		{rplto=msg.id;}
		else
		{rplto=msg.replyto;}
		var form=showChatForm(elem,msg.groupid,msg.messagetype,rplto);
		form.hide();
		but.click(function()
		{form.slideToggle();});
		elem.css("border-bottom-style","solid");
		}
		else
		{
		//postHeaderDiv.css("align-items","flex-end");
		//nextdiv.css("align-items","flex-end");

		}

		for(iter in WallPosts)
						{
							if(WallPosts[iter].replyto==msg.id)
							{
							var replydiv=addFlexDiv(elem,WallPosts[iter].id,"column");
						replydiv.css("padding-left","20%");
					//	var del=false;
					//if(MyID==ProfID)
					//{del=true;}
						showChatMessage(replydiv,WallPosts[iter],msg.id,true,deletebutton);
					}
						}

//elem.append("<hr>");

	}

}

function showLatestImagesForm(elem)
{

	var	imageDiv=addDiv(elem);
	imageDiv.attr("class","imageGrid");

	var complaintTitle=addSpan(imageDiv,"");
	complaintTitle.append("Image");
	complaintTitle.attr("class","gridTitle");

	complaintTitle=addSpan(imageDiv,"");
	complaintTitle.append("Uploader");
	complaintTitle.attr("class","gridTitle");

		for (iter in UploadedImages)
		{
		var img=$("<img src='https://www.chessbond.com/user/avatar/"+UploadedImages[iter].id+"'>");
		img.attr("class","greyGridCell");
		img.css("width","100%");
		imageDiv.append(img);
		if (UploadedImages[iter].blocked==true)
		{
		img.append("Blocked");
		}
		var columnFlex=addFlexDiv(imageDiv,"","column");
		var spa=addSpan(columnFlex);
		spa.append("User:");
		if(Accounts[UploadedImages[iter].user])
			{
			spa.append(Accounts[UploadedImages[iter].user].name);
			}
			else
			{
			spa.append("deleted account");
			}
				var dateObj=new Date(UploadedImages[iter].createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			var hour=dateObj.getUTCHours();
			var minute=dateObj.getUTCMinutes();
			if (minute<10)
			{minute="0"+minute;}
			cellspan=addSpan(columnFlex,"");

		cellspan.append("Uploaded:"+day+"/"+month+"/"+year+"   "+hour+":"+minute);

		var blocbut;
		if(UploadedImages[iter].blocked==true)
		{
		blocbut=showButton(columnFlex,"UnBlock Image From Website","KgreenElement KregularButton");
		}
		else
		{
		blocbut=showButton(columnFlex,"Block Image From Website","KgreenElement KregularButton");
		}

		blocbut.click({but:blocbut,coll1:columnFlex,coll2:img,imgid:UploadedImages[iter].id,imgloc:UploadedImages[iter].avatarFd},blockAvatar);

		var delbut=showButton(columnFlex,"Delete Image and Delete Database Record","KgreenElement KregularButton");
		delbut.click({coll1:columnFlex,coll2:img,imgid:UploadedImages[iter].id,imgloc:UploadedImages[iter].avatarFd},deleteAvatar);

		}




		return imageDiv;
}

function inputKeypress(e)
{
	 var key = e.which;
	 if(key == 13)  // the enter key code
  { e.preventDefault();
	  return 1;
  }
}

function showBanWordsForm(elem)
{

	var  banwordDiv=addDiv(elem);
	var banwordform=$("<input type='text' autocomplete='off' class='form-control' placeholder='enter a banned word' name='name' >");
		var banwordbutton=$("<button id='postbutton' class='btn btn-default btn-sm' type='submit' >Submit Banned Word</button>");
		banwordDiv.append(banwordform);
		banwordDiv.append(banwordbutton);
		banwordform.keypress(
		function (e) {
		if (inputKeypress(e)==1)
		{
	 
		 	sendBannedWord(banwordform.val(),imageDiv);
		 	banwordform.val("");
		}
		});
		banwordbutton.click(function(){
			sendBannedWord(banwordform.val(),imageDiv);
			banwordform.val("");
			});


			var	imageDiv=addDiv(banwordDiv);
	imageDiv.attr("class","imageGrid");

	var complaintTitle=addSpan(imageDiv,"");
	complaintTitle.append("Word");
	complaintTitle.attr("class","gridTitle");

	complaintTitle=addSpan(imageDiv,"");
	complaintTitle.append("Buttons");
	complaintTitle.attr("class","gridTitle");

		for (iter in BannedWords)
		{
		addBannedWord(BannedWords[iter],imageDiv);
		}

	return banwordDiv;

}

function addBannedWord(theWord,elem)
{
var wrd=$("<span>"+theWord.word+"</span>");
		wrd.attr("class","greyGridCell");

		elem.append(wrd);

		var columnFlex=addFlexDiv(elem,"","column");
		var spa=addSpan(columnFlex);

				var dateObj=new Date(theWord.createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			var hour=dateObj.getUTCHours();
			var minute=dateObj.getUTCMinutes();
			if (minute<10)
			{minute="0"+minute;}
			cellspan=addSpan(columnFlex,"");

		cellspan.append("Created:"+day+"/"+month+"/"+year+"   "+hour+":"+minute);



		var delbut=showButton(columnFlex,"Delete Banned Word","KgreenElement KregularButton");
		delbut.click({coll1:columnFlex,coll2:wrd,wrdid:theWord.id},deleteBannedWord);

}

function deleteBannedWord(event)
{

io.socket.put('/bannedword/destroy/'+event.data.wrdid,{},	function  (data){
				console.log(data);
				});
		event.data.coll1.slideUp();
		event.data.coll2.slideUp();
}

function sendBannedWord(wrd,elem)
{
	io.socket.post("/bannedword",{word:wrd},
	 function (resData, jwr) {
	 toastr.success("Added Banned Word!");
	 addBannedWord(resData,elem);
	 });
}

function showAdminReportForm(elem)
{
	var	reportDiv=addDiv(elem);
	reportDiv.attr("class","reportGrid");
	var complaintTitle=addSpan(reportDiv,"");
	complaintTitle.append("Complaint");
	complaintTitle.attr("class","gridTitle");
	complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Reporter");
	complaintTitle.attr("class","gridTitle");
		complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Message");
	complaintTitle.attr("class","gridTitle");
		complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Message Writer");
	complaintTitle.attr("class","gridTitle");
		complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Report Recieved");
	complaintTitle.attr("class","gridTitle");
	complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Ban Duration");
	complaintTitle.attr("class","gridTitle");
complaintTitle=addSpan(reportDiv,"");
		complaintTitle.append("Your banning buttons Sir");
	complaintTitle.attr("class","gridTitle");

	for (x in Reports)
		{
		var cellspan=addSpan(reportDiv,"");
		cellspan.append(Reports[x].complaint);
		cellspan.attr("class","greyGridCell");
		cellspan=addSpan(reportDiv,"");
		cellspan.append(Accounts[Reports[x].reporter].name);
		cellspan.attr("class","greyGridCell");

		cellspan=addSpan(reportDiv,"");
		cellspan.attr("class","greyGridCell");

		if(WallPosts[Reports[x].msgID])
		{
		cellspan.append(WallPosts[Reports[x].msgID].content);
		}

		cellspan=addSpan(reportDiv,"");
		cellspan.attr("class","greyGridCell");

		if(WallPosts[Reports[x].msgID])
		{
		cellspan.append(Accounts[WallPosts[Reports[x].msgID].sender].name);
		}

		var dateObj=new Date(Reports[x].createdAt);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			var hour=dateObj.getUTCHours();
			var minute=dateObj.getUTCMinutes();
			if (minute<10)
			{minute="0"+minute;}
			cellspan=addSpan(reportDiv,"");
		cellspan.attr("class","greyGridCell");
		cellspan.append(day+"/"+month+"/"+year+"   "+hour+":"+minute);

		var optionnames=["Day","Week","Month"];
			var oneDay = 24*60*60*1000;
			var optionvalues=[oneDay,oneDay*7,oneDay*30];
		var dursel=showSelect(reportDiv,optionnames,optionvalues,"Duration");

		if(WallPosts[Reports[x].msgID]){


		if(!Accounts[WallPosts[Reports[x].msgID].sender].tempBan)
		{

		var banBut=showButton(reportDiv,"Temporary ban","KcyanElement KregularButton");
		console.log(WallPosts[Reports[x].msgID].sender);
		console.log(WallPosts[Reports[x].msgID].content);

		banBut.click({dur:dursel,usr:WallPosts[Reports[x].msgID].sender,but:banBut},banUser);
		}
		else
		{

		var banBut=showButton(reportDiv,"Unban","KcyanElement KregularButton");
		console.log(WallPosts[Reports[x].msgID].sender);
		console.log(WallPosts[Reports[x].msgID].content);

		banBut.click({dur:dursel,usr:WallPosts[Reports[x].msgID].sender,but:banBut},banUser);
		}


		}
		else
		{
		cellspan=addSpan(reportDiv,"");
		cellspan.attr("class","greyGridCell");
		}



		}

		return reportDiv;
}

function blockAvatar(event)
{
	if(UploadedImages[event.data.imgid].blocked==false)
	{
io.socket.put('/blockavatar',{picid:event.data.imgid,adr:event.data.imgloc},	function  (data){
				console.log(data);
				toastr.success("Image Blocked");
				UploadedImages[event.data.imgid].blocked=true;
				event.data.but.html('UnBlock Image');
				});
	}
	else
	{
io.socket.put('/unblockavatar',{picid:event.data.imgid,adr:event.data.imgloc},	function  (data){
				console.log(data);
				toastr.success("Image UnBlocked");
				UploadedImages[event.data.imgid].blocked=false;
				event.data.but.html('Block Image');

				});
	}

	//	event.data.coll1.slideUp();
		//event.data.coll2.slideUp();
}

function deleteAvatar(event)
{

io.socket.put('/deleteavatar',{picid:event.data.imgid,adr:event.data.imgloc},	function  (data){
				console.log(data);
				});
		event.data.coll1.slideUp();
		event.data.coll2.slideUp();
}


function banUser(event){
	console.log(event.data.dur.val());
	if(event.data.dur.val())
	{
		if (!Accounts[event.data.usr].tempBan)
		{
			io.socket.put('/banuser',{banneduser:event.data.usr,bantime:event.data.dur.val()}
			,function (resData, jwRes) {
			toastr.success("user banned");
			Accounts[event.data.usr].tempBan=true;
			//$(this).context.html('unban');
			event.data.but.html('Unban');
			});
		}
	else
		{

			io.socket.put('/unbanuser',{banneduser:event.data.usr}
			,function (resData, jwRes) {
			toastr.success("user unbanned");
			Accounts[event.data.usr].tempBan=false;
			event.data.but.html('Temporary Ban');
			//$(this).context.html('unban');
			});


		}

	}
	else
	{
		toastr.info("Please choose a duration");
	}
}

function CreateDropDown(usracc)
{

	DropDowns[usracc]=$("<ul id='droplist"+usracc+"' class='userdropdown-content' ></ul>");
	DropDowns[usracc].append("<li><a href='/profile/"+usracc+"'>Go to Profile</a></li>");
	DropDowns[usracc].append("<li><a>Cumulative Rating "+Accounts[usracc].ELO+"</a></li>");
	DropDowns[usracc].append("<li><a href='#'>View Game Archive</a></li>");
   	DropDowns[usracc].append("<li><a href='#'>View Game	</a></li>");
   	DropDowns[usracc]['Foll']=$("<li></li>");
	DropDowns[usracc].append(DropDowns[usracc]['Foll']);
	
	if(Follows[usracc])
	{
	addFollowed(usracc);
	}
	else
	{
	addBeginFollow(usracc);
	}
	DropDowns[usracc]['block']=$("<li></li>");
	DropDowns[usracc].append(DropDowns[usracc]['block']);

	if(Blocks[usracc])
	{addBlocked(usracc);}
	else
	{addBeginBlock(usracc);}

	DropDowns[usracc].append("<li><a href='#'>Challenge to a Game</a></li>");
	DropDowns[usracc]['Priv']=$("<li id='PrivateConversationDD"+usracc+"'></li>");
	DropDowns[usracc].append(DropDowns[usracc]['Priv']);
	if(PrivateConversations[MyID])
	{
	if(PrivateConversations[MyID][usracc])
	{
	addSeeChat(usracc);
	}
	else
	{
	addBeginChat(usracc);	
	}
	}
	DropDowns[usracc].append("<li><a href='#'>Add to Friend List</a></li>");


/*
if(!PrivateConversations[MyID])
{PrivateConversations[MyID]={};}

if(PrivateConversations[MyID][usracc])
	{$("#PrivateConversationDD"+usracc).append("<div id='GoToPrivateDiv"+usracc+"'>Go To Chat</div>");}
else
	{
	console.log("Begin chat "+usracc);
	DropDowns[usracc]['BeginChat']=$("<a id='StartPrivateDiv"+usracc+"'>Begin Chat</a>");
	DropDowns[usracc]['Priv'].append(DropDowns[usracc]['BeginChat']);
	}
*/


}

function showVisitorsTable(elem,visarr)
{
	
	var tbl=$("<table id='ipTable'></table>");
	elem.append(tbl);
	var header;
	header=$("<th>Order of Visit</th>");
tbl.append(header);
header=$("<th>Visitor</th>");
tbl.append(header);
header=$("<th>Date</th>");
tbl.append(header);
header=$("<th>IPAddress</th>");
tbl.append(header);
header=$("<th>Location</th>");
tbl.append(header);
header=$("<th>Time of Login</th>");
tbl.append(header);
header=$("<th>Time of Logout</th>");
tbl.append(header);
header=$("<th>Length of Time Loggedin</th>");
tbl.append(header);


	var position=1;



for(rowIter in visarr)
	{
		var row=$("<tr></tr>");
		tbl.append(row);
		
		if(visarr[rowIter] )
		{
			var cell=$("<td>"+position+"</td>");
			row.append(cell);
			
			
			cell=$("<td></td>");
			if(Accounts[visarr[rowIter].visitor])
			{
			showUsername(cell,Accounts[visarr[rowIter].visitor].id);
			row.append(cell);
			}
			
			if(visarr[rowIter].visitDate)
			{
			cell=$("<td>"+visarr[rowIter].visitDate+"</td>");
			row.append(cell);
			}
			
			if(visarr[rowIter].visitorIP)
			{
				
			cell=$("<td>"+visarr[rowIter].visitorIP+"</td>");
			row.append(cell);
			}
			
			if(visarr[rowIter].visitorIP)
			{
				cell=$("<td></td>");
				row.append(cell);
				//console.log(visarr[rowIter].visitorIP);
				/*
			$.ajax({
				//url:"https://api.ipstack.com/"+visarr[rowIter].visitorIP+"?access_key=7bca87a8ece647655b1fac301d2ae11c",
				url:"  https://api.ipdata.co/"+visarr[rowIter].visitorIP+"?api-key=8176185c8dbe7464442da3124c0879b5b6c1c577690eada4157eda1a",
			crossDomain: true,
				 
				 accepts: {
				mycustomtype: 'application/json'
				},
				dataType: "jsonp",
				headers: {  'Access-Control-Allow-Origin': '*' },
				context:(cell)
				}).onreadystatechange (function(data){
				if(data)
				{
					console.log(JSON.stringify(data));
				var addition=data.country_name+":"+data.city;
				$(this).append(addition);
				
				}
				});*/
			}
			
			var obj={theCell:cell};
	io.socket.get('/locationforip',{ip:visarr[rowIter].visitorIP},function (resData, jwr) {
var addition=resData.country+":"+resData.city;
				this.theCell.append(addition);
	console.log((resData.city));
	}.bind(obj));
			/*
	var request = new XMLHttpRequest();
  
  var theIP;
  
  if (visarr[rowIter].visitorIP.indexOf(":")==-1)
	{
	theIP=visarr[rowIter].visitorIP;
	}
	else
	{
	theIP=visarr[rowIter].visitorIP.slice(7,visarr[rowIter].visitorIP.length-1);
	}
  
  request.open('GET', 'https://api.ipdata.co/'+theIP+'?api-key=8176185c8dbe7464442da3124c0879b5b6c1c577690eada4157eda1a');
  
  request.setRequestHeader('Accept', 'application/json');
  
  request.theCell=cell;
  
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      //console.log('Status:', this.status);
      //console.log('Headers:', this.getAllResponseHeaders());
      //console.log('Body:', this.responseText);
      
      var theObj=JSON.parse(this.responseText);
      var addition=theObj.country_name+":"+theObj.city;
				this.theCell.append(addition);
    }
  }.bind(request);
  
  request.send();
                  
			*/
			cell=$("<td>"+timeOfDayForDate(visarr[rowIter].createdAt)+"</td>");
			row.append(cell);
			
			cell=$("<td>"+timeOfDayForDate(visarr[rowIter].updatedAt)+"</td>");
			row.append(cell);
			
			var diff=differenceBetweenTwoDates(visarr[rowIter].createdAt,visarr[rowIter].updatedAt)
			
			
			cell=$("<td>"+diff+"</td>");
			row.append(cell);
			
			
			
			
			
			
			
			
			position=position+1;
		}
		
	}
	
	if(position<25)
	{
	for(posIter=position;posIter<26;posIter++)
	{	
	var row=$("<tr></tr>");
	//console.log(posIter);
	tbl.append(row);	
	var cell=$("<td>"+posIter+"</td>");
			row.append(cell);
	for(blankIter=1;blankIter<8;blankIter++)
		{			
			var cell=$("<td></td>");
			row.append(cell);
	
		}
	}
	}
	
}

function showVisitorsGraph(elem)
{
	
	var	reportDiv=addDiv(elem);
	reportDiv.attr("class","visitorsGrid");
	var titleSpan=addSpan(reportDiv,"");
	titleSpan.append("Order of Visit");
	titleSpan.attr("class","statsGridTitle");
	titleSpan.css("grid-column","position");
	
	titleSpan=addSpan(reportDiv,"");
	titleSpan.append("Visitor");
	titleSpan.attr("class","statsGridTitle");
	titleSpan.css("grid-column","visitor");
	
	titleSpan=addSpan(reportDiv,"");
	titleSpan.append("Date");
	titleSpan.attr("class","statsGridTitle");
	titleSpan.css("grid-column","date");
	
	titleSpan=addSpan(reportDiv,"");
	titleSpan.append("IP Address");
	titleSpan.attr("class","statsGridTitle");
	titleSpan.css("grid-column","ipaddress");
	
	titleSpan=addSpan(reportDiv,"");
	titleSpan.append("Location");
	titleSpan.attr("class","statsGridTitle");
	titleSpan.css("grid-column","location");
	
	titleSpan=addSpan(reportDiv,"");
	titleSpan.append("Time of Login");
	titleSpan.attr("class","statsGridTitle");
	titleSpan.css("grid-column","logintime");

	titleSpan=addSpan(reportDiv,"");
	titleSpan.append("Time of Logout");
	titleSpan.attr("class","statsGridTitle");
	titleSpan.css("grid-column","logouttime");

	titleSpan=addSpan(reportDiv,"");
	titleSpan.append("Length of Time Loggedin");
	titleSpan.attr("class","statsGridTitle");
	titleSpan.css("grid-column","loggedintime");
	
	var position=1;
	
	for(rowIter in Visits)
	{
		
		if(Visits[rowIter])
		{
			var cellSpan=addSpan(reportDiv,"");
			cellSpan.append(position);
			cellSpan.attr("class","lightgreyGridCell");
			cellSpan.css("grid-column","position");
			cellSpan.css("grid-row","r"+position);
			
			
			cellSpan=addSpan(reportDiv,"");
			cellSpan.append(timeOfDayForDate(Visits[rowIter].createdAt));
			cellSpan.attr("class","lightgreyGridCell");
			cellSpan.css("grid-column","logintime");
			cellSpan.css("grid-row","r"+position);
			
			cellSpan=addSpan(reportDiv,"");
			cellSpan.append(timeOfDayForDate(Visits[rowIter].updatedAt));
			cellSpan.attr("class","lightgreyGridCell");
			cellSpan.css("grid-column","logouttime");
			cellSpan.css("grid-row","r"+position);
			
			
			var diff=differenceBetweenTwoDates(Visits[rowIter].createdAt,Visits[rowIter].updatedAt)
			cellSpan=addSpan(reportDiv,"");
			cellSpan.append(diff);
			cellSpan.attr("class","lightgreyGridCell");
			cellSpan.css("grid-column","loggedintime");
			cellSpan.css("grid-row","r"+position);
			
			
			if(Visits[rowIter].visitorIP)
			{
			cellSpan=addSpan(reportDiv,"");
			cellSpan.append(Visits[rowIter].visitorIP);
			cellSpan.attr("class","lightgreyGridCell");
			cellSpan.css("grid-column","ipaddress");
			cellSpan.css("grid-row","r"+position);
			}
			if(Visits[rowIter].visitDate)
			{
			cellSpan=addSpan(reportDiv,"");
			cellSpan.append(Visits[rowIter].visitDate);
			cellSpan.attr("class","lightgreyGridCell");
			cellSpan.css("grid-column","date");
			cellSpan.css("grid-row","r"+position);
			}
			cellSpan=addSpan(reportDiv,"");
			if(Visits[rowIter].visitor)
			{	
			cellSpan.append(Accounts[Visits[rowIter].visitor].name);
			}
			else
			{	
			cellSpan.append("anonymous");
			}
			
	
  
			cellSpan.attr("class","lightgreyGridCell");
			cellSpan.css("grid-column","visitor");
			cellSpan.css("grid-row","r"+position);
			if(Visits[rowIter].visitorIP)
			{
				console.log(Visits[rowIter].visitorIP);
			$.ajax({
				url: "https://freegeoip.net/json/"+Visits[rowIter].visitorIP,
				context:(position)
				}).done(function(data){
				if(data)
				{
					
		//			console.log($(this)[0]);
	//	console.log(data.country_name);
			cellSpan=addSpan(reportDiv,"");
			cellSpan.append(data.country_name+":"+data.city);
			cellSpan.attr("class","lightgreyGridCell");
			cellSpan.css("grid-column","location");
			cellSpan.css("grid-row","r"+$(this)[0]);
		}
		});
		}
			position=position+1;
		}
	}
		
	

}

function showIdentAvatar(elem,usracc)

{
	if(!Accounts[usracc])
	{}
	else
	{
		var d=addDiv(elem,"");
	d.addClass("userdropdown");
var sp=addSpan(d,"circlediv"+Accounts[usracc].name);
sp.addClass("smallonlinecircle");
var im=$("<img class='identprofilepic' alt='this image was deleted by admin' src='"+Accounts[usracc].picture+"'></img>");
d.append(im);
return d;
}

}

function showsmallAvatar(elem,usracc)

{
	if(!Accounts[usracc])
	{}
	else
	{
		var d=addDiv(elem,"");
	d.addClass("userdropdown");
var sp=addSpan(d,"circlediv"+Accounts[usracc].name);
sp.addClass("smallonlinecircle");
var im=$("<img class='smallprofilepic' alt='this image was deleted by admin' src='"+Accounts[usracc].picture+"'></img>");
d.append(im);
}

}
function showAvatar(elem,usracc)

{
if(!Accounts[usracc])
{}
else
{
	var d=addDiv(elem,"");
	d.addClass("userdropdown");
var sp=addSpan(d,"circlediv"+Accounts[usracc].name);
sp.addClass("onlinecircle");
var im=$("<img class='profilepic'  alt='this image was deleted by admin' src='"+Accounts[usracc].picture+"'></img>");
//console.log("picrot "+Accounts[usracc].pictureRotation);
im.css("transform","rotate("+Accounts[usracc].pictureRotation+"deg)");
d.append(im);
return d;
}

}

function showUsername(elem,usracc)
{
	if(!UserNamesPrinted[usracc])
	{UserNamesPrinted[usracc]=1;}
	else
	{UserNamesPrinted[usracc]=UserNamesPrinted[usracc]+1;}

	var thisuserprinted=UserNamesPrinted[usracc];

	if(Accounts[usracc])
	{
	//	console.log("accounts exists to show username");
		//class ='userdropdown'
		//"+showDropDown(usracc)+"
		var usr=$("<div style='display:flex'><span class='userdropdown'  id='usernamedropdown"+usracc+"-"+thisuserprinted+"' ><span  class='redtext'>"+Accounts[usracc].FideTitle+"</span> <b>"+Accounts[usracc].name+"</b> </span><!--<span class='idlesquare' id='circlediv"+Accounts[usracc].name+"'</span>--></div>");
elem.append(usr);



usr.click(function()
	{
			$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);

	});
usr.mouseenter(function(){
	$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);

});
usr.mouseleave(function()
		{
		DropDowns[usracc].detach();
		});
return usr;
 //href='/profile/"+usracc+"'
 }
 else
 {
	// console.log(Accounts[usracc]);
var usr=$("<div>Deleted Account</div>");
elem.append(usr);
return usr;

	}

	$("#usernamedropdown"+usracc+"-"+thisuserprinted).click(function()
	{
		console.log("clicked on username");
			$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);

			});

		$("#usernamedropdown"+usracc+"-"+thisuserprinted).mouseenter(function()
		{console.log("MOUSE ENTER");
			//console.log(DropDowns[usracc]);
			$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);

			});
		$("#usernamedropdown"+usracc+"-"+thisuserprinted).mouseleave(function()
		{console.log("MOUSE LEAVE");
			//console.log(DropDowns[usracc]);
			DropDowns[usracc].detach();
			});

/*
 *
 function handlerIn()

  {console.log("handler in!");

  function handlerOut()
  {console.log("handler out!");}

$("#usernamedropdown"+usracc).mouseenter(
handlerIn);
$("#usernamedropdown"+usracc).mouseleave(
handlerOut);
//,function(){console.log("out");});
 */
}

function showDropDown(usracc)
{


	return(`  <ul class="userdropdown-content2" >
  <li>
    <a href="#">Cumulative Rating `+Accounts[usracc].ELO+`</a>
  </li>
  <li>
    <a href="#">View Game Archive</a>
   </li>
   <li>
    <a href="#">View Game	<%- userid %></a>
   </li>
   <li>
    <a href="#">Follow	</a>
   </li>
   <li>
    <a href="#">Block	</a>
   </li>

   <li>
    <a href="#">Challenge to a Game</a>
   </li>
   <li>
    <div id="PrivateConversation`+usracc+`">
    </div>
    </li>
    <li>
    <a href="#">Add to Friend List	</a>
  </li>
   <li>

  </li>
  </ul>`);

	$("#StartPrivateDiv"+usracc).click(function(){


	io.socket.post('/startprivateconversation',{Talker1:MyID,Talker2:usracc},
			function (resData, jwRes) {
				console.log("resData[0].id "+resData.id);
				PrivateConversations[MyID][usracc]=resData;

				});

	io.socket.post('/privateconversation',{Talker1:MyID,Talker2:usracc},
			function (resData, jwRes) {
				console.log("resData[0].id "+resData.id);
				PrivateConversations[MyID][usracc]=resData;

				});
	});


}


function showSelect(elem,optionnames,optionvalues,defaulttext)
{
	var selectbloke=$("<select class='custom-select custom-select-lg marginedElement' ></select>");
	selectbloke.append("<option selected disabled>"+defaulttext+"</option>");
	for (iter in optionnames)
	{
	selectbloke.append("<option value='"+JSON.stringify(optionvalues[iter])+"'>"+optionnames[iter]+"</option>");
	}
	elem.append(selectbloke);
	return selectbloke;
}

/*
function showSelect(elem,optionnames,optionvalues,defaulttext){
	var btnGroup=$("<div class='btn-group'></div>");

btnGroup.append($("<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+defaulttext+"</button>"));
var menu=$("<div class='dropdown-menu'></div>")
btnGroup.append(menu);
elem.append(btnGroup);
  for (iter in optionnames)
	{
	  menu.append("<div class='dropdown-item' value='"+optionvalues[iter]+"'>"+optionnames[iter]+"</div>");
	}
	return btnGroup;

}
*/
function showStripedTable(elem)
{
	//var table=$(" <table class='table table-striped'></table>");
    //var head=$("<thead></thead>");
	//var body=$("<tbody></tbody>");
	var table=$("<table></table>");
	//table.append(head);
	//table.append(body);


	elem.append(table);
	//return body;
	return table;

}


function updateAvatarInfo(words,avar)
{
		io.socket.put('/avatar/'+avar.id+"?"+words+"="+avar[words],{},
		function(resData,jwres)
		{
		}
		);
}

function updateAccountInfo(words,usracc)
{
	console.log("words "+words);
	console.log("Accounts[ProfID][words] "+Accounts[usracc][words]);
		Accounts[usracc]['ProfileUpdated']=new Date();

	/*io.socket.put('/user/'+usracc+"?ProfileUpdated="+Accounts[usracc]['ProfileUpdated'],{

					  }

				,function(resData,jwres)
			{

					//Accounts[usracc]['ProfileUpdatedPhrase']=phrasefordate(Accounts[usracc]['ProfileUpdated']);
					console.log("calling phrase for date"+resData['updatedAt']);
		Accounts[usracc]['ProfileUpdatedPhrase']=phrasefordate(resData['updatedAt']);

					$("#ProfileUpdatedPhrase").html(Accounts[usracc]['ProfileUpdatedPhrase']);

			if(Accounts[usracc]['Profupdatedspan'])
			{
				Accounts[usracc]['Profupdatedspan'].html("Profile Updated:");
			}

			}
			);
*/
io.socket.put('/updateuser',{acc:usracc,profupdate:new Date()},function(resData,jwres)
{
	console.log(resData[0]);
	//console.log(JSON.parse(resData));
	Accounts[usracc]['ProfileUpdatedPhrase']=phrasefordate(resData[0]['ProfileUpdated']);
		$("#ProfileUpdatedPhrase").html(Accounts[usracc]['ProfileUpdatedPhrase']);
	});

		io.socket.put('/user/'+usracc+"?"+words+"="+Accounts[usracc][words],{

					  }

				,function(resData,jwres)
			{


				}
			);

}

function UpdateTypedText(words,elemTochange)
{
	words=censor(words);
	Accounts[ProfID][words]=censor(Accounts[ProfID][words]);
	elemTochange.html(Accounts[ProfID][words]);
				updateAccountInfo(words,MyID);

}
function showReportForm(elem,msgid)
{
	var  reportDiv=addSpan(elem);
	var reportform=$("<input type='text' autocomplete='off' class='form-control' placeholder='reason for reporting' name='name' >");
		var reportbutton=$("<button id='postbutton' class='btn btn-default btn-sm' type='submit' >Send Report</button>");
		reportDiv.append(reportform);
		reportDiv.append(reportbutton);
		 reportform.keypress(function (e) {
 var key = e.which;
 console.log("key "+keyCode);
 console.log("keycode "+key);
 if(key == 13)  // the enter key code
  { e.preventDefault();
	 // console.log("send wall post"+chatform.val());
		 	Sendreport(MyID,msgid,reportform.val());
		 	reportform.val("");
		}
		 });
		reportbutton.click(function(){
			Sendreport(MyID,msgid,reportform.val());
			reportform.val("");
			});
	return reportDiv;
}

function Sendreport(sender,msgid,content)
{
io.socket.post("/commentreport",{complaint:content,msgID:msgid,reporter:sender},
	 function (resData, jwr) {
	 toastr.success("Report Sent!");
	 });
}
function showLoginForm(elem)
{
	console.log("show login form");
	
	var overallDiv=addFlexDiv(elem,"myloginform","column","wrap","space-around","flex-start");
       showHeader(overallDiv,2,"Email");
     var emailform=$("<input type='text' autocomplete='on' placeholder='email' name='name' >");
	overallDiv.append(emailform);
       showHeader(overallDiv,2,"Password");
         var passwordform=$("<input type='text' autocomplete='on' placeholder='password' name='name' >");
	overallDiv.append(passwordform);
        var loginbut=showButton(elem,"Login","KgreenElement KregularButton");
        elem.append("<a href='/registerpage' class='KgreenElement KregularButton'>Register</a>");
            elem.append("<a href='/forgot' class='KgreenElement KregularButton'>Forgot Password</a>");

	loginbut.click(function(){


			io.socket.put("/login",{email:emailform.val(),password:passwordform.val(),theDate:new Date()},
			function (resData, jwr){
			console.log(resData);
				if (resData.message!="Logged In Successfully")
				{
			toastr.info(resData.message);
			}
			else
			{
			toastr.success(resData.message);
				 $(location).attr("href", '/justloggedin');
			}

			});




	});
}

function showChatForm(elem,chatID,msgtype,ReplyTo,intendedFor)
{
	
if(ReplyTo === undefined) { replyTo = ""; }
if(intendedFor === undefined) { intendedFor = ""; }

	var  chatDiv=$("<span id='chatformspan'</span>");
	elem.append(chatDiv);
	var chatform=$("<textarea style='width:100%;height:100px;' type='text' autocomplete='off' class='form-control' placeholder='post message' name='name' >");
		var chatbutton=$("<button id='postbutton' class='btn btn-default btn-sm' type='submit' >Post Message</button>");
		chatDiv.append(chatform);
		chatDiv.append(chatbutton);
		 chatform.keypress(function (e) {
	if (inputKeypress(e)==1)
	{
	setTimeout(function(){

		//var addition="";
		//var striter=0;
		//addition=chatform.val().charCodeAt(0);
		//for (striter=0;striter<(chatform.val().length);striter++)
		//{
		//addition=addition+chatform.val().charCodeAt(striter)+",";
		//}
		//console.log("addition "+addition);
		var msgToSend=chatform.val();
		//msgToSend=msgToSend+" lower case version:"+msgToSend.toLowerCase();
		//msgToSend=msgToSend+" found donkey in word?"+msgToSend.indexOf("donkey");
		
		msgToSend=(censor(msgToSend));
		 	SendWallPost(MyID,chatID,msgtype,"",msgToSend,ReplyTo,intendedFor);
		 	//SendWallPost(Myid,groupid,msgtype,address,msg,replyto,intendedfor)
		 	chatform.val("");
		},200);
	}
		 });
		chatbutton.click(function(){
				var msgToSend=chatform.val();
		//msgToSend=msgToSend+" lower case version:"+msgToSend.toLowerCase();
		//msgToSend=msgToSend+" found donkey in word?"+msgToSend.indexOf("donkey");
		
		msgToSend=(censor(msgToSend));
		 	SendWallPost(MyID,chatID,msgtype,"",msgToSend,ReplyTo,intendedFor);
			//SendWallPost(MyID,chatID,msgtype,"",chatform.val(),ReplyTo);
			chatform.val("");
			});
	return chatDiv;
}


function censor(wrds)
{

	var patt=/[A-Za-z]/g;
	var typedWordArray=wrds.split(" ");
		
	for (iter in BannedWords)
	{
	if(BannedWords[iter].word.length>0)
	{
		for (thisWord in typedWordArray)
		{
		var typedWordRegex=typedWordArray[thisWord].match(patt);
		var typedWord;
		if(typedWordRegex)
		{
		typedWord=typedWordRegex.reduce(function(total,d)
		{
		return total+d;
		},"");
		
		
		var lowerTypedWord=typedWord.toLowerCase();
		var lowerBadWord=BannedWords[iter].word.toLowerCase();
		
		if( lowerTypedWord==lowerBadWord)
		{
		//console.log(lowerBadWord);
		
		
		var starString="";
		var starIter=0;
		for(starIter=0;starIter<typedWordArray[thisWord].length;starIter++)
		{
		starString=starString+"*";
		}
		typedWordArray[thisWord]=starString;
		//foundBadWord=foundBadWord.toLower();
		//BannedWords[iter]=BannedWords[iter].toLower();
		//console.log(foundBadWord);
		
		//if(foundBadWord==BannedWords[iter])
		//{console.log(foundBadWord);}
		}
		}
	}
	}}
	 
return typedWordArray.join(" ");
}

/*
function censor(wrds)
{
	for (iter in BannedWords)
	{
	if(BannedWords[iter].word.length>0)
	{
	var moddedWord=BannedWords[iter].word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	var patt=new RegExp(moddedWord,"ig");
	var star="";
	for(starIter=0;starIter<BannedWords[iter].word.length;starIter++)
	{star=star+"*";}
	wrds=  wrds.replace(patt,star);
	}
	}
return wrds;
}
*/
/*
function censor(wrds)
{
	var newWords=wrds;
	console.log("original: "+wrds);
	for (iter in BannedWords)
	{
		
		lowerBadWord=BannedWords[iter].word.toLowerCase();
		
			console.log("BannedWords[iter] "+BannedWords[iter].word);
		console.log("lowerBadWord "+lowerBadWord);
		
		
		var lowerWords=newWords.toLowerCase();
		
		console.log("lowerWords "+lowerWords);
		
		
		 var reg = new RegExp("^[" + lowerBadWord +"]+$");
		console.log( reg.test(lowerWords));
		var goes=0;
		var keepGoing=true;
		
		//for(goes=0;goes<4;goes++)
		//{
			
			//if(newWords.indexOf(lowerBadWord)==-1)
			//{keepGoing=false;}
			
			if(newWords.indexOf(lowerBadWord)!=(-1) && lowerBadWord.length>0)
		//while(lowerWords.indexOf(lowerBadWord)>-1)
		{
			
			console.log("BannedWords[iter] "+BannedWords[iter].word);
		console.log("lowerBadWord "+lowerBadWord);
			console.log("lowerBadWord length "+lowerBadWord.length);
		console.log("lowerWords "+lowerWords);
		
		
		 var reg = new RegExp("^[" + lowerBadWord +"]+$");
		console.log( reg.test(lowerWord));
    
    
		var star="";
		//console.log("lowerBadWord "+lowerBadWord);
		//console.log("lowerBadWord.length "+lowerBadWord.length);
		
		for (starIter=0;starIter<lowerBadWord.length;starIter++)
		{
		star=star+"*";
		//console.log("star "+star);
		}
		//console.log("star "+star);
		var strarr=lowerWords.split(lowerBadWord);
		lowerWords="";
		for(badIter in strarr)
		{
			if(badIter<strarr.length-1)
			{
			lowerWords=lowerWords+strarr[badIter]+" "+star;
			}
			else
			{
			lowerWords=lowerWords+strarr[badIter];
			}
		}
		newWords=lowerWords;
		//newWords=lowerWords.replace(lowerBadWord,"****");
	
		//}
	}
	}
	return newWords;
}
*/
function showInput(elem)
{
	var myinput=$("<span>Edit:</span><input type='text' autocomplete='off' class='form-control' placeholder='' name='name' >");
	elem.append(myinput);
return myinput;
}



function showGenericTextwithInput(elem,words,elemTochange,localRecord,updatefunc,recordID)
{
	
	var editbut=showButton(elem,"Edit","KregularButton KgreenElement");
	
	var myinput=$("<textarea style='width:100%;height:400px;' type='text' autocomplete='off' class='form-control' placeholder='' name='name' >");
	
	
	elem.append(myinput);
	
	myinput.hide();
	editbut.click(function(){
		myinput.slideToggle();
	});
	
	myinput.val(localRecord);
	myinput.keydown({inny:myinput},function(event){
		try{
		setTimeout(function(){
		
		if(!localRecord)
		{
		localRecord="";
		}
	
		localRecord=event.data.inny.val();
		
		UpdateTypedTextGeneric(words,elemTochange,localRecord,updatefunc,recordID)
		
		
	
		
	},70);
	}
	
		catch(err)
		{
		io.socket.post("/recenterror",{msg:err.message,line:err.lineNumber,thefile:err.fileName},function(res1,res2)
		{});
		}
		finally {
		}
		});
}


function UpdateTypedTextGeneric(words,elemTochange,localRecord,updatefunc,recordID)
{
	//words=censor(words);
	localRecord=censor(localRecord);
	elemTochange.html(localRecord);
	updatefunc(words,recordID,localRecord);

}

function updateAlbumName(words,recordID,localRecord)
{
		io.socket.put('/album/'+recordID+"?"+words+"="+localRecord,{

					  }

				,function(resData,jwres)
			{


				}
			);
}

function updatePicDescription(words,recordID,localRecord)
{
	for (iter in mypics)
	{
		if (mypics[iter].id==recordID)
		{
		mypics[iter].description=localRecord;
		}
	}
		io.socket.put('/avatar/'+recordID+"?"+words+"="+localRecord,{

					  }

				,function(resData,jwres)
			{


				}
			);
}

function showTextwithInput(elem,words,elemTochange)
{
	//console.log("words "+words);
	var editbut=showButton(elem,"Edit","KregularButton KgreenElement");
	
	var myinput=$("<textarea style='width:100%;height:400px;' type='text' autocomplete='off' class='form-control' placeholder='' name='name' >");
	
	
	elem.append(myinput);
	
	myinput.hide();
	editbut.click(function(){
		myinput.slideToggle();
	});
	
	myinput.val(Accounts[ProfID][words]);
	myinput.keydown({inny:myinput},function(event){
		try{
		setTimeout(function(){
		//console.log(JSON.stringify(event));
		if(!Accounts[ProfID][words])
		{
		Accounts[ProfID][words]="";
		}
	
		Accounts[ProfID][words]=event.data.inny.val();
		//Accounts[ProfID][words]=censor(
		
		UpdateTypedText(words,elemTochange);
		
		//	console.log("finally");
   //io.socket.post("/recenterror",{msg:"finally"},function(res1,res2)
	//	{});
		
	},70);
	}
	
		catch(err)
		{
		io.socket.post("/recenterror",{msg:err.message,line:err.lineNumber,thefile:err.fileName},function(res1,res2)
		{});
		}
		finally {
		}
		});
}

function showAnchorButton(elem,words,linkto,btnstyle){
	ButtonNumber=ButtonNumber+1;
	//console.log("ButtonNumber"+ButtonNumber);
	//elem.append("<a href='"+linkto+"' style='width:100%' class='btn btn-lg "+btnstyle+"'  id='button"+ButtonNumber+"'>"+words+"</a>");
	elem.append("<a href='"+linkto+"' class='"+btnstyle+"'  id='button"+ButtonNumber+"'>"+words+"</a>");

	//$("#button"+ButtonNumber).click(function() {
 // alert( "Handler for .click() called." );
//});

}


function showBoardOptions(elem)
{
	var vbb=showButton(elem,"Show Board Options","KregularButton KgreenElement");
	var optionDiv=addFlexDiv(elem,"optionDiv","row","wrap","space-around","center");
	var boardThemeSel=showSelect(optionDiv,boardThemeNames,boardThemeValues,"Board Theme");
	var boardSizeSel=showSelect(optionDiv,boardSizeNames,boardSizeValues,"Board Size");
	var volumeSel=showSelect(optionDiv,volumeNames,volumeValues,"Sound Volume");
	var volumeButton=showButton(optionDiv,"Sound Enabled","KregularButton KgreenElement");
	var pieceThemeSel=showSelect(optionDiv,piecethemeNames,piecethemeValues,"Piece Theme");
	var flipButton=showButton(optionDiv,"Flip Board","KregularButton KgreenElement");
	
	flipButton.click(function()
	{
		
		board1.flip();
		bottomPlayerMarque.detach();
		
		topPlayerMarque.detach();
		
		if(!boardWasFlipped)
		{
		bottomPlayerMarqueContainer.append(topPlayerMarque);
		topPlayerMarqueContainer.append(bottomPlayerMarque);
		boardWasFlipped=true;
		}
		else
		{
		bottomPlayerMarqueContainer.append(bottomPlayerMarque);
		topPlayerMarqueContainer.append(topPlayerMarque);
		boardWasFlipped=false;
		}
		
		
		for (btIter in boardThemeValues)
	{
		if (boardThemeValues[btIter].name==Accounts[MyID].BoardTheme)
		{
			
			var obj=boardThemeValues[btIter];
	$(".white-1e1d7").css("background-color",obj.whitebackground);	
		$(".black-3c85d").css("background-color",obj.blackbackground);
		}
	}
	
	
	});
	
	volumeButton.click(function()
	{
		console.log( $(this).text());
		if ($(this).text()=="Sound Enabled")
		{$(this).text("Sound Disabled");}
			else
		{$(this).text("Sound Enabled");}
		});

	optionDiv.hide();
	vbb.click(function(){
		optionDiv.slideToggle();
	});

	pieceThemeSel.change(function()
	{
		var obj=JSON.parse($(this).val());
		Accounts[MyID].ChessPieceTheme=obj;

		board1.changePieceTheme('/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/{piece}.png');
		//for (iter in pieceNames)
		//{
		//$("div.chess_board div.chess_player_black.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/b'+pieceNamesInitial[iter]+'.png)');
		//$("div.chess_board div.chess_player_white.chess_piece_"+pieceNames[iter]).css("background-image",'url(/img/chesspieces/'+Accounts[MyID].ChessPieceTheme+'/w'+pieceNamesInitial[iter]+'.png)');

		updateAccountInfo('ChessPieceTheme',MyID);

		//}
	});
		boardThemeSel.change(function()
		{
			var obj=JSON.parse($(this).val());
		//	console.log(obj.whitebackground);
		//console.log(JSON.stringify($(this).val()['whitebackground']));
		$(".white-1e1d7").css("background-color",obj.whitebackground);
		$(".black-3c85d").css("background-color",obj.blackbackground);

		Accounts[MyID].BoardTheme=obj.name;
		updateAccountInfo('BoardTheme',MyID);

		});

		boardSizeSel.change(function()
		{
		var obj=JSON.parse($(this).val());
		
		console.log($(window).width()); 
		console.log(obj.value);
		
		var finalPercent=obj.value;
		
		if($(window).width()*(obj.value/100)<91)
		{
			
			finalPercent=40;
		}
		
		$("#bdd").css("width",finalPercent+"%");
		$("#boardcontainer").css("width","100%");

		$("#sideBoard").css("width",(100-finalPercent)+"%");

		//topPlayerMarque.css("width",$("#bdd").css("width"));
		Accounts[MyID].BoardSize=obj.value;
		updateAccountInfo('BoardSize',MyID);
		//console.log("Accounts[MyID].BoardSize "+Accounts[MyID].BoardSize);
		board1.resize();
		topPlayerMarque.css("width","100%");
		bottomPlayerMarque.css("width","100%");
		$("#sideBoard").css("height",$("#bdd").css("height"));
		if($("#chatDiv"))
		{
		$("#chatDiv").css("max-height","100%");
		$("#chatDiv").css("overflow","auto");
		$("#chatDiv2").css("max-height","85%");
		$("#chatDiv2").css("overflow","auto");
		}
		console.log("sideboard new height "+$("#sideBoard").css("height"));
		console.log("chatdiv1 new height "+$("#chatDiv").css("height"));
		console.log("chatdiv2 new height "+$("#chatDiv2").css("height"));
				for (btIter in boardThemeValues)
			{
				if (boardThemeValues[btIter].name==Accounts[MyID].BoardTheme)
				{

					var obj=boardThemeValues[btIter];
			$(".white-1e1d7").css("background-color",obj.whitebackground);
				$(".black-3c85d").css("background-color",obj.blackbackground);
				}
			}
		});

		volumeSel.change(function()
		{
		var obj=JSON.parse($(this).val());
		console.log(obj);
		Accounts[MyID].SoundVolume=obj;
		updateAccountInfo('SoundVolume',MyID);
		});

}

function setAvatar(MyID,picid)
	{
		io.socket.put('/User/'+MyID,{
      avatarid:picid,
      picture:'https://www.chessbond.com/user/avatar/'+picid
      
      }  
    ,function(resData,jwres)
	{
      toastr.success('Changed Profile Image');
      });  
}
function showButton(elem,words,btnstyle){
	
if(btnstyle === undefined) { btnstyle = "btn-success"; }
	
	ButtonNumber=ButtonNumber+1;
	//console.log("ButtonNumber"+ButtonNumber);
	var btn=$("<span class='"+btnstyle+"' id='button"+ButtonNumber+"'>"+words+"</span>");
	elem.append(btn);
	return btn;
	//$("#button"+ButtonNumber).click(function() {
 // alert( "Handler for .click() called." );
//});

}

function showNavbar(elem,usracc,boardscreen)
{


if(boardscreen === undefined) { boardscreen = false; }
	
	var plyrName=Accounts[usracc].name;

elem.append(`
		<div class="mynavbar">

			<span id="navbarfirstspan">
				<img style="background-color:white;width:50px;height:50px; "
						src="/knight50.png">
				</img>
			<span class="spacer"></span>



				<a  href="/#" >Chessbond

				</a>
			</span>

            <span class="spacer"></span>

			<a href="/opentournament"> <img style="background-color:white; "
			src="/tournyred1.gif">
			</a>
				<span class="spacer"></span>
			<span id="attachnavdropdown" style="color:white;" >
			Welcome `+plyrName+`<span  class='caret'></span>
			<span class="badge" id="NumberofNotificationsSpan"></span>
			</span>

		</div>

`);

if (boardscreen)
{
	var optionspan=$("#navbarfirstspan").append("<span></span>");
	showBoardOptions(optionspan);

}

var coverall;
//console.log("Notifications.length "+Notifications.length);
if(Notifications.length>0)
{

$("#NumberofNotificationsSpan").html(Notifications.length);
}
if(Accounts[MyID].Invisible)
{
$("#navbarfirstspan").after("Days Left To Account Deletion:"+Accounts[MyID].DaysToDelete);
coverall=$("<div style='background-color:white;position:fixed;height: 90%;width: 100%;top:30px'>Account Disabled</div>");
$('body').append(coverall);
}
/*
elem.append(`<nav class="navbar navbar-default navbar-inverse">

	<div class="container-fluid"   >
		<div class="navbar-header" >
			<button type="button" class="navbar-toggle" data-toggle="collapse" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed">
			   <!-- This controls the number of lines in the image when the nav collapse -->
			   <span class="icon-bar"></span>
			   <span class="icon-bar"></span>
			   <span class="icon-bar"></span>
			</button>

			<!-- This is the brand on the left-hand side. -->
			<span style='display:flex'>
			<img style="background-color:white;max-width:50px;height:50px; "
             src="/knight50.png">

              <div  style="color:white;" id="InvisibleMessage">
			</div>
			<a class="navbar-brand" href="/#" >Chessbond

			</a>

			</span>
		</div>

     		 <ul class="navbar-nav" style="padding-top:10px;padding-left:200px;">
			<li  class="nav-item">
			<a href="/opentournament"> <img style="background-color:white; "
             src="/tournyred1.gif"></a>
			</li>
			</ul>
		   <div id="navbarNav" >

			<ul class="nav navbar-right">


				  <div id="attachnavdropdown"  class="nav navbar-nav navbar-brand navbar-right">
				Welcome `+plyrName+`<span  class='caret'></span>
				  </div>



			</ul>
		</div>

   </div>
</nav>
`);
*/

NavbarDropDown=$("<ul  style='z-index:9999;width:inherit;position:absolute;right:10px;background-color:white;padding:30px 5px 10px 5px;box-shadow: 10px 10px 5px grey;'></ul>");
NavbarDropDown.attr("id","NavBarDropDown");
NDDlinks['ProfileLink']=$("<a  id='profilelink' href='/profile/"+Accounts[MyID].id+"'><li style='list-style-position: inside;color:black'> My Profile</li></a>");
NDDlinks['TournamentsLink']=$("<a  id='tournamentslink' href='/mytournaments/"+Accounts[MyID].id+"'><li style='list-style-position: inside;color:black'> My Tournaments</li></a>");
NDDlinks['MessagesLink']=$("<a  id='messageslink' href='/myprofilemg'><li style='list-style-position: inside;color:black'> My Messages</li></a>");

NDDlinks['AlbumLink']=$("<a id='albumlink' href='/albums/"+Accounts[MyID].id+"' ><li style='list-style-position: inside;color:black'>My Albums</li></a>");
NDDlinks['StatsLink']=$("<a id='statslink' href='/stats/"+Accounts[MyID].id+"' ><li style='list-style-position: inside;color:black'>My Stats</li></a>");


if(bookmarks){
if(bookmarks.length>0)
{
	for (bookIter in bookmarks)
	{
		console.log(bookmarks[bookIter].observed);
		console.log(Accounts[bookmarks[bookIter].observed]);
		NDDlinks['BookmarksLink'+bookIter]=$("<span id='bookmark"+bookIter+"'><li style='list-style-position: inside; cursor:pointer;color:black'>\u2764 "+bookmarks[bookIter].observedName+"</li></span>");
		NDDlinks['BookmarksLink'+bookIter].click({thisadr:"/profile/"+bookmarks[bookIter].observed},visitBookmark);
	}
}
}

NDDlinks['LogoutLink']=$("<a href='/MyLogout'><li style='list-style-position: inside;color:black'>Logout</li></a>");

if (Accounts[MyID].admin)
{
NDDlinks['AdminLink']=$("<a href='/admin'><li style='list-style-position:inside;color:black'>Admin Panel</li></a>");
}
if (!Accounts[MyID].Invisible)
{
NDDlinks['DeleteLink']=$("<a href='/DeleteAccount'><li style='list-style-position: inside;color:black'>Delete Account</li></a>");
}
else
{
NDDlinks['DeleteLink']=$("<a href='/UndeleteAccount'><li style='list-style-position: inside;color:black'>UnDelete Account</li></a>");
}

//console.log("bookmarks.length "+bookmarks.length);

if(Notifications.length>0)
{
	for (notIter in Notifications)
	{
		NDDlinks['NotificationsLink'+notIter]=$("<span id='notification"+notIter+"'><li style='list-style-position: inside; cursor:pointer;color:black'>"+Notifications[notIter].msg+"</li></span>");
		NDDlinks['NotificationsLink'+notIter].click({thisadr:Notifications[notIter].adr},visitNotification);
	}
}




//console.log("sosedred");

//console.log("sosed2red");
for (iter in NDDlinks)
{
	NavbarDropDown.append(NDDlinks[iter]);

	NavbarDropDown.append("<hr>");


	}

$("#attachnavdropdown").mouseenter(function()
{$(this).append(NavbarDropDown);
	if(coverall)
	{
	coverall.hide();}
	}
);

$("#attachnavdropdown").click(function()
{
{$(this).append(NavbarDropDown);
	if(coverall)
	{
	coverall.hide();
	}
}

});

$("#attachnavdropdown").mouseleave(function()
{NavbarDropDown.detach();
if(coverall)
	{
	coverall.show();
	}
}
);



				//		<li id="NotificationsList"></li>
			//
		//				<li id="UndeleteAccount"></li>
	//					<li id="DeleteAccount"></li>
//						`);
	//`).hide().slideDown();
	//<%- include options.ejs %>
	//<li ng-show="Accounts['<%- Myid %>'].Invisible==true"><a href="/UndeleteAccount">Undelete Account</a></li>
					//<li ng-show="!Accounts['<%- Myid %>'].Invisible"><a href="/DeleteAccount">Delete Account</a></li>

	//do NumberofNotificationsSpan
	//NotificationsList<li ng-click="DestroyNotifications(n.adr)" ng-repeat="n in Notifications track by $index" value="{{n.msg}}">
						  //<a href="{{n.adr}}">{{n.msg}}</a></li>

	/*
	 <li>

				 <span class="badge" id="NumberofNotificationsSpan" ></span>
				 </li>
				  <li  class="dropdown">
					<a    href="#" class="dropdown-toggle navbar-brand" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"  ><span id="NameDiv"></span><span  class='caret'></span></a>
					<ul class="dropdown-menu">
						<li><a id="profilelink" href="/profile/<%- req.session.passport.user%>" >My Profile</a></li>
						<li><a id="albumlink" href="/albums/<%- req.session.passport.user%>" >My Albums</a></li>
						<li><a id="statslink" href="/stats/<%- req.session.passport.user%>" >My Stats</a></li>

						<li><a href="/MyLogout">Logout</a></li>
						<li id="NotificationsList"></li>

						<li id="UndeleteAccount"></li>
						<li id="DeleteAccount"></li>

					</ul>
				  </li>*/

	/*if(Accounts[usracc])
	{
		console.log("Welcome "+Accounts[usracc].name);
		$("#albumlink").attr('href','/albums/'+usracc);
		$("#profilelink").attr('href','/profile/'+usracc);
		$("#statslink").attr('href','/stats/'+usracc);

		$("#NameDiv").html("Welcome "+Accounts[usracc].name);
	if(Accounts[usracc].Invisible)
             {
				$("#InvisibleMessage").html("Days Left To Account Deletion:"+Accounts[usracc].DaysToDelete);
			}
	}
	*/
}

function visitBookmark(event)
{
	window.location.replace(event.data.thisadr);
	
}
function visitNotification(event)
{

			io.socket.get("/visitnotification",{address:event.data.thisadr},
			function (resData,jwres){
				window.location.replace(event.data.thisadr);
			});
}

function showRecentTournaments(elem,usracc)
{
		elem.empty();
		
		//var span=addFlexDiv(overallFlex,'id',"row","nowrap");
	//	showHeader(span,2,"Tournaments");
		for (iter in TournamentCandidates)
		{
		var thisFlex=addFlexDiv(elem,"","row",'wrap');
		showHeader(thisFlex,4,TournamentCandidates[iter].category);
		thisFlex.append(phrasefordate(TournamentCandidates[iter].createdAt));
		var buttonFlex=addFlexDiv(thisFlex,"","row",'wrap');
		var joinTournamentButton=showButton(buttonFlex,"Join","KgreenElement KregularButton");
		
		joinTournamentButton.click({plr:MyID,tournID:Tournaments[iter].id},joinTournamentFunction);
		}
}

/*
function showRecentTournaments2(elem,usracc)
{
		elem.empty();
		
		//var span=addFlexDiv(overallFlex,'id',"row","nowrap");
	//	showHeader(span,2,"Tournaments");
		for (iter in Tournaments)
		{
			if(Tournaments[iter].timeToAvailable>0)
			{
				var thisFlex=addFlexDiv(elem,"","row",'wrap');
				showHeader(thisFlex,4,Tournaments[iter].category);
				thisFlex.append(phrasefordate(Tournaments[iter].createdAt));
				thisFlex.append(Tournaments[iter].timeToAvailable);
				var buttonFlex=addFlexDiv(thisFlex,"","row",'wrap');
				var joinTournamentButton=showButton(buttonFlex,"Join","KgreenElement KregularButton");
				
				var gotobut=showButton(buttonFlex,"View Tournament","KregularButton KgreenElement");
			gotobut.click({gam:iter,acc:usracc},GoToTournament);
			function GoToTournament(event)
			{
			$(location).attr('href', '/tournamentview/'+Tournaments[0].id);
			}
				
				
			}
		joinTournamentButton.click({plr:MyID,tournID:Tournaments[iter].id},joinTournamentFunction);
		}
}
*/


function joinTournamentFunctionTournamentPage(event)
{
	
	
	io.socket.post('/JoinTournament',{player:event.data.plr,tourny:event.data.tournID},function (resData, jwr) {
				//toastr.success("Joined Tournament");
					//console.log(JSON.stringify(jwr));
					if(jwr.statusCode!=404)
					{
						toastr.success(resData);
						event.data.joinDiv.slideUp();
						afterTournamentJoinTournamentPage(event.data.withdrawDiv);
					}
					else
					{
						toastr.error(resData);
					}
					
					
			});	
			
			
		
}

function joinTournamentFunctionMainPage(event)
{
	
	tournamentTableContainer.slideUp();
		io.socket.post('/JoinTournament',{player:event.data.plr,tourny:event.data.tournID},function (resData, jwr) {
				//toastr.success("Joined Tournament");
					console.log(JSON.stringify(jwr));
					if(jwr.statusCode!=404)
					{
						toastr.success(resData);
					}
					else
					{
						toastr.error(resData);
					}
					afterTournamentJoinMainPage();
					
			});	
			
			
		
}

function afterTournamentJoinTournamentPage(div)
{
div.slideDown();
	
}
function afterTournamentJoinMainPage()
{
	
		currentTournamentDiv.detach();
		joinbuttonDiv.detach();
		viewbuttonDiv.detach();
		timeToCurrentTournamentStartDiv.detach();
		withdrawbuttonDiv.detach();
		joinedPlayersDiv.detach();
				
		//for (emptyIter in bigemptyDiv)
		//{bigemptyDiv[emptyIter].detach();}
		bigemptyDiv.map(x=>x.detach());
				
		tournamentTable.detach();
		tournamentTable=showUpcomingTournamentTable2(tournamentTableContainer);
		tournamentTableContainer.slideDown();
}

function showRecentGames(elem,usracc)
{
	if(!JoinedGames)
	{return;}
	if(!JoinedGames[usracc].length)
	{return;}
	
	//console.log("showrecent games");
	var overallFlex=addFlexDiv(elem,"recentgames","column",'wrap');
	var span=addFlexDiv(overallFlex,'id',"row","nowrap");
	var leftbut=showButton(span,"<","KgreenElement KbigButton");

	showHeader(span,2,"Recent Games ("+JoinedGames[usracc].length+")");

	var rightbut=showButton(span,">","KgreenElement KbigButton");

	leftbut.click(function()
	{
		if(recentGameIndex>0)
		{
		recentGameIndex=recentGameIndex-recentGamesToShow;
		}

		for (iter in JoinedGames[usracc])
		{
		$("#overall"+iter).hide();
		}

		for (iter in JoinedGames[usracc])
		{
			if(iter>=recentGameIndex && iter<(recentGameIndex+recentGamesToShow))
			{
			$("#overall"+iter).show();
			}
		}
	});

	rightbut.click(function()
	{
		if (JoinedGames[usracc].length>(recentGameIndex+recentGamesToShow))
		{
		recentGameIndex=recentGameIndex+recentGamesToShow;
		}

		for (iter in JoinedGames[usracc])
		{
		$("#overall"+iter).hide();
		}

		for (iter in JoinedGames[usracc])
		{
			if(iter>=recentGameIndex && iter<(recentGameIndex+recentGamesToShow))
			{
			$("#overall"+iter).show();
			}
		}

   });

	var flexy=addFlexDiv(overallFlex,"recentgamesflexy","row",'wrap');
	addGamesToRecentGames2(usracc);
}

function addGamesToRecentGames2(usracc)
{
	var flexy=$("#recentgamesflexy");

	for (iter in JoinedGames[usracc])
   {
	
	  // var newFlex=addFlexDiv(flexy,"resultDiv",'row','wrap');
	var newFlex=$("<span class='overall' id='overall"+iter+"'></span>");
	  flexy.append(newFlex);
	
	if (Accounts[MyID].admin)
	{
		var delBut=showButton(newFlex,"Delete Game","KregularButton KredElement");
		delBut.click({gam:iter,acc:usracc},DeleteGame);
	}
	
	if(JoinedGames[usracc][iter].Player1Color=='White')
	{

	var usr1=showUsername(newFlex,JoinedGames[usracc][iter].Player1);
	showAvatar(newFlex,JoinedGames[usracc][iter].Player1);
	var usr2=showUsername(newFlex,JoinedGames[usracc][iter].Player2);
	showAvatar(newFlex,JoinedGames[usracc][iter].Player2);

	usr1.attr("class","ChartCell");
	usr2.attr("class","ChartCell");

	}
	else
	{
	var usr1=showUsername(newFlex,JoinedGames[usracc][iter].Player2);
	showAvatar(newFlex,JoinedGames[usracc][iter].Player2);

	var usr2=showUsername(newFlex,JoinedGames[usracc][iter].Player1);
	showAvatar(newFlex,JoinedGames[usracc][iter].Player1);

	usr1.attr("class","ChartCell");
	usr2.attr("class","ChartCell");

	}

	newFlex.append("<p class='ChartCell'>Type:"+JoinedGames[usracc][iter].GameCategory+"</p>");
	newFlex.append("<p class='ChartCell'>Move:"+JoinedGames[usracc][iter].Move+"</p>");
	newFlex.append("<p class='ChartCell'>Created:"+phrasefordate(JoinedGames[usracc][iter].createdAt)+"</p>");
	var gotobut=showButton(newFlex,"Go To Game","KregularButton KgreenElement");
	newFlex.css('cursor', 'pointer');
	gotobut.click({gam:iter,acc:usracc},GoToGame);
	 if (iter<recentGameIndex || iter>(recentGameIndex+recentGamesToShow))
	   {
		newFlex.hide();
		}
	}
}


function DeleteGame(event)
{
	io.socket.get('/chessgame/destroy/'+JoinedGames[event.data.acc][event.data.gam].id,function(fin)
	{
	});
}

function GoToGame(event)
{

		$(location).attr('href', '/humanvshumannew/'+JoinedGames[event.data.acc][event.data.gam].id);

}

function addGamesToRecentGames(usracc)
{
	var padding ="10px"
	var borderpos1="border-top-style";
	bordersize1="solid";
	var borderpos2="border-bottom-style";
	bordersize2="solid";
	var flexy=$("#recentgamesflexy");
	flexy.empty();
	console.log(flexy);
	var whiteFlex=addFlexDiv(flexy,"whiteName","column",'nowrap');
	var span=addSpan(whiteFlex,'id');
	span.append("<p>White</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

	var blackFlex=addFlexDiv(flexy,"blackName","column",'nowrap');
	var span=addSpan(blackFlex,'id');
	span.append("<p>Black</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);



	var resultFlex=addFlexDiv(flexy,"resultFlex","column",'nowrap');
	var span=addSpan(resultFlex,'id');

	span.append("<p>Result</p>");
	span.css("padding",padding);
   	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

   var timeFlex=addFlexDiv(flexy,"timeFlex","column",'nowrap');
	var span=addSpan(timeFlex,'id');
	span.append("<p>Time</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

   var movesFlex=addFlexDiv(flexy,"movesFlex","column",'nowrap');
   var span=addSpan(movesFlex,'id');
	span.append("<p>Moves</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

   var dateFlex=addFlexDiv(flexy,"dateFlex","column",'nowrap');
   var span=addSpan(dateFlex,'id');
	span.append("<p>Date</p>");
	span.css("padding",padding);
	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

   var actionFlex=addFlexDiv(flexy,"actionFlex","column",'nowrap');
	var span=addSpan(actionFlex,'id');
	span.append("<p>Action</p>");
	span.css("padding",padding);
   	span.css(borderpos1,bordersize1);
	span.css(borderpos2,bordersize2);

	for (iter in JoinedGames[usracc])
   {
	  // console.log(iter);
	 // console.log(JSON.stringify(JoinedGames[usracc][iter]));
	if(JoinedGames[usracc][iter].Player1Color=='White')
	{
		var par1=$("#whiteName").append("<p></p>");
	showUsername(par1,JoinedGames[usracc][iter].Player1);
		var par2=$("#blackName").append("<p></p>");

	showUsername(par2,JoinedGames[usracc][iter].Player2);

	}
	else
	{
	showUsername(blackFlex,JoinedGames[usracc][iter].Player1);
	showUsername(whiteFlex,JoinedGames[usracc][iter].Player2);

	}
	//console.log("JoinedGames[ProfID][iter][0].id "+JoinedGames[ProfID][iter][0].id);
	//console.log("JoinedGames[ProfID][iter][0].GameCategory "+JoinedGames[ProfID][iter][0].GameCategory);
	timeFlex.append("<p>"+JoinedGames[usracc][iter].GameCategory+"</p>");
	movesFlex.append("<p>"+JoinedGames[usracc][iter].Move+"</p>");
	dateFlex.append("<p>"+phrasefordate(JoinedGames[usracc][iter].createdAt)+"</p>");
	actionFlex.append("<span class='KregularButton KgreenElement'>Go To Game</span>");
	actionFlex.css('cursor', 'pointer');
	actionFlex.click(function(){
		$(location).attr('href', '/humanvshumannew/'+JoinedGames[usracc][iter].id);
	});
}
}


function addJoinedGame(iter,games,myelem){
				console.log(JSON.stringify(games[iter]));
				var overall=$("<span class='overall'></span>");
				overall.append("<span class='ChartCell' id='joinedgamerow"+games[iter].id+"'></span>");
				$("#joinedgamerow"+games[iter].id).append("<span id='joinedgamep1td"+iter+"'></span>");
				console.log("show user name in join div "+games[iter].Player1);
				showUsername($("#joinedgamep1td"+iter),games[iter].Player1);
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgamep2td"+iter+"'></td>");
				showUsername($("#joinedgamep2td"+iter),games[iter].Player2);
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgameButtd"+iter+"'></td>");

				showAnchorButton($("#joinedgameButtd"+iter),"Go to Game");
				$("#button"+ButtonNumber).attr('href',"/humanvshumannew/"+games[iter].id);
				}

function showNewGameControls(elem){
	elem.append(`
		<div id="newgamecontrols">


				<h2>Choose a Time Limit:</h2>
				<select id="addGameCategories" class="form-control bg-success" >

		</select>
		<h2>Which Color would you like to be?:</h2>
		<select  id="colorpicker" class="form-control bg-success" data-style="btn-success">
		  <option value='White'>White</option>
		  <option value='Black'>Black</option>
		</select>
		<button id="gobutton" type="submit" class="btn btn-success">Go</button>


			</div>
	`);

	for (giter in gamecategories)
	{
	$("#addGameCategories").append("<option value='"+giter+"'>"+gamecategories[giter].time+" | "+gamecategories[giter].extratime+"</option>");
	}


elem.append(`

			<span  id="playAgainstAIButton" href="/playvsai" class="KbigButton KgreenElement">Play Chess against the AI!</span>

			<span id="playAgainstPersonButton" type="submit" class="KbigButton KgreenElement">Create a New vs Human Game</span>

		`);

		$("#newgamecontrols").hide();

		$("#playAgainstAIButton").click(function()
		{
		$(location).attr('href', '/playvsai');
		});

		$("#playAgainstPersonButton").click(function()
		{
			$("#newgamecontrols").slideToggle();
		});

		$("#gobutton").click(function()
		{
		var type='Timed';
		var id=MyID;
		var Username=Accounts[MyID].Name;
		var timecat=$("#addGameCategories").val();
		var chosencolor=$("#colorpicker").val();
		console.log("GameForm1"+gamecategories[timecat].time);
		console.log("GameForm2"+gamecategories[timecat].extratime);
		console.log("chosen color "+chosencolor);
		var gamecat=gamecategories[timecat].time+"|"+gamecategories[timecat].extratime;

	io.socket.put('/newopengame', { GameType:type,GameCategory:gamecat,TimeLimit:gamecategories[timecat].time,ExtraTimeLimit:gamecategories[timecat].extratime,Player1Color:chosencolor,Player1:id,Player1Name:Username },
    function (resData, jwr) {

      // Refresh the page now that we've been logged in.
      //window.location.reload(true);
		toastr.success('Created New Game');
		if( window.location.pathname.indexOf('/profile')>-1)
		{

			window.location.replace('/');
		}
    });


	});

}


function showOpenGameList(elem,games)
{
	elem.append("<h1 align='center'>Open Games</h1>");

	var roomname='openchessgameroom';

			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});

io.socket.on('connect',function(){


		var roomname='openchessgameroom';

			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});

		});
			io.socket.on('deleteopengameevent', function (data)
			{
				$("#opengameiter"+data.gameid).detach();
			});
			io.socket.on('deleteopengameevent', function (data)
			{
				$("#opengameiter"+data.gameid).detach();
			});

			io.socket.on('newopengameevent', function (data)
			{
			console.log('newopengameevent'+JSON.stringify(data));

			data.phrase=phrasefordate(data.createdAt);

			if(Accounts[data.Player1])
			{
			games.push(data);
			var myelem=$("#OpenGameListDiv");
			addOpenGame2(myelem,games,games.length-1);
			}
			else
			{

			games.push(data);
			retrieveAccount(data.Player1).then
			(
				function()
				{
					retrieveFollowed(data.Player1).then(
						function(){
							retrievePrivate(data.Player1).then
							(
								function(){
								addOpenGame2($("#OpenGameListDiv"),games,games.length-1);
								}
							)
						}
					)
				}
			);

			}
		});
			//console.log("games "+JSON.stringify(games));
			var openFlex=addFlexDiv(elem,"opengamez","column","wrap");
			var openTitleFlex=addFlexDiv(openFlex,"openGameTitles","row","wrap");
			//openTitleFlex.append("<p>Player</p><p>Date</p><p>Join</p>");
			var openGameListDiv=addFlexDiv(openFlex,"OpenGameListDiv","row","wrap");

				for (iter in games)
				{
				addOpenGame2(openGameListDiv,games,iter);

				}
            /*
            <tr ng-repeat="opengame in opg track by $index">
			<td><%- include('partials/username', {userid: "opengame.Player1",Myid:Myid}); %></td>
			<td>{{opengame.phrase}}</td>

			<% if (req.session.passport) { %>

			<td>
				<button ng-click="">Join Game</button>
					<%- include('partials/avatar', {userid: "opengame.Player1",Myid:Myid}); %>

				<button ng-click="deleteopengame(opengame.id)">Delete Game</button>

			</td>

			<% } %>
			</tr>

		*/
}

	function addOpenGame2(myelem,games,iter)
{
	var overall=$("<span id='opengameiter"+games[iter].id+"' class='overall'></span>");
	myelem.append(overall);
	var usr=showUsername(overall,games[iter].Player1);
	usr.attr("class","ChartCell");
			games[iter].phrase=phrasefordate(games[iter].createdAt);
			var phr=$(games[iter].phrase);
			overall.append(phr);
			phr.attr("class","ChartCell");
			overall.css("border-style","solid");
			var but=showButton(overall,"Join Game");
	but.attr("class","ChartCell KgreenElement KregularButton");
	but.click(function()
	{
		console.log("clicked button");
				//	joingame(games[iter].id,games[iter].Player1,games[iter].Player1Name,games[iter].Player1Color,MyID,Account[MyID].name,games[iter].GameType,games[iter].GameCategory,games[iter].TimeLimit);
		io.socket.put('/joingame',
		{
			GameID:games[iter].id,
			PlayerID:games[iter].Player1,
			//PlayerName:PlayerName,
			PlayerColor:games[iter].Player1Color,
			MyID:MyID,
			//MyName:MyName,
			GameType:games[iter].GameType,
			GameCategory:games[iter].GameCategory,
			Player1TimeLimit:games[iter].TimeLimit*60,
			Player1ExtraTimeLimit:games[iter].ExtraTimeLimit*60
		}

		,function(resData,jwres)
		{

			//console.log(JSON.parse(resData).id);

				io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres)
			{

			});

		}
		);


	});


			var but2=	showButton(overall,"Delete Game","KgreenElement KregularButton");
					but2.click(function() {
				 io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres){
				});

				});


}
function addOpenGame(myelem,games,iter)
{
	myelem.append("<tr id='opengameiter"+games[iter].id+"'></tr>");
	$("#opengameiter"+games[iter].id).append("<td id='opengametdnameiter"+iter+"'></td>");
	showUsername($("#opengametdnameiter"+iter),games[iter].Player1);
	$("#opengameiter"+games[iter].id).append("<td id='opengamedateiter"+iter+"'></td>");
	games[iter].phrase=phrasefordate(games[iter].createdAt);
	$("#opengamedateiter"+iter).append(games[iter].phrase);
	$("#opengameiter"+games[iter].id).append("<td id='opengametdbuttoniter"+iter+"'></td>");
	showButton($("#opengametdbuttoniter"+iter),"Join Game");
	$("#button"+ButtonNumber).click(function()
	{
				//	joingame(games[iter].id,games[iter].Player1,games[iter].Player1Name,games[iter].Player1Color,MyID,Account[MyID].name,games[iter].GameType,games[iter].GameCategory,games[iter].TimeLimit);
		io.socket.put('/joingame',
		{

			GameID:games[iter].id,
			PlayerID:games[iter].Player1,
			//PlayerName:PlayerName,
			PlayerColor:games[iter].Player1Color,
			MyID:MyID,
			//MyName:MyName,
			GameType:games[iter].GameType,
			GameCategory:games[iter].GameCategory,
			Player1TimeLimit:games[iter].TimeLimit*60,
			Player2TimeLimit:games[iter].TimeLimit*60
		}

		,function(resData,jwres)
		{

			io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres)
			{
			});

		}
		);





	});


			$("#opengameiter"+games[iter].id).append("<td id='opengamedeletetdbuttoniter"+iter+"'></td>");
				showButton($("#opengamedeletetdbuttoniter"+iter),"Delete Game");
					$("#button"+ButtonNumber).click(function() {
				 io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres){
				});

				});


				}

var countries=[
	,'Afghanistan'
	,'Albania'
	,'Algeria'
	,'American Samoa'
	,'Andorra'
	,'Angola'
	,'Anguilla'
	,'Antigua and Barbuda'
	,'Argentina'
	,'Armenia'
	,'Aruba'
	,'Australia'
	,'Austria'
	,'Azerbaijan'
	,'Bahamas'
	,'Bahrain'
	,'Bangladesh'
	,'Barbados'
	,'Belarus'
	,'Belgium'
	,'Belize'
	,'Benin'
	,'Bermuda'
	,'Bhutan'
	,'Bolivia'
	,'Bosnia and Herzegovina'
	,'Botswana'
	,'Brazil'
	,'British Virgin Islands'
	,'Brunei'
	,'Bulgaria'
	,'Burkina Faso'
	,'Burundi'
	,'Cambodia'
	,'Cameroon'
	,'Canada'
	,'Cape Verde'
	,'Cayman Islands'
	,'Central African Republic'
	,'Chad'
	,'Chile'
	,'China'
	,'Christmas Island'
	,'Colombia'
	,'Comoros'
	,'Cook Islands'
	,'Costa Rica'
	,'Croatia'
	,'Cuba'
	,'Cyprus'
	,'Czech Republic'

	,'Democratic Republic of the Congo'
	,'Denmark'
	,'Djibouti'
	,'Dominica'
	,'Dominican Republic'
	,'East Timor'
	,'Ecuador'
	,'Egypt'
	,'El Salvador'
	,'Equatorial Guinea'
	,'Eritrea'
	,'Estonia'
	,'Ethiopia'
	,'Falkland Islands'
	,'Faroe Islands'
	,'Fiji'
	,'Finland'
	,'France'
	,'French Polynesia'
	,'Gabon'
	,'Gambia'
	,'Georgia'
	,'Germany'
	,'Ghana'
	,'Gibraltar'
	,'Greece'
	,'Greenland'
	,'Grenada'
	,'Guam'
	,'Guatemala'
	,'Guinea'
	,'Guinea Bissau'
	,'Guyana'
	,'Haiti'
	,'Honduras'
	,'Hong Kong'
	,'Hungary'
	,'Iceland'
	,'India'
	,'Indonesia'
	,'Iran'
	,'Iraq'
	,'Ireland'
	,'Israel'
	,'Italy'
	,"Ivory Coast"
	,'Jamaica'
	,'Japan'
	,'Jordan'
	,'Kazakhstan'
	,'Kenya'
	,'Kiribati'
	,'Kuwait'
	,'Kyrgyzstan'
	,'Laos'
	,'Latvia'
	,'Lebanon'
	,'Lesotho'
	,'Liberia'
	,'Libya'
	,'Liechtenstein'
	,'Lithuania'
	,'Luxembourg'
	,'Macau'
	,'Macedonia'
	,'Madagascar'
	,'Malawi'
	,'Malaysia'
	,'Maldives'
	,'Mali'
	,'Malta'
	,'Marshall Islands'
	,'Martinique'
	,'Mauritania'
	,'Mauritius'
	,'Mexico'
	,'Micronesia'
	,'Moldova'
	,'Monaco'
	,'Mongolia'

	,'Montenegro'

	,'Montserrat'
	,'Morocco'
	,'Mozambique'
	,'Myanmar'
	,'Namibia'
	,'Nauru'
	,'Nepal'
	,'Netherlands'
	,'Netherlands Antilles'
	,'New Zealand'
	,'Nicaragua'
	,'Niger'
	,'Nigeria'
	,'Niue'
	,'Norfolk Island'
	,'North Korea'
	,'Norway'
	,'Oman'
	,'Pakistan'
	,'Palau'
	,'Panama'
	,'Papua New Guinea'
	,'Paraguay'
	,'Peru'
	,'Philippines'
	,'Pitcairn Islands'
	,'Poland'
	,'Portugal'
	,'Puerto Rico'
	,'Qatar'
	,'Republic of the Congo'
	,'Romania'
	,'Russia'
	,'Rwanda'
	,'Saint Kitts and Nevis'
	,'Saint Lucia'
	,'Saint Pierre'
	,'Saint Vincent and the Grenadines'
	,'Samoa'
	,'San Marino'
	,'Sao Tome and Principe'
	,'Saudi Arabia'
	,'Senegal'
	,'Serbia'
	,'Seychelles'
	,'Sierra Leone'
	,'Singapore'
	,'Slovakia'
	,'Slovenia'
	,'Solomon Islands'
	,'Somalia'
	,'South Africa'

	,'South Korea'

	,'Spain'
	,'Sri Lanka'
	,'Sudan'
	,'Suriname'
	,'Swaziland'
	,'Sweden'
	,'Switzerland'
	,'Syria'
	,'Taiwan'
	,'Tajikistan'
	,'Tanzania'
	,'Thailand'
	,'Tibet'

	,'Togo'
	,'Tonga'
	,'Trinidad and Tobago'
	,'Tunisia'
	,'Turkey'
	,'Turkmenistan'
	,'Turks and Caicos Islands'
	,'Tuvalu'
	,'United Arab Emirates'
	,'Uganda'
	,'Ukraine'
	,'United Kingdom'
	,'United States'
	,'Uruguay'
	,'US Virgin Islands'
	,'Uzbekistan'
	,'Vanuatu'
	,'Vatican City'
	,'Venezuela'
	,'Vietnam'
	,'Wallis And Futuna'
	,'Yemen'
	,'Zambia'
	,'Zimbabwe'
];

	var countryToFilename=function(country)
{
	if (country){
	//return country.replace(/ /gi, "_");
	country=country.replace(/"/g,"");
	return country.replace(/ /gi, "-");
	}
}
